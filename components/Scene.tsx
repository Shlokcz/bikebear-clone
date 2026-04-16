"use client";
import React, { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ModelProps {
  triggerRef: React.RefObject<HTMLElement | null>;
}

function Model({ triggerRef }: ModelProps) {
  const { scene } = useGLTF("/shiba.glb");
  const modelRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!modelRef.current || !triggerRef.current) return;

    // Drastically scaled down & repositioned down the Y-axis so the upper body is visible
    const baseScale = 0.6;
    
    const ctx = gsap.context(() => {
      // 1. Initial Pose when entering the Portfolio section
      // Adjusted Y position to -1.0 to drag the dog down into the absolute center of the viewport
      gsap.set(modelRef.current!.position, { x: 0, y: -1.0, z: 0 });
      gsap.set(modelRef.current!.rotation, { x: 0, y: Math.PI + 0.5, z: 0 });
      gsap.set(modelRef.current!.scale, { x: baseScale, y: baseScale, z: baseScale });

      // Create a timeline that spans the Portfolio section's scroll height
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=300%", // Match the ending length with the PortfolioSection pinning distance seamlessly!
          scrub: 1, // Smooth scrolling effect
        },
      });

      // The gallery dog movement!
      tl.to(modelRef.current!.position, { x: -1.5, ease: "power1.inOut", duration: 2 }, 0)
        .to(modelRef.current!.rotation, { y: Math.PI * 1.5, ease: "none", duration: 3 }, 0)
        
        // Move right for BOLDER
        .to(modelRef.current!.position, { x: 1.5, ease: "power1.inOut", duration: 3 }, 3)
        .to(modelRef.current!.rotation, { y: Math.PI * 2.5, ease: "none", duration: 3 }, 3)
        
        // Move center back for BETTER
        .to(modelRef.current!.scale, { x: baseScale * 1.2, y: baseScale * 1.2, z: baseScale * 1.2, ease: "power1.inOut", duration: 2 }, 6)
        .to(modelRef.current!.position, { x: 0, y: -1.2, z: 0.5, ease: "power1.inOut", duration: 2 }, 6)
        .to(modelRef.current!.rotation, { y: Math.PI * 3, x: 0.2, ease: "power1.inOut", duration: 2 }, 6);

    });

    return () => ctx.revert();
  }, [triggerRef]);

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/shiba.glb");

interface SceneProps {
  triggerRef: React.RefObject<HTMLElement | null>;
}

export default function Scene({ triggerRef }: SceneProps) {
  return (
    <div className="w-full h-full pb-0 absolute inset-0 z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Model triggerRef={triggerRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
