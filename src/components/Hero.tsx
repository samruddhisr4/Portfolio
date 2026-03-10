"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

// ── Floating particle dot ──────────────────────────────────────────────────
const Particle = ({ x, y, size, delay, duration }: { x: number; y: number; size: number; delay: number; duration: number }) => (
    <div
        className="absolute rounded-full bg-blue-400/30 pointer-events-none"
        style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            animation: `drift ${duration}s ease-in-out ${delay}s infinite`,
        }}
    />
);

// ── Typewriter cycling roles ───────────────────────────────────────────────
const roles = ["Creative Developer", "AI Engineer", "Full-Stack Builder", "UX Thinker"];

const TypewriterRole = () => {
    const [roleIdx, setRoleIdx] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const current = roles[roleIdx];
        if (!deleting && displayed.length < current.length) {
            timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
        } else if (!deleting && displayed.length === current.length) {
            timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
        } else if (deleting && displayed.length > 0) {
            timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setRoleIdx((i) => (i + 1) % roles.length);
        }
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, [displayed, deleting, roleIdx]);

    return (
        <span className="text-blue-400 font-mono">
            {displayed}
            <span className="animate-blink text-blue-300 ml-0.5">|</span>
        </span>
    );
};

// ── 3-D magnetic tilt on profile card ─────────────────────────────────────
const MagneticCard = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const rotX = useMotionValue(0);
    const rotY = useMotionValue(0);
    const springX = useSpring(rotX, { stiffness: 150, damping: 20 });
    const springY = useSpring(rotY, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const cx = left + width / 2;
        const cy = top + height / 2;
        rotX.set(((e.clientY - cy) / height) * -18);
        rotY.set(((e.clientX - cx) / width) * 18);
    };
    const handleMouseLeave = () => { rotX.set(0); rotY.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
            className="cursor-pointer"
        >
            {children}
        </motion.div>
    );
};

// ── Main Hero ──────────────────────────────────────────────────────────────
const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 6 + 6,
}));

const Hero = () => {
    return (
        <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121212] pt-14">
            {/* ── Background orbs ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
                        animation: "orb-pulse 5s ease-in-out infinite",
                    }}
                />
                <div
                    className="absolute bottom-0 -right-24 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
                        animation: "orb-pulse 7s ease-in-out 1s infinite",
                    }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 rounded-full border border-blue-500/20 animate-spin-slow"
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 rounded-full border border-indigo-500/20 animate-spin-slow-reverse"
                />
                {/* Floating particles */}
                {particles.map((p) => (
                    <Particle key={p.id} {...p} />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
                {/* ── Left text column ── */}
                <div className="flex-1 space-y-4">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-widest"
                    >
                        <motion.span
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Sparkles size={12} />
                        </motion.span>
                        Available for new opportunities
                    </motion.div>

                    {/* Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-3">
                            SAMRUDDHI <br />
                            <span className="shimmer-text">RAMDHAVE</span>
                        </h1>

                        {/* Typewriter role */}
                        <p className="text-base md:text-lg font-light text-gray-400 mb-3 h-6">
                            <TypewriterRole />
                        </p>

                        <p className="max-w-lg text-base text-gray-400 font-light leading-relaxed">
                            Bridging <span className="text-white font-medium">Design</span> &amp;{" "}
                            <span className="text-white font-medium">Engineering</span>. I build
                            high-performance, visually stunning digital experiences.
                        </p>
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap gap-6 justify-center md:justify-start"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-2 group text-sm"
                        >
                            View Projects
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </motion.a>
                        <motion.a
                            href="https://drive.google.com/file/d/1MezqfKhYhJAfdp_n4ek3cPOR11wSUT1I/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-6 py-3 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all duration-300 text-sm"
                        >
                            Resume
                        </motion.a>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-8 justify-center md:justify-start pt-2"
                    >
                        {[
                            { value: "6+", label: "Projects" },
                            { value: "4+", label: "Certifications" },

                        ].map(({ value, label }) => (
                            <div key={label} className="text-center md:text-left">
                                <p className="text-2xl font-black text-blue-400 animate-counter-glow">{value}</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">{label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Right image column ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 hidden lg:flex items-center justify-center"
                >
                    <MagneticCard>
                        <div className="relative">
                            {/* Outer spinning ring */}
                            <div
                                className="absolute -inset-4 rounded-full opacity-20 animate-spin-slow"
                                style={{ border: "1px dashed #3b82f6" }}
                            />
                            {/* Glow ring */}
                            <div
                                className="absolute -inset-2 rounded-3xl animate-glow-pulse"
                                style={{ background: "transparent" }}
                            />
                            {/* Profile card */}
                            <div
                                className="animate-float relative aspect-square w-[360px] mx-auto rounded-3xl overflow-hidden border border-blue-500/20 glass"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <Image
                                    src="/profile.png"
                                    alt="Samruddhi Ramdhave"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                                {/* Bottom fade — blends light bg into dark card */}
                                <div className="absolute inset-0" style={{
                                    background: "linear-gradient(to top, #121212 0%, rgba(18,18,18,0.7) 30%, transparent 65%)"
                                }} />
                                {/* Top fade */}
                                <div className="absolute inset-0" style={{
                                    background: "linear-gradient(to bottom, rgba(18,18,18,0.5) 0%, transparent 30%)"
                                }} />
                                {/* Left fade */}
                                <div className="absolute inset-0" style={{
                                    background: "linear-gradient(to right, rgba(18,18,18,0.5) 0%, transparent 25%)"
                                }} />
                                {/* Right fade */}
                                <div className="absolute inset-0" style={{
                                    background: "linear-gradient(to left, rgba(18,18,18,0.5) 0%, transparent 25%)"
                                }} />
                                {/* Blue tint overlay for cohesion with dark theme */}
                                <div className="absolute inset-0 mix-blend-color opacity-10" style={{
                                    background: "linear-gradient(135deg, #1e3a8a, #4c1d95)"
                                }} />
                            </div>
                        </div>
                    </MagneticCard>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
