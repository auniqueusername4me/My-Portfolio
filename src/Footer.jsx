import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const GithubIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const InstagramIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const Footer = () => {
    const containerRef    = useRef(null);
    const leftColRef      = useRef(null);
    const rightColRef     = useRef(null);
    const centerCardRef   = useRef(null);
    const theEndRef       = useRef(null);
    const sayHeyRef       = useRef(null);
    const subTextLeftRef  = useRef(null);
    const subTextRightRef = useRef(null);
    const badgeRef        = useRef(null);
    const socialIconsRef  = useRef([]);
    const borderLineRef   = useRef(null);
    const marqueeRef      = useRef(null);
    const copyrightRef    = useRef(null);

    const addToSocialRefs = (el) => {
        if (el && !socialIconsRef.current.includes(el)) socialIconsRef.current.push(el);
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
            }
        });

        // 1. The border line draws in left-to-right like a wipe
        tl.fromTo(borderLineRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.9, ease: 'power4.inOut' }
        );

        // 2. Center card does a dramatic scale+rotate reveal from nothing
        tl.fromTo(centerCardRef.current,
            { opacity: 0, scale: 0.5, rotation: -8, y: 80 },
            { opacity: 1, scale: 1, rotation: 0, y: 0, duration: 1.1, ease: 'back.out(1.4)' },
            '-=0.4'
        );

        // 3. Marquee ticker slides down into place
        tl.fromTo(marqueeRef.current,
            { yPercent: -120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.8'
        );

        // 4. Left column: "THE END" letters slam in from the left with a big blur
        tl.fromTo(leftColRef.current,
            { x: -120, opacity: 0, filter: 'blur(12px)' },
            { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.85, ease: 'power3.out' },
            '-=0.5'
        );

        // 5. Right column: "SAY HEY" mirrors from the right
        tl.fromTo(rightColRef.current,
            { x: 120, opacity: 0, filter: 'blur(12px)' },
            { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.85, ease: 'power3.out' },
            '<'
        );

        // 6. Subtext fades up with a gentle delay
        tl.fromTo([subTextLeftRef.current, subTextRightRef.current],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
            '-=0.4'
        );

        // 7. Social icons scatter in with springy stagger
        tl.fromTo(socialIconsRef.current,
            { opacity: 0, scale: 0, rotation: -45 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' },
            '-=0.3'
        );

        // 8. The badge inside the card bounces in last
        tl.fromTo(badgeRef.current,
            { opacity: 0, y: 30, scale: 0.7 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(2)' },
            '-=0.8'
        );

        // 9. Copyright credit slides up from below
        tl.fromTo(copyrightRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.3'
        );

        // ── Continuous floating animation on the badge after entrance ──
        gsap.to(badgeRef.current, {
            y: -8,
            duration: 2.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 2,
        });

        // ── "THE END" heading: subtle perpetual pulse on the terracotta color ──
        gsap.to(theEndRef.current, {
            textShadow: '0 0 40px rgba(226,114,91,0.5)',
            duration: 1.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 2.5,
        });

        gsap.to(sayHeyRef.current, {
            textShadow: '0 0 40px rgba(226,114,91,0.5)',
            duration: 1.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 2.9,
        });

    }, { scope: containerRef });

    return (
        <footer
            ref={containerRef}
            className="relative z-40 w-full bg-[#FFEED6] text-[#2E2019] pt-24 pb-12 overflow-hidden"
        >
            {/* Animated top border line */}
            <div ref={borderLineRef} className="w-full h-[4px] bg-[#2E2019] mb-0 origin-left" />

            <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-16">

                {/* Left Column: THE END */}
                <div
                    ref={leftColRef}
                    className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
                >
                    <h2
                        ref={theEndRef}
                        className="font-['Fredoka'] text-5xl sm:text-6xl lg:text-7xl font-black mb-4 tracking-wide text-[#E2725B]"
                    >
                        THE END
                    </h2>
                    <p ref={subTextLeftRef} className="font-['Caveat'] text-2xl sm:text-3xl opacity-80 max-w-[200px] leading-snug">
                        [ Or the beginning of us working together? ]
                    </p>
                </div>

                {/* Central Column: The Banner Box */}
                <div
                    ref={centerCardRef}
                    className="lg:col-span-6 order-1 lg:order-2 flex justify-center"
                >
                    <div className="w-full max-w-lg bg-[#FFF7EB] border-4 border-[#2E2019] rounded-[2rem] overflow-hidden shadow-[10px_10px_0px_#2E2019] hover:-translate-y-2 hover:shadow-[18px_18px_0px_#2E2019] transition-all duration-500 flex flex-col">

                        {/* Marquee Ticker */}
                        <div ref={marqueeRef} className="bg-[#2E2019] text-[#FFEED6] font-['Fredoka'] py-2 border-b-4 border-[#2E2019] flex overflow-hidden whitespace-nowrap">
                            <div className="marquee-content inline-flex gap-4">
                                <span>✦ ...that was my portfolio ✦</span>
                                <span>✦ ...that was my portfolio ✦</span>
                                <span>✦ ...that was my portfolio ✦</span>
                                <span>✦ ...that was my portfolio ✦</span>
                            </div>
                        </div>

                        {/* Central Artwork Area */}
                        <div className="relative aspect-[4/3] bg-[#E2725B] flex flex-col items-center justify-center p-8 group overflow-hidden">
                            {/* Grid Texture */}
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,238,214,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,238,214,0.4)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                            {/* Decorative spinning rings */}
                            <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-[#FFEED6]/25 spin-slow pointer-events-none"></div>
                            <div className="absolute w-64 h-64 rounded-full border border-dotted border-[#FFEED6]/15 spin-reverse pointer-events-none"></div>

                            {/* Inner Border */}
                            <div className="absolute inset-4 border-2 border-dashed border-[#FFEED6]/40 rounded-xl pointer-events-none"></div>

                            {/* Idea-to-code badge */}
                            <div ref={badgeRef} className="z-10 bg-[#2E2019] text-[#FFEED6] px-8 py-6 rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500 flex flex-col items-center gap-3">
                                <span className="font-['Caveat'] text-4xl text-[#E2725B]">Idea</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                    <line x1="12" y1="4" x2="12" y2="20"></line>
                                    <polyline points="18 14 12 20 6 14"></polyline>
                                </svg>
                                <span className="font-['Fredoka'] text-2xl tracking-wide">Code</span>
                            </div>
                        </div>

                        {/* Signature Tag */}
                        <div ref={copyrightRef} className="bg-[#FFF7EB] py-3 text-center border-t-4 border-[#2E2019]">
                            <p className="font-['Fredoka'] font-bold text-sm tracking-wider text-[#2E2019]">
                                © {new Date().getFullYear()} AYUSH PACHOURI
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: SAY HEY */}
                <div
                    ref={rightColRef}
                    className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right order-3 lg:order-3"
                >
                    <h2
                        ref={sayHeyRef}
                        className="font-['Fredoka'] text-5xl sm:text-6xl lg:text-7xl font-black mb-4 tracking-wide text-[#E2725B]"
                    >
                        SAY HEY
                    </h2>
                    <p ref={subTextRightRef} className="font-['Plus_Jakarta_Sans'] font-bold text-sm sm:text-base opacity-70 uppercase max-w-[240px] mb-8 leading-relaxed">
                        [ Available for projects, chats, or just a really long debate about system design ]
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <a
                            ref={addToSocialRefs}
                            href="mailto:pachouriayush1769@gmail.com"
                            className="p-3 border-2 border-[#2E2019] rounded-full text-[#2E2019] hover:bg-[#E2725B] hover:text-[#FFEED6] hover:border-[#E2725B] hover:scale-125 hover:rotate-6 transition-all duration-300"
                            aria-label="Email"
                        >
                            <Mail size={24} />
                        </a>
                        <a
                            ref={addToSocialRefs}
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 border-2 border-[#2E2019] rounded-full text-[#2E2019] hover:bg-[#E2725B] hover:text-[#FFEED6] hover:border-[#E2725B] hover:scale-125 hover:-rotate-6 transition-all duration-300"
                            aria-label="GitHub"
                        >
                            <GithubIcon size={24} />
                        </a>
                        <a
                            ref={addToSocialRefs}
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 border-2 border-[#2E2019] rounded-full text-[#2E2019] hover:bg-[#E2725B] hover:text-[#FFEED6] hover:border-[#E2725B] hover:scale-125 hover:rotate-6 transition-all duration-300"
                            aria-label="LinkedIn"
                        >
                            <LinkedinIcon size={24} />
                        </a>
                        <a
                            ref={addToSocialRefs}
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 border-2 border-[#2E2019] rounded-full text-[#2E2019] hover:bg-[#E2725B] hover:text-[#FFEED6] hover:border-[#E2725B] hover:scale-125 hover:-rotate-6 transition-all duration-300"
                            aria-label="Instagram"
                        >
                            <InstagramIcon size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* CSS */}
            <style>{`
                .marquee-content {
                    animation: marquee 10s linear infinite;
                }
                @keyframes marquee {
                    0%   { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .spin-slow {
                    animation: spin-slow 18s linear infinite;
                }
                .spin-reverse {
                    animation: spin-slow 25s linear infinite reverse;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
