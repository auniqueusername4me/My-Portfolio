import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const containerRef = useRef(null);
    const elementsRef = useRef([]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    useGSAP(() => {
        gsap.set(elementsRef.current, { opacity: 0, y: 50 });

        gsap.to(elementsRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    });

    const addToRefs = (el) => {
        if (el && !elementsRef.current.includes(el)) {
            elementsRef.current.push(el);
        }
    };

    return (
        <footer 
            ref={containerRef} 
            className="w-full bg-[#FFEED6] text-[#2E2019] pt-24 pb-12 overflow-hidden border-t-4 border-[#2E2019]"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                
                {/* Left Column: THE END */}
                <div 
                    ref={addToRefs} 
                    className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
                >
                    <h2 className="font-['Fredoka'] text-5xl sm:text-6xl lg:text-7xl font-black mb-4 tracking-wide text-[#E2725B]">
                        THE END
                    </h2>
                    <p className="font-['Caveat'] text-2xl sm:text-3xl opacity-80 max-w-[200px] leading-snug">
                        [ Or the beginning of us working together? ]
                    </p>
                </div>

                {/* Central Column: The Banner Box */}
                <div 
                    ref={addToRefs} 
                    className="lg:col-span-6 order-1 lg:order-2 flex justify-center"
                >
                    <div className="w-full max-w-lg bg-[#FFF7EB] border-4 border-[#2E2019] rounded-[2rem] overflow-hidden shadow-[10px_10px_0px_#2E2019] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[15px_15px_0px_#2E2019] flex flex-col">
                        
                        {/* Marquee Ticker */}
                        <div className="bg-[#2E2019] text-[#FFEED6] font-['Fredoka'] py-2 border-b-4 border-[#2E2019] flex overflow-hidden whitespace-nowrap">
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
                            
                            {/* Inner Border */}
                            <div className="absolute inset-4 border-2 border-dashed border-[#FFEED6]/40 rounded-xl pointer-events-none"></div>
                            
                            {/* Simulated idea-to-code badge */}
                            <div className="z-10 bg-[#2E2019] text-[#FFEED6] px-8 py-6 rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500 flex flex-col items-center gap-3">
                                <span className="font-['Caveat'] text-4xl text-[#E2725B]">Idea</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                    <line x1="12" y1="4" x2="12" y2="20"></line>
                                    <polyline points="18 14 12 20 6 14"></polyline>
                                </svg>
                                <span className="font-['Fredoka'] text-2xl tracking-wide">Code</span>
                            </div>
                        </div>

                        {/* Signature Tag */}
                        <div className="bg-[#FFF7EB] py-3 text-center border-t-4 border-[#2E2019]">
                            <p className="font-['Fredoka'] font-bold text-sm tracking-wider text-[#2E2019]">
                                © {new Date().getFullYear()} AYUSH PACHOURI
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: SAY HEY */}
                <div 
                    ref={addToRefs} 
                    className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right order-3 lg:order-3"
                >
                    <h2 className="font-['Fredoka'] text-5xl sm:text-6xl lg:text-7xl font-black mb-4 tracking-wide text-[#E2725B]">
                        SAY HEY
                    </h2>
                    <p className="font-['Plus_Jakarta_Sans'] font-bold text-sm sm:text-base opacity-70 uppercase max-w-[240px] mb-8 leading-relaxed">
                        [ Available for projects, chats, or just a really long debate about system design ]
                    </p>
                    
                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <a 
                            href="mailto:your.email@example.com" 
                            className="p-3 border-2 border-[#2E2019] rounded-full text-[#2E2019] hover:bg-[#E2725B] hover:text-[#FFEED6] hover:border-[#E2725B] transition-all duration-300 transform hover:scale-110"
                            aria-label="Email"
                        >
                            <Mail size={24} />
                        </a>
                        <a 
                            href="https://github.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 border-2 border-[#2E2019] rounded-full text-[#2E2019] hover:bg-[#E2725B] hover:text-[#FFEED6] hover:border-[#E2725B] transition-all duration-300 transform hover:scale-110"
                            aria-label="GitHub"
                        >
                            <Github size={24} />
                        </a>
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 border-2 border-[#2E2019] rounded-full text-[#2E2019] hover:bg-[#E2725B] hover:text-[#FFEED6] hover:border-[#E2725B] transition-all duration-300 transform hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a 
                            href="https://instagram.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 border-2 border-[#2E2019] rounded-full text-[#2E2019] hover:bg-[#E2725B] hover:text-[#FFEED6] hover:border-[#E2725B] transition-all duration-300 transform hover:scale-110"
                            aria-label="Instagram"
                        >
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* CSS for Marquee Animation */}
            <style jsx="true">{`
                .marquee-content {
                    animation: marquee 10s linear infinite;
                }
                
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
