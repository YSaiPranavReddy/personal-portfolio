import React, { useEffect, useRef } from 'react'

const CODE_SYMBOLS = ['</>', '</>', '</>', '</>', 'func()']

const ProfileCard = ({
  avatarUrl = '',
  name = 'Sai Pranav Reddy',
  title = 'Full-Stack Developer',
  className = '',
}) => {
  const containerRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    const id = 'pc-float-kf'
    if (!document.getElementById(id)) {
      const s = document.createElement('style')
      s.id = id
      s.textContent = `
        @keyframes floatUp {
          0%   { opacity: 0; transform: translateY(0px) scale(0.85); }
          12%  { opacity: 1; }
          80%  { opacity: 0.55; }
          100% { opacity: 0; transform: translateY(-70px) scale(1.05); }
        }
        .pc-symbol { animation: floatUp 1.6s ease-out forwards; }
      `
      document.head.appendChild(s)
    }
  }, [])

  const spawnSymbol = () => {
    const el = containerRef.current
    if (!el) return
    const symbol = CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)]
    const x = Math.random() * (el.clientWidth - 52)
    const y = Math.random() * (el.clientHeight * 0.7) + el.clientHeight * 0.1
    const size = Math.random() * 8 + 24
    const opacity = Math.random() * 0.25 + 0.6
    const span = document.createElement('span')
    span.textContent = symbol
    span.className = 'pc-symbol absolute font-mono font-bold pointer-events-none select-none'
    span.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;color:rgba(0,0,0,${opacity});z-index:10;`
    el.appendChild(span)
    setTimeout(() => span.remove(), 1600)
  }

  const handleMouseEnter = () => {
    spawnSymbol()
    intervalRef.current = setInterval(spawnSymbol, 220)
  }

  const handleMouseLeave = () => clearInterval(intervalRef.current)

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const cardRadius = '20px'

  return (
    <div style={{ perspective: '600px' }}>
    <div
      className={`relative overflow-hidden cursor-default ${className}`}
      style={{
        width: '244px',
        height: '300px',
        borderRadius: cardRadius,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
      }}
      onMouseEnter={e => { handleMouseEnter(); e.currentTarget.style.transform = 'scale(1.07) translateZ(40px)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.75)'; }}
      onMouseLeave={e => { handleMouseLeave(); e.currentTarget.style.transform = 'scale(1) translateZ(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.6)'; }}
    >
      {/* Symbol spawn container */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-20" style={{ borderRadius: cardRadius }} />

      {/* Photo fills entire card */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ borderRadius: cardRadius }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#111] text-indigo-400 text-4xl font-bold" style={{ fontFamily: 'Raleway, sans-serif', borderRadius: cardRadius }}>
          {name?.[0] ?? 'Y'}
        </div>
      )}

      {/* Dark gradient at top so text is readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)',
          borderRadius: cardRadius,
        }}
      />

      {/* Name + title overlaid on image */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-4 pb-2 text-center">
        <h3
          className="font-bold leading-tight text-white drop-shadow-md"
          style={{ fontFamily: 'Raleway, sans-serif', fontSize: '17px' }}
        >
          {name}
        </h3>
        <p
          className="mt-0.5 drop-shadow-md"
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: 'rgba(0,0,0,0.85)' }}
        >
          {title}
        </p>
      </div>
    </div>
    </div>
  )
}

export default React.memo(ProfileCard)
