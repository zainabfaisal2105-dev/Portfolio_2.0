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
// Persisted to a local JSON file so posts + comments survive
// server restarts. The admin password lives ONLY in the
// GUESTBOOK_ADMIN_PASSWORD environment variable (set it in your
// own .env file) -- it is never sent to the browser or bundled
// into any frontend code.
// ============================================================
import fs from "fs";

interface GuestbookComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface GuestbookPost {
  id: string;
  author: string;
  text: string;
  isAdmin: boolean;
  timestamp: string;
  comments: GuestbookComment[];
}

const GUESTBOOK_FILE = path.join(process.cwd(), "guestbook-data.json");

function loadGuestbook(): GuestbookPost[] {
  try {
    if (fs.existsSync(GUESTBOOK_FILE)) {
      return JSON.parse(fs.readFileSync(GUESTBOOK_FILE, "utf-8"));
    }
  } catch (err) {
    console.warn("Failed to read guestbook file:", err);
  }
  return [];
}

function saveGuestbook(posts: GuestbookPost[]) {
  try {
    fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed to write guestbook file:", err);
  }
}

// GET all posts (with their comments), newest first
app.get("/api/guestbook/posts", (_req, res) => {
  const posts = loadGuestbook();
  res.json({ posts: [...posts].reverse() });
});

// POST a new top-level status update -- ADMIN ONLY.
// Requires the correct password, checked server-side against
// process.env.GUESTBOOK_ADMIN_PASSWORD. The plaintext password
// is never exposed to the client in any response.
app.post("/api/guestbook/posts", (req, res) => {
  const { text, password } = req.body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ success: false, error: "Post text is required." });
  }

  const adminPassword = process.env.GUESTBOOK_ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({
      success: false,
      error: "Server isn't configured with GUESTBOOK_ADMIN_PASSWORD yet. Add it to your .env file.",
    });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ success: false, error: "wrong password lol try again" });
  }

  const posts = loadGuestbook();
  const newPost: GuestbookPost = {
    id: `post_${Date.now()}`,
    author: "zainab",
    text: text.trim().slice(0, 500),
    isAdmin: true,
    timestamp: new Date().toISOString(),
    comments: [],
  };
  posts.push(newPost);
  saveGuestbook(posts);

  res.json({ success: true, post: newPost });
});

// POST a comment on an existing post -- open to any visitor, no password.
app.post("/api/guestbook/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { author, text } = req.body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ success: false, error: "Comment text is required." });
  }

  const posts = loadGuestbook();
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ success: false, error: "Post not found." });
  }

  const newComment: GuestbookComment = {
    id: `comment_${Date.now()}`,
    author: (author && String(author).trim().slice(0, 40)) || "anonymous visitor",
    text: text.trim().slice(0, 300),
    timestamp: new Date().toISOString(),
  };
  post.comments.push(newComment);
  saveGuestbook(posts);

  res.json({ success: true, comment: newComment });
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zainab's Portfolio Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
