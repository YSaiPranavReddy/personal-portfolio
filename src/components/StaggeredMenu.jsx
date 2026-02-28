import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiLinkedin, FiGithub, FiChevronDown } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { heroData } from '../data/data';

const NAV_ITEMS = [
  { label: 'Home',       id: 'home' },
  { label: 'About Me',      id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Contact',    id: 'contact' },
];

const SOCIAL_ITEMS = [
  { label: 'LinkedIn',  href: heroData.linkedin, icon: <FiLinkedin size={16} /> },
  { label: 'GitHub',    href: heroData.github,   icon: <FiGithub size={16} /> },
  { label: 'LeetCode',  href: heroData.leetcode, icon: <SiLeetcode size={16} /> },
];

export default function StaggeredMenu() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const busyRef = useRef(false);

  const panelRef       = useRef(null);
  const preLayerARef   = useRef(null);
  const preLayerBRef   = useRef(null);
  const overlayRef     = useRef(null);

  const plusHRef       = useRef(null);
  const plusVRef       = useRef(null);
  const openTlRef      = useRef(null);
  const closeTlRef     = useRef(null);

  const textInnerRef   = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);
  const bubblesRef     = useRef([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // ── init ──────────────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([panelRef.current, preLayerARef.current, preLayerBRef.current], { xPercent: 100 });
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set(plusHRef.current, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(plusVRef.current, { rotate: 90, transformOrigin: '50% 50%' });
    });
    return () => ctx.revert();
  }, []);

  // ── open ──────────────────────────────────────────────
  const playOpen = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const itemEls    = Array.from(panel.querySelectorAll('.sm-item-label'));
    const numEls     = Array.from(panel.querySelectorAll('.sm-item-num'));
    const socialEls  = Array.from(panel.querySelectorAll('.sm-social-link'));
    const socialsHdr = panel.querySelector('.sm-socials-hdr');
    const bubbles    = bubblesRef.current.filter(Boolean);

    gsap.set(itemEls,   { yPercent: 130, rotate: 8 });
    gsap.set(numEls,    { opacity: 0 });
    gsap.set(socialEls, { y: 22, opacity: 0 });
    if (socialsHdr) gsap.set(socialsHdr, { opacity: 0 });
    
    // Init bubbles
    bubbles.forEach((bubble, i) => {
      gsap.set(bubble, { scale: 0, opacity: 0 });
      gsap.to(bubble, {
        scale: 1,
        opacity: 0.6,
        duration: 0.6,
        delay: 0.3 + i * 0.1,
        ease: 'back.out(1.7)',
      });
      // Floating animation
      gsap.to(bubble, {
        y: `random(-30, 30)`,
        x: `random(-20, 20)`,
        duration: `random(3, 5)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });

    const tl = gsap.timeline({
      onComplete: () => { busyRef.current = false; },
    });

    // overlay fade
    tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }, 0);
    // pre-layers stagger in
    tl.fromTo(preLayerBRef.current, { xPercent: 100 }, { xPercent: 0, duration: 0.45, ease: 'power4.out' }, 0.04);
    tl.fromTo(preLayerARef.current, { xPercent: 100 }, { xPercent: 0, duration: 0.45, ease: 'power4.out' }, 0.10);
    // main panel
    tl.fromTo(panel,               { xPercent: 100 }, { xPercent: 0, duration: 0.55, ease: 'power4.out' }, 0.17);
    // items
    tl.to(itemEls,   { yPercent: 0, rotate: 0, duration: 0.9, ease: 'power4.out', stagger: 0.075 }, 0.38);
    tl.to(numEls,    { opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 }, 0.44);
    // socials
    tl.to(socialsHdr, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.62);
    tl.to(socialEls, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.08 }, 0.68);

    openTlRef.current = tl;
  }, []);

  // ── close ─────────────────────────────────────────────
  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    const all = [panelRef.current, preLayerARef.current, preLayerBRef.current];
    
    // Kill bubble animations
    bubblesRef.current.filter(Boolean).forEach(bubble => {
      gsap.killTweensOf(bubble);
    });

    const tl = gsap.timeline({
      onComplete: () => { busyRef.current = false; },
    });
    tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' }, 0);
    tl.to(all, { xPercent: 100, duration: 0.32, ease: 'power3.in', stagger: 0.04 }, 0);
    closeTlRef.current = tl;
  }, []);

  // ── icon animation ────────────────────────────────────
  const animateIcon = useCallback((opening) => {
    gsap.to(plusHRef.current, { rotate: opening ? 45 : 0,  duration: 0.4, ease: 'power3.inOut' });
    gsap.to(plusVRef.current, { rotate: opening ? -45 : 90, duration: 0.4, ease: 'power3.inOut' });
  }, []);

  // ── text cycle ────────────────────────────────────────
  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    const seq = opening
      ? ['Menu', 'Close', 'Close']
      : ['Close', 'Menu', 'Menu'];
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    gsap.to(inner, { yPercent: -((seq.length - 1) / seq.length) * 100, duration: 0.45 + seq.length * 0.06, ease: 'power4.out' });
  }, []);

  // ── toggle ────────────────────────────────────────────
  const toggle = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const next = !openRef.current;
    openRef.current = next;
    setOpen(next);
    animateIcon(next);
    animateText(next);
    next ? playOpen() : playClose();
  }, [playOpen, playClose, animateIcon, animateText]);

  const close = useCallback(() => {
    if (!openRef.current) return;
    // kill any in-progress open animation so we can close immediately
    openTlRef.current?.kill();
    openTlRef.current = null;
    busyRef.current = true;
    openRef.current = false;
    setOpen(false);
    animateIcon(false);
    animateText(false);
    playClose();
  }, [playClose, animateIcon, animateText]);

  const scrollTo = (id) => {
    close();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 320);
  };

  // ── external trigger from Hero topbar ─────────────────
  React.useEffect(() => {
    const handler = () => toggle();
    window.addEventListener('toggle-menu', handler);
    return () => window.removeEventListener('toggle-menu', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── ESC key to close ──────────────────────────────────
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [close]);

  // ── Check if content is scrollable ────────────────────
  React.useEffect(() => {
    if (!open) return;
    
    const panel = panelRef.current;
    if (!panel) return;

    const checkScroll = () => {
      const hasScroll = panel.scrollHeight > panel.clientHeight;
      const isAtBottom = panel.scrollHeight - panel.scrollTop - panel.clientHeight < 10;
      setShowScrollIndicator(hasScroll && !isAtBottom);
    };

    // Check initially and on scroll
    setTimeout(checkScroll, 500);
    panel.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      panel.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [open]);

  return (
    <>
      {/* toggle button is rendered inside Hero topbar — no separate header here */}

      {/* ── Overlay backdrop ── */}
      <div
        ref={overlayRef}
        onClick={close}
        className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-sm"
        style={{ visibility: 'hidden', opacity: 0 }}
      />

      {/* ── Pre-layer B (furthest, lightest) ── */}
      <div
        ref={preLayerBRef}
        className="fixed top-0 right-0 h-full w-full md:w-[480px] z-[9992] bg-[#1c1c20]"
        aria-hidden="true"
      />
      {/* ── Pre-layer A ── */}
      <div
        ref={preLayerARef}
        className="fixed top-0 right-0 h-full w-full md:w-[480px] z-[9993] bg-[#18181b]"
        aria-hidden="true"
      />

      {/* ── Main panel ── */}
      <aside
        ref={panelRef}
        aria-hidden={!open}
        className="fixed top-0 right-0 h-full w-full md:w-[480px] z-[9994] bg-[#141414] border-l border-white/[0.06] flex flex-col overflow-y-auto overflow-x-hidden"
      >
        {/* Floating bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (bubblesRef.current[i] = el)}
              className="absolute rounded-full blur-xl"
              style={{
                width: `${60 + i * 15}px`,
                height: `${60 + i * 15}px`,
                top: `${10 + i * 12}%`,
                left: `${15 + (i % 3) * 30}%`,
                background: [
                  'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 70%)',
                  'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 70%)',
                  'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.05) 70%)',
                ][i % 3],
              }}
            />
          ))}
        </div>
        
        {/* Panel header with close button */}
        <div className="relative z-10 flex items-center justify-between px-7 md:px-14 pt-6 md:pt-7 pb-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/25 font-semibold">Navigation</span>
          <button
            onClick={close}
            aria-label="Close menu"
            className="flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-5 py-2 text-white/60 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-medium"
          >
            Close
            <span className="relative w-[12px] h-[12px] flex items-center justify-center">
              <span className="absolute w-full h-[1.5px] bg-current rounded-full rotate-45" />
              <span className="absolute w-full h-[1.5px] bg-current rounded-full -rotate-45" />
            </span>
          </button>
        </div>

        {/* Nav items */}
        <nav className="relative z-10 flex-1 flex flex-col justify-center px-7 md:px-14 gap-0.5 md:gap-1">
          {NAV_ITEMS.map(({ label, id }, idx) => (
            <div key={id} className="overflow-hidden leading-none py-1">
              <button
                onClick={() => scrollTo(id)}
                className="group relative inline-flex items-baseline gap-4 cursor-pointer"
              >
                <span className="sm-item-num text-[11px] font-medium text-indigo-400/70 tabular-nums mt-1 w-5 text-right shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="sm-item-label inline-block text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] font-bold tracking-tight text-white uppercase leading-none group-hover:text-indigo-300 transition-colors duration-200 will-change-transform">
                  {label}
                </span>
              </button>
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div className="relative z-10 mx-7 md:mx-14 h-px bg-white/[0.07]" />

        {/* Socials */}
        <div className="relative z-10 px-7 md:px-14 py-7 md:py-9 flex flex-col gap-4">
          <p className="sm-socials-hdr text-[11px] uppercase tracking-[0.15em] text-white/30 font-semibold">
            Find me on
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {SOCIAL_ITEMS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="sm-social-link flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-medium"
              >
                {icon}
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 z-20"
          style={{
            opacity: showScrollIndicator ? 1 : 0,
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-bounce">
              <FiChevronDown size={20} className="text-white/60" />
            </div>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Scroll</span>
          </div>
        </div>
      </aside>
    </>
  );
}
