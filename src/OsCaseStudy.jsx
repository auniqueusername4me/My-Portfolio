import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function OsCaseStudy({ onBack }) {
    const containerRef = useRef(null);

    // ── Stop wheel / touch events from bubbling to the main-page window handler ──
    const stopBubble = (e) => e.stopPropagation();

    // ── Lock body scroll while open; restore on unmount ──
    useEffect(() => {
        const prevBody = document.body.style.overflowY;
        const prevHtml = document.documentElement.style.overflowY;
        document.body.style.overflowY = "hidden";
        document.documentElement.style.overflowY = "hidden";
        if (containerRef.current) containerRef.current.scrollTop = 0;
        return () => {
            document.body.style.overflowY = prevBody;
            document.documentElement.style.overflowY = prevHtml;
        };
    }, []);

    // ── GSAP Entry Animations ──
    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        // Animate the main container (fade/slide up)
        gsap.fromTo(
            container,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );

        // Animate all top content elements simultaneously
        gsap.fromTo(
            ".animate-on-load",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.25 }
        );
    }, { scope: containerRef });

    // ── Close: animate out then call onBack ──
    const handleBack = () => {
        gsap.to(containerRef.current, {
            opacity: 0,
            y: 24,
            duration: 0.35,
            ease: "power2.in",
            onComplete: onBack,
        });
    };

    return (
        <div
            ref={containerRef}
            onWheel={stopBubble}
            onTouchStart={stopBubble}
            onTouchMove={stopBubble}
            onPointerDown={(e) => e.stopPropagation()}
            className="fixed inset-0 z-[200] overflow-y-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#F7F5F0" }}
        >
            <link
                href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap"
                rel="stylesheet"
            />

            {/* ── Sticky top bar ── */}
            <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-black/8 px-6 sm:px-14 py-4 flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 border border-black rounded-full px-5 py-2 text-sm font-semibold text-black hover:bg-black hover:text-[#F7F5F0] transition-all duration-200"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <span className="text-xs font-mono text-black/40 tracking-widest">[Jul. 2026]</span>
            </header>

            {/* ── Article number ── */}
            <div className="flex justify-center pt-14 pb-2 select-none animate-on-load">
                <span className="font-mono text-sm text-black/25 tracking-widest">-3-</span>
            </div>

            {/* ── Hero heading ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 pt-6 pb-10 animate-on-load">

                <h1 className="leading-[1.05] text-[clamp(2.8rem,7vw,6rem)] text-black">
                    <span className="block font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        What Is an
                    </span>
                    <span className="block font-black italic text-black/30" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Operating System,
                    </span>
                    <span className="block font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Actually?
                    </span>
                </h1>
            </div>

            {/* ── Thick rule ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 animate-on-load">
                <div className="h-[5px] bg-black rounded-sm mb-10" />
            </div>

            {/* ── Lead bold subtitle ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 mb-10 animate-on-load">
                <p className="text-base sm:text-lg font-bold text-black leading-snug max-w-2xl">
                    Every device I own has one. I couldn't have told you what it actually does until I sat down and asked.
                </p>
            </div>

            {/* ── Bullet intro ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 mb-16 animate-on-load">
                <p className="text-sm sm:text-base text-black/70 leading-relaxed mb-6">
                    <span className="mr-3 text-black font-bold">●</span>
                    I always thought of an operating system as "the thing that opens when you turn on the computer" — Windows, or the home screen on a phone. Turns out that's just the visible tip of it. So what's the OS actually doing underneath the wallpaper and icons? Its whole job is being the middleman between your apps and the actual physical hardware — the processor, memory, storage, screen — so that every app doesn't have to know how to talk to that hardware directly.
                </p>

                <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-6">
                    <ul className="space-y-3 text-base font-semibold">
                        {[
                            'Apps ask the OS for things — "give me some memory," "read this file," "draw this on screen"',
                            "The OS decides how to share limited hardware between everything asking for it at once",
                            "Without it, every single app would need to know how to control the processor and memory by itself, which is basically unworkable",
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F7F5F0] shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ── Sections ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 pb-32 space-y-16 text-black">

                <section className="animate-on-load">
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">01</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The Great Sharing Illusion
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        That sharing part turns out to be the actual core of the whole thing. Your laptop isn't really running twenty apps "at the same time" — it's switching between them so fast it feels simultaneous.
                    </p>

                    <blockquote className="text-lg sm:text-xl font-semibold italic text-black/50 border-l-[3px] border-black pl-6 py-2 my-8 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="font-sans font-bold text-black uppercase tracking-widest text-xs mb-2 block not-italic">Example</span>
                        While you're typing this, your OS is rapidly switching attention between your browser, your music player, and whatever's running in the background — giving each one a tiny sliver of the processor's time, over and over, dozens of times a second. None of them are actually running "at once." They're just taking turns fast enough that you can't tell.
                    </blockquote>
                </section>

                <div className="border-t border-black/10 animate-on-load" />

                <section className="animate-on-load">
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">02</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The Design Spectrum
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        Are all operating systems built the same way underneath? Not really — there's a real split in how they're designed:
                    </p>
                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-8">
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                "Monolithic kernels (classic Linux) — core functionality lives in one big trusted chunk (fast, but one driver bug can crash it all)",
                                "Microkernels — only bare minimum lives in the trusted core (safer, but historically slower)",
                                "Hybrid kernels (Windows, macOS) — a middle ground borrowing ideas from both",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7F5F0] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        And separately from that internal design, there's the split people actually notice day to day:
                    </p>
                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-6">
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                "Desktop/laptop OSes — Windows, macOS, Linux — built for general-purpose, do-anything use",
                                "Mobile OSes — Android, iOS — built around battery life, touch, and running one app in focus at a time",
                                "Embedded/real-time OSes — tiny systems inside a microwave, car dashboard, or pacemaker built to respond within a guaranteed time",
                                "Server OSes — usually Linux variants, built to run unattended for months without a screen",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7F5F0] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <div className="border-t border-black/10" />

                {/* ── Below the fold ── */}
                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">03</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The "Best" OS Fallacy
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        So which one's actually "best"? None of them, in general — each one is a different set of trade-offs, tuned for a different job:
                    </p>
                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-8">
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                "Need raw control and customizability → Linux",
                                "Need broad software & hardware compatibility with least friction → Windows",
                                "Need tight hardware-software integration and polish → macOS",
                                "Need guaranteed split-second response in safety-critical systems → Real-time OS",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7F5F0] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-8">
                        Picking "the best OS" is a bit like asking which vehicle is best — a motorbike beats a truck at weaving through traffic, and loses badly at hauling furniture. The right question is always "best for what."
                    </p>

                    <blockquote className="text-lg sm:text-xl font-semibold italic text-black/50 border-l-[3px] border-black pl-6 py-2 my-8 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="font-sans font-bold text-black uppercase tracking-widest text-xs mb-2 block not-italic">Fact</span>
                        Every single one of the world's Top500 supercomputers runs Linux — an unbroken streak that's held since November 2017. The most powerful machines humans have ever built all landed on the same free operating system a college student released as a hobby project in 1991.
                    </blockquote>
                </section>

                <div className="border-t border-black/10" />

                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">04</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            How Something This Big Gets Built
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        How does something this complex actually get <em>made</em> in the first place? Slower and messier than people assume. Most operating systems are written mostly in C, with some lower-level parts in raw assembly where speed or direct hardware control really matters.
                    </p>
                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-8">
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                "It starts with a kernel — the small core managing memory, processes, and hardware access",
                                "Everything else (file systems, networking, drivers, UI) gets built up around that core over years",
                                "Linux specifically is assembled from contributions submitted by thousands of developers worldwide",
                                "New hardware means new drivers need to be written constantly forever — an OS is never really 'finished'",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7F5F0] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <blockquote className="text-lg sm:text-xl font-semibold italic text-black/50 border-l-[3px] border-black pl-6 py-2 my-8 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="font-sans font-bold text-black uppercase tracking-widest text-xs mb-2 block not-italic">Fact</span>
                        The Linux kernel's source code crossed 40 million lines by the end of 2024 — built by tens of thousands of contributors across thousands of companies worldwide. No single person, and no single company, could realistically hold that whole system in their head. It's less "one genius built this" and more "a global relay race that's been running for over three decades."
                    </blockquote>

                    <blockquote className="text-lg sm:text-xl font-semibold italic text-black/50 border-l-[3px] border-black pl-6 py-2 my-8 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="font-sans font-bold text-black uppercase tracking-widest text-xs mb-2 block not-italic">Example</span>
                        A new laptop with a new Wi-Fi chip won't necessarily work perfectly with an operating system on day one — because somewhere, a driver for that specific chip has to be written, tested, and merged in before the OS can talk to it properly. That's not the OS being broken. That's the OS still catching up to hardware that didn't exist when it was last built.
                    </blockquote>
                </section>

                <div className="border-t border-black/10" />

                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">05</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The Layers of Illusion
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80">
                        What actually surprised me most digging into this: there's no single "aha, this is how an OS works" moment. It's layers of smaller systems — scheduling, memory management, file systems, drivers — each solving one narrow problem, stacked on top of each other so well that the whole thing feels like one seamless thing instead of dozens of separate ones quietly cooperating.
                    </p>
                </section>

                {/* ── Closing footnote ── */}
                <div className="border-t-[3px] border-black pt-10">
                    <p className="text-base italic text-black/45 leading-relaxed max-w-lg">
                        Not one big machine. A pile of smaller machines that learned to take turns.
                    </p>
                    <p className="mt-4 text-xs font-mono text-black/25 tracking-widest">— Ayush Pachouri, 2026</p>
                </div>
            </div>
        </div>
    );
}
