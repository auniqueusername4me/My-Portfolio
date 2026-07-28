import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AiCaseStudy({ onBack }) {
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
                <span className="font-mono text-sm text-black/25 tracking-widest">-2-</span>
            </div>

            {/* ── Hero heading ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 pt-6 pb-10 animate-on-load">

                <h1 className="leading-[1.05] text-[clamp(2.8rem,7vw,6rem)] text-black">
                    <span className="block font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        How does AI
                    </span>
                    <span className="block font-black italic text-black/30" style={{ fontFamily: "'Playfair Display', serif" }}>
                        actually work?
                    </span>
                    <span className="block font-semibold text-[clamp(1.1rem,2.5vw,1.9rem)] text-black/50 mt-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        (GPT, Claude, All of It)
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
                    Turns out the thing everyone is calling "revolutionary" and "the end of human creativity" is, at its core, a very expensive autocomplete with excellent PR.
                </p>
            </div>

            {/* ── Bullet intro ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 mb-16 animate-on-load">
                <p className="text-sm sm:text-base text-black/70 leading-relaxed">
                    <span className="mr-3 text-black font-bold">●</span>
                    I used to think ChatGPT was a very polite, very fast search engine with good manners. You type a question. A tiny digital librarian sprints to the archives. Returns with the answer. Wrong — catastrophically wrong. It's not looking <em>anything</em> up. It is statistically hallucinating the most plausible-sounding response based on an absolutely unhinged amount of human text it absorbed. It just hallucinates so convincingly that we called it "intelligence" and wrote 5,000-word think pieces about it.
                </p>
            </div>

            {/* ── Sections ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 pb-32 space-y-16 text-black">

                <section className="animate-on-load">
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">01</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Different Kitchens, Same Dish
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        And then you have GPT and Claude acting like they're rival superheroes from different cinematic universes. Spoiler alert: they’re doing the exact same party trick. They’re like two chefs trained in different kitchens who are fundamentally just microwaving the same frozen dinner:
                    </p>
                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-6">
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                "Different corporate overlords, different training data",
                                'Different artificially injected "personalities" so one sounds like a lawyer and the other your therapist',
                                "But the exact same mathematical parlor trick running under the hood",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7F5F0] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80">
                        The dish has different seasoning. The meat is exactly the same.
                    </p>
                </section>

                <div className="border-t border-black/10 animate-on-load" />

                <section className="animate-on-load">
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">02</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Where Does "Smart" Come From?
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        Which raises the painfully obvious question: if it’s just blindly guessing words, why does it seem so much smarter than most people on Twitter? Scale. Read enough of the internet, and human behavior gets laughably predictable:
                    </p>
                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-6">
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                "How corporate apology emails are universally structured",
                                "How Reddit arguments always devolve into name-calling step by step",
                                "How developers endlessly copy-paste the exact same boilerplate code",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7F5F0] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-8">
                        Nobody sat down and taught it grammar rules. It just stared at the abyss of human text for so long that it memorized the rhythm—exactly like you anticipating the drop in a pop song you claim you hate, but secretly know every single word to.
                    </p>

                    <blockquote className="text-lg sm:text-xl font-semibold italic text-black/50 border-l-[3px] border-black pl-6 py-2 my-8 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="font-sans font-bold text-black uppercase tracking-widest text-xs mb-2 block not-italic">Example</span>
                        Type "The capital of France is" into an LLM and it doesn't pull up a map. It has just seen that exact phrase followed by "Paris" so many agonizing times across millions of websites that the mathematical probability of "Paris" being the next word is roughly 99.9%. Ask it something weird it hasn't seen a billion times, and it starts sweating and hallucinating—not because it "forgot," but because the statistical groove it relies on simply isn't there.
                    </blockquote>
                </section>

                <div className="border-t border-black/10" />

                {/* ── Below the fold: no animate-on-load class ── */}
                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">03</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The Confidence Problem
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80">
                        This entirely explains the part that drives everyone insane: why does it confidently lie to your face? Because it was never fact-checking itself to begin with. It's a text-prediction engine; its only goal is to generate whatever word statistically <em>sounds</em> best next. And as humanity proves daily, "sounds plausible" and "is factually true" are wildly different things. Usually, they overlap. When they don't, the AI doesn't care. There’s no little conscience inside waving a red flag—it just cheerfully outputs garbage with the unwavering confidence of a mediocre middle manager.
                    </p>
                </section>

                <div className="border-t border-black/10" />

                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">04</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Pausing to Think
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        Then there are the newer models that seemingly "pause and think" before answering. Which is terrifying, but entirely mechanical. Here’s what’s actually happening:
                    </p>
                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8">
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                'It is forced to write out its "scratchpad" thoughts before blurting out an answer',
                                "Shocker: breaking a problem down step-by-step makes the final output drastically better",
                                "It is still the exact same word-guessing game—we just gave it a quiet room to mumble to itself before it has to hand in its homework",
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

                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">05</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Chatbot vs. Agent
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        The grand leap from a "chatbot" to an "agent" isn't because the AI suddenly became sentient. It's simply about giving it permission to touch things. A standard chatbot just yaps. An agent is allowed to actually do chores:
                    </p>
                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8 mb-6">
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                "Realize mid-sentence it has no idea what it's talking about",
                                "Pause, open a web browser, run some Python, or dig through your files",
                                "Read the results of whatever it just did",
                                "Use that new text to keep guessing the next word, pretending it knew the answer all along",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7F5F0] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-8">
                        It’s the exact same brain. We just finally gave it a pair of hands so it doesn't have to rely strictly on its mouth.
                    </p>
                    <blockquote className="text-lg sm:text-xl font-semibold italic text-black/50 border-l-[3px] border-black pl-6 py-2 my-8 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="font-sans font-bold text-black uppercase tracking-widest text-xs mb-2 block not-italic">Example</span>
                        Ask a basic chatbot "what's the weather in Delhi right now" and it will either hallucinate a sunny day or give you a pre-programmed apology. Ask an <em>agent</em>, and it pauses, physically triggers an API call to a weather service, reads the JSON that comes back, and then casually drops the temperature in the chat like it simply glanced out a window. Same model, it just has a VIP pass to the internet.
                    </blockquote>
                </section>

                <div className="border-t border-black/10" />

                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">06</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Zero Memory
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80">
                        And no, despite how much you overshare, it is absolutely not learning anything from talking to you. Every single thing it "knows" was baked into a multi-million dollar training run months ago. Your profound 2 AM conversations aren't teaching it a damn thing for next time. It’s just reading the text history in front of it, reacting to the immediate context, and completely amnesia-dumping your entire existence the exact millisecond you close the tab.
                    </p>
                </section>

                {/* ── Closing footnote ── */}
                <div className="border-t-[3px] border-black pt-10">
                    <p className="text-base italic text-black/45 leading-relaxed max-w-lg">
                        No magic. No mind. Just a trillion-parameter slot machine constantly pulling its own lever.
                    </p>
                    <p className="mt-4 text-xs font-mono text-black/25 tracking-widest">— Ayush Pachouri, 2026</p>
                </div>
            </div>
        </div>
    );
}
