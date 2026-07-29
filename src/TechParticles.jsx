import React, { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Seeded pseudo-random so positions are stable across re-renders ───────────
const seededRand = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// ─── Config ──────────────────────────────────────────────────────────────────
const GLYPHS       = ['{', '}', ';', '//', '()', '[]', '&&', '=>', '/*', '*/'];
const TOTAL        = 55;   // total particles
const DOT_RATIO    = 0.40; // 40% plain dots, 60% glyphs

const TechParticles = () => {
  const containerRef = useRef(null);
  const particleRefs = useRef([]);

  // ── Generate stable particle data once ──────────────────────────────────────
  const particles = useMemo(() => {
    const rand = seededRand(42);
    return Array.from({ length: TOTAL }, (_, i) => {
      const isDot   = rand() < DOT_RATIO;
      const glyph   = GLYPHS[Math.floor(rand() * GLYPHS.length)];
      const x       = rand() * 100;          // vw %
      const y       = rand() * 100;          // vh %
      const size    = isDot
        ? 3 + rand() * 4                     // 3–7px dot
        : 10 + rand() * 16;                  // 10–26px font
      const opacity = 0.06 + rand() * 0.14; // 6–20%
      // Alternate between dark brown and terracotta
      const color   = rand() > 0.55 ? '#E2725B' : '#2E2019';
      // Drift range (px) for the float loop
      const driftX  = (rand() - 0.5) * 28;
      const driftY  = (rand() - 0.5) * 28;
      // Individual loop duration — each particle has its own timing
      const dur     = 4 + rand() * 8;       // 4–12 s
      // Parallax speed multiplier (0.1–0.4) — slow layers
      const parallax = 0.08 + rand() * 0.22;
      // Small random rotation for glyphs
      const rotation = (rand() - 0.5) * 30;

      return { i, isDot, glyph, x, y, size, opacity, color, driftX, driftY, dur, parallax, rotation };
    });
  }, []);

  // ── GSAP: floating loops + scroll parallax ────────────────────────────────
  useGSAP(() => {
    const els = particleRefs.current.filter(Boolean);

    // Individual floating loops — each particle has a unique drift pattern
    els.forEach((el, idx) => {
      const p = particles[idx];
      if (!p || !el) return;

      gsap.to(el, {
        x: p.driftX,
        y: p.driftY,
        rotation: p.rotation + (Math.random() - 0.5) * 15,
        duration: p.dur,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: -p.dur * Math.random(), // start mid-loop so they're already moving
      });
    });

    // Scroll parallax — the whole container shifts up slower than the page
    gsap.to(containerRef.current, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger:  document.body,
        start:    'top top',
        end:      'bottom bottom',
        scrub:    1.5,
      },
    });

  }, { scope: containerRef });

  // ── Mouse parallax — subtle tilt toward cursor ──────────────────────────────
  useGSAP(() => {
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;  // −1…+1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      particleRefs.current.filter(Boolean).forEach((el, idx) => {
        const p = particles[idx];
        if (!p) return;
        const strength = p.parallax * 18; // px nudge
        gsap.to(el, {
          xPercent: nx * strength,
          yPercent: ny * strength,
          duration: 1.2,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p, idx) => (
        p.isDot ? (
          /* ── Dot ── */
          <div
            key={p.i}
            ref={el => { particleRefs.current[idx] = el; }}
            style={{
              position:        'absolute',
              left:            `${p.x}%`,
              top:             `${p.y}%`,
              width:           `${p.size}px`,
              height:          `${p.size}px`,
              borderRadius:    '50%',
              backgroundColor: p.color,
              opacity:         p.opacity,
              willChange:      'transform',
            }}
          />
        ) : (
          /* ── Glyph ── */
          <span
            key={p.i}
            ref={el => { particleRefs.current[idx] = el; }}
            style={{
              position:   'absolute',
              left:       `${p.x}%`,
              top:        `${p.y}%`,
              fontSize:   `${p.size}px`,
              color:       p.color,
              opacity:     p.opacity,
              fontFamily: "'Courier New', Courier, monospace",
              fontWeight:  700,
              lineHeight:  1,
              userSelect: 'none',
              willChange: 'transform',
              whiteSpace: 'nowrap',
            }}
          >
            {p.glyph}
          </span>
        )
      ))}
    </div>
  );
};

export default TechParticles;
