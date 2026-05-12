'use client'

import { useEffect, useRef, useState } from 'react'

const VIDEOS = [
  '/AlexRubioLeganes_cut.mp4?v=6',
  '/AlexRubioVillarreal_cut1.mp4?v=6',
  '/AlexRubioVillarreal_cut2.mp4?v=6',
  '/AlexRubioVillarreal_cut3.mp4?v=6',
  '/AlexRubioAntequera_cut1.mp4?v=6',
  '/AlexRubioAntequera_cut2.mp4?v=6',
]

const CROSSFADE_TRIGGER = 0.8  // seconds before end
const CROSSFADE_MS      = 1400

export default function HeroVideoLoop() {
  const [visibleIdx, setVisibleIdx]  = useState(0)
  const visibleIdxRef = useRef(0)       // always up-to-date, safe inside callbacks
  const videoRefs     = useRef<(HTMLVideoElement | null)[]>([])
  const transitioning = useRef(false)

  useEffect(() => {
    videoRefs.current[0]?.play().catch(() => {})
  }, [])

  const goNext = (currentIdx: number) => {
    if (transitioning.current) return
    transitioning.current = true

    const nextIdx = (currentIdx + 1) % VIDEOS.length
    videoRefs.current[nextIdx]?.play().catch(() => {})

    setTimeout(() => {
      visibleIdxRef.current = nextIdx
      setVisibleIdx(nextIdx)

      setTimeout(() => {
        const old = videoRefs.current[currentIdx]
        if (old) { old.pause(); old.currentTime = 0 }
        transitioning.current = false
      }, CROSSFADE_MS + 100)
    }, 40)
  }

  const handleTimeUpdate = (idx: number) => {
    if (idx !== visibleIdxRef.current || transitioning.current) return
    const v = videoRefs.current[idx]
    if (!v || !v.duration) return
    if (v.duration - v.currentTime <= CROSSFADE_TRIGGER) goNext(idx)
  }

  return (
    <div className="absolute inset-0">
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={el => { videoRefs.current[i] = el }}
          src={src}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={() => handleTimeUpdate(i)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === visibleIdx ? 1 : 0,
            transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}
