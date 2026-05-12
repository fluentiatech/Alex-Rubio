'use client'

import { useEffect, useRef, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PROFILE_IMAGES = [
  '/Perfil/AlexRubioPerfil1.jpg',
  '/Perfil/AlexRubioPerfil2.jpg',
  '/Perfil/AlexRubioPerfil3.jpg',
]

const EDITORIAL_LINES = [
  'No necesita espacio.',
  'Se lo crea.',
  'Pequeño. Explosivo.',
  'Inevitable.',
  'El área le pertenece.',
]

// Full pitch layout as section background — night match atmosphere
function PitchBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/* Stadium floodlights from top corners */}
        <radialGradient id="fl1" cx="4%" cy="0%" r="65%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.055" />
          <stop offset="100%" stopColor="white" stopOpacity="0"     />
        </radialGradient>
        <radialGradient id="fl2" cx="96%" cy="0%" r="65%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.045" />
          <stop offset="100%" stopColor="white" stopOpacity="0"     />
        </radialGradient>
        {/* Penalty spot bloom */}
        <radialGradient id="spot" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.06" />
          <stop offset="100%" stopColor="white" stopOpacity="0"    />
        </radialGradient>
      </defs>

      {/* Floodlight blooms */}
      <rect x="0" y="0" width="1440" height="900" fill="url(#fl1)" />
      <rect x="0" y="0" width="1440" height="900" fill="url(#fl2)" />

      {/* ── PITCH BOUNDARY ── */}
      <rect x="4" y="40" width="1432" height="820" stroke="white" strokeWidth="1.8" opacity="0.11" />

      {/* ── LEFT HALF: center circle area ── */}
      {/* Halfway line */}
      <line x1="380" y1="40" x2="380" y2="860" stroke="white" strokeWidth="1.8" opacity="0.11" />
      {/* Center circle */}
      <circle cx="380" cy="450" r="170" stroke="white" strokeWidth="1.8" opacity="0.1" />
      {/* Center spot */}
      <circle cx="380" cy="450" r="7" fill="white" opacity="0.16" />
      {/* Center spot glow */}
      <circle cx="380" cy="450" r="45" fill="white" opacity="0.025" />

      {/* Corner arcs left side */}
      <path d="M 4 88  A 48 48 0 0 1 52 40"  stroke="white" strokeWidth="1.8" opacity="0.11" />
      <path d="M 4 812 A 48 48 0 0 0 52 860" stroke="white" strokeWidth="1.8" opacity="0.11" />

      {/* ── RIGHT HALF: final third + penalty area ── */}
      {/* Penalty box */}
      <rect x="1075" y="168" width="365" height="564" stroke="white" strokeWidth="1.8" opacity="0.13" />
      {/* 6-yard box */}
      <rect x="1255" y="300" width="185" height="300" stroke="white" strokeWidth="1.6" opacity="0.1"  />
      {/* Penalty arc — the D */}
      <path
        d="M 1042 268 A 158 158 0 0 1 1042 632"
        stroke="white" strokeWidth="1.8" opacity="0.11"
      />
      {/* Penalty spot */}
      <circle cx="1155" cy="450" r="7"   fill="white" opacity="0.18" />
      {/* Penalty spot bloom */}
      <ellipse cx="1155" cy="450" rx="90" ry="60" fill="url(#spot)" />

      {/* Corner arcs right side */}
      <path d="M 1388 40  A 48 48 0 0 1 1436 88"  stroke="white" strokeWidth="1.8" opacity="0.11" />
      <path d="M 1388 860 A 48 48 0 0 0 1436 812" stroke="white" strokeWidth="1.8" opacity="0.11" />
    </svg>
  )
}

export default function Perfil() {
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef   = useRef<HTMLDivElement>(null)
  const dotsRef    = useRef<HTMLDivElement>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3800, stopOnInteraction: false }),
  ])

  const updateDots = useCallback(() => {
    if (!emblaApi || !dotsRef.current) return
    const idx = emblaApi.selectedScrollSnap()
    Array.from(dotsRef.current.children).forEach((dot, i) => {
      const el = dot as HTMLElement
      el.style.backgroundColor = i === idx ? 'var(--accent)' : '#3a3a3a'
      el.style.transform       = i === idx ? 'scale(1.4)'    : 'scale(1)'
    })
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', updateDots)
    updateDots()
    return () => { emblaApi.off('select', updateDots) }
  }, [emblaApi, updateDots])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const lines = linesRef.current?.querySelectorAll('.editorial-line') ?? []
      gsap.from(Array.from(lines), {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: linesRef.current, start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="perfil"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        // Barely perceptible dark-green tint — grass at night under floodlights
        backgroundColor: '#090c09',
        // Mowed grass stripe pattern
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          rgba(255,255,255,0.013) 0px,
          rgba(255,255,255,0.013) 22px,
          transparent 22px,
          transparent 44px
        )`,
      }}
    >
      {/* Full pitch background */}
      <PitchBackground />

      {/* Gradient: darken left side so text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#090c09]/85 via-[#090c09]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090c09]/60 via-transparent to-[#090c09]/40 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-400">
            Llegada al área
          </span>
        </div>

        {/* Grid: text left, portrait right */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-10 items-center">

          {/* Left — editorial text */}
          <div>
            <div ref={linesRef} className="mb-10">
              {EDITORIAL_LINES.map((line, i) => (
                <p
                  key={i}
                  className="editorial-line font-display uppercase leading-none text-white mb-1"
                  style={{ fontSize: 'clamp(1.7rem, 3vw, 3rem)' }}
                >
                  {line}
                </p>
              ))}
            </div>

            <p className="font-body text-zinc-400 text-sm leading-relaxed max-w-[46ch] mb-8">
              Con apenas 23 años, Álex Rubio lleva grabado el camino más corto al gol.
              No es velocidad, es anticipación. No es fuerza, es lectura. Cada partido
              confirma lo que su trayectoria ya anunciaba: este delantero no espera
              ocasiones, las construye.
            </p>

            <div className="grid grid-cols-2 gap-5 max-w-[340px]">
              {[
                { label: 'Edad',          value: '23'        },
                { label: 'Altura',        value: "1'75"      },
                { label: 'Pie dominante', value: 'Derecho'   },
                { label: 'Posición',      value: 'Delantero' },
              ].map(({ label, value }) => (
                <div key={label} className="border-t border-zinc-700/60 pt-3">
                  <p className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-zinc-500 mb-1">
                    {label}
                  </p>
                  <p className="font-display text-xl text-white uppercase">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — portrait carousel, clean (no frame overlay) */}
          <div style={{ width: 'clamp(260px, 28vw, 400px)', flexShrink: 0 }}>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {PROFILE_IMAGES.map((src, i) => (
                  <div key={i} style={{ flex: '0 0 100%', minWidth: 0 }}>
                    {/* Outer wrapper holds corner brackets without being clipped */}
                    <div
                      className="relative"
                      style={{
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      {/* Corner bracket — top left */}
                      <span className="absolute -top-px -left-px z-20 w-8 h-8 pointer-events-none"
                        style={{ borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', opacity: 0.65 }} />
                      {/* Corner bracket — top right */}
                      <span className="absolute -top-px -right-px z-20 w-8 h-8 pointer-events-none"
                        style={{ borderTop: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', opacity: 0.65 }} />
                      {/* Corner bracket — bottom left */}
                      <span className="absolute -bottom-px -left-px z-20 w-8 h-8 pointer-events-none"
                        style={{ borderBottom: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', opacity: 0.65 }} />
                      {/* Corner bracket — bottom right */}
                      <span className="absolute -bottom-px -right-px z-20 w-8 h-8 pointer-events-none"
                        style={{ borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', opacity: 0.65 }} />

                      {/* Image — 3:4 portrait */}
                      <div className="relative overflow-hidden" style={{ paddingTop: '133.33%' }}>
                        <Image
                          src={src}
                          alt={`Álex Rubio — imagen ${i + 1}`}
                          fill
                          className="object-cover"
                          style={{ objectPosition: i === 1 ? 'center 35%' : i === 2 ? 'center 20%' : 'center center' }}
                          sizes="(max-width: 768px) 100vw, 400px"
                          priority={i === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090c09]/55 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div ref={dotsRef} className="flex gap-2 mt-4 justify-center">
              {PROFILE_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === 0 ? 'var(--accent)' : '#3a3a3a',
                    transform:       i === 0 ? 'scale(1.4)'    : 'scale(1)',
                  }}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
