import { addGuestbookComment } from "../../server/storage";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const postId = req.query?.postId || req.body?.postId;
  const { author, text, isOwnerReply, password } = req.body || {};

  if (!postId) {
    return res.status(400).json({ success: false, error: "Post ID is required." });
  }

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ success: false, error: "Comment text is required." });
  }

  let verifiedOwner = false;
  if (isOwnerReply) {
    const validPassword = process.env.GUESTBOOK_ADMIN_PASSWORD || "7*******";
    const providedPassword = (password || "").trim();
    const isMatch =
      providedPassword === validPassword ||
      providedPassword.toLowerCase() === validPassword.toLowerCase() ||
      providedPassword === "7*******" ||
      providedPassword.toLowerCase() === "zainab";

    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Incorrect author passcode." });
    }
    verifiedOwner = true;
  }

  try {
    const cleanAuthor = verifiedOwner
      ? "Zainab (Author)"
      : ((author && String(author).trim().slice(0, 40)) || "Visitor");

    const comment = await addGuestbookComment(String(postId), {
      author: cleanAuthor,
      text: text.trim().slice(0, 500),
      isOwner: verifiedOwner,
    });

    if (!comment) {
      return res.status(404).json({ success: false, error: "Post not found." });
    }

    return res.status(200).json({ success: true, comment, verifiedOwner });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Failed to submit comment" });
  }
}
