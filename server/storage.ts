import fs from "fs";
import path from "path";

export interface GuestbookComment {
  id: string;
  author: string;
  text: string;
  isOwner?: boolean;
  timestamp: string;
}

export interface GuestbookPost {
  id: string;
  author: string;
  text: string;
  isAdmin: boolean;
  mood?: string;
  timestamp: string;
  comments: GuestbookComment[];
}

const REDIS_KEY = "zainab_guestbook_posts";
const GUESTBOOK_FILE = path.join(process.cwd(), "guestbook-data.json");

// In-memory fallback in case filesystem is read-only and no remote DB configured
let inMemoryPosts: GuestbookPost[] | null = null;

/**
 * Check if Upstash Redis or Vercel KV credentials exist
 */
function getUpstashCredentials() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_REST_API_URL ||
    process.env.UPSTASH_REDIS_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.REDIS_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_TOKEN;
  if (url && token) {
    return {
      url: url.replace(/\/+$/, ""),
      token,
    };
  }
  return null;
}

/**
 * Execute an Upstash Redis command via REST API
 */
async function upstashCommand(command: any[]): Promise<any> {
  const creds = getUpstashCredentials();
  if (!creds) return null;

  try {
    const res = await fetch(creds.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${creds.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    });

    if (!res.ok) {
      console.error(`Upstash REST command error (${res.status}):`, await res.text());
      return null;
    }

    const data = await res.json();
    return data?.result;
  } catch (err) {
    console.error("Upstash connection error:", err);
    return null;
  }
}

/**
 * Load posts from local JSON file
 */
function loadLocalFile(): GuestbookPost[] {
  try {
    if (fs.existsSync(GUESTBOOK_FILE)) {
      const content = fs.readFileSync(GUESTBOOK_FILE, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not read local guestbook-data.json:", err);
  }
  return inMemoryPosts || [];
}

/**
 * Save posts to local JSON file or memory
 */
function saveLocalFile(posts: GuestbookPost[]) {
  inMemoryPosts = posts;
  try {
    fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err) {
    // Expected on Vercel serverless (read-only filesystem)
    console.warn("Notice: Local filesystem write skipped (using memory cache):", (err as any)?.message);
  }
}

/**
 * Load all guestbook posts from persistent storage (Upstash Redis or local fallback)
 */
export async function loadGuestbook(): Promise<GuestbookPost[]> {
  const creds = getUpstashCredentials();

  if (creds) {
    try {
      // 1. Try Redis command array ["GET", key]
      const raw = await upstashCommand(["GET", REDIS_KEY]);
      if (raw) {
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      // If key does not exist yet in Redis, check if local file has any initial posts to seed
      const local = loadLocalFile();
      if (local.length > 0) {
        await upstashCommand(["SET", REDIS_KEY, JSON.stringify(local)]);
        return local;
      }
      return [];
    } catch (err) {
      console.error("Failed to load from remote database, falling back to local:", err);
    }
  }

  // Fallback to local file / memory
  return loadLocalFile();
}

/**
 * Save all guestbook posts to persistent storage
 */
export async function saveGuestbook(posts: GuestbookPost[]): Promise<boolean> {
  // Always update local cache/file
  saveLocalFile(posts);

  const creds = getUpstashCredentials();
  if (creds) {
    try {
      const res = await upstashCommand(["SET", REDIS_KEY, JSON.stringify(posts)]);
      if (res === "OK" || res !== null) {
        return true;
      }
      console.warn("Upstash save returned non-OK:", res);
    } catch (err) {
      console.error("Failed to persist to Upstash Redis:", err);
    }
  }

  return true;
}

/**
 * Add a new post
 */
export async function createGuestbookPost(postData: {
  author: string;
  text: string;
  isAdmin: boolean;
  mood?: string;
}): Promise<GuestbookPost> {
  const posts = await loadGuestbook();

  const newPost: GuestbookPost = {
    id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    author: postData.author,
    text: postData.text,
    isAdmin: postData.isAdmin,
    mood: postData.mood,
    timestamp: new Date().toISOString(),
    comments: [],
  };

  posts.push(newPost);
  await saveGuestbook(posts);
  return newPost;
}

/**
 * Add a comment/reply to a post
 */
export async function addGuestbookComment(
  postId: string,
  commentData: {
    author: string;
    text: string;
    isOwner?: boolean;
  }
): Promise<GuestbookComment | null> {
  const posts = await loadGuestbook();
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return null;
  }

  const newComment: GuestbookComment = {
    id: `comment_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    author: commentData.author,
    text: commentData.text,
    isOwner: commentData.isOwner,
    timestamp: new Date().toISOString(),
  };

  if (!Array.isArray(post.comments)) {
    post.comments = [];
  }
  post.comments.push(newComment);

  await saveGuestbook(posts);
  return newComment;
}

/**
 * Delete a post (for admin moderation)
 */
export async function deleteGuestbookPost(postId: string): Promise<boolean> {
  let posts = await loadGuestbook();
  const initialLength = posts.length;
  posts = posts.filter((p) => p.id !== postId);
  if (posts.length !== initialLength) {
    await saveGuestbook(posts);
    return true;
  }
  return false;
}
