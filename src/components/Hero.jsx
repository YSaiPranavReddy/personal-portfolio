import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { heroData } from "../data/data"
import { FiLinkedin, FiGithub, FiMessageSquare, FiFileText, FiMapPin } from "react-icons/fi"
import { SiLeetcode } from "react-icons/si"
import LightPillar from "./LightPillar"

export default function Hero() {
  const containerRef = useRef(null)
  const [istTime, setIstTime] = useState("")
  const [showIst, setShowIst] = useState(false)
  const timerRef = useRef(null)

  const handleLocationEnter = () => {
    const getIst = () =>
      new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    setIstTime(getIst())
    setShowIst(true)
    timerRef.current = setInterval(() => setIstTime(getIst()), 1000)
  }

  const handleLocationLeave = () => {
    setShowIst(false)
    clearInterval(timerRef.current)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".hero-topbar",  { y: -24, opacity: 0, duration: 0.6 })
        .from(".hero-avatar",  { scale: 0.8, opacity: 0, duration: 0.7 }, "-=0.2")
        .from(".hero-pill",    { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-heading", { y: 32, opacity: 0, duration: 0.7 }, "-=0.3")
        .from(".hero-actions", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen xl:h-screen xl:max-h-screen flex flex-col bg-[#090909] overflow-hidden"
    >
      {/* ── LightPillar WebGL background ── */}
      <div className="absolute inset-0 z-0">
        <LightPillar
          topColor="#1A160A"
          bottomColor="#927050"
          intensity={0.8}
          rotationSpeed={0.3}
          interactive
          glowAmount={0.002}
          pillarWidth={8.2}
          pillarHeight={0.5}
          noiseIntensity={0.5}
          pillarRotation={46}
          mixBlendMode="screen"
          quality="high"
        />
      </div>

      {/* ── Mobile CSS gradient fallback (WebGL too dim on low-end devices) ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none sm:hidden"
        style={{
          background:
            "radial-gradient(ellipse 140% 50% at 65% 15%, rgba(146,112,80,0.35) 0%, transparent 65%)," +
            "radial-gradient(ellipse 120% 50% at 55% 50%, rgba(120,90,55,0.25) 0%, transparent 65%)," +
            "radial-gradient(ellipse 100% 45% at 60% 85%, rgba(99,75,50,0.25) 0%, transparent 65%)",
        }}
      />

      {/* ── Top bar: SP branding (left) + Location + Menu (right) ── */}
      <div className="hero-topbar relative z-10 flex items-center justify-between px-5 sm:px-7 md:pl-10 md:pr-10 lg:pl-36 lg:pr-12 pt-[38px] md:pt-7">
        {/* SP + Name */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#111] border border-white/10 flex items-center justify-center flex-shrink-0">
            <span className="font-black text-base leading-none text-white">
              S<span className="text-indigo-400">P</span>
            </span>
          </div>
          <span className="hidden sm:inline text-white/80 text-sm md:text-base lg:text-lg tracking-tight truncate max-w-[160px] sm:max-w-none" style={{fontFamily:'Poppins,sans-serif', fontWeight: 600}}>{heroData.name}</span>
        </div>

        {/* Right group: Location badge + Menu */}
        <div className="flex items-center gap-3">
          {/* Location badge — hidden on small screens */}
          <a
            href={`https://maps.google.com/?q=${heroData.location}`}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={handleLocationEnter}
            onMouseLeave={handleLocationLeave}
            className="hidden sm:flex items-center gap-3 bg-[#111]/80 border border-white/10 rounded-full px-5 md:px-7 py-2.5 md:py-3 text-white/70 text-sm md:text-base font-medium hover:border-white/20 transition-colors select-none"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.9)] flex-shrink-0" />

            {/* In-place text swap: grid-stack so no clipping */}
            <span className="inline-grid items-center">
              {/* Location — fades & slides up out */}
              <span
                className="col-start-1 row-start-1 whitespace-nowrap transition-all duration-300 ease-in-out"
                style={{
                  opacity: showIst ? 0 : 1,
                  transform: showIst ? "translateY(-7px)" : "translateY(0)",
                }}
              >
                {heroData.location}
              </span>
              {/* IST time — slides up in */}
              <span
                className="col-start-1 row-start-1 whitespace-nowrap flex items-center gap-1.5 transition-all duration-300 ease-in-out"
                style={{
                  opacity: showIst ? 1 : 0,
                  transform: showIst ? "translateY(0)" : "translateY(7px)",
                }}
              >
                <span className="text-emerald-400 font-semibold text-xs tracking-widest">IST</span>
                <span className="font-mono">{istTime}</span>
              </span>
            </span>

            <FiMapPin size={13} className="opacity-40 flex-shrink-0" />
          </a>

          {/* Menu toggle — triggers StaggeredMenu via custom event */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-menu'))}
            aria-label="Open menu"
            className="flex items-center gap-2.5 md:gap-3 bg-[#111]/80 border border-white/10 rounded-full px-5 md:px-7 py-2.5 md:py-3 text-white/80 hover:text-white hover:border-white/20 transition-colors duration-200 text-sm md:text-base font-semibold"
          >
            Menu
            <span className="relative w-[14px] h-[14px] flex items-center justify-center">
              <span className="absolute w-full h-[1.5px] bg-current rounded-full" />
              <span className="absolute w-full h-[1.5px] bg-current rounded-full rotate-90" />
            </span>
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-5 sm:px-6 pt-2 pb-10 md:pb-28 md:pt-6 gap-4 md:gap-5">

        {/* Avatar */}
        <div className="hero-avatar relative">
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-[3px] border-black shadow-[0_0_40px_rgba(0,0,0,0.18)] overflow-hidden bg-[#1a1a1a]">
            {heroData.photo ? (
              <img src={heroData.photo} alt={heroData.name} className="w-full h-full object-cover scale-[1.20] translate-y-1" />
            ) : (
              /* placeholder silhouette */
              <svg viewBox="0 0 128 128" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="128" height="128" fill="#1a1a1a"/>
                <circle cx="64" cy="50" r="24" fill="#2e2e2e"/>
                <ellipse cx="64" cy="110" rx="38" ry="28" fill="#2e2e2e"/>
              </svg>
            )}
          </div>
          {/* waving hand */}
          <span className="absolute -bottom-1 -right-1 text-2xl select-none">👋</span>
        </div>

        {/* Tagline pill */}
        <div className="hero-pill bg-[#111]/80 border border-white/10 rounded-full px-5 py-2 md:px-7 md:py-2.5 text-white text-xs md:text-sm">
          {heroData.taglinePill}
        </div>

        {/* Heading */}
        <h1 className="hero-heading max-w-4xl text-[1.15rem] sm:text-xl md:text-[2rem] leading-[1.4] md:leading-[1.3] tracking-tight text-white font-sans font-light">
          Hi, I&apos;m{" "}
          <span className="font-display font-bold text-white">Yerrabandla Sai Pranav Reddy</span>
          {", an "}
          <span className="font-display font-semibold text-white">AI/ML Engineer</span>
          {" and "}
          <span className="font-display font-semibold text-white">Full Stack Developer</span>
          {" focused on "}
          <em className="not-italic italic font-light text-white">
            transforming data into intelligent, real-world web solutions.
          </em>
        </h1>

        {/* Action row */}
        <div className="hero-actions flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mt-2 md:mt-4">
          {/* Let's Talk */}
          <a
            href={`https://mail.google.com/mail/?view=cm&to=${heroData.email}`}
            target="_blank"
            rel="noreferrer"
            className="h-12 flex items-center gap-2 bg-[#161618] border border-white/[0.08] text-white font-normal text-[15px] px-7 rounded-[15px] hover:border-white/20 transition-all duration-200"
            style={{fontFamily:'Poppins,sans-serif'}}
          >
            Let&apos;s Talk
            <FiMessageSquare size={15} strokeWidth={2.2} />
          </a>

          {/* View Resume */}
          <a
            href={heroData.resume}
            target="_blank"
            rel="noreferrer"
            className="h-12 flex items-center gap-2 bg-white text-black font-normal text-[15px] px-7 rounded-[15px] hover:bg-white/90 transition-all duration-200"
            style={{fontFamily:'Poppins,sans-serif'}}
          >
            View Resume
            <FiFileText size={15} strokeWidth={2.2} />
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {[
              { href: heroData.linkedin,  icon: <FiLinkedin size={18} strokeWidth={2} />,  label: "LinkedIn" },
              { href: heroData.github,    icon: <FiGithub size={18} strokeWidth={2} />,    label: "GitHub"   },
              { href: heroData.leetcode,  icon: <SiLeetcode size={18} />,                  label: "LeetCode" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#161618] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
