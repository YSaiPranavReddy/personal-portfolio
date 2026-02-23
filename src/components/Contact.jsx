import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FiMail, FiGithub, FiLinkedin, FiSend } from "react-icons/fi"
import { IoLogoWhatsapp } from "react-icons/io"
import { contact } from "../data/data"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-animate", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = formData
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.open(`https://mail.google.com/mail/?view=cm&to=${contact.email}&su=${subject}&body=${body}`, "_blank")
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setFormData({ name: "", email: "", message: "" })
  }

  const formatWhatsApp = (num) => {
    const digits = num.replace(/\D/g, '').replace(/^91/, '')
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  }

  const socials = [
    { icon: <FiMail size={18} />,          href: `https://mail.google.com/mail/?view=cm&to=${contact.email}`, label: "Email",     desc: contact.email },
    { icon: <IoLogoWhatsapp size={18} />,  href: `https://wa.me/${contact.whatsapp}`,                         label: "WhatsApp",  desc: formatWhatsApp(contact.whatsapp) },
    { icon: <FiLinkedin size={18} />,      href: contact.linkedin,                                            label: "LinkedIn",  desc: "linkedin.com/in/sai-pranav-reddy" },
  ]

  const inputClass =
    "w-full bg-[#111]/60 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-indigo-500/50 focus:bg-[#111]/90 transition-all duration-200"

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative -mt-10 pt-4 pb-8 md:-mt-14 md:pt-6 md:pb-10 px-4"
      style={{ background: "#090909" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="contact-animate mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            Contact
          </h2>
          <div className="mt-2 h-[2px] w-12 rounded-full bg-indigo-500/60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* Left — info + socials */}
          <div className="flex flex-col gap-7">
            <p
              className="contact-animate text-white/50 text-[15px] leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Have a project in mind, a research idea, or just want to say hi?
              Drop a message and I will get back to you as soon as possible.
            </p>

            <div className="contact-animate flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl border border-white/[0.07] bg-[#111]/50 hover:border-indigo-500/40 hover:bg-[#111]/80 transition-all duration-200 group"
                >
                  <span className="text-indigo-400/70 group-hover:text-indigo-400 transition-colors duration-200">
                    {s.icon}
                  </span>
                  <div>
                    <div
                      className="text-[12px] font-semibold text-white/70"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {s.label}
                    </div>
                    <div
                      className="text-[11px] text-white/35"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {s.desc}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className="contact-animate flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
            <button
              type="submit"
              className="self-start flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-500/40 hover:border-indigo-500/70 transition-all duration-200"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <FiSend size={14} />
              {sent ? "Opening mail client..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Footer line */}
        <div className="contact-animate mt-16 pt-6 border-t border-white/[0.06] text-center">
          <p
            className="text-white/20 text-[12px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Designed and built by Sai Pranav Reddy
          </p>
        </div>

      </div>
    </section>
  )
}
