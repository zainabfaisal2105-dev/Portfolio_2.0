import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Disc3, VolumeX } from 'lucide-react';
import { ThemeMode } from '../types';

interface AudioToggleProps {
  activeTheme: ThemeMode;
  variant?: 'desktop' | 'mobile';
}

/**
 * A short, original, dreamy music-box style melody -- NOT a reproduction of
 * any copyrighted song. Each entry is [frequency Hz, note duration s, gap after s].
 * Slower, sparser, and more consonant (pentatonic) than a typical arpeggio,
 * meant to feel like a soft lullaby rather than a ringtone.
 * If a real licensed track is dropped at /audio/theme-song.mp3, that file is
 * used instead automatically (see effect below).
 */
const MELODY: [number, number, number][] = [
  [440.0, 0.75, 0.35],  // A4
  [523.25, 0.7, 0.3],   // C5
  [659.25, 0.9, 0.45],  // E5
  [587.33, 0.75, 0.35], // D5
  [523.25, 0.7, 0.3],   // C5
  [440.0, 0.85, 0.5],   // A4
  [392.0, 0.7, 0.35],   // G4
  [440.0, 1.1, 1.0],    // A4 resolve
];

// Root drone notes (very soft, sustained) for atmosphere underneath the melody.
const DRONE_NOTES = [220.0, 329.63]; // A3, E4

export const AudioToggle: React.FC<AudioToggleProps> = ({ activeTheme, variant = 'desktop' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileAvailable, setFileAvailable] = useState(false);

  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const reverbRef = useRef<{ input: AudioNode; output: AudioNode } | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const stopFlagRef = useRef(false);
  const droneOscsRef = useRef<OscillatorNode[]>([]);

  // Probe for an optional user-supplied licensed track. Falls back silently
  // to the synthesized melody if nothing is found (no console noise for users).
  useEffect(() => {
    const audio = new Audio('/audio/theme-song.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';
    const onReady = () => setFileAvailable(true);
    const onError = () => setFileAvailable(false);
    audio.addEventListener('canplaythrough', onReady);
    audio.addEventListener('error', onError);
    audioElRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', onReady);
      audio.removeEventListener('error', onError);
    };
  }, []);

  // Simple feedback-delay network standing in for a soft reverb tail --
  // gives the synth notes a spacious, dreamy quality instead of a dry beep.
  const getReverb = (ctx: AudioContext) => {
    if (reverbRef.current) return reverbRef.current;
    const delay = ctx.createDelay(2.0);
    delay.delayTime.value = 0.32;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.4;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 1800;
    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.3;

    delay.connect(feedback);
    feedback.connect(lowpass);
    lowpass.connect(delay);
    delay.connect(wetGain);
    wetGain.connect(ctx.destination);

    reverbRef.current = { input: delay, output: wetGain };
    return reverbRef.current;
  };

  const playSynthNote = (ctx: AudioContext, freq: number, duration: number, startTime: number) => {
    const reverb = getReverb(ctx);

    // Two gently detuned triangle oscillators (chorus effect) plus a soft
    // sine an octave up for a music-box shimmer -- much warmer than a bare sine.
    const voices: { type: OscillatorType; detune: number; freqMult: number; level: number }[] = [
      { type: 'triangle', detune: -4, freqMult: 1, level: 0.09 },
      { type: 'triangle', detune: 4, freqMult: 1, level: 0.09 },
      { type: 'sine', detune: 0, freqMult: 2, level: 0.035 },
    ];

    voices.forEach(({ type, detune, freqMult, level }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2600;

      osc.type = type;
      osc.frequency.value = freq * freqMult;
      osc.detune.value = detune;

      // Soft attack, slow exponential release -- pad-like, not percussive.
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(level, startTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      gain.connect(reverb.input);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.5);
    });
  };

  const startDrone = (ctx: AudioContext) => {
    const reverb = getReverb(ctx);
    DRONE_NOTES.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.connect(reverb.input);
      osc.start();
      droneOscsRef.current.push(osc);
    });
  };

  const stopDrone = () => {
    droneOscsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        /* already stopped */
      }
    });
    droneOscsRef.current = [];
  };

  const scheduleLoop = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || stopFlagRef.current) return;

    let t = ctx.currentTime + 0.1;
    let totalDuration = 0;
    MELODY.forEach(([freq, dur, gap]) => {
      playSynthNote(ctx, freq, dur, t);
      t += dur + gap;
      totalDuration += dur + gap;
    });

    timeoutRef.current = window.setTimeout(() => {
      if (!stopFlagRef.current) scheduleLoop();
    }, totalDuration * 1000 + 900);
  }, []);

  const stopAll = () => {
    stopFlagRef.current = true;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    stopDrone();
    ctxRef.current?.suspend();
    audioElRef.current?.pause();
    setIsPlaying(false);
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopAll();
      return;
    }

    if (fileAvailable && audioElRef.current) {
      audioElRef.current.currentTime = 0;
      audioElRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay/gesture edge case -- fall back to synth melody.
          startSynth();
        });
    } else {
      startSynth();
    }
  };

  const startSynth = () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      ctxRef.current = new Ctx();
    }
    ctxRef.current.resume();
    stopFlagRef.current = false;
    startDrone(ctxRef.current);
    scheduleLoop();
    setIsPlaying(true);
  };

  useEffect(() => () => stopAll(), []); // cleanup on unmount

  const isY2k = activeTheme === 'y2k';
  const isMyspace = activeTheme === 'myspace';
  if (!isY2k && !isMyspace) return null;

  if (variant === 'mobile') {
    return (
      <button
        onClick={handleToggle}
        className={`w-full py-2 rounded-lg font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
          isY2k
            ? 'bg-black text-cyan-300 border-2 border-black'
            : 'bg-[#8ea2c9] text-white border-2 border-black rounded-full'
        }`}
      >
        <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '2.5s' }} />
        {isPlaying ? 'Now Playing -- Tap to Mute' : 'Play Background Music'}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      title={isPlaying ? 'Mute background music' : 'Play nostalgic background music'}
      aria-pressed={isPlaying}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
        isY2k
          ? `bg-black text-cyan-300 border-2 border-black shadow-[2px_2px_0px_0px_#ec4899] ${isPlaying ? 'ring-2 ring-cyan-300 ring-offset-1 ring-offset-black' : ''}`
          : `bg-[#1a1d23] text-[#8ea2c9] border-2 border-black shadow-[2px_2px_0px_0px_#000] ${isPlaying ? 'ring-2 ring-[#8ea2c9] ring-offset-1 ring-offset-white' : ''}`
      }`}
    >
      {isPlaying ? (
        <Disc3 className="w-4 h-4 animate-spin" style={{ animationDuration: '2.5s' }} />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
      {isPlaying && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border ${
            isY2k ? 'bg-emerald-400 border-black' : 'bg-emerald-400 border-white'
          } animate-pulse`}
        />
      )}
    </button>
  );
};
