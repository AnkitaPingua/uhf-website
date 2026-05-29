"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function OpeningAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const birdRef = useRef<HTMLImageElement>(null);
  const unitedRef = useRef<HTMLDivElement>(null);
  const hopeRef = useRef<HTMLDivElement>(null);
  const foundationRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const navLogoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const [scrolled, setScrolled] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setAnimationDone(true)
    });
    tl.timeScale(1.3);

    const el = compositionRef.current!;
    const elW = el.offsetWidth;
    const elH = el.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Start: centered on screen
    const startX = vw / 2 - elW / 2;
    const startY = vh / 2 - elH / 2;

    // End: top-left, scaled down to fit navbar
    // The navbar logo (logo-enhanced.png) will be 68px × 68px at top: 6px, left: 24px
    // We want the composition to move to roughly that area
    const endScale = 0.36;
    const desiredCenterX = 24 + 34; // left:24px + half of 68px logo
    const desiredCenterY = 6 + 34;  // top:6px + half of 68px logo
    // With GSAP default center-origin transform:
    // visual center = startX + elW/2 + (x - startX) after animation... 
    // Actually: element left=0, top=0. With transform x=endX:
    // visual left edge = endX, visual center = endX + elW/2
    // But scaled: visual center stays at endX + elW/2, rendered half-width = elW*endScale/2
    // So: desiredCenterX = endX + elW/2
    const endX = desiredCenterX - elW / 2;
    const endY = desiredCenterY - elH / 2;

    gsap.set(compositionRef.current, { x: startX, y: startY, scale: 1, force3D: true });
    gsap.set(birdRef.current, { opacity: 0, scale: 0.92 });
    gsap.set([unitedRef.current, hopeRef.current, foundationRef.current], { opacity: 0, y: 6 });
    gsap.set(taglineRef.current, { opacity: 0 });
    gsap.set(highlightRef.current, { opacity: 0 });
    gsap.set(navLogoRef.current, { opacity: 0 });
    gsap.set(navLinksRef.current, { opacity: 0, y: -6 });

    // STEP 1: Bird appears
    tl.to(birdRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" });

    // STEP 2: UNITED
    tl.to(unitedRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "+=0.35");

    // STEP 3: H.O.P.E
    tl.to(hopeRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "+=0.2");

    // STEP 4: FOUNDATION
    tl.to(foundationRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "+=0.2");

    // STEP 5: TAGLINE
    tl.to(taglineRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, "+=0.2");

    // STEP 6: HIGHLIGHT
    tl.to(highlightRef.current, { opacity: 1, duration: 1.0, ease: "power2.inOut" }, "-=0.2");

    // Hold
    tl.to({}, { duration: 0.6 });

    // STEP 7: Move composition toward top-left WHILE fading it out mid-journey
    // This prevents the "going inside circle" glitch — composition never fully arrives
    tl.to(highlightRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" }, "move");

    // Move only partway toward top-left (60% of the distance)
    const midX = startX + (endX - startX) * 0.6;
    const midY = startY + (endY - startY) * 0.6;

    tl.to(compositionRef.current, {
      x: midX,
      y: midY,
      scale: endScale * 1.4, // scale down but not all the way
      opacity: 0,
      duration: 0.85,
      ease: "power2.inOut",
      force3D: true,
    }, "move");

    // Fade out bg overlay
    tl.to(containerRef.current, { opacity: 0, duration: 0.65, ease: "power2.inOut" }, "move+=0.15");

    // Navbar logo fades in at its fixed position
    tl.to(navLogoRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, "move+=0.5");

    // Navbar links reveal
    tl.to(navLinksRef.current, {
      opacity: 1, y: 0,
      duration: 0.7, stagger: 0.07, ease: "power2.out"
    }, "move+=0.55");

  }, []);

  const navItems = ["Home", "About", "Stories", "Events", "Volunteer", "Donate", "Log In", "Sign Up"];
  const isButton = (item: string) => ["Donate", "Log In", "Sign Up"].includes(item);

  const getHref = (item: string) => {
    switch (item) {
      case "Log In": return "/login";
      case "Sign Up": return "/signup";
      case "Donate": return "/donate";
      case "Home": return "/";
      default: return "#";
    }
  };

  return (
    <>
      {/* Matte black overlay */}
      {!animationDone && (
        <div ref={containerRef} className="fixed inset-0 z-40 bg-[#0B0B0B] pointer-events-none" />
      )}

      {/* ── NAVBAR ── */}
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-[45] flex items-center justify-between px-6 lg:px-10 transition-colors duration-500 ${scrolled ? "bg-[#0B0B0B] border-b border-white/5" : "bg-transparent"
          }`}
      >
        {/* Navbar Logo — circular + text beside it */}
        <div
          ref={navLogoRef}
          className="flex items-center gap-4 opacity-0 cursor-pointer"
        >
          {/* Hamburger Menu Icon (Mobile Only) */}
          <div className="lg:hidden flex flex-col justify-center gap-[5px] mr-2">
            <span className="w-6 h-[2px] bg-white block rounded-full"></span>
            <span className="w-6 h-[2px] bg-white block rounded-full"></span>
            <span className="w-6 h-[2px] bg-white block rounded-full"></span>
          </div>

          {/* Circular logo */}
          <div
            className="w-[62px] h-[62px] rounded-full overflow-hidden flex-shrink-0"
            style={{
              border: "1.5px solid rgba(255, 255, 255, 0.45)",
              boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.08)",
            }}
          >
            <img
              src="/logo-enhanced.png"
              alt="UNITED H.O.P.E FOUNDATION"
              className="w-full h-full object-cover scale-[1.18]"
            />
          </div>

          {/* Text beside logo */}
          <div className="flex flex-col justify-center hidden sm:flex">
            <div className="flex items-baseline gap-0 leading-none mb-[2px]">
              <span className="font-cormorant font-light text-[15px] tracking-[0.18em] text-white/95 uppercase">
                UNITED&nbsp;H.O.P.E&nbsp;FOUNDATION
              </span>
            </div>

          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-6 lg:gap-8">
          {navItems.map((item, i) => (
            <a
              key={item}
              href={getHref(item)}
              ref={(el) => { navLinksRef.current[i] = el; }}
              className={`opacity-0 font-inter font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-300 relative group ${item === "Donate"
                ? "border border-[#F1A42F] text-[#F1A42F] px-5 h-[34px] flex items-center rounded-full hover:bg-[#F1A42F] hover:text-[#0B0B0B]"
                : isButton(item)
                  ? "border border-white/25 text-white px-5 h-[34px] flex items-center rounded-full hover:bg-white hover:text-black"
                  : "text-white/75 hover:text-white"
                }`}
            >
              {item}
              {!isButton(item) && (
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </a>
          ))}
        </div>
      </div>

      {/* ── OPENING ANIMATION COMPOSITION (centered) ── */}
      <div
        ref={compositionRef}
        className="fixed top-0 left-0 z-50 flex flex-col items-center pointer-events-none"
        style={{ width: "300px", willChange: "transform" }}
      >
        {/* Ambient highlight */}
        <div
          ref={highlightRef}
          className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full pointer-events-none opacity-0"
          style={{
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Bird */}
        <img
          ref={birdRef}
          src="/birdmain.png"
          alt="Hummingbird"
          className="w-[110px] h-[110px] object-contain mb-4 opacity-0 relative z-10"
          style={{ mixBlendMode: "screen" }}
        />

        {/* Typography */}
        <div className="flex flex-col items-center text-center relative z-10 w-full">
          <div ref={unitedRef} className="font-inter font-light text-[28px] uppercase tracking-[0.2em] pl-[0.2em] text-white leading-none mb-1 opacity-0">
            UNITED
          </div>
          <div ref={hopeRef} className="font-inter font-light text-[28px] uppercase tracking-[0.18em] pl-[0.18em] leading-none mb-2 flex justify-center opacity-0">
            <span style={{ color: "#27aae1" }}>H.</span>
            <span style={{ color: "#8cc63f" }}>O.</span>
            <span style={{ color: "#f7931e" }}>P.</span>
            <span style={{ color: "#ed1c24" }}>E</span>
          </div>
          <div ref={foundationRef} className="font-inter font-light text-[15px] uppercase tracking-[0.28em] pl-[0.28em] text-white leading-none mb-3 opacity-0">
            FOUNDATION
          </div>
          <div ref={taglineRef} className="font-inter font-light text-[7.5px] uppercase tracking-[0.18em] pl-[0.18em] translate-x-[3px] text-white/60 leading-none opacity-0 whitespace-nowrap">
            HUMANITY.OPPORTUNITY.PEOPLE.EDUCATION
          </div>
        </div>
      </div>
    </>
  );
}
