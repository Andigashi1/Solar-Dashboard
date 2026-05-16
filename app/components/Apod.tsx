"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { APODData } from "@/lib/Types"

gsap.registerPlugin(ScrollTrigger)

const Apod = () => {
  const [data, setData] = useState<APODData | null>(null)
  const [loading, setLoading] = useState(true)

  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dateRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  // fetch from our API route at runtime
  useEffect(() => {
    fetch("/api/apod")
      .then((r) => r.json())
      .then((d) => {
        if (d?.media_type) setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // GSAP animations — only run once data is loaded
  useEffect(() => {
    if (!data) return
    const image = imageRef.current
    const title = titleRef.current
    const date = dateRef.current
    const text = textRef.current
    const section = sectionRef.current
    if (!image || !title || !date || !text || !section) return

    gsap.fromTo(
      image,
      { filter: "blur(20px) brightness(0.1)", scale: 1.05 },
      {
        filter: "blur(0px) brightness(1)",
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      }
    )

    gsap.fromTo(
      [date, title, text],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [data])

  if (loading) {
    return (
      <section id="apod" className="w-full py-24 px-8 flex items-center justify-center">
        <p className="font-mono text-text-muted text-sm tracking-widest uppercase animate-pulse">
          Loading today&apos;s image...
        </p>
      </section>
    )
  }

  if (!data) return null

  if (data.media_type === "video") {
    return (
      <section id="apod" ref={sectionRef} className="w-full py-24 px-8 flex flex-col items-center gap-8">
        <span className="font-mono text-xs tracking-widest text-cyan uppercase">{data.date}</span>
        <h2 className="font-display font-bold uppercase tracking-widest text-4xl text-text-primary">
          {data.title}
        </h2>
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm text-violet hover:text-cyan transition-colors duration-300"
        >
          Watch today&apos;s video →
        </a>
      </section>
    )
  }

  return (
    <section
      id="apod"
      ref={sectionRef}
      className="w-full py-24 px-8 flex flex-col items-center gap-12"
    >
      <div className="text-center">
        <span className="font-body text-xs tracking-widest uppercase text-text-muted">
          Today&apos;s Image from Space
        </span>
        <h2 className="font-display font-bold uppercase tracking-widest text-4xl text-text-primary mt-2">
          Image of the Day
        </h2>
      </div>

      <div
        ref={imageRef}
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-border"
      >
        <Image
          src={data.hdurl ?? data.url}
          alt={data.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_#0a0a0f_100%)]" />
      </div>

      <div className="flex flex-col items-center gap-4 max-w-2xl text-center">
        <span ref={dateRef} className="font-mono text-xs tracking-widest text-cyan uppercase">
          {data.date}
        </span>
        <h3 ref={titleRef} className="font-display font-bold text-2xl text-text-primary tracking-wide">
          {data.title}
        </h3>
        <p ref={textRef} className="font-body text-text-secondary leading-relaxed text-sm">
          {data.explanation}
        </p>
        {data.copyright && (
          <span className="font-mono text-xs text-text-muted">© {data.copyright}</span>
        )}
      </div>
    </section>
  )
}

export default Apod