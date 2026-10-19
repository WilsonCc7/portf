"use client";

// Hero's two client islands live in this file so hero.tsx stays a server
// component: HeroCopy (mount stagger) and Player (transport + parallax).
//
// Reduced motion is neutralised with CSS (motion-reduce:!*), never by
// branching on useReducedMotion(): that value is null on the server and
// resolved on the client, so a branch would change the rendered markup and
// leave the server's inline styles in place.

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause } from "@phosphor-icons/react/dist/icons/Pause";
import { Play } from "@phosphor-icons/react/dist/icons/Play";
import { SkipBack } from "@phosphor-icons/react/dist/icons/SkipBack";
import { SkipForward } from "@phosphor-icons/react/dist/icons/SkipForward";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/content/site";
import type { Track } from "@/content/tracks";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const H1 = "font-display text-[clamp(44px,7vw,96px)] leading-[0.95] tracking-[-0.02em]";
const LINE2 = "block font-display italic leading-[1.1] pb-1";
const LEAD =
  "mt-6 max-w-[46ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] tracking-[-0.01em] text-ink-soft";
const CTA_ROW = "mt-10 flex flex-wrap gap-3";
const PRIMARY =
  "inline-flex h-11 items-center justify-center bg-accent px-5 text-sm font-medium text-accent-ink transition-transform duration-[90ms] active:scale-[0.98]";
const GHOST =
  "inline-flex h-11 items-center justify-center border border-line px-5 text-sm text-ink transition-transform duration-[90ms] active:scale-[0.98]";
const STILL = "motion-reduce:!transform-none motion-reduce:!opacity-100";

export function HeroCopy({
  line1,
  line2,
  lead,
  cta,
  email,
}: {
  line1: string;
  line2: string;
  lead: string;
  cta: string;
  email: string;
}) {
  return (
    <div>
      <h1 className={H1}>
        <motion.span
          className={cn("block", STILL)}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0, ease: EASE }}
        >
          {line1}
        </motion.span>
        <motion.span
          className={cn(LINE2, STILL)}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.06, ease: EASE }}
        >
          {line2}
        </motion.span>
      </h1>
      <motion.p
        className={cn(LEAD, STILL)}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.52, delay: 0.12, ease: EASE }}
      >
        {lead}
      </motion.p>
      <motion.div
        className={cn(CTA_ROW, STILL)}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.52, delay: 0.18, ease: EASE }}
      >
        <a href="#work" className={PRIMARY}>
          {cta}
        </a>
        <a href={`mailto:${site.email}`} className={GHOST}>
          {email}
        </a>
      </motion.div>
    </div>
  );
}

function formatTime(seconds: number) {
  const total = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

const VINYL =
  "w-full max-w-[420px] rounded-full shadow-[0_24px_60px_var(--shadow)] motion-reduce:!animate-none";

function Vinyl({ spinning }: { spinning: boolean }) {
  return (
    <Image
      src="/hero/vinyl.webp"
      alt="A black vinyl record"
      width={1200}
      height={1200}
      sizes="(min-width:1024px) 40vw, 70vw"
      preload
      className={cn(VINYL, "animate-spin")}
      style={{
        animationDuration: "4s",
        animationPlayState: spinning ? "running" : "paused",
      }}
    />
  );
}

export function Player({ tracks }: { tracks: Track[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [broken, setBroken] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const seekRef = useRef<HTMLInputElement>(null);
  const elapsedRef = useRef<HTMLSpanElement>(null);
  const failedRef = useRef<Record<string, true>>({});
  // Playback intent, kept out of state: changing src pauses the element and
  // fires a pause event we must not mistake for the user hitting pause.
  const wantPlayRef = useRef(false);

  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, (value) => {
    const height = typeof window === "undefined" ? 800 : window.innerHeight;
    return (Math.min(Math.max(value, 0), height) / height) * 40;
  });

  const track = tracks[index];

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    // The element is keyed by src, so a new track mounts a fresh element that
    // has not fetched anything yet. preload="none" means nothing loads until
    // asked, so the load is forced here; a bad source then reports an error.
    el.load();
    if (!wantPlayRef.current) return;
    void el.play().catch(() => {});
  }, [index]);

  // Writes the seek fill and the elapsed label straight to the DOM, so
  // playback causes zero React renders.
  const paint = () => {
    const el = audioRef.current;
    const input = seekRef.current;
    if (!el || !input) return;
    const percent = el.duration ? (el.currentTime / el.duration) * 100 : 0;
    input.value = String(percent);
    input.style.setProperty("--value", `${percent}%`);
    if (elapsedRef.current) elapsedRef.current.textContent = formatTime(el.currentTime);
  };

  const reset = () => {
    const input = seekRef.current;
    if (input) {
      input.value = "0";
      input.style.setProperty("--value", "0%");
    }
    if (elapsedRef.current) elapsedRef.current.textContent = "0:00";
    setDuration(0);
  };

  const step = (delta: number) => {
    const target = (index + delta + tracks.length) % tracks.length;
    reset();
    if (target === index) {
      // Wrapping onto the same track: restart it in place.
      const el = audioRef.current;
      if (!el) return;
      el.currentTime = 0;
      if (wantPlayRef.current) void el.play().catch(() => {});
      return;
    }
    setIndex(target);
  };

  const fail = () => {
    if (!track) return;
    failedRef.current = { ...failedRef.current, [track.src]: true };
    if (Object.keys(failedRef.current).length >= tracks.length) {
      wantPlayRef.current = false;
      setPlaying(false);
      setBroken(true);
      return;
    }
    // Move to the next track. The audio element is keyed by src, so it is
    // remounted and the new source is loaded.
    const target = (index + 1) % tracks.length;
    reset();
    setIndex(target);
  };

  if (tracks.length === 0 || broken) {
    return (
      <motion.div style={{ y: parallax }} className="motion-reduce:!transform-none">
        <div className="flex justify-center">
          <Vinyl spinning={false} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ y: parallax }}
      className="motion-reduce:!transform-none"
    >
      <style>{`
        .seek {
          --value: 0%;
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 3px;
          background: transparent;
          cursor: pointer;
        }
        .seek::-webkit-slider-runnable-track {
          height: 3px;
          background: linear-gradient(
            to right,
            var(--ink) 0,
            var(--ink) var(--value),
            var(--line) var(--value),
            var(--line) 100%
          );
        }
        .seek::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          margin-top: -4.5px;
          border-radius: 9999px;
          background: var(--ink);
        }
        .seek::-moz-range-track {
          height: 3px;
          background: var(--line);
        }
        .seek::-moz-range-progress {
          height: 3px;
          background: var(--ink);
        }
        .seek::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border: 0;
          border-radius: 9999px;
          background: var(--ink);
        }
      `}</style>

      <div className="flex justify-center">
        <Vinyl spinning={playing} />
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-display text-lg text-ink">{track.title}</p>
          <p className="font-mono text-xs text-ink-soft">{track.artist}</p>
        </div>

        <input
          ref={seekRef}
          type="range"
          min={0}
          max={100}
          step={0.1}
          defaultValue={0}
          aria-label="Seek"
          className="seek mt-4"
          onChange={(event) => {
            const el = audioRef.current;
            if (!el || !el.duration) return;
            el.currentTime = (Number(event.target.value) / 100) * el.duration;
            paint();
          }}
        />

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous track"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
          >
            <SkipBack size={20} weight="regular" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => {
              const el = audioRef.current;
              if (!el) return;
              if (el.paused) {
                wantPlayRef.current = true;
                void el.play().catch(() => {
                  wantPlayRef.current = false;
                  setPlaying(false);
                });
                setPlaying(true);
              } else {
                wantPlayRef.current = false;
                el.pause();
                setPlaying(false);
              }
            }}
            aria-label={playing ? "Pause" : "Play"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
          >
            {playing ? (
              <Pause size={20} weight="regular" aria-hidden />
            ) : (
              <Play size={20} weight="regular" aria-hidden />
            )}
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next track"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
          >
            <SkipForward size={20} weight="regular" aria-hidden />
          </button>

          <span className="ml-auto font-mono text-xs text-ink-soft">
            <span ref={elapsedRef}>0:00</span> / {formatTime(duration)}
          </span>
        </div>
      </div>

      <audio
        key={track.src}
        ref={audioRef}
        src={track.src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => {
          if (!wantPlayRef.current) setPlaying(false);
        }}
        onTimeUpdate={paint}
        onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
        onEnded={() => step(1)}
        onError={(event) => {
          // Aborted loads happen when the source changes; they are not failures.
          if (event.currentTarget.error?.code === 1) return;
          fail();
        }}
      />
    </motion.div>
  );
}
