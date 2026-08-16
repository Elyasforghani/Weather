// app/creator/page.jsx
'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function ScrambleText({ text, className = '' }) {
    const [display, setDisplay] = useState([]);
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const queueRef = useRef([]);
    const frameRef = useRef(0);
    const frameCounter = useRef(0);
    const currentTextRef = useRef(''); // Tracks plain text to prevent HTML tag length bugs

    useEffect(() => {
        // Cancel any ongoing animation if text changes rapidly
        cancelAnimationFrame(frameRef.current);

        const currentText = currentTextRef.current;
        const length = Math.max(text.length, currentText.length);
        queueRef.current = [];

        for (let i = 0; i < length; i++) {
            const from = currentText[i] || '';
            const to = text[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 20);
            queueRef.current.push({ from, to, start, end, char: null });
        }
        frameCounter.current = 0;

        const update = () => {
            const output = [];
            let plainText = '';
            let complete = 0;

            for (let i = 0; i < queueRef.current.length; i++) {
                const item = queueRef.current[i];
                if (frameCounter.current >= item.end) {
                    complete++;
                    output.push(<span key={i}>{item.to}</span>);
                    plainText += item.to;
                } else if (frameCounter.current >= item.start) {
                    if (!item.char || Math.random() < 0.28) {
                        item.char = chars[Math.floor(Math.random() * chars.length)];
                    }
                    output.push(<span key={i} className="text-cyan-400/60">{item.char}</span>);
                    plainText += item.from; // Track stable characters for interruption safety
                } else {
                    output.push(<span key={i}>{item.from}</span>);
                    plainText += item.from;
                }
            }

            currentTextRef.current = plainText;
            setDisplay(output);
            frameCounter.current++;

            if (complete < queueRef.current.length) {
                frameRef.current = requestAnimationFrame(update);
            }
        };

        frameRef.current = requestAnimationFrame(update);

        return () => cancelAnimationFrame(frameRef.current);
    }, [text]);

    return <span className={className}>{display}</span>;
}

/* ─── Magnetic Social Button ─── */
function MagneticButton({ href, icon, label, color }) {
    const btnRef = useRef(null);
    const boundRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

    const handleMove = useCallback((e) => {
        const btn = btnRef.current;
        if (!btn) return;
        const { x, y, width, height } = boundRef.current;
        const dx = e.clientX - (x + width / 2);
        const dy = e.clientY - (y + height / 2);
        btn.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
    }, []);

    const handleEnter = useCallback(() => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        boundRef.current = rect;
    }, []);

    const handleLeave = useCallback(() => {
        const btn = btnRef.current;
        if (!btn) return;
        btn.style.transform = 'translate(0,0)';
    }, []);

    return (
        <a
            ref={btnRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label} // Crucial for screen readers
            onMouseMove={handleMove}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] transition-all duration-300 ease-out hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            style={{ transitionProperty: 'transform, background, border-color, box-shadow' }}
            title={label}
        >
            <span aria-hidden="true" className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {icon}
            </span>
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"
                style={{ background: color }}
            />
        </a>
    );
}


export default function CreatorPage() {
    const cardRef = useRef(null);
    const contentRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transition = 'none';
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.01,1.01,1.01)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
        card.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    }, []);

    // Entrance animation using official GSAP React hook (Fixes React 18 Strict Mode bugs)
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(
            '.creator-reveal',
            { opacity: 0, y: 40, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.12 }
        );
        return () => tl.kill();
    }, { scope: contentRef });

    const socials = [
        {
            label: 'GitHub',
            href: 'https://github.com/Elyasforghani',
            color: 'rgba(226,232,240,0.15)',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
            ),
        },
        {
            label: 'LinkedIn',
            href: 'https://linkedin.com/in/alireza-forghani-b4746b263/',
            color: 'rgba(14,165,233,0.2)',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            label: 'Email',
            href: 'mailto:example@email.com',
            color: 'rgba(239,68,68,0.15)',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ),
        },
        {
            label: 'Website',
            href: 'https://Elyasforghani.com/',
            color: 'rgba(245,158,11,0.15)',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            ),
        },
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-16 px-4 bg-slate-950">

            {/* Ambient Orbs */}
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-cyan-500/[0.07] rounded-full blur-[140px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-amber-500/[0.06] rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '3s' }} />
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

            {/* Main Card */}
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative z-10 w-full max-w-xl"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Liquid Glass Card */}
                <div
                    ref={contentRef}
                    suppressHydrationWarning
                    className="relative rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] p-8 md:p-12 overflow-hidden"
                >
                    {/* Gradient border glow */}
                    <div className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.02] to-transparent pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center gap-8">

                        {/* Avatar with rotating ring */}
                        <div className="creator-reveal relative flex items-center justify-center">
                            {/* Background Glow */}
                            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan-500/30 via-indigo-500/20 to-amber-500/30 blur-xl animate-pulse" />

                            {/* Rotating SVG ring (Separated so it doesn't get clipped by the image container) */}
                            <div className="absolute -inset-4 flex items-center justify-center pointer-events-none">
                                <svg className="w-full h-full animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
                                    <defs>
                                        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                                            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.6" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="50" cy="50" r="46" fill="none" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="8 6" />
                                </svg>
                            </div>

                            {/* Image Container */}
                            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/[0.08] shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                                <Image
                                    src="/profile2.png" // 👈 CHANGE THIS to your image name
                                    alt="Elyas Forghani"
                                    fill
                                    className="object-cover"
                                    priority 
                                    width={100}
                                    height={100}
                                />
                            </div>
                        </div>

                        {/* Name — Exaggerated Hierarchy */}
                        <div className="creator-reveal">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none">
                                Elyas{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400">
                                    Forghani
                                </span>
                            </h1>
                        </div>

                        {/* Scramble Subtitle */}
                        <div className="creator-reveal flex items-center gap-2 text-sm md:text-base font-mono text-slate-400 tracking-widest uppercase">
                            <span className="w-8 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                            <ScrambleText text="Frontend Developer & UI Enthusiast" />
                            <span className="w-8 h-px bg-gradient-to-l from-amber-500/50 to-transparent" />
                        </div>

                        {/* Description */}
                        <p className="creator-reveal text-slate-400/80 text-base md:text-lg leading-relaxed max-w-md font-light">
                            Crafting beautiful, performant web experiences with modern technologies.
                            Passionate about clean code, elegant design, and building things that users love.
                        </p>

                        {/* Social Links — Magnetic */}
                        <div className="creator-reveal flex items-center gap-4 mt-2">
                            {socials.map((s) => (
                                <MagneticButton key={s.label} {...s} />
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="creator-reveal w-1/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                        {/* Footer */}
                        <p className="creator-reveal text-xs text-slate-500 tracking-widest uppercase font-medium">
                            Available for freelance work & collaborations
                        </p>
                    </div>
                </div>

                {/* Floating decorative elements behind card */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            </div>
        </div>
    );
}