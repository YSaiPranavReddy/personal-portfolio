import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { experiences } from "../data/data"

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef(null)
  const [openProject, setOpenProject] = useState(null) // { expIdx, projIdx }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animate-in
      gsap.from(".exp-header", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 88%",
        },
      })

      // Cards stagger from left
      gsap.from(".exp-card", {
        x: -48,
        opacity: 0,
        duration: 0.75,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-timeline",
          start: "top 80%",
        },
      })

      // Timeline line draw-in
      gsap.from(".exp-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-timeline",
          start: "top 82%",
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setOpenProject(null) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
    <section
      id="experience"
      ref={sectionRef}
      className="bg-[#090909] -mt-8 pt-2 pb-24 md:-mt-10 md:pt-4 md:pb-32 px-5 sm:px-7 md:px-16 lg:px-28"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Section header ── */}
        <div className="exp-header mb-10 md:mb-12">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Work History
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-none"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            Experience
          </h2>
          <div className="mt-6 w-12 h-px bg-indigo-400/40" />
        </div>

        {/* ── Timeline ── */}
        <div className="exp-timeline relative">

          {/* Vertical line */}
          <div className="exp-line absolute left-0 top-3 bottom-3 w-px bg-white/[0.07]" />

          <div className="flex flex-col gap-6 md:gap-8">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-card relative pl-7 md:pl-10">

                {/* Timeline dot */}
                <span
                  className={`absolute left-0 top-[1.35rem] -translate-x-1/2 w-2 h-2 rounded-full ${
                    'bg-indigo-400'
                  }`}
                  style={{ boxShadow: '0 0 10px 2px rgba(99,102,241,0.6)' }}
                />

                {/* Card */}
                <div
                  className={`group rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                    exp.period.includes('Present')
                      ? 'bg-[#111]/80 border border-indigo-500/[0.22] hover:border-indigo-500/40'
                      : 'bg-[#111]/70 border border-white/[0.07] hover:border-white/[0.13] hover:bg-[#111]'
                  }`}
                  style={exp.period.includes('Present') ? {
                    boxShadow: '0 -10px 24px -10px rgba(99,102,241,0.16), -10px 0 24px -10px rgba(99,102,241,0.16), 6px 6px 18px -14px rgba(99,102,241,0.04)'
                  } : undefined}
                  onMouseEnter={exp.period.includes('Present') ? (e => { e.currentTarget.style.boxShadow = '0 -20px 40px -6px rgba(99,102,241,0.20), -20px 0 40px -6px rgba(99,102,241,0.20), 8px 8px 22px -12px rgba(99,102,241,0.10)' }) : undefined}
                  onMouseLeave={exp.period.includes('Present') ? (e => { e.currentTarget.style.boxShadow = '0 -10px 24px -10px rgba(99,102,241,0.16), -10px 0 24px -10px rgba(99,102,241,0.16), 6px 6px 18px -14px rgba(99,102,241,0.04)' }) : undefined}
                >

                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3
                        className="text-lg md:text-xl font-bold text-white leading-tight"
                        style={{ fontFamily: 'Raleway, sans-serif' }}
                      >
                        {exp.role}
                      </h3>
                      {exp.period.includes('Present') && (
                        <span
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400 bg-indigo-400/[0.1] border border-indigo-400/25 rounded-full px-2.5 py-1"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          <span className="relative flex w-1.5 h-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-indigo-400" />
                          </span>
                          Current
                        </span>
                      )}
                    </div>
                    <span
                      className="flex-shrink-0 text-[11px] font-semibold text-indigo-400/90 bg-indigo-400/[0.08] border border-indigo-400/[0.18] rounded-full px-3.5 py-1.5 w-fit"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Company + type */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-white/55 text-sm font-medium"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {exp.company}
                    </span>
                    {exp.type && (
                      <>
                        <span className="text-white/20 text-xs select-none">·</span>
                        <span
                          className="text-white/30 text-xs"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {exp.type}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-white/45 text-sm leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Tech tags */}
                  {exp.tech?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-white/35 bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1 cursor-pointer transition-all duration-200 hover:text-indigo-300 hover:bg-indigo-500/[0.1] hover:border-indigo-500/30"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Key Projects */}
                  {exp.projects?.length > 0 && (
                    <div className="mt-6">
                      <p
                        className="text-[10px] uppercase tracking-[0.18em] text-white/25 font-semibold mb-3 flex items-center gap-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <span className="w-4 h-px bg-white/20" />
                        Key Projects
                      </p>
                      <div className="flex flex-col gap-2">
                        {exp.projects.map((proj, pi) => (
                          <div
                            key={pi}
                            className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 hover:border-indigo-400/20 hover:bg-white/[0.05] transition-all duration-200"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p
                                  className="text-[13px] font-semibold text-white/80 mb-1"
                                  style={{ fontFamily: 'Raleway, sans-serif' }}
                                >
                                  {proj.name}
                                </p>
                                <p
                                  className="text-[12px] text-white/38 leading-relaxed"
                                  style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                  {proj.description}
                                </p>
                              </div>
                              {proj.details?.length > 0 && (
                                <button
                                  onClick={() => setOpenProject({ exp, proj })}
                                  className="text-[11.5px] text-indigo-400/80 hover:text-indigo-300 whitespace-nowrap font-medium transition-colors shrink-0 mt-0.5"
                                  style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                  Read more →
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

    {/* ── Project Detail Modal ── */}
    {openProject && (
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
        onClick={() => setOpenProject(null)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Panel */}
        <div
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8"
          style={{
            background: "radial-gradient(ellipse at 10% 10%, rgba(99,102,241,0.07), #111 55%)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 24px 80px 0 rgba(0,0,0,0.7)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={() => setOpenProject(null)}
            className="absolute top-4 right-4 text-white/30 hover:text-white/70 text-xl transition-colors leading-none"
          >
            ✕
          </button>

          {/* Header */}
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-indigo-400/60 font-semibold mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {openProject.exp.role} · Key Project
          </p>
          <h3
            className="text-xl md:text-2xl font-bold text-white mb-2"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            {openProject.proj.name}
          </h3>
          <p
            className="text-[13px] text-white/45 leading-relaxed mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {openProject.proj.description}
          </p>

          {/* Details */}
          <div className="flex flex-col gap-3">
            {openProject.proj.details.map((point, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-indigo-400/60 shrink-0" />
                <p
                  className="text-[13px] text-white/55 leading-relaxed"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Links */}
          {(openProject.proj.github || openProject.proj.demo) && (
            <div className="flex gap-3 mt-6 pt-5 border-t border-white/[0.07]">
              {openProject.proj.github && (
                <a
                  href={openProject.proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded-xl px-4 py-2 transition-all duration-200"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  GitHub →
                </a>
              )}
              {openProject.proj.demo && (
                <a
                  href={openProject.proj.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-indigo-400 hover:text-indigo-300 border border-indigo-400/25 hover:border-indigo-400/50 rounded-xl px-4 py-2 transition-all duration-200"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Live Demo →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    )}
    </>
  )
}
