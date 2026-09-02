import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Lock, Send, X, Star } from 'lucide-react';

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

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export const GuestbookSection: React.FC = () => {
  const [posts, setPosts] = useState<GuestbookPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [newPostText, setNewPostText] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [postError, setPostError] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const [openCommentBoxId, setOpenCommentBoxId] = useState<string | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, { name: string; text: string }>>({});

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/guestbook/posts');
      const data = await res.json();
      setPosts(data.posts || []);
      setLoadError(false);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleStartPost = () => {
    if (!newPostText.trim()) {
      setPostError('type something first lol');
      return;
    }
    setPostError('');
    setShowPasswordModal(true);
  };

  const handleSubmitWithPassword = async () => {
    setIsPosting(true);
    setPostError('');
    try {
      const res = await fetch('/api/guestbook/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newPostText, password: passwordInput }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => [data.post, ...prev]);
        setNewPostText('');
        setPasswordInput('');
        setShowPasswordModal(false);
      } else {
        setPostError(data.error || 'wrong password lol try again');
      }
    } catch {
      setPostError("couldnt reach the server rn... is it even running? x_x");
    } finally {
      setIsPosting(false);
    }
  };

  const handleSubmitComment = async (postId: string) => {
    const draft = commentDrafts[postId] || { name: '', text: '' };
    if (!draft.text.trim()) return;

    try {
      const res = await fetch(`/api/guestbook/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: draft.name, text: draft.text }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, comments: [...p.comments, data.comment] } : p
          )
        );
        setCommentDrafts((prev) => ({ ...prev, [postId]: { name: draft.name, text: '' } }));
      }
    } catch {
      /* silently fail, this is a fun feature not critical infra */
    }
  };

  return (
    <section id="guestbook" className="py-20 relative font-mono">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Starry decoration */}
        <div className="space-y-2 mb-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c7ccd6]">
            <Star className="w-4 h-4 text-[#8ea2c9] fill-[#8ea2c9]" />
            <span>~*~ leave me a msg ~*~</span>
            <Star className="w-4 h-4 text-[#8ea2c9] fill-[#8ea2c9]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#eef1f7] drop-shadow-[2px_2px_0px_#1b2a4a]">
            xX_status updates_Xx
          </h2>
          <p className="text-xs sm:text-sm text-[#c7ccd6]/70 max-w-md mx-auto">
            dont be shy lol... comment on my stuff, say hi, whatever &lt;3
          </p>
        </div>

        {/* New post composer */}
        <div className="mb-8 p-5 rounded-none border-2 border-[#8ea2c9]/40 bg-[#1b1f27] shadow-[6px_6px_0px_0px_#0d0f13]">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8ea2c9] mb-2">
            whats on ur mind (only zainab can actually post here lol)
          </label>
          <textarea
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            rows={3}
            placeholder="status: ..."
            className="w-full px-3 py-2.5 bg-black/40 border border-[#8ea2c9]/30 text-[#eef1f7] placeholder:text-[#c7ccd6]/30 outline-none focus:border-[#8ea2c9] text-xs sm:text-sm resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            {postError && <span className="text-[10px] text-rose-300">{postError}</span>}
            <button
              onClick={handleStartPost}
              className="ml-auto px-4 py-2 bg-[#8ea2c9] hover:bg-[#a3b6da] text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" /> post it
            </button>
          </div>
        </div>

        {/* Posts feed */}
        {isLoading && (
          <p className="text-center text-xs text-[#c7ccd6]/50">loading... w8 a sec</p>
        )}
        {loadError && (
          <p className="text-center text-xs text-[#c7ccd6]/60 border border-[#8ea2c9]/20 p-4">
            hmm cant load the guestbook rn -- this needs the real backend server running (server.ts),
            not just the static preview. sry!! try it on npm run dev instead x_x
          </p>
        )}
        {!isLoading && !loadError && posts.length === 0 && (
          <p className="text-center text-xs text-[#c7ccd6]/50 py-8">
            no posts yet... its lonely here lol. check back l8r
          </p>
        )}

        <div className="space-y-5">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-[#8ea2c9]/25 bg-[#1b1f27]/80 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-sm text-[#eef1f7]">{post.author}</span>
                {post.isAdmin && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-[#8ea2c9] text-black font-bold uppercase tracking-wider">
                    ✓ its actually her!!
                  </span>
                )}
                <span className="text-[10px] text-[#c7ccd6]/50 ml-auto">{timeAgo(post.timestamp)}</span>
              </div>
              <p className="text-sm text-[#eef1f7]/90 whitespace-pre-wrap mb-3">{post.text}</p>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="space-y-2 mb-3 pl-3 border-l-2 border-[#8ea2c9]/20">
                  {post.comments.map((c) => (
                    <div key={c.id} className="text-xs">
                      <span className="font-bold text-[#8ea2c9]">{c.author}: </span>
                      <span className="text-[#c7ccd6]">{c.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {openCommentBoxId === post.id ? (
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <input
                    type="text"
                    value={commentDrafts[post.id]?.name || ''}
                    onChange={(e) =>
                      setCommentDrafts((prev) => ({
                        ...prev,
                        [post.id]: { name: e.target.value, text: prev[post.id]?.text || '' },
                      }))
                    }
                    placeholder="ur name"
                    className="w-full sm:w-32 px-2 py-1.5 bg-black/40 border border-[#8ea2c9]/30 text-[#eef1f7] placeholder:text-[#c7ccd6]/30 outline-none text-xs shrink-0"
                  />
                  <input
                    type="text"
                    value={commentDrafts[post.id]?.text || ''}
                    onChange={(e) =>
                      setCommentDrafts((prev) => ({
                        ...prev,
                        [post.id]: { name: prev[post.id]?.name || '', text: e.target.value },
                      }))
                    }
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment(post.id)}
                    placeholder="leave a msg..."
                    className="w-full px-2 py-1.5 bg-black/40 border border-[#8ea2c9]/30 text-[#eef1f7] placeholder:text-[#c7ccd6]/30 outline-none text-xs"
                  />
                  <button
                    onClick={() => handleSubmitComment(post.id)}
                    className="shrink-0 px-3 py-1.5 bg-[#8ea2c9] hover:bg-[#a3b6da] text-black font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setOpenCommentBoxId(post.id)}
                  className="text-[10px] text-[#8ea2c9] hover:text-[#a3b6da] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3 h-3" /> leave a comment
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Password modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => !isPosting && setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs bg-[#1b1f27] border-2 border-[#8ea2c9] p-5 shadow-[8px_8px_0px_0px_#000]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#8ea2c9] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> prove ur actually zainab
                </span>
                <button onClick={() => setShowPasswordModal(false)} className="text-[#c7ccd6]/60 hover:text-[#eef1f7]">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmitWithPassword()}
                placeholder="password..."
                autoFocus
                className="w-full px-3 py-2 bg-black/40 border border-[#8ea2c9]/40 text-[#eef1f7] outline-none focus:border-[#8ea2c9] text-sm mb-2"
              />
              {postError && <p className="text-[10px] text-rose-300 mb-2">{postError}</p>}
              <button
                onClick={handleSubmitWithPassword}
                disabled={isPosting}
                className="w-full py-2 bg-[#8ea2c9] hover:bg-[#a3b6da] text-black font-bold text-xs disabled:opacity-50 cursor-pointer"
              >
                {isPosting ? 'checking...' : 'confirm + post'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
