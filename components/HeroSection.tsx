"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !textRef.current || !crossRef.current) return;
    const ctx = gsap.context(() => {
      // Calculate how far the text needs to slide to go completely offscreen to the left
      const textScrollAmount = -(textRef.current!.scrollWidth - window.innerWidth + window.innerWidth * 0.2);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${Math.abs(textScrollAmount) + window.innerHeight}`, // Extended track to allow mask to grow
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // 1. Slide text horizontally (Taking 60% of the timeline)
      tl.to(textRef.current, {
        x: textScrollAmount,
        ease: "none",
        duration: 0.6
      });

      // 2. Expand black cross mask to paint the screen black (Taking 40% of the timeline)
      // Scale 50 is massive enough that a 115px SVG covers a 4k monitor viewport completely.
      tl.to(crossRef.current, {
        scale: 50,
        rotation: 270,
        ease: "power2.in",
        duration: 0.4
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#ffd900] flex items-center overflow-hidden z-10">
      
      <div className="absolute top-8 left-8 border-[1.5px] border-black rounded-full px-5 py-1 text-sm font-medium text-black z-20 hover:bg-black hover:text-[#ffd900] transition-colors cursor-pointer">
        WE ARE BIKE BEAR
      </div>
      
      {/* 2D Demo Placeholder Image centered on screen */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none">
        <div className="w-80 h-96 opacity-60 bg-black/10 rounded-[4rem] border-2 border-dashed border-black/40 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <span className="text-4xl mb-4">🐻</span>
          <span className="text-black font-semibold">2D Demo Image</span>
          <span className="text-sm text-black/60 mt-2">Swap this layer out with your final Bear static image or Lottie sequence later.</span>
        </div>
      </div>

      {/* Centered Massive Text container sliding left on scroll */}
      <div ref={textRef} className="flex whitespace-nowrap pl-[10vw]">
        <h1 className="text-[32vw] font-black text-black leading-none tracking-tighter">
          DARE TO DO
        </h1>
      </div>

      {/* Expanding Black Mask / Portal */}
      <div 
        ref={crossRef} 
        className="absolute top-1/2 left-1/2 origin-center pointer-events-none z-30 flex items-center justify-center" 
        style={{ transform: "translate(-50%, -50%) scale(0)" }}
      >
        <svg viewBox="0 0 115 115" width="115" height="115" fill="#000">
          <path d="M111.735,54.571c0,4.046-6.365,7.32-7.225,11.106-.889,3.908,3.4,9.615,1.7,13.141-1.729,3.583-8.885,3.775-11.342,6.855S93.8,95.781,90.7,98.252c-3.078,2.459-9.6-.455-13.19,1.275-3.525,1.7-5.305,8.635-9.213,9.524-3.785.861-8.387-4.6-12.432-4.6s-8.647,5.457-12.432,4.6c-3.908-.889-5.688-7.824-9.215-9.524-3.583-1.73-10.11,1.182-13.188-1.275-3.093-2.471-1.7-9.487-4.168-12.581C14.406,82.593,7.251,82.4,5.523,78.818c-1.7-3.526,2.591-9.234,1.7-13.141C6.365,61.891,0,58.617,0,54.571s6.365-7.32,7.225-11.106c.889-3.908-3.4-9.615-1.7-13.141,1.729-3.583,8.883-3.775,11.342-6.855s1.075-10.108,4.168-12.579c3.078-2.459,9.6.455,13.19-1.275C37.747,7.914,39.528.98,43.435.092c3.785-.861,8.387,4.6,12.432,4.6S64.515-.769,68.3.092c3.908.889,5.688,7.824,9.213,9.524C81.1,11.346,87.625,8.433,90.7,10.89c3.093,2.471,1.7,9.487,4.168,12.581,2.459,3.078,9.613,3.269,11.342,6.853,1.7,3.526-2.591,9.234-1.7,13.141.861,3.785,7.225,7.06,7.225,11.106" />
        </svg>
      </div>

      {/* The Bottom Marquee Strip */}
      <div className="absolute bottom-0 left-0 w-full border-t-[1.5px] border-black bg-[#ffd900] overflow-hidden flex items-center h-12 z-20">
         <div className="animate-marquee whitespace-nowrap flex items-center text-[13px] font-bold text-black tracking-wide uppercase">
            <span className="mx-6 text-[#29d682] text-2xl relative top-[4px]">*</span> WE ARE A <i className="mx-1 lowercase text-[15px] tracking-normal font-extrabold italic">“BEARY”</i> CREATIVE DIGITAL AGENCY FOR HOOMANS
            <span className="mx-6 text-[#29d682] text-2xl relative top-[4px]">*</span> WE ARE A <i className="mx-1 lowercase text-[15px] tracking-normal font-extrabold italic">“BEARY”</i> CREATIVE DIGITAL AGENCY FOR HOOMANS
            <span className="mx-6 text-[#29d682] text-2xl relative top-[4px]">*</span> WE ARE A <i className="mx-1 lowercase text-[15px] tracking-normal font-extrabold italic">“BEARY”</i> CREATIVE DIGITAL AGENCY FOR HOOMANS
            <span className="mx-6 text-[#29d682] text-2xl relative top-[4px]">*</span> WE ARE A <i className="mx-1 lowercase text-[15px] tracking-normal font-extrabold italic">“BEARY”</i> CREATIVE DIGITAL AGENCY FOR HOOMANS
            <span className="mx-6 text-[#29d682] text-2xl relative top-[4px]">*</span> WE ARE A <i className="mx-1 lowercase text-[15px] tracking-normal font-extrabold italic">“BEARY”</i> CREATIVE DIGITAL AGENCY FOR HOOMANS
            <span className="mx-6 text-[#29d682] text-2xl relative top-[4px]">*</span> WE ARE A <i className="mx-1 lowercase text-[15px] tracking-normal font-extrabold italic">“BEARY”</i> CREATIVE DIGITAL AGENCY FOR HOOMANS
         </div>
      </div>
    </section>
  );
}
