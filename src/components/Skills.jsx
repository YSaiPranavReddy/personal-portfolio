import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaCode, FaBrain, FaTools } from "react-icons/fa"
import { skillGroups } from "../data/data"

gsap.registerPlugin(ScrollTrigger)

const GROUP_META = [
  { Icon: FaCode,  color: "#6366f1", rgb: "99,102,241"  },
  { Icon: FaBrain, color: "#a78bfa", rgb: "167,139,250" },
  { Icon: FaTools, color: "#22d3ee", rgb: "34,211,238"  },
]

function SkillPanel({ group, meta }) {
  const { Icon, color, rgb } = meta
  return (
    <div
      className="skill-panel rounded-2xl p-6 md:p-7"
      style={{
        background: `radial-gradient(ellipse at 8% 18%, rgba(${rgb},0.07), #0d0d0d 52%)`,
        border: "1px solid rgba(255,255,255,0.065)",
        boxShadow: "0 4px 36px 0 rgba(0,0,0,0.4)",
      }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${color}18`, border: `1px solid ${color}30` }}
          >
            <Icon size={14} style={{ color }} />
          </div>
          <span
            className="text-[12.5px] font-semibold uppercase tracking-[0.16em]"
            style={{ fontFamily: "Poppins, sans-serif", color: `${color}cc` }}
          >
            {group.title}
          </span>
        </div>
        {/* count + decorative dots */}
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-semibold tabular-nums"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: color,
              background: `${color}20`,
              border: `1px solid ${color}45`,
            }}
          >
            {group.skills.length}
          </span>
          <div className="flex items-center gap-[5px]">
            {[0, 1, 2].map((d) => (
              <div
                key={d}
                className="w-[3px] h-[3px] rounded-full"
                style={{ background: `${color}${d === 0 ? "70" : d === 1 ? "38" : "18"}` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="skill-pill text-[12px] cursor-default rounded-full px-3.5 py-[6px] transition-all duration-200"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "rgba(255,255,255,0.48)",
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = color
              e.currentTarget.style.background = `${color}12`
              e.currentTarget.style.borderColor = `${color}38`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.48)"
              e.currentTarget.style.background = "rgba(255,255,255,0.035)"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const mobileRef  = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  /* mobile scroll → dot sync */
  useEffect(() => {
    const el = mobileRef.current
    if (!el) return
    const onScroll = () => {
      const cardW = el.firstChild?.offsetWidth ?? 1
      setActiveIdx(Math.round(el.scrollLeft / (cardW + 16)))
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  /* section reveal */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-header", {
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".skills-header", start: "top 88%" },
      })
      gsap.from(".skill-panel", {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.16, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".skills-panels", start: "top 90%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-[#090909] pt-4 pb-24 md:pt-6 md:pb-32 pl-7 pr-5 sm:pl-10 sm:pr-7 md:pl-20 md:pr-14 lg:pl-32 lg:pr-24 overflow-hidden"
    >
      {/* ambient bloom */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] opacity-[0.035] bg-indigo-500" />
      </div>

      <div className="max-w-5xl mx-auto relative">

        {/* ── Header ── */}
        <div className="skills-header mb-10 md:mb-12">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            What I Know
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-none"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            Skills
          </h2>
          <div className="mt-5 flex items-center gap-2">
            <div className="w-10 h-px bg-indigo-400/40" />
            <div className="w-3 h-px bg-indigo-400/20" />
          </div>
        </div>

        {/* ── Desktop: stacked panels ── */}
        <div className="skills-panels hidden md:flex flex-col gap-5">
          {skillGroups.map((group, i) => (
            <SkillPanel
              key={i}
              group={group}
              meta={GROUP_META[i] ?? GROUP_META[0]}
            />
          ))}
        </div>

        {/* ── Mobile: horizontal scroll snap ── */}
        <div
          ref={mobileRef}
          className="skills-panels flex md:hidden gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {skillGroups.map((group, i) => (
            <div key={i} className="snap-center flex-shrink-0 w-[86vw]">
              <SkillPanel
                group={group}
                meta={GROUP_META[i] ?? GROUP_META[0]}
              />
            </div>
          ))}
        </div>

        {/* ── Mobile dots ── */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {skillGroups.map((_, i) => {
            const m = GROUP_META[i] ?? GROUP_META[0]
            return (
              <button
                key={i}
                onClick={() => {
                  const el = mobileRef.current
                  if (!el) return
                  const cardW = el.firstChild?.offsetWidth ?? 0
                  el.scrollTo({ left: i * (cardW + 16), behavior: "smooth" })
                }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIdx ? "20px" : "8px",
                  height: "8px",
                  background: i === activeIdx ? m.color : "rgba(255,255,255,0.18)",
                  boxShadow: i === activeIdx ? `0 0 8px 2px ${m.color}55` : "none",
                }}
                aria-label={`Go to skill group ${i + 1}`}
              />
            )
          })}
        </div>

      </div>
    </section>
  )
}