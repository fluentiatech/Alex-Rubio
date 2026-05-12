'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'perfil',      label: 'Perfil'      },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'stats',       label: 'Stats'       },
  { id: 'highlights',  label: 'Highlights'  },
]

export default function Navbar() {
  const [active,   setActive]   = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids  = ['hero', ...SECTIONS.map(s => s.id)]
    const els  = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (!visible.length) return
        const best = visible.reduce((a, b) =>
          a.intersectionRatio > b.intersectionRatio ? a : b,
        )
        setActive(best.target.id)
      },
      { threshold: [0.2, 0.5] },
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className="fixed top-5 left-1/2 z-50"
      style={{
        animation: 'navSlideDown 0.7s cubic-bezier(0.16,1,0.3,1) 1.2s both',
        transform: 'translateX(-50%)',
      }}
    >
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-full whitespace-nowrap"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 28px rgba(0,0,0,0.5)',
          transition: 'background 0.3s ease',
        }}
      >
        {/* Logotype */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-200"
          aria-label="Inicio"
        >
          <span
            className="font-display text-[0.78rem] tracking-[0.12em] uppercase"
            style={{
              color: active === 'hero' || active === '' ? 'var(--accent)' : 'rgba(255,255,255,0.55)',
              fontWeight: 300,
              letterSpacing: '0.14em',
            }}
          >
            Álex
          </span>
          <span
            style={{
              width: 1,
              height: 10,
              backgroundColor: active === 'hero' || active === '' ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span
            className="font-display text-[0.82rem] tracking-[0.22em] uppercase"
            style={{
              color: active === 'hero' || active === '' ? 'var(--accent)' : '#ffffff',
              fontWeight: 700,
            }}
          >
            Rubio
          </span>
        </button>

        <div className="w-px h-3.5 bg-zinc-700/80 mx-1 flex-shrink-0" />

        {/* Mobile: section dots */}
        <div className="flex sm:hidden items-center gap-3 px-1">
          {SECTIONS.map(({ id }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={id}
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                style={{
                  backgroundColor: isActive ? 'var(--accent)' : '#444',
                  transform: isActive ? 'scale(1.6)' : 'scale(1)',
                }}
              />
            )
          })}
        </div>

        {/* Desktop: section labels */}
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="hidden sm:block relative font-body text-[0.67rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                color:      isActive ? 'var(--accent)' : '#666',
                background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
              }}
            >
              <span
                className="relative"
                style={isActive ? {
                  textDecoration: 'line-through',
                  textDecorationColor: 'var(--accent)',
                  textDecorationThickness: '1.5px',
                } : {}}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
