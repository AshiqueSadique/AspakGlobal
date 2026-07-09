"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  alpha: number;
  phase: "explode" | "converge" | "done";
  delay: number;
}

const COLORS = ["#C9A227", "#E8C766", "#123A6B", "#245FA8", "#F0D98A", "#1A4E8C"];

export default function ParticleHero({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      onComplete?.();
      return;
    }

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    // Device capability check
    const cores = navigator.hardwareConcurrency || 4;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? (cores < 4 ? 80 : 150) : (cores < 4 ? 200 : 400);

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const cx = W / 2;
    const cy = H / 2;

    // Create particles
    const particles: Particle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 80;
      const speed = 3 + Math.random() * 5;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        targetX: cx,
        targetY: cy,
        size: 1 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1,
        phase: "explode",
        delay: Math.random() * 0.4,
      };
    });

    // Pause when tab hidden
    const onVisible = () => {
      if (document.visibilityState === "visible" && !completedRef.current) {
        animRef.current = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    const EXPLODE_DURATION = 0.7;
    const PAUSE_DURATION = 0.3;
    const CONVERGE_DURATION = 0.8;
    const TOTAL = EXPLODE_DURATION + PAUSE_DURATION + CONVERGE_DURATION;

    function tick(time: number) {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = (time - startTimeRef.current) / 1000;
      const t = Math.min(elapsed / TOTAL, 1);

      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        const pTime = Math.max(0, elapsed - p.delay);

        if (pTime < EXPLODE_DURATION) {
          // Explode outward
          const progress = pTime / EXPLODE_DURATION;
          const eased = 1 - Math.pow(1 - progress, 3);
          p.x = cx + (Math.cos(Math.atan2(p.vy, p.vx)) * (20 + Math.sqrt(progress) * Math.max(W, H) * 0.6));
          p.y = cy + (Math.sin(Math.atan2(p.vy, p.vx)) * (20 + Math.sqrt(progress) * Math.max(W, H) * 0.6));
          p.alpha = eased > 0.8 ? 1 - (eased - 0.8) / 0.2 * 0.3 : eased / 0.2;
        } else if (pTime < EXPLODE_DURATION + PAUSE_DURATION) {
          p.alpha = 0.7;
        } else {
          // Converge
          const convergeElapsed = pTime - EXPLODE_DURATION - PAUSE_DURATION;
          const progress = Math.min(convergeElapsed / CONVERGE_DURATION, 1);
          const eased = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          const angle = Math.atan2(p.vy, p.vx);
          const startDist = Math.max(W, H) * 0.6;
          const currentDist = startDist * (1 - eased);

          p.x = cx + Math.cos(angle) * currentDist;
          p.y = cy + Math.sin(angle) * currentDist;
          p.alpha = 0.7 + eased * 0.3;

          if (progress >= 1) p.phase = "done";
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      // Draw AG monogram as particles converge
      if (elapsed > EXPLODE_DURATION + PAUSE_DURATION) {
        const convergeProgress = Math.min(
          (elapsed - EXPLODE_DURATION - PAUSE_DURATION) / CONVERGE_DURATION,
          1
        );
        const logoAlpha = Math.max(0, (convergeProgress - 0.6) / 0.4);

        if (logoAlpha > 0) {
          ctx.globalAlpha = logoAlpha;
          // Gold circle
          ctx.strokeStyle = `rgba(201,162,39,${logoAlpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, 36, 0, Math.PI * 2);
          ctx.stroke();

          // AG text
          ctx.fillStyle = `rgba(201,162,39,${logoAlpha})`;
          ctx.font = `bold ${isMobile ? 20 : 24}px Prompt, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("AG", cx, cy);
          ctx.globalAlpha = 1;
        }
      }

      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        completedRef.current = true;
        onComplete?.();
      }
    }

    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
