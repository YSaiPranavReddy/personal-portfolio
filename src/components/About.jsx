import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FiMapPin, FiMail, FiBookOpen } from "react-icons/fi"
import { aboutData, heroData, education } from "../data/data"
import ProfileCard from "./ProfileCard"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-header", {
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".about-header", start: "top 88%" },
      })
      gsap.from(".about-bio-block", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".about-bio-block", start: "top 88%", once: true },
      })
      gsap.from(".edu-card", {
        y: 36, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".edu-grid", start: "top 90%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#090909] pt-16 pb-24 md:pt-20 md:pb-32 px-5 sm:px-7 md:px-16 lg:px-28"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Section header ── */}
        <div className="about-header mb-12 md:mb-14">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Who I Am
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-none"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            About Me
          </h2>
          <div className="mt-6 w-12 h-px bg-indigo-400/40" />
        </div>

        {/* ── Bio block ── */}
        <div className="about-bio-block flex flex-col md:flex-row gap-10 md:gap-14 items-start mb-12 md:mb-14">

          {/* Profile Card */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <ProfileCard
              avatarUrl={aboutData.image || heroData.photo}
              name={heroData.name}
              title={heroData.role}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4">
            <p
              className="text-white/55 text-[15px] md:text-base leading-relaxed whitespace-pre-line"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {aboutData.bio}
            </p>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
              <span
                className="flex items-center gap-1.5 text-[13px] text-white/35"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <FiMapPin size={13} className="text-indigo-400/60" />
                {heroData.location}
              </span>
              <span
                className="flex items-center gap-1.5 text-[13px] text-white/35"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <FiMail size={13} className="text-indigo-400/60" />
                {heroData.email}
              </span>
            </div>
          </div>
        </div>

        {/* ── Education ── */}
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Education
          </p>

          <div className="edu-grid flex flex-col gap-4">
            {education.map((edu, i) => (
              <div
                key={i}
                className="edu-card bg-[#111]/70 border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.14] transition-all duration-300"
              >
                <div className="flex flex-row items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-white font-bold text-[15px] leading-snug"
                      style={{ fontFamily: 'Raleway, sans-serif' }}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      className="text-indigo-400/70 text-[13px] mt-0.5"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {edu.institution}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-1 text-right">
                    {edu.gpa && (
                      <span
                        className="text-[12px] font-semibold text-indigo-300/80"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {edu.scoreLabel ?? "GPA"} {edu.gpa}
                      </span>
                    )}
                    <span
                      className="text-[11px] text-white/30"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {edu.period}
                    </span>
                  </div>
                </div>

                {edu.description && (
                  <p
                    className="text-white/40 text-[13px] leading-relaxed mb-4"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {edu.description}
                  </p>
                )}

                {edu.courses && edu.courses.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 text-[11px] text-white/20 mr-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <FiBookOpen size={11} /> Relevant Courses
                    </span>
                    {edu.courses.map((c) => (
                      <span
                        key={c}
                        className="text-[11px] text-white/45 bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
