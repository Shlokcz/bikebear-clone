"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate how far the text needs to slide based on its width vs the screen width
      const getScrollAmount = () => -(textRef.current!.scrollWidth - window.innerWidth);

      const tween = gsap.to(textRef.current, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // The height of the scroll is equal to the distance we slide horizontally
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculates on browser resize
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full overflow-hidden bg-black flex items-center">
      <div ref={textRef} className="flex whitespace-nowrap pl-[10vw]">
        <h2 className="text-[15vw] font-bold text-transparent flex items-center gap-10" style={{ WebkitTextStroke: '2px #ffd900' }}>
          <span>WE ARE A BEARY CREATIVE</span>
          <span className="text-[#ffd900]">*</span>
          <span>DIGITAL AGENCY FOR HOOMANS</span>
        </h2>
      </div>
    </div>
  );
}
