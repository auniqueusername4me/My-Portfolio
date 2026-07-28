import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PlaneCaseStudy({ onBack }) {
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
                <span className="font-mono text-sm text-black/25 tracking-widest">-4-</span>
            </div>

            {/* ── Hero heading ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 pt-6 pb-10 animate-on-load">
                <h1 className="leading-[1.05] text-[clamp(2.8rem,7vw,6rem)] text-black">
                    <span className="block font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        How Does a Plane
                    </span>
                    <span className="block font-black italic text-black/30" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Actually Push Itself
                    </span>
                    <span className="block font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Through the Sky?
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
                    This one has nothing to do with code. I just wanted to know, and couldn't stop until I did.
                </p>
            </div>

            {/* ── Bullet intro ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 mb-16 animate-on-load">
                <p className="text-sm sm:text-base text-black/70 leading-relaxed mb-6">
                    <span className="mr-3 text-black font-bold">●</span>
                    I've flown enough times to lose count, and never once actually understood what's happening a few feet from my window seat. So what's actually going on inside a jet engine? At the core, it's doing one simple thing over and over, extremely fast: sucking in air, squeezing it, setting it on fire, and firing it out the back — and the sheer force of shoving that air backward is exactly what pushes the plane forward.
                </p>

                <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-6">
                    <ul className="space-y-3 text-base font-semibold">
                        {[
                            "Air gets pulled in through the front",
                            "It gets compressed — squeezed into a smaller space, which raises its pressure and heat",
                            "Fuel gets sprayed in and ignited, causing a rapid, violent expansion of hot gas",
                            "That gas gets forced out through a narrow nozzle at the back, speeding up as it exits",
                            "The push-back from that exit is what shoves the whole plane forward",
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
                            Newton on an Industrial Scale
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        That last part is really just Newton's third law happening at industrial scale — every action has an equal and opposite reaction. Throw a heavy bag off a skateboard hard enough and you'll roll backward a little. A jet engine is doing that same trick, just with tons of air every second instead of one bag.
                    </p>

                    <blockquote className="text-lg sm:text-xl font-semibold italic text-black/50 border-l-[3px] border-black pl-6 py-2 my-8 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="font-sans font-bold text-black uppercase tracking-widest text-xs mb-2 block not-italic">Example</span>
                        You can generate the exact same amount of push either by moving a huge volume of air backward slowly, or a small volume of air backward very fast — same result, two completely different strategies. That single tradeoff is why a cargo plane's engines and a fighter jet's engines look nothing alike, even though they're solving the same basic problem.
                    </blockquote>
                </section>

                <div className="border-t border-black/10 animate-on-load" />

                <section className="animate-on-load">
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">02</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Engine Variety &amp; Tradeoffs
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        Are all jet engines actually the same design under a different name? Not quite — there's real variety depending on the job:
                    </p>
                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-8">
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                "Turbojet — the original, simplest design, pushing nearly all the air straight through the core",
                                "Turbofan — commercial airliner standard; big front fan lets most air bypass hot core for efficiency",
                                "Turboprop — a turbine engine driving an external propeller, common on regional aircraft",
                                "Turboshaft — spins a shaft instead of pushing air directly, powering helicopter rotors",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7F5F0] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-8">
                        Why don't fighter jets and airliners use the same kind of engine, if they're solving the same problem? Because they're optimizing for opposite priorities. Commercial airliners use high-bypass turbofans that move a large volume of air gently, keeping fuel use manageable over long distances, while fighter jets prioritize speed and rapid acceleration over fuel economy, pushing a much smaller volume of air at far higher speed. One's built to fly efficiently for 12 hours straight. The other's built to get somewhere violently, fast, for a much shorter stretch.
                    </p>

                    <blockquote className="text-lg sm:text-xl font-semibold italic text-black/50 border-l-[3px] border-black pl-6 py-2 my-8 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="font-sans font-bold text-black uppercase tracking-widest text-xs mb-2 block not-italic">Fact</span>
                        A single military jet engine has produced as much as 156,000 newtons of thrust in testing — that's roughly the force of accelerating a loaded truck from 0 to highway speed in about a second, generated continuously, for as long as the engine keeps burning fuel.
                    </blockquote>
                </section>

                <div className="border-t border-black/10" />

                {/* ── Below the fold ── */}
                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">03</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Thrust vs. Lift
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-8">
                        What actually confused me the most wasn't the engine itself — it was realizing thrust and lift are two completely different forces doing two completely different jobs. Thrust pushes the plane forward. Lift is what actually keeps it in the air, and it only shows up because the wings are shaped to make air move faster over the top than underneath, dropping the pressure above the wing just enough to suck it upward. The engine doesn't lift the plane at all. It just makes the plane go fast enough for the wings to start doing that on their own.
                    </p>

                    <blockquote className="text-lg sm:text-xl font-semibold italic text-black/50 border-l-[3px] border-black pl-6 py-2 my-8 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="font-sans font-bold text-black uppercase tracking-widest text-xs mb-2 block not-italic">Fact</span>
                        The compressor and turbine inside a jet engine are directly connected on the same spinning shaft — the hot exhaust gas spins the turbine, and the turbine's spin is what powers the compressor at the front, pulling in the next batch of air. It's a closed loop feeding itself, once it's running: burn gas to spin the turbine, spin the turbine to compress more air, compress more air to burn more gas.
                    </blockquote>

                    <p className="text-base sm:text-lg leading-relaxed text-black/80">
                        I don't have a jet engine to build in my room to test this the way I could with a small script or a language model — so for this one, understanding the loop itself was the whole point. No hands-on version, and that's fine; not everything needs a working prototype to actually sink in.
                    </p>
                </section>

                <div className="border-t border-black/10" />

                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">04</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Beyond Sound: Ramjets &amp; Scramjets
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        There's one more piece worth knowing about, since it sounds almost fictional the first time you hear it: engines built for speeds around and beyond the speed of sound don't even use the spinning parts described above. Regular jet engines top out well below the speed of sound for a reason — past a certain speed, forcing air through spinning blades stops being practical. So engineers just... removed the spinning parts.
                    </p>

                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-8">
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                "A ramjet has no compressor and no turbine at all — it relies on forward speed to ram air into the engine and compress it",
                                "Fuel gets added to that rammed compressed air and ignited, using speed instead of spinning blades",
                                "A scramjet skips moving parts entirely and rams supersonic air straight into the combustion chamber, maintaining supersonic airflow throughout combustion",
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
                        Scramjets only start working above roughly Mach 5 — five times the speed of sound — so they can't take off on their own. Something else has to accelerate the aircraft up to that speed first, usually a rocket booster, before the scramjet can even switch on.
                    </blockquote>

                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        That's the part that actually got me — an engine that's completely useless until something else has already gotten you going fast enough for it to work at all. It's less "engine" and more "the thing that takes over once you're already going stupidly fast."
                    </p>

                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        You can check out this website to look out for more info: <a href="https://www.grc.nasa.gov" target="_blank" rel="noopener noreferrer" className="font-mono text-black underline font-semibold hover:opacity-75">grc.nasa.gov</a> (search "Beginner's Guide to Propulsion" once there).
                    </p>
                </section>

                {/* ── Closing footnote ── */}
                <div className="border-t-[3px] border-black pt-10">
                    <p className="text-base italic text-black/45 leading-relaxed max-w-xl">
                        No magic here either. Just air, fire, and a very old law of physics, moving fast enough to carry 300 people across an ocean — or, past Mach 5, fast enough that the plane basically has to already be flying before its own engine can turn on.
                    </p>
                    <p className="mt-4 text-xs font-mono text-black/25 tracking-widest">— Ayush Pachouri, 2026</p>
                </div>
            </div>
        </div>
    );
}
