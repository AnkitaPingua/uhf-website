"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";


export default function OpeningAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const centerNavRef = useRef<HTMLDivElement>(null);
  const rightNavRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationDone(true);
      }
    });

    gsap.set(logoRef.current, { opacity: 0, scale: 7.5, xPercent: -50, yPercent: -50 });
    gsap.set(logoTextRef.current, { opacity: 0, x: -10 });

    // Logo appears and zooms in more (accelerating to connect seamlessly with the next movement)
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 11, // Zoom in
      duration: 1.8,
      ease: "power2.in"
    });

    // Move Logo perfectly diagonally without stopping
    tl.to(logoRef.current, {
      top: "10px", // Match final position
      left: "24px",
      xPercent: 0,
      yPercent: 0,
      scale: 1, // Reset to natural 100px size
      duration: 1.2,
      ease: "power4.out"
    });

    // Reveal Navbar Text & Links
    gsap.set([logoTextRef.current, centerNavRef.current, rightNavRef.current], { opacity: 0, y: 10 });
    tl.to([logoTextRef.current, centerNavRef.current, rightNavRef.current], {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=1.0");

  }, []);

  return (
    <>
      {/* Background Overlay that fades out after animation */}
      {!animationDone && (
        <div ref={containerRef} className="fixed inset-0 z-40 bg-[#050505] overflow-hidden flex items-center justify-center pointer-events-none">
        </div>
      )}

      {/* Persistent Navbar */}
      <div
        ref={navbarRef}
        className={`fixed top-0 left-0 w-full h-[120px] px-6 lg:px-12 flex items-center justify-between z-50 transition-all duration-500 ${scrolled ? "bg-[#0B0B0B] border-b border-white/5 shadow-xl" : "bg-transparent"}`}
      >
        {/* Animated Logo */}
        <img
          ref={logoRef}
          src="/logo-enhanced.png"
          alt="Logo"
          className={`fixed z-50 object-contain rounded-full ${animationDone ? "" : "pointer-events-none"}`}
          style={{
            top: animationDone ? "10px" : "50%",
            left: animationDone ? "24px" : "50%",
            transform: animationDone ? "none" : "translate(-50%, -50%) scale(7.5)",
            width: "70px",
            height: "70px",
            opacity: animationDone ? 1 : 0
          }}
        />

        {/* Logo Text */}
        <div ref={logoTextRef} className="ml-[120px] flex flex-col pointer-events-auto">
          <span className="font-inter font-medium text-[13px] uppercase tracking-[0.22em] text-[#F5F2EB] leading-tight">UNITED H.O.P.E</span>
          <span className="font-inter font-medium text-[13px] uppercase tracking-[0.22em] text-[#F5F2EB] opacity-60 leading-tight">FOUNDATION</span>
        </div>

        {/* Center Navigation */}
        <div ref={centerNavRef} className="hidden lg:flex items-center space-x-[36px] pointer-events-auto ml-auto mr-12">
          {["Home", "About", "Our Work", "Stories", "Volunteer", "Events", "Contact"].map((item) => (
            <a key={item} href="#" className="font-inter font-medium text-[11px] tracking-[0.2em] text-white/78 hover:text-white hover:opacity-100 opacity-80 uppercase transition-all duration-400 relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
            </a>
          ))}
        </div>

        {/* Right Navigation */}
        <div ref={rightNavRef} className="flex items-center space-x-4 pointer-events-auto">
          <a href="#" className="font-inter font-semibold text-[11px] tracking-[0.18em] uppercase border border-white/20 text-white px-5 h-[36px] flex items-center rounded-full hover:bg-white hover:text-black transition-all duration-300">
            Log In
          </a>
          <a href="#" className="font-inter font-semibold text-[11px] tracking-[0.18em] uppercase border border-white/20 text-white px-5 h-[36px] flex items-center rounded-full hover:bg-white hover:text-black transition-all duration-300">
            Sign In
          </a>
        </div>
      </div>
    </>
  );
}
