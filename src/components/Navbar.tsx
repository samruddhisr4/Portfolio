"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("about");

    // ── Scroll-based transparency & active section ──────────────────────────
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section
            const sections = navLinks.map((l) => l.href.slice(1));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 120) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "glass py-4" : "bg-transparent py-8"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-20">
                <div className="flex justify-between items-center">

                    {/* ── Logo ── */}
                    <motion.a
                        href="#about"
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-xl font-black tracking-tighter relative group"
                    >
                        <span className="text-gradient">Samruddhi Ramdhave</span>
                        <motion.span
                            className="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        />
                    </motion.a>

                    {/* ── Desktop links ── */}
                    <div className="hidden md:flex items-center gap-8 font-medium tracking-tight">
                        {navLinks.map((link, i) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, y: -12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                                    className={`relative text-sm uppercase transition-colors duration-300 group ${isActive ? "text-blue-400" : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                    {/* Active indicator */}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 rounded-full"
                                        animate={{ width: isActive ? "100%" : "0%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    {/* Hover indicator (only when not active) */}
                                    {!isActive && (
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/40 rounded-full transition-all duration-300 group-hover:w-full" />
                                    )}
                                </motion.a>
                            );
                        })}

                        {/* ── Social icons ── */}
                        <div className="flex items-center gap-5 pl-8 ml-2 border-l border-white/10">
                            {[
                                { href: "https://github.com/samruddhisr4", icon: Github },
                                { href: "https://www.linkedin.com/in/samruddhi-shital-ramdhave-0187a9374/", icon: Linkedin },
                                { href: "#contact", icon: Mail },
                            ].map(({ href, icon: Icon }, i) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: -12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                                    whileHover={{ scale: 1.2, rotate: 8, color: "#60a5fa" }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-gray-400 transition-colors"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* ── Mobile button ── */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden p-2 text-white"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.span
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={24} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={24} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden glass border-t border-white/5"
                    >
                        <div className="px-6 py-8 space-y-4">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className="block text-xl font-bold uppercase tracking-widest hover:text-blue-400 transition-colors"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <div className="flex space-x-6 pt-6 border-t border-white/10">
                                <a href="https://github.com/samruddhisr4" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><Github size={22} /></a>
                                <a href="https://www.linkedin.com/in/samruddhi-shital-ramdhave-0187a9374/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><Linkedin size={22} /></a>
                                <a href="mailto:samruddhisr4@gmail.com" className="hover:text-blue-400 transition-colors"><Mail size={22} /></a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
