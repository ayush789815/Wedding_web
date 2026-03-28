'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PrimaryLink from '@/components/ui/PrimaryLink'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_TEXT = 'PLAYFUL MINDS'

export default function WhatsYKP() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleCharsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Parallax on marquee
    gsap.to(marqueeRef.current, {
      xPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    // Images parallax
    const images = imagesRef.current?.querySelectorAll('.img-item')
    images?.forEach((img, i) => {
      gsap.fromTo(
        img,
        { y: 60 * (i + 1), opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            once: true,
          },
          delay: i * 0.15,
        }
      )
    })

    // Title chars
    gsap.fromTo(
      titleCharsRef.current,
      { y: '110%' },
      {
        y: '0%',
        stagger: 0.04,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 70%', once: true },
      }
    )

    // Content fade
    gsap.fromTo(
      contentRef.current?.querySelectorAll('.fade-in'),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 65%', once: true },
        delay: 0.4,
      }
    )
  }, [])

  const titleText = "What's ykp"

  return (
    <section
      ref={sectionRef}
      className="bg-white text-black relative overflow-hidden py-24 lg:py-40"
    >
      {/* Marquee background text */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none select-none py-8">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-poppins text-[clamp(4rem,12vw,10rem)] font-bold text-black/5 pr-16 shrink-0"
            >
              {MARQUEE_TEXT} ✦
            </span>
          ))}
        </div>
      </div>

      <div className="relative px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: floating images */}
          <div ref={imagesRef} className="relative h-[500px] lg:h-[600px]">
            {[
              { src: '/images/pexels-thevisionaryvows-32994468.jpg', cls: 'absolute top-0 left-0 w-2/3 aspect-[3/4]' },
              { src: '/images/pexels-westernsydneyweddings-6999537.jpg', cls: 'absolute top-1/4 right-0 w-1/2 aspect-[3/4]' },
              { src: '/images/pexels-lilen-diaz-1025474869-32195688.jpg', cls: 'absolute bottom-0 left-1/4 w-2/5 aspect-square' },
            ].map((img, i) => (
              <div
                key={i}
                className={`${img.cls} overflow-hidden rounded-sm img-item opacity-0`}
              >
                <Image
                  src={img.src}
                  alt={`YK Produce photo ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
              </div>
            ))}
          </div>

          {/* Right: content */}
          <div ref={contentRef} className="space-y-8">
            <div className="overflow-hidden">
              <h2
                className="font-poppins text-[clamp(3rem,7vw,6rem)] font-light leading-tight text-black"
                style={{ perspective: '800px' }}
              >
                {titleText.split('').map((char, i) => (
                  <span
                    key={i}
                    ref={(el) => { if (el) titleCharsRef.current[i] = el }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h2>
            </div>

            <p className="fade-in text-black text-xl font-light leading-relaxed opacity-0">
              We craft unforgettable moments through photography, film, and creative production.
            </p>

            <p className="fade-in text-black/60 text-sm leading-[2] opacity-0">
              From intimate weddings to large-scale commercial productions, YK Produce brings a unique blend of artistry and technical excellence to every project.<br />
              <br />
              Founded in 2015, our dedicated team of creatives has built a reputation for delivering work that moves, inspires, and endures.
            </p>

            <div className="fade-in opacity-0">
              <PrimaryLink href="/whats_ykp" label="What's YKP?" dark />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
