import { useState, useEffect } from "react"

const lines = [
  "Artificial Intelligence (AI).",
  "Full-Stack Development.",
  "One Mind. One Vision.",
]

const WORD_FADE_MS = 350   // how long each word fades in
const WORD_STAGGER_MS = 90 // delay between each word
const HOLD_MS = 560
const EXIT_MS = 346

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function LoadingScreen() {
  const [lineIndex, setLineIndex] = useState(0)
  const [phase, setPhase] = useState("idle") // "idle" | "entering" | "exiting"
  const [sliding, setSliding] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const run = async () => {
      await delay(200)

      for (let i = 0; i < lines.length; i++) {
        // reset to idle with new line, let it render one frame
        setPhase("idle")
        setLineIndex(i)
        await delay(50)

        // stagger words in
        const wordCount = lines[i].split(" ").length
        const enterTime = WORD_FADE_MS + (wordCount - 1) * WORD_STAGGER_MS
        setPhase("entering")
        await delay(enterTime + HOLD_MS)

        // fade out whole line
        setPhase("exiting")
        await delay(EXIT_MS)
      }

      // slide screen away
      await delay(20)
      setSliding(true)
      await delay(420)
      setRemoved(true)
      document.body.style.overflow = ""
    }

    run()

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  if (removed) return null

  const words = lines[lineIndex].split(" ")

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{
        transform: sliding ? "translateY(-100%)" : "translateY(0)",
        transition: sliding
          ? "transform 0.42s cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
      }}
    >
      {/* subtle center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <p
        className="relative flex flex-wrap justify-center gap-x-[0.35em] text-white text-3xl md:text-5xl font-bold text-center px-8 select-none uppercase"
        style={{
          fontFamily: "'Raleway', sans-serif",
          letterSpacing: "0.06em",
          opacity: phase === "exiting" ? 0 : 1,
          transition: phase === "exiting" ? `opacity ${EXIT_MS}ms ease` : "none",
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${lineIndex}-${i}`}
            style={{
              display: "inline-block",
              opacity: phase === "entering" ? 1 : 0,
              transform: phase === "entering" ? "translateY(0px)" : "translateY(18px)",
              transition: `opacity ${WORD_FADE_MS}ms ease, transform ${WORD_FADE_MS}ms ease`,
              transitionDelay: phase === "entering" ? `${i * WORD_STAGGER_MS}ms` : "0ms",
            }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  )
}

