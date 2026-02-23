import { useEffect, useState } from "react"
import {
  FiHome,
  FiUser,
  FiBook,
  FiLayout,
  FiBriefcase,
  FiMail,
  FiX,
  FiMenu,
} from "react-icons/fi"
import Dock from "./Dock"

const navItems = [
  { id: "home",       label: "Home",       icon: <FiHome size={18} /> },
  { id: "about",      label: "About",      icon: <FiUser size={18} /> },
  { id: "experience", label: "Experience", icon: <FiBook size={18} /> },
  { id: "skills",     label: "Skills",     icon: <FiLayout size={18} /> },
  { id: "projects",   label: "Projects",   icon: <FiBriefcase size={18} /> },
  { id: "contact",    label: "Contact",    icon: <FiMail size={18} /> },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)

  // Track active section
  useEffect(() => {
    const observers = []
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  // ── Dock items (desktop) ──
  const spItem = {
    label: "Portfolio",
    icon: (
      <span className="font-black text-sm tracking-tight leading-none text-white select-none">
        S<span className="text-indigo-400">P</span>
      </span>
    ),
    onClick: () => scrollTo("home"),
    className: "!rounded-xl bg-[#111111] border-white/20",
  }

  const dockItems = [
    spItem,
    ...navItems.map(({ id, label, icon }) => ({
      label,
      icon,
      onClick: () => scrollTo(id),
      className: activeSection === id
        ? "!border-indigo-500/70 !bg-[#1a1a2e] text-indigo-400 shadow-[0_0_14px_rgba(99,102,241,0.4)]"
        : "",
    })),
  ]

  return (
    <>
      {/* ── MOBILE top bar (hidden on md+) ── */}
      <header className="md:hidden fixed top-0 left-0 w-full z-[9999] bg-[#141414]/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-5 h-14">
          {/* SP logo */}
          <button onClick={() => scrollTo("home")} className="font-black text-sm tracking-tight text-white">
            S<span className="text-indigo-400">P</span>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Dropdown menu */}
        {menuOpen && (
          <nav className="border-t border-white/10 px-5 py-3 flex flex-col gap-1">
            {navItems.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left
                  ${activeSection === id
                    ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/40"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* ── DESKTOP bottom dock (hidden on mobile) ── */}
      <div className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]">
        <Dock
          items={dockItems}
          panelHeight={64}
          baseItemSize={48}
          magnification={68}
          distance={140}
        />
      </div>
    </>
  )
}
