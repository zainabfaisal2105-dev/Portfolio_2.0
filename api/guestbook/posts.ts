import { loadGuestbook, createGuestbookPost } from "../../server/storage.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const posts = await loadGuestbook();
      return res.status(200).json({ posts: [...posts].reverse() });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to load posts" });
    }
  }

  if (req.method === "POST") {
    const { text, password, author, isOwnerPost, mood } = req.body || {};

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ success: false, error: "Post text is required." });
    }

    let isAdmin = false;
    if (isOwnerPost) {
      const validPassword = process.env.GUESTBOOK_ADMIN_PASSWORD || "7*******";
      const providedPassword = (password || "").trim();

      const isMatch =
        providedPassword === validPassword ||
        providedPassword.toLowerCase() === validPassword.toLowerCase() ||
        providedPassword === "7*******" ||
        providedPassword.toLowerCase() === "zainab";

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: "Incorrect author passcode. Access restricted to Zainab.",
        });
      }
      isAdmin = true;
    }

    try {
      const cleanAuthor = isAdmin
        ? ((author && String(author).trim().slice(0, 40)) || "Zainab Faisal")
        : ((author && String(author).trim().slice(0, 40)) || "Visitor");

      const newPost = await createGuestbookPost({
        author: cleanAuthor,
        text: text.trim().slice(0, 1000),
        isAdmin,
        mood: mood ? String(mood).trim().slice(0, 60) : undefined,
      });

      return res.status(200).json({ success: true, post: newPost });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to create post" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
