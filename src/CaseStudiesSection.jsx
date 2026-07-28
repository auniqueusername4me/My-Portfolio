import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EcommerceCaseStudy from "./EcommerceCaseStudy";
import AiCaseStudy from "./AiCaseStudy";
import OsCaseStudy from "./OsCaseStudy";
import PlaneCaseStudy from "./PlaneCaseStudy";
import ShoppingNetImg from "./assets/eshopping.png";
import AiThumbnailImg from "./assets/ai_thumbnail.jpg";
import WindowsImg from "./assets/Windows.jpg";
import EngineImg from "./assets/Engine.jpg";
import CloudImg from "./assets/pngwing.com.png";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudiesSection() {
    const [activeStudy, setActiveStudy] = useState(null);
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subTitleRef = useRef(null);
    const rowsRef = useRef([]);

    // Intro scatter animation runs exactly once — never on back-navigation
    const hasAnimatedRef = useRef(false);

    const addToRowsRef = (el) => {
        if (el && !rowsRef.current.includes(el)) rowsRef.current.push(el);
    };

    const titleText = "Case Studies";
    const subTitleText = "Just something I yearn to know";

    const renderWords = (text, className = "case-body-word inline-block") => {
        return text.split(" ").map((word, i, arr) => (
            <span key={i} className={className}>
                {word}{i < arr.length - 1 ? "\u00A0" : ""}
            </span>
        ));
    };

    useGSAP(() => {
        const titleChars = titleRef.current.querySelectorAll(".char");
        gsap.fromTo(
            titleChars,
            { opacity: 0, x: () => gsap.utils.random(-50, 50), y: () => gsap.utils.random(-50, 50), rotation: () => gsap.utils.random(-45, 45) },
            {
                opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                    end: "bottom top",
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        const subWords = subTitleRef.current.querySelectorAll(".word");
        gsap.fromTo(
            subWords,
            { opacity: 0, scale: 0.2, y: 20 },
            {
                opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "back.out(2)",
                scrollTrigger: {
                    trigger: subTitleRef.current,
                    start: "top 85%",
                    end: "bottom top",
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        rowsRef.current.forEach((row, i) => {
            if (!row) return;
            const cardEl = row.querySelector(".case-card-box");
            const headingWords = row.querySelectorAll(".case-heading-word");
            const bodyWords = row.querySelectorAll(".case-body-word");

            const isCardOnRight = i % 2 === 0;
            const cardStartX = isCardOnRight ? 320 : -320;
            const textStartX = isCardOnRight ? -150 : 150;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    end: "bottom top",
                    toggleActions: "play reverse play reverse"
                }
            });

            // Card container slides in from outside the screen to inside
            if (cardEl) {
                tl.fromTo(
                    cardEl,
                    { opacity: 0, x: cardStartX, scale: 0.9 },
                    { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: "back.out(1.2)" },
                    0
                );
            }

            // Heading text words quick stagger
            if (headingWords.length > 0) {
                tl.fromTo(
                    headingWords,
                    { opacity: 0, x: textStartX, y: 15, scale: 0.85 },
                    { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.35, stagger: 0.03, ease: "back.out(1.5)" },
                    0.1
                );
            }

            // Overview paragraph words quick low-delay stagger animation
            if (bodyWords.length > 0) {
                tl.fromTo(
                    bodyWords,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.22, stagger: 0.015, ease: "power2.out" },
                    0.2
                );
            }
        });

        // Bold dark brown divider lines draw once and stay in place (no slide out)
        const dividerLines = containerRef.current.querySelectorAll(".case-divider-line");
        dividerLines.forEach((line) => {
            gsap.fromTo(
                line,
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: line,
                        start: "top bottom",
                        once: true
                    }
                }
            );
        });
    }, []); // empty deps — runs once on first mount, never again

    return (
        <>
            {/* ── Main section — always rendered so back-nav lands here ── */}
            <div
                id="case-studies-section"
                ref={containerRef}
                className="min-h-screen w-full bg-[#FFEED6] px-6 py-24 sm:px-16 flex flex-col items-center relative z-30 overflow-x-hidden"
            >
                <div className="w-full max-w-6xl flex flex-col items-end mb-16 select-none text-right">
                    <h2
                        ref={titleRef}
                        className="font-['Caveat'] text-6xl sm:text-8xl font-bold text-[#2E2019] mb-4 flex flex-wrap justify-end w-full"
                    >
                        {titleText.split("").map((char, i) => (
                            <span key={i} className="char inline-block" style={{ width: char === " " ? "0.3em" : "auto" }}>
                                {char}
                            </span>
                        ))}
                    </h2>

                    <h3
                        ref={subTitleRef}
                        className="font-['Fredoka'] text-2xl sm:text-4xl font-bold text-[#2E2019]/80 flex flex-wrap justify-end gap-x-2 w-full"
                    >
                        {subTitleText.split(" ").map((word, i) => (
                            <span key={i} className="word inline-block">{word}</span>
                        ))}
                    </h3>
                </div>

                <div className="w-full max-w-6xl flex flex-col gap-24 lg:gap-32">

                    {/* Row 1 — E-commerce */}
                    <div ref={addToRowsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                        <div className="order-2 md:order-1 flex flex-col justify-center text-left pr-0 md:pr-8">
                            <h4 className="font-['Fredoka'] text-3xl sm:text-5xl font-bold text-[#2E2019] mb-4 md:mb-6 leading-tight flex flex-wrap">
                                {renderWords("The Architecture of Commerce", "case-heading-word inline-block")}
                            </h4>
                            <p className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl text-[#2E2019]/80 font-semibold leading-relaxed flex flex-wrap">
                                {renderWords("An intricate dance of distributed systems. From the moment you click 'Buy', a complex symphony of payment gateways, inventory management, and logistics routing executes in milliseconds. Explore the architecture that powers modern digital commerce.", "case-body-word inline-block")}
                            </p>
                        </div>
                        <div className="case-card-box order-1 md:order-2 relative group cursor-pointer w-full aspect-[4/3]" onClick={() => setActiveStudy("ecommerce")}>
                            <div className="absolute inset-0 bg-white shadow-lg rounded-3xl sm:rounded-[2rem] translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />
                            <div className="absolute inset-0 bg-[#2E2019] rounded-3xl sm:rounded-[2rem] border border-[#2E2019]/10 shadow-xl overflow-hidden flex flex-col justify-end p-6 sm:p-8 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                                <img src={ShoppingNetImg} alt="E-commerce Case Study Cover" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2E2019] via-[#2E2019]/80 to-transparent pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="bg-[#FFEED6] text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">Web Development</span>
                                        <span className="bg-[#FFEED6]/90 text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">System Architecture</span>
                                        <span className="bg-[#FFEED6]/80 text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">Backend &amp; APIs</span>
                                    </div>
                                    <h4 className="font-['Plus_Jakarta_Sans'] text-[#FFEED6] text-2xl sm:text-3xl font-bold leading-tight mb-2">How do e-commerce websites work?</h4>
                                    <p className="font-['Plus_Jakarta_Sans'] text-[#FFEED6]/70 text-sm sm:text-base font-medium flex items-center justify-between">
                                        What happens when you hit Buy Now?
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 transform transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dark Brown Divider Line 1 */}
                    <div className="w-full flex justify-center items-center py-4">
                        <div className="case-divider-line w-full max-w-5xl h-[4px] sm:h-[6px] bg-[#2E2019] rounded-full origin-left opacity-0 scale-x-0" />
                    </div>

                    {/* Row 2 — AI */}
                    <div ref={addToRowsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                        <div className="case-card-box order-1 md:order-1 relative group cursor-pointer w-full aspect-[4/3]" onClick={() => setActiveStudy("ai")}>
                            <div className="absolute inset-0 bg-[#9CAF88] rounded-3xl sm:rounded-[2rem] translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />
                            <div className="absolute inset-0 bg-[#2E2019] rounded-3xl sm:rounded-[2rem] border border-[#2E2019]/10 shadow-xl overflow-hidden flex flex-col justify-end p-6 sm:p-8 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                                <img src={AiThumbnailImg} alt="AI Case Study Cover" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/70 to-transparent pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="bg-[#FFEED6] text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">AI &amp; ML</span>
                                        <span className="bg-[#FFEED6]/90 text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">LLM Architecture</span>
                                        <span className="bg-[#FFEED6]/80 text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">Neural Networks</span>
                                    </div>
                                    <h4 className="font-['Plus_Jakarta_Sans'] text-[#FFEED6] text-2xl sm:text-3xl font-bold leading-tight mb-2">How does AI actually work?</h4>
                                    <p className="font-['Plus_Jakarta_Sans'] text-[#FFEED6]/70 text-sm sm:text-base font-medium flex items-center justify-between">
                                        GPT, Claude, All of It
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 transform transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="order-2 md:order-2 flex flex-col justify-center text-left md:text-right pl-0 md:pl-8">
                            <h4 className="font-['Fredoka'] text-3xl sm:text-5xl font-bold text-[#2E2019] mb-4 md:mb-6 leading-tight flex flex-wrap md:justify-end">
                                {renderWords("Beyond the Magic", "case-heading-word inline-block")}
                            </h4>
                            <p className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl text-[#2E2019]/80 font-semibold leading-relaxed flex flex-wrap md:justify-end">
                                {renderWords("It's not magic, it's mathematics. Dive into the neural architectures and transformer models that enable machines to understand, generate, and reason with human language at an unprecedented scale.", "case-body-word inline-block")}
                            </p>
                        </div>
                    </div>

                    {/* Dark Brown Divider Line 2 */}
                    <div className="w-full flex justify-center items-center py-4">
                        <div className="case-divider-line w-full max-w-5xl h-[4px] sm:h-[6px] bg-[#2E2019] rounded-full origin-left opacity-0 scale-x-0" />
                    </div>

                    {/* Row 3 — Operating Systems */}
                    <div ref={addToRowsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                        <div className="order-2 md:order-1 flex flex-col justify-center text-left pr-0 md:pr-8">
                            <h4 className="font-['Fredoka'] text-3xl sm:text-5xl font-bold text-[#2E2019] mb-4 md:mb-6 leading-tight flex flex-wrap">
                                {renderWords("The Invisible Conductor", "case-heading-word inline-block")}
                            </h4>
                            <p className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl text-[#2E2019]/80 font-semibold leading-relaxed flex flex-wrap">
                                {renderWords("Beneath the polished interfaces lies a robust kernel orchestrating memory, hardware interrupts, and process scheduling—ensuring seamless execution of every application you use daily.", "case-body-word inline-block")}
                            </p>
                        </div>
                        <div className="case-card-box order-1 md:order-2 relative group cursor-pointer w-full aspect-[4/3]" onClick={() => setActiveStudy("os")}>
                            <div className="absolute inset-0 bg-white shadow-lg rounded-3xl sm:rounded-[2rem] translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />
                            <div className="absolute inset-0 bg-[#2E2019] rounded-3xl sm:rounded-[2rem] border border-[#2E2019]/10 shadow-xl overflow-hidden flex flex-col justify-end p-6 sm:p-8 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                                <img src={WindowsImg} alt="OS Case Study Cover" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-[#0d0f17]/70 to-transparent pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="bg-[#FFEED6] text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">Operating Systems</span>
                                        <span className="bg-[#FFEED6]/90 text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">Kernel Architecture</span>
                                        <span className="bg-[#FFEED6]/80 text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">Process &amp; Memory</span>
                                    </div>
                                    <h4 className="font-['Plus_Jakarta_Sans'] text-[#FFEED6] text-2xl sm:text-3xl font-bold leading-tight mb-2">What Is an OS, Actually?</h4>
                                    <p className="font-['Plus_Jakarta_Sans'] text-[#FFEED6]/70 text-sm sm:text-base font-medium flex items-center justify-between">
                                        The Middleman &amp; Kernel Architecture
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 transform transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dark Brown Divider Line 3 */}
                    <div className="w-full flex justify-center items-center py-4">
                        <div className="case-divider-line w-full max-w-5xl h-[4px] sm:h-[6px] bg-[#2E2019] rounded-full origin-left opacity-0 scale-x-0" />
                    </div>

                    {/* Row 4 — Aerodynamics / Jet Physics */}
                    <div ref={addToRowsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center w-full mt-10 md:mt-0">
                        <div className="case-card-box order-1 md:order-1 relative group cursor-pointer w-full aspect-[4/3]" onClick={() => setActiveStudy("plane")}>
                            {/* ── Thought bubble cloud on Case Studies section ── */}
                            <div className="absolute -top-16 sm:-top-40 left-[62%] -translate-x-1/2 z-30 pointer-events-none select-none">
                                <div className="relative w-[260px] sm:w-[340px] h-auto">
                                    <img src={CloudImg} alt="thought bubble" className="w-full h-auto drop-shadow-xl" />
                                    <div className="absolute inset-0 flex items-center justify-center pb-5 sm:pt-6 px-5 sm:px-10 sm:pl-15">
                                        <p className="text-black text-[13px] sm:text-lg font-bold text-center leading-tight tracking-wide" style={{ fontFamily: "'Caveat', cursive" }}>
                                            This is completely off concept of what I am learning, I only fetched info out of curosity.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-[#E8B4B8] rounded-3xl sm:rounded-[2rem] translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />
                            <div className="absolute inset-0 bg-[#2E2019] rounded-3xl sm:rounded-[2rem] border border-[#2E2019]/10 shadow-xl overflow-hidden flex flex-col justify-end p-6 sm:p-8 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                                <img src={EngineImg} alt="Plane Case Study Cover" className="absolute inset-0 w-full h-full object-contain p-3 sm:p-5 opacity-85 group-hover:opacity-100 transition-all duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c16] via-[#0a0c16]/50 to-transparent pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="bg-[#FFEED6] text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">Physics &amp; Engineering</span>
                                        <span className="bg-[#FFEED6]/90 text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">Fluid Dynamics</span>
                                        <span className="bg-[#FFEED6]/80 text-[#2E2019] text-xs sm:text-sm font-['Fredoka'] font-bold px-3 py-1 rounded-full">Thermodynamics</span>
                                    </div>
                                    <h4 className="font-['Plus_Jakarta_Sans'] text-[#FFEED6] text-2xl sm:text-3xl font-bold leading-tight mb-2">How Does a Plane Push Through Sky?</h4>
                                    <p className="font-['Plus_Jakarta_Sans'] text-[#FFEED6]/70 text-sm sm:text-base font-medium flex items-center justify-between">
                                        Jet Engines, Thrust &amp; Lift
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400 transform transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="order-2 md:order-2 flex flex-col justify-center text-left md:text-right pl-0 md:pl-8">
                            <h4 className="font-['Fredoka'] text-3xl sm:text-5xl font-bold text-[#2E2019] mb-4 md:mb-6 leading-tight flex flex-wrap md:justify-end">
                                {renderWords("Mastering the Skies", "case-heading-word inline-block")}
                            </h4>
                            <p className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl text-[#2E2019]/80 font-semibold leading-relaxed flex flex-wrap md:justify-end">
                                {renderWords("A breakdown of how jet engines harness compression, combustion, and propulsion to generate immense thrust, defying gravity with elegant engineering.", "case-body-word inline-block")}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Case study overlay ── */}
            {activeStudy === "ecommerce" && (
                <EcommerceCaseStudy onBack={() => setActiveStudy(null)} />
            )}
            {activeStudy === "ai" && (
                <AiCaseStudy onBack={() => setActiveStudy(null)} />
            )}
            {activeStudy === "os" && (
                <OsCaseStudy onBack={() => setActiveStudy(null)} />
            )}
            {activeStudy === "plane" && (
                <PlaneCaseStudy onBack={() => setActiveStudy(null)} />
            )}
        </>
    );
}