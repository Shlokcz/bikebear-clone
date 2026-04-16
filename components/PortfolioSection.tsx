"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const biggerRef = useRef<HTMLDivElement>(null);
  const bolderRef = useRef<HTMLDivElement>(null);
  const betterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !biggerRef.current || !bolderRef.current || !betterRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // This tells GSAP to drag the scroll track for 3 viewport heights!
          scrub: 1,
          pin: true, // Let GSAP handle the pinning natively! This is bulletproof.
        }
      });

      // BIGGER fades in and moves up early in the scroll
      tl.to(biggerRef.current, { opacity: 1, y: 0, duration: 2 }, 0)
        .to(biggerRef.current, { opacity: 0, y: -50, duration: 1 }, 2.5);

      // BOLDER comes in midway 
      tl.to(bolderRef.current, { opacity: 1, y: 0, duration: 2 }, 3.5)
        .to(bolderRef.current, { opacity: 0, y: -50, duration: 1 }, 5.5);

      // BETTER comes in later
      tl.to(betterRef.current, { opacity: 1, y: 0, duration: 2 }, 6.5)
        .to(betterRef.current, { opacity: 0, y: -50, duration: 1 }, 8);

    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black z-0">
       
       <div className="flex items-center justify-center w-full h-full">
          
          {/* 3D Scene fixed inside this section */}
          <div className="absolute inset-0 z-10 pointer-events-none">
             <Scene triggerRef={sectionRef} />
          </div>

          {/* Texts firing on GSAP Timeline - using explicit Refs to avoid React scope bugs */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
              
              <div ref={biggerRef} className="absolute top-[25%] right-[10%] flex flex-col items-end text-right opacity-0 translate-y-12">
                  <h2 className="text-white text-6xl md:text-[9rem] font-black tracking-tighter uppercase">BIGGER</h2>
                  <p className="text-white text-xl max-w-md mt-2 font-medium drop-shadow-xl">We think bigger. May not be in terms of the size of our creative agency, but in our big ideas, thinking and creativity.</p>
              </div>
              
              <div ref={bolderRef} className="absolute top-[35%] left-[10%] flex flex-col items-start text-left opacity-0 translate-y-12">
                  <h2 className="text-white text-6xl md:text-[9rem] font-black tracking-tighter uppercase">BOLDER</h2>
                  <p className="text-white text-xl max-w-md mt-2 font-medium drop-shadow-xl">We are bolder. We take calculated risks to deliver bold and daring digital experiences.</p>
              </div>

              <div ref={betterRef} className="absolute top-[45%] right-[10%] flex flex-col items-end text-right opacity-0 translate-y-12">
                  <h2 className="text-white text-6xl md:text-[9rem] font-black tracking-tighter uppercase">BETTER</h2>
                  <p className="text-white text-xl max-w-md mt-2 font-medium drop-shadow-xl">We do it better. Through constant iteration and obsession over quality.</p>
              </div>

          </div>
          
       </div>
    </section>
  );
}
