import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FiGithub, FiExternalLink, FiFileText } from "react-icons/fi"
import { projects } from "../data/data"
import ProjectModal from "./ProjectModal"

gsap.registerPlugin(ScrollTrigger)

const FILTERS = [
  { label: "All", value: "all" },
  { label: "AI / ML", value: "aiml" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Research", value: "research" },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => [].concat(p.category).includes(activeFilter))

  // reset dot on filter change
  useEffect(() => { setActiveIdx(0); if (carouselRef.current) carouselRef.current.scrollLeft = 0 }, [activeFilter])

  // track active card while scrolling
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const onScroll = () => {
      const cardW = el.firstChild?.offsetWidth ?? 1
      const gap = 20
      setActiveIdx(Math.round(el.scrollLeft / (cardW + gap)))
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [filtered])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-header", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proj-header", start: "top 88%" },
      })
      gsap.from(".project-card", {
        y: 56,
        opacity: 0,
        duration: 0.7,
        stagger: 0.13,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".proj-grid",
          start: "top 95%",
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#090909] pt-4 pb-24 md:pt-6 md:pb-32 px-5 sm:px-7 md:px-16 lg:px-28"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Section header ── */}
        <div className="proj-header mb-12 md:mb-14">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            What I've Built
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-none"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            Projects
          </h2>
          <div className="mt-6 w-12 h-px bg-indigo-400/40" />
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex items-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`text-[12px] font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 ${
                activeFilter === f.value
                  ? "bg-indigo-500/20 border-indigo-400/50 text-indigo-300"
                  : "bg-white/[0.03] border-white/[0.08] text-white/35 hover:text-white/60 hover:border-white/20"
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Grid / mobile carousel ── */}
        <div
          ref={carouselRef}
          className="proj-grid
            flex sm:grid
            sm:grid-cols-2
            overflow-x-auto sm:overflow-visible
            gap-5 md:gap-6
            snap-x snap-mandatory sm:snap-none
            scroll-pl-5 sm:scroll-pl-0
            pb-4 sm:pb-0
            -mx-5 sm:mx-0 px-5 sm:px-0
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {filtered.map((project, i) => (
            <div
              key={i}
              className="project-card group relative flex flex-col bg-[#111]/70 border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-300
                flex-shrink-0 w-[82vw] sm:w-auto snap-start"
            >
              {/* Optional project image */}
              {project.image && (
                <div className="w-full h-44 overflow-hidden bg-[#0d0d0d] flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                  />
                </div>
              )}

              {/* Card body */}
              <div className="flex flex-col flex-1 p-6">

                {/* Featured badge */}
                {project.featured && (
                  <span
                    className="self-start mb-3 text-[10px] uppercase tracking-[0.18em] font-semibold text-indigo-400/80 bg-indigo-400/[0.08] border border-indigo-400/[0.15] rounded-full px-3 py-1"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Featured
                  </span>
                )}

                {/* Title */}
                <h3
                  className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-white/90 transition-colors duration-200"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  {project.title}
                </h3>

                {/* Use-case — single line */}
                <p
                  className="text-white/40 text-sm leading-relaxed mb-5 line-clamp-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {project.useCase || project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-white/32 bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  {/* Read More */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-[12px] font-semibold text-indigo-400/80 hover:text-indigo-300 transition-colors duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Read More →
                  </button>

                  <div className="flex items-center gap-4">
                  {project.github && project.github !== "#" ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-white/35 hover:text-white text-[13px] font-medium transition-colors duration-200"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <FiGithub size={14} strokeWidth={2} />
                      Code
                    </a>
                  ) : (
                    <span
                      className="flex items-center gap-1.5 text-white/15 text-[13px] font-medium cursor-not-allowed select-none"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      title="Repository not public"
                    >
                      <FiGithub size={14} strokeWidth={2} />
                      Private
                    </span>
                  )}
                  {(project.pdf || (!project.pdf && project.demo && project.demo !== "#")) && (
                    <span className="w-px h-3.5 bg-white/[0.12] self-center" />
                  )}
                  {project.pdf && (
                    <a
                      href={project.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-indigo-400/70 hover:text-indigo-300 text-[13px] font-medium transition-colors duration-200"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <FiFileText size={14} strokeWidth={2} />
                      Read Paper
                    </a>
                  )}
                  {!project.pdf && project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-white/35 hover:text-white text-[13px] font-medium transition-colors duration-200"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <FiExternalLink size={14} strokeWidth={2} />
                      Live Demo
                    </a>
                  )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile dot indicators ── */}
        {filtered.length > 1 && (
          <div className="flex sm:hidden flex-col items-center gap-3 mt-5">
            {/* swipe hint */}
            <span
              className="flex items-center gap-1.5 text-white/25 text-[11px] animate-pulse"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><polyline points="9 18 15 12 9 6" /></svg>
              swipe to explore
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><polyline points="9 18 15 12 9 6" /></svg>
            </span>
            {/* dots */}
            <div className="flex items-center gap-2">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = carouselRef.current
                  if (!el) return
                  const cardW = el.firstChild?.offsetWidth ?? 0
                  el.scrollTo({ left: i * (cardW + 20), behavior: "smooth" })
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIdx
                    ? "w-5 h-2 bg-indigo-400 shadow-[0_0_6px_2px_rgba(129,140,248,0.5)]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
            </div>
          </div>
        )}

      </div>

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
