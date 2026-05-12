'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TOTAL_GOALS } from '@/lib/teams'

const B = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const TAG_COLORS: Record<string, string> = {
  Velocidad: '#E8D44D',
  'Último segundo': '#CC1F1F',
  'Hat-trick': '#2563EB',
  'Fuera de serie': '#10b981',
  'Decisivo': '#f97316',
}

const CLIPS = [
  {
    id: 'h1',
    src: `${B}/highlight1_cut.mp4`,
    rival: 'Granada B',
    competition: 'Primera RFEF',
    minute: "90+3'",
    tag: 'Último segundo',
    label: 'El 1-2 en el 90+3. Real Murcia arranca los tres puntos de El Nuevo Los Cármenes.',
  },
  {
    id: 'h2',
    src: `${B}/highlight2_cut.mp4`,
    rival: 'Cartagena',
    competition: 'Primera RFEF',
    minute: "82'",
    tag: 'Fuera de serie',
    label: 'El 0-2 que sentenciaba. Villarreal B cierra el partido sin dejar opción.',
  },
  {
    id: 'h3',
    src: `${B}/highlight3_cut.mp4`,
    rival: 'Betis B',
    competition: 'Primera RFEF',
    minute: "39'",
    tag: 'Velocidad',
    label: 'El empate antes del descanso. Antequera igualaba el 1-1 antes de irse al vestuario.',
  },
  {
    id: 'h4',
    src: `${B}/highlight4_cut.mp4`,
    rival: 'Ponferradina',
    competition: 'Primera RFEF',
    minute: "51'",
    tag: 'Decisivo',
    label: 'El 1-0 en la ida de primera ronda. Antequera se lleva la ventaja para casa.',
  },
  {
    id: 'h5',
    src: `${B}/highlight5_cut.mp4`,
    rival: 'Burgos',
    competition: 'Segunda División',
    minute: "63'",
    tag: 'Velocidad',
    label: 'El empate a 2 en casa. Aparece cuando el partido se complicaba.',
    objectPosition: '65% 50%',
  },
  {
    id: 'h6',
    src: `${B}/highlight6_cut.mp4`,
    rival: 'Racing',
    competition: 'Segunda División',
    minute: "82'",
    tag: 'Fuera de serie',
    label: 'El 0-4 al líder. Su doblete en el fútbol profesional.',
  },
]

function HighlightCard({ clip, index }: { clip: (typeof CLIPS)[0]; index: number }) {
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const tagColor = TAG_COLORS[clip.tag] ?? '#888'

  const handleClick = () => {
    if (!clip.src || !videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
    } else {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <div
      className="relative cursor-pointer group"
      style={{ '--card-index': index } as React.CSSProperties}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 9:16 card */}
      <div
        className="relative rounded-sm overflow-hidden"
        style={{ aspectRatio: '9 / 16' }}
      >
        {clip.src ? (
          <>
            <video
              ref={videoRef}
              src={clip.src}
              muted
              playsInline
              loop
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: clip.objectPosition ?? '50% 50%' }}
            />
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-200"
                style={{ opacity: hovered ? 1 : 0.7 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M5 3l14 9-14 9V3z" fill={tagColor} stroke={tagColor} strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </>
        ) : (
          <div className="video-slot w-full h-full">
            {hovered ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-2">
                <path d="M5 3l14 9-14 9V3z" fill={tagColor} stroke={tagColor} strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-2 opacity-20">
                <path d="M5 3l14 9-14 9V3z" stroke="#555" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            )}
            <span className="video-slot-label">{clip.rival} · {clip.competition}</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
          style={{ backgroundColor: hovered ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0)' }}
        />

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Tag pill */}
          <div
            className="inline-block font-mono text-[0.52rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full mb-2"
            style={{ backgroundColor: tagColor + '22', color: tagColor, border: `1px solid ${tagColor}44` }}
          >
            {clip.tag}
          </div>
          <p className="font-body text-white text-xs leading-snug mb-1">{clip.label}</p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[0.52rem] tracking-[0.15em] text-zinc-400 uppercase">
              {clip.rival}
            </span>
            <span className="w-px h-3 bg-zinc-600" />
            <span className="font-mono text-[0.52rem] tracking-[0.15em] text-zinc-500">
              {clip.minute}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null)
  const totalRef = useRef<HTMLSpanElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Grid cards stagger reveal
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
        })
      }

      // Total goals counter
      if (totalRef.current) {
        const counter = { val: 0 }
        gsap.to(counter, {
          val: TOTAL_GOALS,
          duration: 2.5,
          ease: 'power3.out',
          snap: { val: 1 },
          onUpdate() {
            if (totalRef.current) {
              totalRef.current.textContent = String(Math.round(counter.val))
            }
          },
          scrollTrigger: { trigger: totalRef.current, start: 'top 85%' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="highlights" className="relative bg-ink py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Section label */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
              Highlights
            </span>
          </div>
          <span className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-zinc-600">
            {CLIPS.length} clips seleccionados
          </span>
        </div>

        {/* 9:16 grid — asymmetric 3 columns */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {CLIPS.map((clip, i) => (
            <HighlightCard key={clip.id} clip={clip} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
