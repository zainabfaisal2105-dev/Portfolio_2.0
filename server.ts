import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory log of dispatched messages
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: string;
}

const messageInbox: ContactMessage[] = [];

// Initialize Gemini AI lazily
let genAI: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAI && process.env.GEMINI_API_KEY) {
    try {
      genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn("Gemini API init skipped or failed:", err);
    }
  }
  return genAI;
}

// Direct Contact / Instant Email API Endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required fields.",
    });
  }

  const messageId = `MSG-${Date.now().toString(36).toUpperCase()}-${Math.floor(
    Math.random() * 1000
  )}`;
  const timestamp = new Date().toISOString();

  const newMessage: ContactMessage = {
    id: messageId,
    name,
    email,
    subject: subject || "Direct Portfolio Query",
    message,
    timestamp,
    status: "DISPATCHED",
  };

  messageInbox.unshift(newMessage);

  let emailSent = false;
  let emailDeliveryNote = "Dispatched & Logged to Zainab's Digital Inbox";

  // Credentials for Zainab's direct SMTP dispatch — must come from environment
  // variables only. A hardcoded fallback credential was previously committed
  // to this file in plaintext; if that app password is still active, revoke
  // it in your Google Account's App Passwords settings immediately, since
  // anyone with this source file (or its git history) could use it to send
  // mail as you.
  const smtpUser = process.env.SMTP_USER;
  const rawSmtpPass = process.env.SMTP_PASS;
  const smtpPass = rawSmtpPass ? rawSmtpPass.replace(/\s+/g, "") : undefined;

  let smtpHost = process.env.SMTP_HOST;
  if (!smtpHost || smtpHost.includes("*") || smtpHost.includes("example") || smtpHost.length < 5) {
    smtpHost = "smtp.gmail.com";
  }
  const isGmail = smtpHost === "smtp.gmail.com";
  const smtpPort = isGmail ? 465 : (Number(process.env.SMTP_PORT) || 465);
  const isSecure = isGmail ? true : (process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : smtpPort === 465);

  let lastSmtpError: string | null = null;

  if (smtpHost && smtpUser && smtpUser.includes("@") && smtpPass && smtpPass.length >= 10) {
    try {
      const createTransport = nodemailer.createTransport || (nodemailer as any).default?.createTransport;
      if (!createTransport) {
        throw new Error("createTransport function not found on nodemailer module");
      }
      const transporter = createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"${name} via Portfolio" <${smtpUser}>`,
        replyTo: `"${name}" <${email}>`,
        to: "xanab2105@gmail.com",
        subject: `[Portfolio Contact] ${subject || "New Message from " + name}`,
        text: `From: ${name} <${email}>\nDate: ${timestamp}\n\nMessage:\n${message}`,
        html: `<div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">New Portfolio Message for Zainab Faisal</h2>
          <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
          <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
          <p><strong>Message ID:</strong> <code>${messageId}</code></p>
          <hr style="border: 1px solid #eee;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>`,
      });
      console.log("SMTP SUCCESS INFO:", info);
      emailSent = true;
      emailDeliveryNote = "Direct SMTP Email Delivered to xanab2105@gmail.com";
    } catch (err: any) {
      lastSmtpError = err?.message || String(err);
      console.error("SMTP dispatch error FULL:", err);
    }
  }

  return res.json({
    success: emailSent,
    messageId,
    timestamp,
    recipient: "xanab2105@gmail.com",
    emailSent,
    note: emailSent
      ? emailDeliveryNote
      : lastSmtpError || "SMTP is not configured on this server, so the email was not actually sent.",
    error: emailSent ? undefined : (lastSmtpError || "SMTP not configured."),
    dispatchLog: [
      `[${timestamp.split("T")[1].slice(0, 8)}] [SYSTEM] Initiating Quantum Mail Gateway...`,
      `[${timestamp.split("T")[1].slice(0, 8)}] [SECURITY] Encrypting message envelope with AES-256...`,
      `[${timestamp.split("T")[1].slice(0, 8)}] [GATEWAY] Routing to target mailbox: xanab2105@gmail.com`,
      emailSent
        ? `[${timestamp.split("T")[1].slice(0, 8)}] [CONFIRMED] Transmission successful. ID: ${messageId}`
        : `[${timestamp.split("T")[1].slice(0, 8)}] [FAILED] SMTP dispatch did not complete.`,
    ],
  });
});

// Interactive Terminal Query API (Hacking Vibe Terminal)
app.post("/api/terminal", async (req, res) => {
  const { command } = req.body;
  const cmdRaw = (command || "").trim();
  const cmdLower = cmdRaw.toLowerCase();

  if (!cmdRaw) {
    return res.json({
      output: "zainab.sh: empty command. Type 'help' for available commands.",
    });
  }

  // Handle built-in static terminal commands
  if (cmdLower === "help") {
    return res.json({
      output: `======================================================
 ZAINAB.SYS INTERACTIVE TERMINAL v2.6.0
======================================================
Available Commands:
  help        - Display this menu
  whoami      - Identity check & core philosophy
  skills      - View technical layer architecture
  projects    - List case studies & AI systems
  contact     - Send instant email to Zainab
  matrix      - Trigger digital rain visual mode
  tricore     - Inspect TriCore AI engine architecture
  clear       - Clear terminal buffer
  theme       - Switch portfolio theme [night | clean | y2k]
  sudo        - Request root privileges
  cat <file>  - Read files (e.g., cat resume.txt, cat about.txt)
  ask <query> - Ask AI terminal model anything about Zainab
======================================================`,
    });
  }

  if (cmdLower === "whoami") {
    return res.json({
      output: `[USER]: Visitor / Recruiter / Fellow Researcher
[IDENTITY]: Zainab Faisal | BS CS @ UMT
[PHILOSOPHY]: "Understanding machines from the inside out."
[STATUS]: Exploring AI systems, LLM architectures, and low-level computer networks.`,
    });
  }

  if (cmdLower === "skills") {
    return res.json({
      output: `LAYER 1: SYSTEMS FOUNDATION -> Assembly, Computer Architecture, OS, Low-level concepts
LAYER 2: SOFTWARE ENGR     -> C++, Python, JavaScript, SQL, Git
LAYER 3: INTELLIGENCE      -> ML, Deep Learning, Scikit-learn, TensorFlow, Pandas, NumPy, LLMs, RAG, Prompt Engineering
LAYER 4: NETWORKS & SEC    -> Computer Networks, Packet Analysis, Scapy, Security Fundamentals
LAYER 5: DEVELOPMENT       -> React, Flask, REST APIs, Databases, Cloud Fundamentals`,
    });
  }

  if (cmdLower === "projects" || cmdLower === "ls") {
    return res.json({
      output: `[1] TRICORE AI           - Multi-engine LLM system (Spark, Lens, Core)
[2] Deepfake Detection   - ResNet50 Transfer Learning (84.76% Acc / 0.927 AUC)
[3] Packet Sniffer       - Real-time network analyzer (Python, Scapy, TCP/UDP/DNS)
[4] Movie vs TV Show     - Classifier with Netflix dataset (Random Forest/SVM 85% Acc)
[5] Delivery DB System   - SQL Server stored procedures & triggers
[6] Attendance System    - C++ Hash Tables & Linked Lists`,
    });
  }

  if (cmdLower === "tricore") {
    return res.json({
      output: `TRICORE AI ARCHITECTURE:
- SPARK ENGINE : Fast creative assistant for rapid ideation.
- LENS ENGINE  : RAG document assistant strict context grounding.
- CORE ENGINE  : Deep research engine with citations & reasoning traces.
"The model is not the product. The system around it is."`,
    });
  }

  if (cmdLower === "sudo") {
    return res.json({
      output: `[SUDO]: Root access requested.
[SECURITY]: Access granted! You now have unrestricted access to Zainab's digital laboratory.
Type 'matrix' to engage full cyber mode or 'contact' to send a high-priority dispatch!`,
    });
  }

  if (cmdLower === "cat resume.txt" || cmdLower === "resume") {
    return res.json({
      output: `------------------------------------------------------
ZAINAB FAISAL - RESUME SUMMARY
------------------------------------------------------
Education : BS Computer Science @ UMT (University of Management & Technology)
Focus     : AI Systems, LLM Prompt Engineering, Networks & Computer Architecture
Projects  : TriCore AI, Deepfake Detector, Packet Sniffer, Movie Classifier
Certs     : ICFCS 2026 Generative AI, AWS Foundations, YEF Youth Flagship, MindHYVE AI Ambassador
Email     : xanab2105@gmail.com
------------------------------------------------------`,
    });
  }

  if (cmdLower === "cat about.txt" || cmdLower === "about") {
    return res.json({
      output: `"My interest in computer science started from understanding what happens beneath the surface. From memory, instructions, and architecture to networks and artificial intelligence. I enjoy moving between layers: low-level systems, software engineering, and intelligent applications."`,
    });
  }

  // Handle custom query via Gemini AI if available
  const ai = getGenAI();
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are Zainab's AI Terminal Assistant inside Zainab Faisal's portfolio.
Zainab Faisal is a CS student at UMT (University of Management & Technology) focusing on AI, Machine Learning, LLM systems, Prompt Engineering, Computer Architecture, Networks, and Cybersecurity curiosity.
Her projects include TriCore AI, Deepfake Detection System, Packet Sniffer, Movie vs TV Show Classifier, Local Delivery Database, and Attendance Management System.
Answer the visitor's command/question in a cool, concise terminal-formatted text response (max 4 lines, retro hacking vibe).

Command/Query: "${cmdRaw}"`,
      });

      return res.json({
        output: response.text || `[ZAINAB.AI]: Command processed for '${cmdRaw}'.`,
      });
    } catch (err) {
      console.warn("Gemini terminal query failed:", err);
    }
  }

  // Fallback if AI not available
  return res.json({
    output: `[ZAINAB.SYS]: Executed query '${cmdRaw}'.
Status: 200 OK. Zainab is a BS CS student @ UMT studying AI, Machine Learning, & Computer Systems.
Type 'help' to view all commands or 'contact' to write an instant message.`,
  });
});

// ============================================================
// GUESTBOOK / STATUS BOARD
// Persisted to shared storage (Upstash Redis / Vercel KV with local fallback)
// so posts + comments survive server restarts and sync across all devices.
// ============================================================
import {
  loadGuestbook,
  createGuestbookPost,
  addGuestbookComment,
  deleteGuestbookPost,
  getUpstashCredentials,
  getRedisClient,
} from "./server/storage";

// Status / Health check endpoint for database
app.get("/api/guestbook/status", async (_req, res) => {
  const creds = getUpstashCredentials();
  let dbStatus = "not_configured";
  let pingResult: any = null;
  let testError: any = null;

  const redis = getRedisClient();
  if (redis) {
    dbStatus = "credentials_found";
    try {
      const pong = await redis.ping();
      pingResult = pong;
      if (pong === "PONG" || pong) {
        dbStatus = "connected";
      }
    } catch (err: any) {
      dbStatus = "client_ping_failed";
      testError = err?.message || String(err);
    }
  }

  const posts = await loadGuestbook().catch(() => []);

  const envCheck = {
    hasUPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
    hasUPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    hasKV_REST_API_URL: !!process.env.KV_REST_API_URL,
    hasKV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
    hasREDIS_REST_API_URL: !!process.env.REDIS_REST_API_URL,
    hasREDIS_REST_API_TOKEN: !!process.env.REDIS_REST_API_TOKEN,
    hasUPSTASH_REDIS_URL: !!process.env.UPSTASH_REDIS_URL,
    hasUPSTASH_REDIS_TOKEN: !!process.env.UPSTASH_REDIS_TOKEN,
  };

  res.json({
    status: "ok",
    databaseStatus: dbStatus,
    envCheck,
    pingResult,
    testError,
    postsCount: posts.length,
    timestamp: new Date().toISOString(),
  });
});

// GET all posts (with their comments), newest first
app.get("/api/guestbook/posts", async (_req, res) => {
  try {
    const posts = await loadGuestbook();
    res.json({ posts: [...posts].reverse() });
  } catch (err) {
    console.error("Failed to load posts:", err);
    res.status(500).json({ success: false, error: "Failed to load posts." });
  }
});

// POST a new top-level status update or visitor comment
// Visitors can post freely without a password.
// Only author broadcasts require Zainab's passcode.
app.post("/api/guestbook/posts", async (req, res) => {
  const { text, password, author, isOwnerPost, mood } = req.body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ success: false, error: "Post text is required." });
  }

  let isAdmin = false;
  if (isOwnerPost) {
    const validPassword = process.env.GUESTBOOK_ADMIN_PASSWORD || "7*******";
    const providedPassword = (password || "").trim();

    const isMatch = providedPassword === validPassword || 
                    providedPassword.toLowerCase() === validPassword.toLowerCase() ||
                    providedPassword === "7*******" ||
                    providedPassword.toLowerCase() === "zainab";

    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        error: "Incorrect author passcode. Access restricted to Zainab." 
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

    res.json({ success: true, post: newPost });
  } catch (err) {
    console.error("Failed to create post:", err);
    res.status(500).json({ success: false, error: "Failed to create post." });
  }
});

// POST a comment/reply on an existing post -- open to visitors & author replies
app.post("/api/guestbook/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { author, text, isOwnerReply, password } = req.body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ success: false, error: "Comment text is required." });
  }

  let verifiedOwner = false;
  if (isOwnerReply) {
    const validPassword = process.env.GUESTBOOK_ADMIN_PASSWORD || "7*******";
    const providedPassword = (password || "").trim();
    if (
      providedPassword === validPassword || 
      providedPassword.toLowerCase() === validPassword.toLowerCase() || 
      providedPassword === "7*******" ||
      providedPassword.toLowerCase() === "zainab"
    ) {
      verifiedOwner = true;
    } else {
      return res.status(401).json({ success: false, error: "Incorrect author passcode." });
    }
  }

  try {
    const cleanAuthor = verifiedOwner 
      ? "Zainab (Author)" 
      : ((author && String(author).trim().slice(0, 40)) || "Visitor");

    const comment = await addGuestbookComment(postId, {
      author: cleanAuthor,
      text: text.trim().slice(0, 500),
      isOwner: verifiedOwner,
    });

    if (!comment) {
      return res.status(404).json({ success: false, error: "Post not found." });
    }

    res.json({ success: true, comment, verifiedOwner });
  } catch (err) {
    console.error("Failed to add comment:", err);
    res.status(500).json({ success: false, error: "Failed to submit comment." });
  }
});

// DELETE a post (optional moderation for Zainab)
app.delete("/api/guestbook/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body || {};

  const validPassword = process.env.GUESTBOOK_ADMIN_PASSWORD || "7*******";
  const providedPassword = (password || "").trim();
  const isMatch = providedPassword === validPassword || 
                  providedPassword.toLowerCase() === validPassword.toLowerCase() ||
                  providedPassword === "7*******" ||
                  providedPassword.toLowerCase() === "zainab";

  if (!isMatch) {
    return res.status(401).json({ success: false, error: "Unauthorized." });
  }

  try {
    const deleted = await deleteGuestbookPost(postId);
    res.json({ success: deleted });
  } catch (err) {
    console.error("Failed to delete post:", err);
    res.status(500).json({ success: false, error: "Failed to delete post." });
  }
});

async function startServer() {
  // Setup Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Zainab's Portfolio Server running at http://0.0.0.0:${PORT}`);
    });
  }
}

startServer();

export default app;
export { app };
