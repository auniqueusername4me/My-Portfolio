import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AvatarImg from "./assets/avatar.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { title: "Vinyl Vault", desc: "Analog record collection tracker built with React & Node." },
    { title: "Smart Synth", desc: "MIDI controller interface using Arduino and WebSockets." },
    { title: "Brew Control", desc: "Automated espresso machine temperature regulator." },
    { title: "Echo Board", desc: "Custom mechanical keyboard firmware in C." },
];

// Helper to split text into words for animation
const SplitText = ({ children }) => {
    if (typeof children !== 'string') return children;
    return children.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] bio-word">
            {word}
        </span>
    ));
};

// Helper to split text into characters for header animation
const SplitChars = ({ children }) => {
    if (typeof children !== 'string') return children;
    return children.split("").map((char, i) => (
        <span key={i} className="inline-block header-char">
            {char === " " ? "\u00A0" : char}
        </span>
    ));
};

const AboutMeSection = React.forwardRef((props, ref) => {
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const avatarRef = useRef(null);
    const beyondTitleRef = useRef(null);
    
    // Timeline Refs
    const timelineContainerRef = useRef(null);
    const lineRef = useRef(null);
    const lineGlowRef = useRef(null);
    const nodeRefs = useRef([]);
    const nodeTextRefs = useRef([]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    useGSAP(() => {
        // --- Intro Expansion Animation ---
        gsap.set(bgRef.current, { clipPath: 'circle(0% at 50% 50%)' });
        
        const contentElements = [
            subtitleRef.current,
            timelineContainerRef.current 
        ].filter(Boolean);

        gsap.set(contentElements, { opacity: 0, y: 50 });
        gsap.set('.bio-word', { opacity: 0, y: 20 });
        gsap.set('.header-char', { opacity: 0, y: 40 });
        gsap.set(avatarRef.current, { opacity: 0, scale: 0.8, rotation: -5 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%", 
            }
        });

        tl.to(bgRef.current, {
            clipPath: 'circle(150% at 50% 50%)',
            duration: 1.5,
            ease: 'power3.inOut'
        })
        // Avatar pop in
        .to(avatarRef.current, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.7)"
        }, "-=1.0")
        // Header characters stagger in
        .to('.header-char', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(2)'
        }, "-=1.2")
        // Stagger basic content (subtitle, timeline container)
        .to(contentElements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
        }, "-=1.0")
        // Stagger ALL bio words with total amount optimization
        .to('.bio-word', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: {
                amount: 1.5,
                ease: "power1.out"
            },
            ease: 'power2.out'
        }, "-=0.8");

        // Continuous floating animation for avatar
        gsap.to(avatarRef.current, {
            y: -15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5 // Start after entrance
        });

        // --- Vertical Timeline Animation ---
        gsap.set(lineRef.current, { height: '0%' });
        gsap.set(lineGlowRef.current, { top: '0%', opacity: 0 });
        gsap.set(nodeRefs.current, { scale: 0.5, backgroundColor: 'transparent', borderColor: '#333' });
        gsap.set(nodeTextRefs.current, { opacity: 0, x: 30 });

        const tlTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: timelineContainerRef.current,
                start: "top 75%",
            }
        });

        tlTimeline.to(lineRef.current, {
            height: '100%',
            duration: 2,
            ease: 'none'
        });

        tlTimeline.to(lineGlowRef.current, {
            top: '100%',
            opacity: 1,
            duration: 2,
            ease: 'none'
        }, "<");

        tlTimeline.to(nodeRefs.current, {
            scale: 1,
            backgroundColor: '#E2725B',
            borderColor: '#E2725B',
            boxShadow: '0 0 20px rgba(226, 114, 91, 0.8)',
            duration: 0.5,
            stagger: {
                amount: 2 
            },
            ease: 'back.out(2)'
        }, "<");

        tlTimeline.to(nodeTextRefs.current, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: {
                amount: 2
            },
            ease: 'power2.out'
        }, "<");
    });

    const addToNodeRefs = (el, index) => {
        if (el) nodeRefs.current[index] = el;
    };

    const addToNodeTextRefs = (el, index) => {
        if (el) nodeTextRefs.current[index] = el;
    };

    return (
        <section 
            id="about-me-section"
            ref={node => {
                containerRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            }} 
            className="relative z-40 w-full min-h-screen text-[#FFEED6] overflow-hidden py-32"
        >
            <div ref={bgRef} className="absolute inset-0 bg-[#120D0A] z-0 pointer-events-none"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 flex flex-col">
                
                {/* Top Header */}
                <div className="mb-20 sm:mb-28 text-center sm:text-left border-b border-[#FFEED6]/10 pb-8">
                    <h1 ref={titleRef} className="font-['Playfair_Display'] text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-4">
                        <SplitChars>ABOUT ME</SplitChars>
                    </h1>
                    <p ref={subtitleRef} className="font-['Caveat'] text-4xl sm:text-5xl text-[#e5e5e5] opacity-80 -rotate-2 transform origin-left inline-block">
                        Too many ideas. Not enough RAM.
                    </p>
                </div>

                {/* Middle Split Section (Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 items-center">
                    
                    {/* Left Side: Avatar */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-start">
                        <div ref={avatarRef} className="w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:aspect-square rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group border-4 border-[#FFEED6]/10">
                            <img 
                                src={AvatarImg} 
                                alt="Ayush Pachouri" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#120D0A]/50 to-transparent opacity-40"></div>
                        </div>
                    </div>

                    {/* Right Side: The Bio */}
                    <div className="lg:col-span-7">
                        <div className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl text-[#cccccc] space-y-6 leading-relaxed font-light">
                            <p className="text-3xl sm:text-4xl font-medium text-white mb-8 font-['Playfair_Display']">
                                <SplitText>Hey, I'm Ayush.</SplitText>
                            </p>
                            <p>
                                <SplitText>I'm a BCA Artificial Intelligence and Machine Learning student who enjoys building things for the web.</SplitText>
                            </p>
                            <p>
                                <SplitText>My journey started with curiosity about how websites actually work.</SplitText>
                            </p>
                            <p>
                                <SplitText>What started as designing pages became an interest in components, APIs, databases, and the systems behind them.</SplitText>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Beyond Code & Timeline */}
                <div className="mt-12 w-full">
                    <h2 ref={beyondTitleRef} className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-12 border-b border-[#FFEED6]/10 pb-4 inline-block">
                        <SplitChars>BEYOND CODE</SplitChars>
                    </h2>
                    
                    <div ref={timelineContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                        
                        {/* Left Column: Narrative Text */}
                        <div className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl text-[#cccccc] space-y-6 leading-relaxed font-light">
                            <p>
                                <SplitText>When I step away from the keyboard, my brain doesn't exactly shut off—it just switches frequencies. I spend a lot of time with my guitar, trying to decode the math and mechanics behind chords and melodies. It's a lot like debugging, just with more immediate auditory feedback.</SplitText>
                            </p>
                            <p>
                                <SplitText>I also love to travel whenever I get the chance. Stepping into an unfamiliar city forces you to observe the world differently. You start noticing the architecture, the local systems, and the way people move and interact.</SplitText>
                            </p>
                            <p>
                                <SplitText>Speaking of interacting, I'm a huge advocate for networking. I love exchanging ideas and hearing how other developers tackle complex problems. I'm currently waiting for the right opportunities to dive deeper into tech communities, but I'm always open for a good conversation about anything from system design to the perfect espresso pull.</SplitText>
                            </p>
                        </div>

                        {/* Right Column: Project Timeline */}
                        <div className="relative pl-12 sm:pl-16 lg:ml-8 flex flex-col justify-between py-2 min-h-[350px]">
                            
                            <div className="absolute left-[20px] sm:left-[28px] top-4 bottom-4 w-[2px] bg-white/10 rounded-full"></div>
                            <div ref={lineRef} className="absolute left-[20px] sm:left-[28px] top-4 w-[2px] bg-gradient-to-b from-[#E2725B] to-[#CC5500] rounded-full shadow-[0_0_15px_rgba(226,114,91,0.5)] z-10"></div>
                            <div ref={lineGlowRef} className="absolute left-[17px] sm:left-[25px] w-2 h-8 bg-[#E2725B] blur-sm rounded-full z-10 -translate-y-full"></div>

                            {projects.map((project, index) => (
                                <div key={index} className="relative flex items-center mb-12 last:mb-0 z-20 group">
                                    <div 
                                        ref={(el) => addToNodeRefs(el, index)}
                                        className="absolute -left-10 sm:-left-[46px] w-5 h-5 rounded-full border-2 border-[#333] transition-colors duration-300"
                                    ></div>
                                    
                                    <div ref={(el) => addToNodeTextRefs(el, index)} className="ml-4">
                                        <h3 className="font-['Fredoka'] text-xl sm:text-2xl text-white mb-1 tracking-wide">{project.title}</h3>
                                        <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-[#a0a0a0] font-light">{project.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
});

AboutMeSection.displayName = "AboutMeSection";

export default AboutMeSection;