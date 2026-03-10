"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Briefcase } from "lucide-react";
import { useRef } from "react";

// ── Floating particle (same as Hero) ─────────────────────────────────────
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

const particles = [
    { id: 0, x: 8, y: 15, size: 5, delay: 0, duration: 8 },
    { id: 1, x: 22, y: 72, size: 3, delay: 1.2, duration: 7 },
    { id: 2, x: 37, y: 35, size: 6, delay: 0.5, duration: 9 },
    { id: 3, x: 55, y: 60, size: 4, delay: 2, duration: 6 },
    { id: 4, x: 70, y: 20, size: 5, delay: 0.8, duration: 10 },
    { id: 5, x: 82, y: 80, size: 3, delay: 1.5, duration: 8 },
    { id: 6, x: 92, y: 45, size: 4, delay: 3, duration: 7 },
    { id: 7, x: 15, y: 50, size: 3, delay: 2.5, duration: 9 },
    { id: 8, x: 48, y: 88, size: 5, delay: 0.3, duration: 11 },
    { id: 9, x: 63, y: 10, size: 4, delay: 1.8, duration: 8 },
    { id: 10, x: 30, y: 92, size: 3, delay: 0.7, duration: 7 },
    { id: 11, x: 78, y: 55, size: 6, delay: 2.2, duration: 9 },
    { id: 12, x: 5, y: 80, size: 4, delay: 1, duration: 10 },
    { id: 13, x: 90, y: 25, size: 3, delay: 3.5, duration: 8 },
    { id: 14, x: 44, y: 5, size: 5, delay: 0.2, duration: 7 },
];

interface ExperienceItemProps {
    role: string;
    company: string;
    period: string;
    description: string;
    index: number;
}

const ExperienceItem = ({ role, company, period, description, index }: ExperienceItemProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isLeft = index % 2 === 0;

    return (
        <div ref={ref} className={`relative flex items-center justify-between md:justify-normal ${isLeft ? "md:flex-row-reverse" : ""} group gap-8 mb-16`}>

            {/* ── Animated dot ── */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    className="w-5 h-5 rounded-full bg-blue-500 border-4 border-[#121212] relative"
                >
                    {/* Ripple effect */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-blue-500"
                        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full bg-blue-400"
                        animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 + 0.4 }}
                    />
                </motion.div>
            </div>

            {/* ── Content Card ── */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.65, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="ml-10 md:ml-0 md:w-[45%] card-shimmer-wrap glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/40 transition-all shadow-2xl group/card"
            >
                {/* Top: period + icon */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-blue-400 font-medium text-xs tracking-widest uppercase">
                        <Calendar size={13} />
                        {period}
                    </div>
                    <motion.div
                        className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400"
                        whileHover={{ rotate: 15, scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Briefcase size={16} />
                    </motion.div>
                </div>

                {/* Role */}
                <h3 className="text-2xl font-bold tracking-tight text-white mb-1 group-hover/card:text-blue-300 transition-colors duration-300">
                    {role}
                </h3>

                {/* Company */}
                <p className="text-blue-500/80 font-medium mb-4 text-base italic">{company}</p>

                {/* Description */}
                <p className="text-gray-400 font-light leading-relaxed text-sm">{description}</p>

                {/* Animated bottom accent line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.7, delay: index * 0.15 + 0.3 }}
                    className="h-px bg-gradient-to-r from-blue-500/50 to-transparent mt-5 origin-left"
                />
            </motion.div>
        </div>
    );
};

const Experience = () => {
    const experiences = [
        {
            role: "AI Intern",
            company: "SmartBridge-AI (partnership with Google)",
            period: "May 2025 - Jul 2025",
            description:
                "Built MangoNet — a deep learning system using VGG16 transfer learning to classify mango varieties, designed for deployment in agriculture and processing facilities.",
        },
        {
            role: "Software Engineering Simulation",
            company: "J.P. Morgan Chase & Co. (Forage)",
            period: "2024",
            description:
                "Interfaced with stock price data feeds using Python and implemented real-time data visualization charts for trader dashboards.",
        },
        {
            role: "Software Engineering Simulation",
            company: "Goldman Sachs (Forage)",
            period: "2024",
            description:
                "Focused on technical skills relevant to financial services and software development best practices in a simulated environment.",
        },
    ];

    const lineRef = useRef(null);
    const lineInView = useInView(lineRef, { once: true });

    return (
        <section id="experience" className="py-24 relative bg-[#121212] overflow-hidden">
            {/* ── Floating particles ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map((p) => (
                    <Particle key={p.id} {...p} />
                ))}
            </div>

            {/* Ambient glow */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-5 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />

            <div className="max-w-7xl mx-auto px-6 md:px-20">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
                    >
                        PROFESSIONAL{" "}
                        <span className="text-blue-500 italic">JOURNEY</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-px bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent mt-4 origin-left"
                    />
                </div>

                <div className="relative mt-20" ref={lineRef}>
                    {/* Animated vertical timeline line */}
                    <motion.div
                        className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-indigo-500/40 to-transparent origin-top"
                        initial={{ scaleY: 0 }}
                        animate={lineInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    {/* Static faint base line */}
                    <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-white/5" />

                    {experiences.map((exp, index) => (
                        <ExperienceItem key={index} {...exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
