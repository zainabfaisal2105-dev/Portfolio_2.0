import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Lock, Send, X, Star, User, CheckCircle, Sparkles, MessageCircle, Reply, ShieldCheck, Pin } from 'lucide-react';

export interface PostReply {
  id: string;
  author: string;
  text: string;
  isOwner: boolean;
  timestamp: string;
}

export interface WallPost {
  id: string;
  author: string;
  text: string;
  isOwnerPost: boolean;
  mood?: string;
  category?: 'broadcast' | 'visitor_note' | 'question';
  timestamp: string;
  replies: PostReply[];
}

const DEFAULT_POSTS: WallPost[] = [
  {
    id: 'post_zainab_1',
    author: 'Zainab Faisal',
    isOwnerPost: true,
    category: 'broadcast',
    mood: '⚡ working on TriCore AI at 2am',
    text: "heyy everyone!! welcome to my wall :P I'll be posting updates here about my AI engineering experiments, SQA testing adventures, and random computer science stuff. leave a comment or reply below if u have questions or just want 2 say hi <3",
    timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    replies: [
      {
        id: 'rep_1',
        author: 'Farhan (Dev)',
        text: 'Loved your TriCore AI multi-engine setup! How did you benchmark latency across the agentic layers?',
        isOwner: false,
        timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
      },
      {
        id: 'rep_2',
        author: 'Zainab (Author)',
        text: 'Thanks Farhan!! I built custom instrumentation hooks in the pipeline to measure token streaming vs consensus aggregation latency. Turns out Spark engine is 3x faster when you bypass heavy vector embeddings :P',
        isOwner: true,
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      }
    ]
  },
  {
    id: 'post_zainab_2',
    author: 'Zainab Faisal',
    isOwnerPost: true,
    category: 'broadcast',
    mood: '☕ debugging mystery errors',
    text: "Just spent 2 hours debugging why my deepfake detection test suite was failing only to realize I had passed the wrong directory path. Computers are ruthless lol. Next up: stress-testing edge cases against adversarial noise datasets!",
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    replies: [
      {
        id: 'rep_3',
        author: 'Sarah',
        text: 'Classic debugging moment lol 😂 Excited to see the paper presentation on this! Great work Zainab 🚀',
        isOwner: false,
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: 'rep_4',
        author: 'Zainab (Author)',
        text: 'The compiler has no mercy lol <3 thanx Sarah!!',
        isOwner: true,
        timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
      }
    ]
  },
  {
    id: 'post_visitor_1',
    author: 'Ayesha K.',
    isOwnerPost: false,
    category: 'visitor_note',
    mood: '✨ visiting',
    text: "The MySpace aesthetic is super nostalgic! Really inspiring to see your journey in SQA & AI.",
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    replies: [
      {
        id: 'rep_5',
        author: 'Zainab (Author)',
        text: 'Thank you so much Ayesha!! Really appreciate you stopping by <3',
        isOwner: true,
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      }
    ]
  }
];

function timeAgo(iso: string): string {
  try {
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  } catch {
    return 'recently';
  }
}

const STORAGE_KEY = 'zainab_wall_posts_v3';

// Passcode verification helper (matches requested authorization pattern)
function verifyOwnerPasscode(input: string): boolean {
  const clean = (input || '').trim();
  return clean === '7*******' || clean === '7*******';
}

export const GuestbookSection: React.FC = () => {
  const [posts, setPosts] = useState<WallPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_POSTS;
  });

  const [activeTab, setActiveTab] = useState<'all' | 'zainab_posts' | 'visitor_notes'>('all');

  // New Post from Zainab modal/drawer
  const [showOwnerPostModal, setShowOwnerPostModal] = useState(false);
  const [ownerPostContent, setOwnerPostContent] = useState('');
  const [ownerPostMood, setOwnerPostMood] = useState('⚡ shipping code');
  const [ownerPasscode, setOwnerPasscode] = useState('');
  const [ownerPostError, setOwnerPostError] = useState('');
  const [isPublishingOwner, setIsPublishingOwner] = useState(false);

  // Visitor Comment Form
  const [visitorName, setVisitorName] = useState('');
  const [visitorMood, setVisitorMood] = useState('✨ chilling');
  const [visitorMessage, setVisitorMessage] = useState('');
  const [visitorError, setVisitorError] = useState('');
  const [isPostingVisitor, setIsPostingVisitor] = useState(false);
  const [visitorSuccessMsg, setVisitorSuccessMsg] = useState(false);

  // Reply Composer State
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyRole, setReplyRole] = useState<'visitor' | 'owner'>('visitor');
  const [replyAuthorName, setReplyAuthorName] = useState('');
  const [replyPasscode, setReplyPasscode] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyError, setReplyError] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch {
      // ignore
    }
  }, [posts]);

  // Sync with server if available
  useEffect(() => {
    const fetchFromServer = async () => {
      try {
        const res = await fetch('/api/guestbook/posts');
        if (res.ok) {
          const data = await res.json();
          if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
            const mapped: WallPost[] = data.posts.map((p: any) => ({
              id: p.id,
              author: p.author || (p.isAdmin ? 'Zainab Faisal' : 'Visitor'),
              text: p.text || '',
              isOwnerPost: !!p.isAdmin || (p.author || '').toLowerCase().includes('zainab'),
              category: (p.isAdmin || (p.author || '').toLowerCase().includes('zainab')) ? 'broadcast' : 'visitor_note',
              timestamp: p.timestamp || new Date().toISOString(),
              replies: (p.comments || []).map((c: any) => ({
                id: c.id,
                author: c.author || 'Visitor',
                text: c.text || '',
                isOwner: (c.author || '').toLowerCase().includes('zainab') || (c.author || '').toLowerCase().includes('author'),
                timestamp: c.timestamp || new Date().toISOString(),
              })),
            }));

            setPosts((prev) => {
              const ids = new Set(mapped.map((m) => m.id));
              return [...mapped, ...prev.filter((item) => !ids.has(item.id))];
            });
          }
        }
      } catch {
        // use local storage
      }
    };
    fetchFromServer();
  }, []);

  // Handle Author Post Submission (Only Zainab)
  const handleOwnerPostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerPostContent.trim()) {
      setOwnerPostError('Please enter your post content.');
      return;
    }

    if (!verifyOwnerPasscode(ownerPasscode)) {
      setOwnerPostError('Incorrect author passcode. Access restricted.');
      return;
    }

    setOwnerPostError('');
    setIsPublishingOwner(true);

    const newPost: WallPost = {
      id: `post_${Date.now()}`,
      author: 'Zainab Faisal',
      text: ownerPostContent.trim(),
      isOwnerPost: true,
      category: 'broadcast',
      mood: ownerPostMood,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    try {
      await fetch('/api/guestbook/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: ownerPostContent.trim(),
          author: 'Zainab Faisal',
          password: ownerPasscode.trim(),
        }),
      });
    } catch {
      // local fallback handled
    }

    setPosts((prev) => [newPost, ...prev]);
    setOwnerPostContent('');
    setOwnerPasscode('');
    setShowOwnerPostModal(false);
    setIsPublishingOwner(false);
  };

  // Handle Visitor Comment Submission
  const handleVisitorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorMessage.trim()) {
      setVisitorError('Please enter a comment or question.');
      return;
    }

    setVisitorError('');
    setIsPostingVisitor(true);

    const name = visitorName.trim() || 'Visitor';
    const newVisitorPost: WallPost = {
      id: `post_${Date.now()}`,
      author: name,
      text: visitorMessage.trim(),
      isOwnerPost: false,
      category: 'visitor_note',
      mood: visitorMood,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    try {
      await fetch('/api/guestbook/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `[${visitorMood}] ${visitorMessage.trim()}`,
          author: name,
          password: '7*******',
        }),
      });
    } catch {
      // local fallback handled
    }

    setPosts((prev) => [newVisitorPost, ...prev]);
    setVisitorMessage('');
    setVisitorName('');
    setIsPostingVisitor(false);
    setVisitorSuccessMsg(true);
    setTimeout(() => setVisitorSuccessMsg(false), 4000);
  };

  // Handle Reply Submission (Visitor OR Zainab)
  const handleReplySubmit = async (postId: string) => {
    if (!replyContent.trim()) {
      setReplyError('Please write your reply text.');
      return;
    }

    const isOwner = replyRole === 'owner';
    if (isOwner && !verifyOwnerPasscode(replyPasscode)) {
      setReplyError('Incorrect author passcode.');
      return;
    }

    setReplyError('');
    setIsSubmittingReply(true);

    const author = isOwner ? 'Zainab (Author)' : (replyAuthorName.trim() || 'Visitor');
    const newReply: PostReply = {
      id: `rep_${Date.now()}`,
      author,
      text: replyContent.trim(),
      isOwner,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(`/api/guestbook/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author,
          text: replyContent.trim(),
          isOwnerReply: isOwner,
          password: replyPasscode.trim(),
        }),
      });
    } catch {
      // local fallback handled
    }

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, replies: [...p.replies, newReply] } : p
      )
    );

    setReplyContent('');
    setReplyAuthorName('');
    setReplyPasscode('');
    setActiveReplyPostId(null);
    setIsSubmittingReply(false);
  };

  const filteredPosts = posts.filter((p) => {
    if (activeTab === 'zainab_posts') return p.isOwnerPost;
    if (activeTab === 'visitor_notes') return !p.isOwnerPost;
    return true;
  });

  return (
    <section id="guestbook" className="font-mono text-xs text-[#c7ccd6] space-y-5">
      {/* 1. TOP CONTROL BAR */}
      <div className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
        <div className="bg-[#182542] px-4 py-2.5 font-mono font-bold text-sm text-[#eef1f7] border-b border-[#2f3e63] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#8ea2c9] fill-[#8ea2c9]" />
            <span>xX_zainab's wall & comments_Xx</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowOwnerPostModal(true);
                setOwnerPostError('');
              }}
              className="px-3 py-1 bg-[#8ea2c9] hover:bg-[#a3b6da] text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#000]"
            >
              <Lock className="w-3.5 h-3.5" />
              + Post as Zainab
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-xs text-[#eef1f7]">
            Read updates posted exclusively by <strong>Zainab</strong> and join the conversation in the replies, or leave a visitor note on the wall!
          </p>

          {/* VIEW FILTER TABS */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2f3e63] pb-3">
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 text-xs font-bold cursor-pointer transition-colors ${
                  activeTab === 'all'
                    ? 'bg-[#8ea2c9] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-[#141e33] text-[#8ea2c9] hover:bg-[#1c2944] border border-[#2f3e63]'
                }`}
              >
                All Posts & Threads ({posts.length})
              </button>
              <button
                onClick={() => setActiveTab('zainab_posts')}
                className={`px-3 py-1 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                  activeTab === 'zainab_posts'
                    ? 'bg-[#8ea2c9] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-[#141e33] text-[#8ea2c9] hover:bg-[#1c2944] border border-[#2f3e63]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Zainab's Updates ({posts.filter(p => p.isOwnerPost).length})
              </button>
              <button
                onClick={() => setActiveTab('visitor_notes')}
                className={`px-3 py-1 text-xs font-bold cursor-pointer transition-colors ${
                  activeTab === 'visitor_notes'
                    ? 'bg-[#8ea2c9] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-[#141e33] text-[#8ea2c9] hover:bg-[#1c2944] border border-[#2f3e63]'
                }`}
              >
                Visitor Notes ({posts.filter(p => !p.isOwnerPost).length})
              </button>
            </div>
          </div>

          {/* VISITOR NOTE COMPOSER */}
          <div className="bg-[#090f1d] border border-[#2f3e63] p-4 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-[#8ea2c9] font-bold">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> LEAVE A COMMENT / QUESTION FOR ZAINAB
              </span>
              <span className="text-[10px] text-zinc-400">public • open to everyone</span>
            </div>

            {visitorSuccessMsg && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-500 text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Your comment has been posted! Zainab can reply to you below.</span>
              </div>
            )}

            {visitorError && (
              <p className="text-rose-400 font-bold text-[11px]">{visitorError}</p>
            )}

            <form onSubmit={handleVisitorSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold mb-1">YOUR NAME / HANDLE *</label>
                  <input
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Alex / UMT Classmate / Recruiter"
                    className="w-full px-2.5 py-1.5 bg-[#0e1628] border border-[#2f3e63] text-[#eef1f7] outline-none focus:border-[#8ea2c9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold mb-1">MOOD / VIBE</label>
                  <select
                    value={visitorMood}
                    onChange={(e) => setVisitorMood(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#0e1628] border border-[#2f3e63] text-[#eef1f7] outline-none focus:border-[#8ea2c9] cursor-pointer"
                  >
                    <option value="✨ chilling">✨ chilling</option>
                    <option value="☕ caffeinated">☕ caffeinated</option>
                    <option value="💻 coding 2am">💻 coding 2am</option>
                    <option value="🚀 impressed">🚀 impressed</option>
                    <option value="🎧 listening to music">🎧 listening to music</option>
                    <option value="🐞 debugging pain">🐞 debugging pain</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold mb-1">COMMENT / QUESTION *</label>
                <textarea
                  required
                  rows={2}
                  value={visitorMessage}
                  onChange={(e) => setVisitorMessage(e.target.value)}
                  placeholder="Ask Zainab about her projects, research, tech stack, or say hello..."
                  className="w-full px-2.5 py-2 bg-[#0e1628] border border-[#2f3e63] text-[#eef1f7] outline-none focus:border-[#8ea2c9] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isPostingVisitor}
                className="w-full py-2 bg-[#8ea2c9] hover:bg-[#a3b6da] text-black font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-[2px_2px_0px_0px_#000]"
              >
                <Send className="w-3.5 h-3.5" />
                {isPostingVisitor ? 'Posting...' : 'Post on Wall'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 2. ZAINAB'S EXCLUSIVE POST MODAL */}
      <AnimatePresence>
        {showOwnerPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0e1628] border-2 border-[#8ea2c9] shadow-[6px_6px_0px_0px_#000] p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#3b4d75] pb-2">
                <div className="flex items-center gap-2 text-[#8ea2c9] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>NEW OFFICIAL POST FROM ZAINAB</span>
                </div>
                <button
                  onClick={() => setShowOwnerPostModal(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#c7ccd6]">
                Only the site author can publish updates to this broadcast feed. Visitors will be able to reply and discuss underneath your post.
              </p>

              {ownerPostError && (
                <div className="p-2 bg-rose-950/80 border border-rose-500 text-rose-300 text-xs font-bold">
                  {ownerPostError}
                </div>
              )}

              <form onSubmit={handleOwnerPostSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold mb-1">STATUS / MOOD</label>
                  <input
                    type="text"
                    value={ownerPostMood}
                    onChange={(e) => setOwnerPostMood(e.target.value)}
                    placeholder="e.g. ⚡ shipping code / 📚 study mode"
                    className="w-full px-2.5 py-1.5 bg-[#090f1d] border border-[#2f3e63] text-[#eef1f7] outline-none focus:border-[#8ea2c9] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold mb-1">POST CONTENT *</label>
                  <textarea
                    required
                    rows={4}
                    value={ownerPostContent}
                    onChange={(e) => setOwnerPostContent(e.target.value)}
                    placeholder="Write what you're working on, announcements, or discussion starters..."
                    className="w-full px-2.5 py-2 bg-[#090f1d] border border-[#2f3e63] text-[#eef1f7] outline-none focus:border-[#8ea2c9] text-xs resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold mb-1">AUTHOR PASSCODE *</label>
                  <input
                    type="password"
                    required
                    value={ownerPasscode}
                    onChange={(e) => setOwnerPasscode(e.target.value)}
                    placeholder="Enter author passcode"
                    className="w-full px-2.5 py-2 bg-[#090f1d] border border-[#2f3e63] text-[#eef1f7] outline-none focus:border-[#8ea2c9] text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-[#2f3e63]">
                  <button
                    type="button"
                    onClick={() => setShowOwnerPostModal(false)}
                    className="px-4 py-2 bg-[#141e33] hover:bg-[#1c2944] text-zinc-300 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPublishingOwner}
                    className="px-5 py-2 bg-[#8ea2c9] hover:bg-[#a3b6da] text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-[2px_2px_0px_0px_#000]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isPublishingOwner ? 'Publishing...' : 'Publish Post'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. POSTS FEED */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#8ea2c9] px-1">
          <span className="font-bold flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" />
            SHOWING ({filteredPosts.length} ITEMS)
          </span>
          <span className="text-[11px] text-zinc-400">newest updates first</span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-[#0e1628] border border-[#2f3e63] p-8 text-center text-zinc-400">
            No posts found in this category.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`border-2 shadow-[4px_4px_0px_0px_#000] p-4.5 transition-all ${
                post.isOwnerPost
                  ? 'bg-[#12192c] border-[#8ea2c9]/70'
                  : 'bg-[#0e1628] border-[#2f3e63]'
              }`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center gap-2 justify-between border-b border-[#212c47] pb-2.5 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-[#eef1f7] flex items-center gap-1.5">
                    {post.isOwnerPost ? (
                      <Pin className="w-3.5 h-3.5 text-[#8ea2c9]" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-[#8ea2c9]" />
                    )}
                    {post.author}
                  </span>

                  {post.isOwnerPost && (
                    <span className="px-2 py-0.5 bg-[#8ea2c9] text-black font-bold text-[9px] uppercase tracking-wider">
                      ★ AUTHOR BROADCAST ★
                    </span>
                  )}

                  {post.mood && (
                    <span className="px-2 py-0.5 bg-[#141e33] border border-[#2f3e63] text-[10px] text-[#8ea2c9]">
                      {post.mood}
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-zinc-400 font-mono">
                  {timeAgo(post.timestamp)}
                </span>
              </div>

              {/* Main Content */}
              <p className="text-xs sm:text-sm text-[#eef1f7] leading-relaxed whitespace-pre-wrap mb-4 font-sans">
                {post.text}
              </p>

              {/* Comments & Replies list */}
              {post.replies && post.replies.length > 0 && (
                <div className="space-y-2.5 mt-3 pt-3 border-t border-[#1b253b] pl-2 sm:pl-4">
                  <div className="text-[10px] font-bold text-[#8ea2c9] uppercase tracking-wider mb-1">
                    Replies & Discussion ({post.replies.length}):
                  </div>

                  {post.replies.map((rep) => (
                    <div
                      key={rep.id}
                      className={`p-2.5 border text-xs ${
                        rep.isOwner
                          ? 'bg-[#182542] border-[#8ea2c9]/60 shadow-[2px_2px_0px_0px_#000]'
                          : 'bg-[#090f1d] border-[#2f3e63]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-bold ${rep.isOwner ? 'text-[#8ea2c9]' : 'text-[#8ea2c9]'}`}>
                            {rep.author}
                          </span>
                          {rep.isOwner && (
                            <span className="px-1.5 py-0.2 bg-[#8ea2c9] text-black font-bold text-[8px] uppercase">
                              ✓ Zainab
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-zinc-400">{timeAgo(rep.timestamp)}</span>
                      </div>
                      <p className="text-[#eef1f7] font-sans text-xs whitespace-pre-wrap">
                        {rep.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Buttons */}
              <div className="mt-3.5 pt-2.5 flex flex-wrap items-center gap-2 border-t border-[#1b253b]/60">
                <button
                  onClick={() => {
                    setActiveReplyPostId(activeReplyPostId === post.id && replyRole === 'visitor' ? null : post.id);
                    setReplyRole('visitor');
                    setReplyError('');
                  }}
                  className="px-3 py-1 bg-[#141e33] hover:bg-[#1e2c4a] border border-[#2f3e63] text-[#8ea2c9] hover:text-white font-bold text-[11px] flex items-center gap-1.5 cursor-pointer"
                >
                  <Reply className="w-3.5 h-3.5" />
                  Reply as Visitor
                </button>

                <button
                  onClick={() => {
                    setActiveReplyPostId(activeReplyPostId === post.id && replyRole === 'owner' ? null : post.id);
                    setReplyRole('owner');
                    setReplyError('');
                  }}
                  className="px-3 py-1 bg-[#8ea2c9] hover:bg-[#a3b6da] text-black font-bold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-[1px_1px_0px_0px_#000]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Answer as Zainab
                </button>
              </div>

              {/* Reply Composer Drawer */}
              <AnimatePresence>
                {activeReplyPostId === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mt-3 p-3.5 border ${
                      replyRole === 'owner'
                        ? 'bg-[#182542] border-[#8ea2c9]/60'
                        : 'bg-[#090f1d] border-[#2f3e63]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className={`text-[11px] font-bold ${replyRole === 'owner' ? 'text-[#8ea2c9]' : 'text-[#8ea2c9]'}`}>
                        {replyRole === 'owner' ? '★ ANSWERING AS ZAINAB (AUTHOR)' : 'POSTING REPLY AS VISITOR'}
                      </span>
                      <button
                        onClick={() => setActiveReplyPostId(null)}
                        className="text-zinc-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {replyError && (
                      <p className="text-rose-400 text-[10px] font-bold mb-2">{replyError}</p>
                    )}

                    <div className="space-y-2.5">
                      {replyRole === 'visitor' && (
                        <input
                          type="text"
                          value={replyAuthorName}
                          onChange={(e) => setReplyAuthorName(e.target.value)}
                          placeholder="Your name / handle (e.g. Maya)"
                          className="w-full px-2.5 py-1.5 bg-[#0e1628] border border-[#2f3e63] text-[#eef1f7] outline-none focus:border-[#8ea2c9] text-xs"
                        />
                      )}

                      {replyRole === 'owner' && (
                        <input
                          type="password"
                          value={replyPasscode}
                          onChange={(e) => setReplyPasscode(e.target.value)}
                          placeholder="Enter author passcode"
                          className="w-full px-2.5 py-1.5 bg-[#0e1628] border border-[#2f3e63] text-[#eef1f7] outline-none focus:border-[#8ea2c9] text-xs"
                        />
                      )}

                      <textarea
                        rows={2}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder={replyRole === 'owner' ? "Type Zainab's answer to this thread..." : "Write your reply or feedback here..."}
                        className="w-full px-2.5 py-2 bg-[#0e1628] border border-[#2f3e63] text-[#eef1f7] outline-none focus:border-[#8ea2c9] text-xs resize-none"
                      />

                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setActiveReplyPostId(null)}
                          className="px-3 py-1 bg-[#141e33] hover:bg-[#1e2c4a] text-zinc-300 text-xs font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReplySubmit(post.id)}
                          disabled={isSubmittingReply}
                          className="px-4 py-1.5 font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 bg-[#8ea2c9] hover:bg-[#a3b6da] text-black"
                        >
                          <Send className="w-3 h-3" />
                          {isSubmittingReply ? 'Submitting...' : (replyRole === 'owner' ? 'Post Answer' : 'Submit Reply')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
