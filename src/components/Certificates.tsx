"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";

interface CertificateCardProps {
    title: string;
    issuer: string;
    index: number;
}

const issuers: Record<string, { color: string; bg: string }> = {
    Oracle: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
    Infosys: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
    Forage: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    Udemy: { color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
};

const CertificateCard = ({ title, issuer, index }: CertificateCardProps) => {
    const theme = issuers[issuer] ?? { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.22 } }}
            className="card-shimmer-wrap glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/40 transition-all group flex items-start gap-6 relative overflow-hidden"
        >
            {/* Background glow blob */}
            <motion.div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none"
                style={{ background: theme.color }}
            />

            {/* Icon */}
            <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative"
                style={{ background: theme.bg }}
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
            >
                <Award size={26} style={{ color: theme.color }} />
                {/* Animated star burst on entry */}
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    whileInView={{ scale: 3, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.15 }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ border: `2px solid ${theme.color}` }}
                />
            </motion.div>

            {/* Text */}
            <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 tracking-tight text-white group-hover:text-blue-300 transition-colors duration-300 leading-snug">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    <Star size={11} style={{ color: theme.color }} className="fill-current" />
                    <p className="text-sm font-semibold tracking-wider uppercase" style={{ color: theme.color }}>
                        {issuer}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Certificates = () => {
    const certificates = [
        {
            title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
            issuer: "Oracle",
        },
        {
            title: "Artificial Intelligence Primer Certification",
            issuer: "Infosys",
        },
        {
            title: "Goldman Sachs Software Engineering Job Simulation",
            issuer: "Forage",
        },
        {
            title: "The Complete Computer Network Course",
            issuer: "Udemy",
        },
    ];

    return (
        <section id="certificates" className="py-24 relative bg-[#121212] overflow-hidden">
            {/* Ambient */}
            <div className="absolute right-0 bottom-0 w-80 h-80 opacity-5 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />

            <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
                    >
                        VERIFIED{" "}
                        <span className="text-blue-500 italic">EXPERTISE</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-px bg-gradient-to-r from-blue-500 via-purple-500 to-transparent mt-4 origin-left"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certificates.map((cert, index) => (
                        <CertificateCard key={cert.title} {...cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
