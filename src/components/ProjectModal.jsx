import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi"

export default function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null)
  const cardRef = useRef(null)

  // Animate in on mount, animate out before calling onClose
  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" }
    ).fromTo(cardRef.current,
      { opacity: 0, scale: 0.93, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" },
      "-=0.1"
    )
  }, [])

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(cardRef.current, { opacity: 0, scale: 0.94, y: 16, duration: 0.22, ease: "power3.in" })
      .to(backdropRef.current, { opacity: 0, duration: 0.18, ease: "power2.in" }, "-=0.1")
  }

  // ESC key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  if (!project) return null

  return (
    /* Backdrop */
    <div
      ref={backdropRef}
      onClick={handleClose}
      className="fixed inset-0 z-[999] flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
    >
      {/* Card — stop click propagation so clicking inside doesn't close */}
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[80vh] flex flex-col bg-[#0e0e0e] border border-white/[0.09] rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-white/[0.06] flex-shrink-0">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.18em] text-white/25 font-semibold mb-1"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Project Overview
            </p>
            <h3
              className="text-xl font-bold text-white leading-tight"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {project.title}
            </h3>
            {project.useCase && (
              <p
                className="text-sm text-white/45 mt-1.5 leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {project.useCase}
              </p>
            )}
          </div>

          <button
            onClick={handleClose}
            aria-label="Close"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.09] text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.09] transition-all duration-200 mt-0.5"
          >
            <FiX size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-5 flex-1 custom-scrollbar">
          {/* Full description */}
          {project.description && (
            <p
              className="text-[13px] text-white/50 leading-relaxed mb-5"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {project.description}
            </p>
          )}

          {/* Detail bullet points */}
          {project.details?.length > 0 && (
            <ul className="flex flex-col gap-3">
              {project.details.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  {/* Bullet dot */}
                  <span className="flex-shrink-0 mt-[6px] w-1.5 h-1.5 rounded-full bg-indigo-400/70" />
                  <p
                    className="text-[13px] text-white/55 leading-relaxed"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer links */}
        {(project.github || project.demo) && (
          <div className="flex items-center gap-3 px-6 py-4 border-t border-white/[0.06] flex-shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[13px] font-medium text-white/55 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <FiGithub size={14} strokeWidth={2} />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[13px] font-medium text-white/55 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <FiExternalLink size={14} strokeWidth={2} />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
