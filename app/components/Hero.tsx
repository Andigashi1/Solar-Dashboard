"use client"
import gsap from "gsap";
import { useEffect, useRef } from "react";


  

const Hero = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null)

    

  //title animation
  useEffect(() =>{
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const scroll = scrollRef.current;
    const link = linkRef.current

    if(!title || !subtitle) return;

    const tl = gsap.timeline({delay: 0.3})

    tl.from(title, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(subtitle, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .from(scroll, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3")
    .from(link, {
      y:10,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=1")

    gsap.to(scroll, {
      y:8,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
      delay: 1.5
    })

    return () => {
      tl.kill()
    }

  }, [])

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%, #0a0a0f_100%)]" />

      <div className="text-center flex flex-col justify-center items-center gap-5 z-10">
        <h1 ref={titleRef} className="uppercase text-4xl md:text-6xl lg:text-8xl text-text-primary font-bold tracking-widest">solar <span className="text-violet">dashboard</span></h1>
        <p ref={subtitleRef} className="text-sm md:text-lg font-semibold">Explore the planets of our solar system, their size, gravity,
          temperature, and moons, all in one interactive experience.</p>
          <a ref={linkRef} href="#explore"
             className="text-violet text-sm border border-violet/40 px-6 py-3 rounded-full hover:bg-violet/10 transition-colors duration-300 uppercase">
              Start exploring</a>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs tracking-widest uppercase text-text-muted">
          Scroll
        </span>
        <div className="w-px h-8 bg-linear-to-b from-text-muted to-transparent" />
      </div>
    </section>
  )
}

export default Hero