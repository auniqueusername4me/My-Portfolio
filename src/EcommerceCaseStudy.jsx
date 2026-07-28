import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function EcommerceCaseStudy({ onBack }) {
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
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap"
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
                <span className="font-mono text-sm text-black/25 tracking-widest">-1-</span>
            </div>

            {/* ── Hero heading ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 pt-6 pb-10 animate-on-load">

                <h1 className="leading-[1.05] text-[clamp(2.8rem,7vw,6rem)] text-black">
                    <span className="block font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        How do e-commerce
                    </span>
                    <span className="block font-black italic text-black/30" style={{ fontFamily: "'Playfair Display', serif" }}>
                        websites work?
                    </span>
                    <span className="block font-semibold text-[clamp(1.1rem,2.5vw,1.9rem)] text-black/50 mt-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        What's Actually Happening When You Hit "Buy Now"?
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
                    If I wanted to build something like Amazon, where would I even begin? Obviously not with "scalability" and "microservices" — those are what you say at the end, when you have no choice. I'd start with one brutally boring question: <em>How does one single person buy one single product?</em>
                </p>
            </div>

            {/* ── Bullet intro ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 mb-16 animate-on-load">
                <p className="text-sm sm:text-base text-black/70 leading-relaxed">
                    <span className="mr-3 text-black font-bold">●</span>
                    This is a system-design breakdown of how an e-commerce platform actually works — from the moment someone drunkenly adds something to their cart at 2am, to the moment their card gets charged and a poor warehouse worker starts running. No buzzwords. No venture capital metaphors. Just the actual plumbing hiding behind every deceptively cheerful "Buy Now" button.
                </p>
            </div>

            {/* ── Sections ── */}
            <div className="max-w-4xl mx-auto px-6 sm:px-14 pb-32 space-y-16 text-black">

                <section className="animate-on-load">
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">01</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The Frontend Layer
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80">
                        First comes the frontend — the part users actually see. Product pages, search, cart, checkout, login… basically everything you can click.
                        The frontend doesn't know anything about products or payments. It only knows how to <em>display</em> information and <em>send requests</em>.
                        Every action a user takes on a good e-commerce site feels instant — but underneath, it is firing API calls at a backend that is doing all the real thinking.
                    </p>
                </section>

                <div className="border-t border-black/10 animate-on-load" />

                <section className="animate-on-load">
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">02</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The Backend Ecosystem
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        Whenever you search for a product, log in, or click Buy Now, the frontend sends an API request to the backend. The backend is where the real work happens — it checks whether you're logged in, verifies stock, calculates totals, processes payments, creates orders, and talks to databases.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80">
                        Behind that sits the database — where users, products, carts, addresses, and orders actually live. The frontend never talks directly to it, because letting browsers edit databases would be… a bold security decision.
                    </p>
                </section>

                <div className="border-t border-black/10" />

                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">03</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Microservices: Why Not One Giant App?
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-8">
                        Big e-commerce websites aren't built all at once. They're built one feature at a time until one day people start calling them "complex systems." So — is Amazon just one giant app? That would be a fantastic way to make millions of people angry simultaneously.
                    </p>

                    <div className="border-l-[3px] border-black pl-6 my-8">
                        <p className="text-xl sm:text-2xl font-bold italic leading-snug text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                            "Each service has one job. Together they pretend to be one application."
                        </p>
                    </div>

                    <div className="bg-black text-[#F7F5F0] rounded-2xl p-8">
                        <p className="text-xs font-mono uppercase tracking-widest text-[#F7F5F0]/40 mb-5">How it's split</p>
                        <ul className="space-y-3 text-base font-semibold">
                            {[
                                "Auth Service — handles login & sessions",
                                "Product Service — manages catalogue & stock",
                                "Payment Service — charges cards",
                                "Order Service — creates & tracks orders",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7F5F0] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mt-8">
                        If the recommendation engine crashes, you should still be able to buy a phone. Keeping everything separate means one bad day doesn't become everyone's bad day.
                    </p>
                </section>

                <div className="border-t border-black/10" />

                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">04</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The "Buy Now" Checklist
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        Computers don't panic. They follow a checklist. The moment you click Buy Now, the backend silently runs through:
                    </p>
                    <blockquote className="text-xl sm:text-2xl font-semibold italic text-black/50 border-t border-b border-black/10 py-6 my-8 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                        "Is this user logged in? Does this product still exist? Is it in stock? Did someone else buy the last one while you were deciding between Blue and Midnight Blue?"
                    </blockquote>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80">
                        If everything checks out, an order is created. Notice what hasn't happened yet — nobody packed your box, nobody printed a label, your bank hasn't transferred money yet.
                        The site simply records: <strong>"This purchase is valid. Everyone else can start working now."</strong>
                    </p>
                </section>

                <div className="border-t border-black/10" />

                <section>
                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-mono text-xs text-black/25 tracking-widest shrink-0">05</span>
                        <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Payments &amp; Data
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80 mb-6">
                        Your payment first goes through a <strong>payment gateway</strong> — a very suspicious middleman. It checks if your card is valid, if your bank approved it, and whether it looks fraudulent. Most marketplaces hold the money until safe delivery, then release it to the seller.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed text-black/80">
                        As for data — developers don't store it in one mysterious folder named{" "}
                        <code className="bg-black/8 px-2 py-0.5 rounded text-sm font-mono">backend_final_v9_REAL_LAST.zip</code>.
                        There are databases for users, object storage for images, caches, search indexes, logs, and analytics — all talking through APIs.
                    </p>
                </section>

                {/* ── Closing footnote ── */}
                <div className="border-t-[3px] border-black pt-10">
                    <p className="text-base italic text-black/45 leading-relaxed max-w-lg">
                        Still learning by building things I don't fully understand yet. Turns out every "simple" website is just hundreds of smaller systems politely pretending everything is under control.
                    </p>
                    <p className="mt-4 text-xs font-mono text-black/25 tracking-widest">— Ayush Pachouri, 2026</p>
                </div>
            </div>
        </div>
    );
}