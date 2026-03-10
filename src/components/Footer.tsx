"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socials = [
        { href: "https://github.com/samruddhisr4", icon: Github, label: "GitHub" },
        { href: "https://www.linkedin.com/in/samruddhi-shital-ramdhave-0187a9374/", icon: Linkedin, label: "LinkedIn" },
        { href: "mailto:samruddhisr4@gmail.com", icon: Mail, label: "Email" },
    ];

    const links = ["About", "Skills", "Projects", "Experience", "Contact"];

    return (
        <footer className="py-16 border-t border-white/5 relative bg-[#121212] overflow-hidden">
            {/* Ambient orb */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-5 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #3b82f6 0%, transparent 70%)" }} />

            <div className="max-w-7xl mx-auto px-6 md:px-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">

                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-black tracking-tighter"
                    >
                        <span className="shimmer-text">SAMRUDDHI</span>
                    </motion.div>

                    {/* Nav links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-8 font-medium text-xs uppercase tracking-widest"
                    >
                        {links.map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                whileHover={{ y: -3, color: "#60a5fa" }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="text-gray-500 hover:text-blue-400 transition-colors"
                                style={{ transitionDelay: `${i * 30}ms` }}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Social icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex gap-3"
                    >
                        {socials.map(({ href, icon: Icon, label }, i) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                aria-label={label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                                whileHover={{ scale: 1.2, rotate: 8 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 glass rounded-2xl text-gray-400 hover:text-blue-400 transition-colors border border-white/5 hover:border-blue-500/30"
                            >
                                <Icon size={18} />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600"
                >
                    <p className="text-xs tracking-wide">
                        &copy; {new Date().getFullYear()} SAMRUDDHI RAMDHAVE. ALL RIGHTS RESERVED.
                    </p>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.93 }}
                        className="flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-white transition-all px-5 py-3 glass rounded-2xl border border-white/5 hover:border-blue-500/40 group"
                    >
                        BACK TO TOP
                        <motion.span
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowUp size={14} />
                        </motion.span>
                    </motion.button>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
