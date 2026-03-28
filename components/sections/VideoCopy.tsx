'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoCopy() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const reelRef = useRef<HTMLDivElement>(null)
  const [reelOpen, setReelOpen] = useState(false)
  const reelVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Video parallax
    gsap.to(videoRef.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Overlay text scale on scroll
    gsap.fromTo(
      overlayRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          once: true,
        },
      }
    )

    // Reel button entrance
    gsap.fromTo(
      reelRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          once: true,
        },
        delay: 0.5,
      }
    )
  }, [])

  const openReel = () => {
    setReelOpen(true)
    setTimeout(() => reelVideoRef.current?.play(), 100)
  }

  const closeReel = () => {
    reelVideoRef.current?.pause()
    setReelOpen(false)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-black flex items-center justify-center"
      >
        {/* Background video */}
        <video
          ref={videoRef}
          src="/video/14620289_3840_2160_30fps.mp4"
          muted
          autoPlay
          playsInline
          loop
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Cross lines decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/30 rounded-full" />
        </div>

        {/* Centered content */}
        <div ref={overlayRef} className="relative text-center opacity-0">
          <p className="font-poppins text-xs tracking-[0.4em] text-white/50 uppercase mb-4">
            Showreel
          </p>
          <h2 className="font-poppins text-[clamp(4rem,12vw,11rem)] font-extralight text-white leading-none tracking-tight">
            YK PRODUCE
          </h2>
          <p className="font-poppins text-[clamp(1rem,3vw,2rem)] font-light text-white/60 mt-2 tracking-[0.3em]">
            Water Collection
          </p>
        </div>

        {/* Showreel button */}
        <div
          ref={reelRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0"
        >
          <button
            onClick={openReel}
            className="group flex items-center gap-4 font-poppins text-xs tracking-[0.2em] text-white uppercase"
          >
            <span className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="transition-colors duration-300 group-hover:text-black text-white">
                <path d="M9 5.13397C9.66667 5.51887 9.66667 6.48113 9 6.86603L2 10.8301C1.33333 11.215 0.5 10.7338 0.5 9.96397L0.5 2.03603C0.5 1.26623 1.33333 0.785025 2 1.16993L9 5.13397Z" fill="currentColor"/>
              </svg>
            </span>
            <span>Play Showreel</span>
            <span className="text-white/40">01:30</span>
          </button>
        </div>
      </section>

      {/* Reel modal */}
      {reelOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeReel}
        >
          <div className="relative w-full max-w-5xl px-6" onClick={(e) => e.stopPropagation()}>
            <video
              ref={reelVideoRef}
              src="/video/14620289_3840_2160_30fps.mp4"
              controls
              playsInline
              className="w-full aspect-video"
            />
            <button
              onClick={closeReel}
              className="absolute -top-10 right-6 font-poppins text-xs tracking-[0.2em] text-white/60 flex items-center gap-2 hover:text-white transition-colors"
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <line x1="1.35" y1="0.95" x2="8.35" y2="7.95" stroke="currentColor"/>
                <line x1="1.15" y1="7.95" x2="8.15" y2="0.95" stroke="currentColor"/>
              </svg>
              Exit
            </button>
          </div>
        </div>
      )}
    </>
  )
}
