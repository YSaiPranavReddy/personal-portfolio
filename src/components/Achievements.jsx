import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FiAward, FiStar, FiExternalLink, FiChevronRight } from "react-icons/fi"
import { GiTrophy } from "react-icons/gi"
import { achievements } from "../data/data"

gsap.registerPlugin(ScrollTrigger)

const TYPE_ICONS = {
  hackathon: GiTrophy,
  certification: FiAward,
  course: FiStar,
}

const TYPE_COLORS = {
  hackathon: { primary: "#f59e0b", glow: "245,158,11", bg: "rgba(245,158,11,0.08)" },
  certification: { primary: "#8b5cf6", glow: "139,92,246", bg: "rgba(139,92,246,0.08)" },
  course: { primary: "#06b6d4", glow: "6,182,212", bg: "rgba(6,182,212,0.08)" },
}

function AchievementCard({ achievement }) {
  const { title, issuer, date, type, credential, description } = achievement
  const Icon = TYPE_ICONS[type] || FiAward
  const colors = TYPE_COLORS[type] || TYPE_COLORS.certification

  return (
    <div
      className="achievement-card group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(17,17,17,0.95) 0%, rgba(20,20,20,0.9) 100%)",
        border: "1.5px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget
        gsap.to(card, {
          y: -12,
          scale: 1.05,
          boxShadow: `0 28px 56px -16px rgba(${colors.glow},0.35), 0 0 0 1px rgba(${colors.glow},0.2)`,
          duration: 0.125,
          ease: "power2.out",
        })
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          duration: 0.125,
          ease: "power2.out",
        })
      }}
    >
      {/* Corner accent ribbon */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-40"
        style={{
          background: `linear-gradient(135deg, transparent 30%, ${colors.primary}20 100%)`,
        }}
      />

      {/* Glow orb effect */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
        style={{ background: colors.primary }}
      />

      <div className="relative p-6 md:p-7 flex flex-col h-full">
        {/* Icon badge */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 relative"
          style={{
            background: colors.bg,
            boxShadow: `0 0 20px rgba(${colors.glow},0.15)`,
            border: `1px solid rgba(${colors.glow},0.2)`,
          }}
        >
          <Icon size={22} style={{ color: colors.primary }} />
          
          {/* Animated ring */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: `0 0 0 3px rgba(${colors.glow},0.3)`,
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        </div>

        {/* Type label */}
        <span
          className="text-[10px] uppercase tracking-[0.15em] font-bold mb-3"
          style={{
            fontFamily: "Poppins, sans-serif",
            color: colors.primary,
          }}
        >
          {type}
        </span>

        {/* Title */}
        <h3
          className="text-lg md:text-xl font-bold text-white mb-2 leading-snug"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          {title}
        </h3>

        {/* Issuer */}
        <p
          className="text-sm text-white/50 mb-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {issuer}
        </p>

        {/* Description */}
        {description && (
          <p
            className="text-[13px] text-white/40 leading-relaxed mb-4 flex-grow"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {description}
          </p>
        )}

        {/* Bottom row: date + credential */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span
            className="text-xs text-white/30 font-medium"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {date}
          </span>

          {credential && (
            <a
              href={credential}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group/link"
              style={{
                fontFamily: "Poppins, sans-serif",
                color: colors.primary,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Verify
              <FiExternalLink
                size={12}
                className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Achievements() {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)
  const containerRef = useRef(null)
  const mobileScrollRef = useRef(null)
  const scrollAnimationRef = useRef(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  // GSAP seamless infinite scroll (desktop only)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Only run on desktop (md breakpoint and above)
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    
    const initAnimation = () => {
      if (mediaQuery.matches) {
        const timer = setTimeout(() => {
          const firstSet = container.children[0]
          if (!firstSet) return
          
          const cardWidth = firstSet.offsetWidth
          const gap = 24 // md:gap-6 = 24px
          const totalWidth = (cardWidth + gap) * achievements.length

          // Create seamless infinite scroll animation using x transform
          scrollAnimationRef.current = gsap.to(container, {
            x: -totalWidth,
            duration: 7, // Faster scroll (lower = faster)
            ease: "none", // Constant linear speed
            repeat: -1,
            modifiers: {
              x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
            }
          })
        }, 100)
        
        return timer
      }
    }

    const timer = initAnimation()

    return () => {
      if (timer) clearTimeout(timer)
      if (scrollAnimationRef.current) {
        scrollAnimationRef.current.kill()
      }
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ach-header", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ach-header", start: "top 88%" },
      })

      gsap.from(".achievement-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".ach-slider",
          start: "top 92%",
          once: true,
        },
      })

      // Floating animation for decorative elements
      gsap.to(".float-decoration", {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.5, from: "random" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative bg-[#090909] -mt-8 pt-4 pb-24 md:-mt-10 md:pt-6 md:pb-32 px-5 sm:px-7 md:px-16 lg:px-28 overflow-hidden"
    >
      {/* Decorative floating elements */}
      <div className="absolute top-20 right-10 w-2 h-2 rounded-full bg-amber-500/30 float-decoration" />
      <div className="absolute top-40 left-20 w-1.5 h-1.5 rounded-full bg-purple-500/30 float-decoration" />
      <div className="absolute bottom-32 right-32 w-2.5 h-2.5 rounded-full bg-cyan-500/30 float-decoration" />

      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <div className="ach-header mb-12 md:mb-14">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Milestones & Recognition
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-none"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            Achievements
          </h2>
          <div className="mt-6 w-12 h-px bg-indigo-400/40" />
        </div>

        {/* Mobile: Standard horizontal scroll */}
        <div className="md:hidden mb-8 relative">
          <div
            ref={mobileScrollRef}
            className="ach-mobile flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
            onScroll={(e) => {
              const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
              // Hide indicator when scrolled significantly
              setShowScrollIndicator(scrollLeft < 50)
            }}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {achievements.map((ach, idx) => (
              <div key={idx} className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center">
                <AchievementCard achievement={ach} />
              </div>
            ))}
          </div>
          
          {/* Scroll indicator */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: showScrollIndicator ? 1 : 0,
            }}
          >
            <div className="relative">
              {/* Gradient fade */}
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-full"
                style={{
                  background: "linear-gradient(to left, rgba(9,9,9,0.95) 0%, transparent 100%)",
                }}
              />
              {/* Chevron icon */}
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse">
                <FiChevronRight size={20} className="text-white/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Auto-scrolling slider (seamless infinite loop) */}
        <div className="hidden md:block mb-8 overflow-hidden">
          <div
            ref={sliderRef}
            className="ach-slider"
            onMouseEnter={() => {
              if (scrollAnimationRef.current) {
                scrollAnimationRef.current.pause()
              }
            }}
            onMouseLeave={() => {
              if (scrollAnimationRef.current) {
                scrollAnimationRef.current.play()
              }
            }}
          >
            <div
              ref={containerRef}
              className="flex gap-6"
              style={{ willChange: "transform" }}
            >
              {/* Triple duplicate for seamless loop */}
              {[...achievements, ...achievements, ...achievements].map((ach, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 w-[380px] max-w-[420px]"
                >
                  <AchievementCard achievement={ach} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
