import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

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

const REDIS_KEY = "zainab_guestbook_posts_v2";
const GUESTBOOK_FILE = path.join(process.cwd(), "guestbook-data.json");

// In-memory fallback in case filesystem is read-only and no remote DB configured
let inMemoryPosts: GuestbookPost[] | null = null;
let redisClient: Redis | null = null;

/**
 * Check if Upstash Redis or Vercel KV credentials exist
 */
export function getUpstashCredentials() {
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
 * Get configured Redis client
 */
export function getRedisClient(): Redis | null {
  if (redisClient) return redisClient;
  const creds = getUpstashCredentials();
  if (creds) {
    try {
      redisClient = new Redis({
        url: creds.url,
        token: creds.token,
      });
      return redisClient;
    } catch (err) {
      console.warn("Could not instantiate @upstash/redis:", err);
    }
  }
  return null;
}

/**
 * Fallback direct HTTP pipeline runner if client fails
 */
async function fallbackRestPipeline(commands: any[][]): Promise<any[] | null> {
  const creds = getUpstashCredentials();
  if (!creds) return null;

  try {
    const pipelineUrl = `${creds.url}/pipeline`;
    const res = await fetch(pipelineUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${creds.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    });

    if (!res.ok) {
      console.error(`Upstash pipeline error (${res.status}):`, await res.text());
      return null;
    }

    const data = await res.json();
    return Array.isArray(data) ? data.map((d: any) => d?.result) : null;
  } catch (err) {
    console.error("Upstash fallback pipeline connection error:", err);
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
    console.warn("Notice: Local filesystem write skipped (using memory cache):", (err as any)?.message);
  }
}

/**
 * Load all guestbook posts from persistent storage (Upstash Redis or local fallback)
 */
export async function loadGuestbook(): Promise<GuestbookPost[]> {
  const client = getRedisClient();

  if (client) {
    try {
      const data = await client.get<any>(REDIS_KEY);
      if (data) {
        const posts = typeof data === "string" ? JSON.parse(data) : data;
        if (Array.isArray(posts)) {
          return posts;
        }
      }
      // If redis key doesn't exist yet, seed with local data if available
      const local = loadLocalFile();
      if (local.length > 0) {
        await client.set(REDIS_KEY, local);
        return local;
      }
      return [];
    } catch (err) {
      console.error("Upstash Redis get error, trying REST pipeline fallback:", err);
    }
  }

  // Secondary fallback: direct REST pipeline
  const fallbackResults = await fallbackRestPipeline([["GET", REDIS_KEY]]);
  if (fallbackResults && fallbackResults[0]) {
    try {
      const parsed =
        typeof fallbackResults[0] === "string"
          ? JSON.parse(fallbackResults[0])
          : fallbackResults[0];
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }

  // Tertiary fallback: local file / memory
  return loadLocalFile();
}

/**
 * Save all guestbook posts to persistent storage
 */
export async function saveGuestbook(posts: GuestbookPost[]): Promise<boolean> {
  // Always update local cache/file
  saveLocalFile(posts);

  const client = getRedisClient();
  if (client) {
    try {
      await client.set(REDIS_KEY, posts);
      return true;
    } catch (err) {
      console.error("Failed to persist via @upstash/redis client, trying REST fallback:", err);
    }
  }

  // Secondary fallback: direct REST pipeline
  const fallbackResults = await fallbackRestPipeline([
    ["SET", REDIS_KEY, JSON.stringify(posts)],
  ]);
  if (fallbackResults && fallbackResults[0] !== null) {
    return true;
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
