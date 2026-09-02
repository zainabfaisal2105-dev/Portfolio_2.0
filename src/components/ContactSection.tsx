import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';
import {
  Send,
  Mail,
  Github,
  Linkedin,
  CheckCircle2,
  Terminal,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ThemeMode, ContactDispatchLog } from '../types';

interface ContactSectionProps {
  activeTheme: ThemeMode;
  isModalMode?: boolean;
  onCloseModal?: () => void;
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const EMAILJS_CONFIGURED = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

export const ContactSection: React.FC<ContactSectionProps> = ({
  activeTheme,
  isModalMode = false,
  onCloseModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [dispatchLogs, setDispatchLogs] = useState<ContactDispatchLog[]>([]);

  const mailtoFallbackHref = () => {
    const params = new URLSearchParams({
      subject: formData.subject || `Portfolio message from ${formData.name || 'a visitor'}`,
      body: `${formData.message}\n\n— ${formData.name} (${formData.email})`,
    });
    return `mailto:xanab2105@gmail.com?${params.toString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setErrorMsg('');
    setIsSending(true);
    setDispatchLogs([
      { timestamp: new Date().toLocaleTimeString(), text: '[SYS] Initializing Quantum Mail Envelope...' },
    ]);

    // Primary path: this portfolio's own backend (server.ts -> /api/contact),
    // which sends real SMTP mail to xanab2105@gmail.com when deployed with
    // SMTP_USER/SMTP_PASS configured. This is what actually delivered mail
    // before, so it stays the first thing we try.
    try {
      setDispatchLogs((prev) => [
        ...prev,
        { timestamp: new Date().toLocaleTimeString(), text: '[TLS] Securing payload with AES-256 encryption...' },
      ]);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success && data.emailSent) {
        setDispatchLogs((prev) => [
          ...prev,
          { timestamp: new Date().toLocaleTimeString(), text: '[GATEWAY] Routing directly to xanab2105@gmail.com...' },
        ]);
        setIsSending(false);
        setIsSent(true);
        setDispatchLogs((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            text: `[CONFIRMED] Message Delivered to xanab2105@gmail.com! ID: ${data.messageId}`,
            type: 'success',
          },
        ]);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        return;
      }

      // Backend responded but SMTP genuinely failed (e.g. bad/missing
      // credentials) — fall through to EmailJS / mailto below instead of
      // pretending it worked.
      throw new Error(data.note || data.error || 'Backend SMTP dispatch failed.');
    } catch (backendErr) {
      console.warn('Backend /api/contact unavailable or failed, trying EmailJS fallback:', backendErr);
    }

    // Fallback path: EmailJS, entirely client-side, for cases where this is
    // deployed somewhere the backend isn't running.
    if (EMAILJS_CONFIGURED) {
      try {
        setDispatchLogs((prev) => [
          ...prev,
          { timestamp: new Date().toLocaleTimeString(), text: '[FALLBACK] Trying EmailJS relay...' },
        ]);

        const result = await emailjs.send(
          EMAILJS_SERVICE_ID!,
          EMAILJS_TEMPLATE_ID!,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || 'Direct Portfolio Query',
            message: formData.message,
            to_email: 'xanab2105@gmail.com',
          },
          { publicKey: EMAILJS_PUBLIC_KEY! }
        );

        if (result.status !== 200) {
          throw new Error(`EmailJS responded with status ${result.status}`);
        }

        setIsSending(false);
        setIsSent(true);
        setDispatchLogs((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            text: `[CONFIRMED] Message Delivered to xanab2105@gmail.com!`,
            type: 'success',
          },
        ]);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        return;
      } catch (emailjsErr) {
        console.error('EmailJS dispatch also failed:', emailjsErr);
      }
    }

    // Both real send paths failed or aren't configured. Be honest about it.
    setIsSending(false);
    setErrorMsg(
      'Live email dispatch failed to reach the mail gateway. Use the button below to send this through your own email app instead — nothing is lost.'
    );
  };

  return (
    <section id="contact" className={`py-20 relative font-mono ${isModalMode ? 'py-0' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isModalMode && (
          <div className="space-y-2 mb-12">
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${
              'text-cyan-400'
            }`}>
              <Mail className="w-4 h-4" />
              <span>{activeTheme === 'myspace' ? 'msg me' : 'DIRECT GATEWAY TO ZAINAB'}</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                activeTheme === 'y2k'
                  ? 'text-black drop-shadow-[2px_2px_0px_#10b981]'
                  : activeTheme === 'myspace'
                  ? 'text-[#c7ccd6] drop-shadow-[2px_2px_0px_#000] myspace-glow-text'
                  : 'text-white'
              }`}
            >
              {activeTheme === 'myspace' ? "leave me a msg!! don't be shy lol" : "Let's Build Something Intelligent."}
            </h2>
            <p className={`text-sm max-w-xl ${
              'text-zinc-400'
            }`}>
              {activeTheme === 'myspace' ? (
                <>this actually goes straight 2 my email so like... say hi ig &lt;3 <strong className="text-cyan-400">xanab2105@gmail.com</strong></>
              ) : (
                <>Write a message below for instant direct transmission to <strong className={'text-cyan-400'}>xanab2105@gmail.com</strong>.</>
              )}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Email Composer Form */}
          <div
            className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border transition-all ${
              activeTheme === 'y2k'
                ? 'bg-pink-100 border-4 border-black shadow-[8px_8px_0px_0px_#000] text-black font-bold'
                : activeTheme === 'myspace'
                ? 'bg-[#1a1d23] border-4 border-black shadow-[8px_8px_0px_0px_#8ea2c9] text-[#eef1f7] font-bold'
                : 'bg-[#0a0e1a] border-cyan-500/30 text-white shadow-[0_0_40px_rgba(6,182,212,0.12)]'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-4 mb-6 ${
              'border-white/10'
            }`}>
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                'text-cyan-400'
              }`}>
                <Send className="w-4 h-4" /> {activeTheme === 'myspace' ? 'send me stuff' : 'QUANTUM DIRECT DISPATCHER'}
              </span>
              <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {activeTheme === 'myspace' ? 'online rn' : 'TLS ENCRYPTED'}
              </span>
            </div>

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 text-center space-y-4 font-mono"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-bold ${'text-white'}`}>Message Dispatched!</h3>
                <p className={`text-xs max-w-md mx-auto ${'text-zinc-300'}`}>
                  Your message was encrypted and dispatched directly to <strong className={'text-cyan-300'}>xanab2105@gmail.com</strong>.
                </p>

                <div className={`p-3 rounded-xl text-left text-xs font-mono space-y-1 border ${
                  'bg-black/40 border-white/10 text-emerald-400'
                }`}>
                  {dispatchLogs.map((log, idx) => (
                    <div key={idx}>
                      <span className="text-zinc-500">[{log.timestamp}]</span> {log.text}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg'
                  }`}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs sm:text-sm">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                    <a
                      href={mailtoFallbackHref()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> Open in my email app instead
                    </a>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={`block font-bold text-xs ${'text-zinc-400'}`}>YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className={`w-full px-4 py-3 rounded-xl outline-none font-mono text-xs sm:text-sm transition-all border ${
                        'bg-black/40 border-white/15 text-white placeholder:text-zinc-600 focus:border-cyan-400'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`block font-bold text-xs ${'text-zinc-400'}`}>YOUR EMAIL *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@cyberdyne.io"
                      className={`w-full px-4 py-3 rounded-xl outline-none font-mono text-xs sm:text-sm transition-all border ${
                        'bg-black/40 border-white/15 text-white placeholder:text-zinc-600 focus:border-cyan-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={`block font-bold text-xs ${'text-zinc-400'}`}>SUBJECT</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. TriCore AI Collaboration / Opportunity"
                    className={`w-full px-4 py-3 rounded-xl outline-none font-mono text-xs sm:text-sm transition-all border ${
                      'bg-black/40 border-white/15 text-white placeholder:text-zinc-600 focus:border-cyan-400'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-bold text-xs ${'text-zinc-400'}`}>MESSAGE *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here... it will be sent directly to Zainab's inbox!"
                    className={`w-full px-4 py-3 rounded-xl outline-none font-mono text-xs sm:text-sm transition-all resize-none border ${
                      'bg-black/40 border-white/15 text-white placeholder:text-zinc-600 focus:border-cyan-400'
                    }`}
                  />
                </div>

                {/* Real-time Dispatch Console Feed */}
                {isSending && (
                  <div className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                    'bg-black/60 border-cyan-500/30 text-cyan-300'
                  }`}>
                    {dispatchLogs.map((log, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="opacity-60">[{log.timestamp}]</span>
                        <span>{log.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-4 rounded-xl font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTheme === 'y2k'
                      ? 'bg-cyan-400 text-black border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5'
                      : activeTheme === 'myspace'
                      ? 'bg-[#8ea2c9] text-white border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_25px_rgba(6,182,212,0.4)] disabled:opacity-50'
                  }`}
                >
                  {isSending ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" /> DISPATCHING VIA QUANTUM GATEWAY...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> DISPATCH MESSAGE TO ZAINAB
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Social Links & Info Box */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                activeTheme === 'y2k'
                  ? 'bg-cyan-200 border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black font-bold'
                  : activeTheme === 'myspace'
                  ? 'bg-[#1a1d23] border-4 border-black shadow-[6px_6px_0px_0px_#8ea2c9] text-[#eef1f7] font-bold'
                  : 'bg-[#0a0d18] border-white/10 text-white shadow-md'
              }`}
            >
              <h3 className={`text-lg font-bold font-mono mb-4 ${
                'text-cyan-400'
              }`}>CONNECT DIRECTLY</h3>

              <div className="space-y-4 text-xs sm:text-sm font-mono">
                <a
                  href="mailto:xanab2105@gmail.com"
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    'bg-black/20 border-white/10 hover:border-cyan-400 text-white'
                  }`}
                >
                  <Mail className={`w-5 h-5 shrink-0 ${'text-cyan-400'}`} />
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">PRIMARY EMAIL</span>
                    <span className="font-bold block truncate">xanab2105@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    'bg-black/20 border-white/10 hover:border-cyan-400 text-white'
                  }`}
                >
                  <Github className="w-5 h-5 text-purple-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">GITHUB PROFILE</span>
                    <span className="font-bold block truncate">github.com / zainabfaisal</span>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/zainab-faisal-001320406/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    'bg-black/20 border-white/10 hover:border-cyan-400 text-white'
                  }`}
                >
                  <Linkedin className="w-5 h-5 text-blue-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">LINKEDIN NETWORK</span>
                    <span className="font-bold block truncate">linkedin.com/in/zainab-faisal-001320406</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
