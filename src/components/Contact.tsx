"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Send, Phone, Github, CheckCircle2, AlertCircle } from "lucide-react";

const Contact = () => {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            // IMPORTANT: Replace 'mqakpzoz' with your actual Formspree Form ID
            const response = await fetch("https://formspree.io/f/xzdanwar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("sent");
                setFormData({ name: "", email: "", subject: "", message: "" });
                // Reset status after 3 seconds
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                throw new Error(data.error || "Failed to send message");
            }
        } catch (error) {
            console.error("Form error:", error);
            setStatus("error");
            // Reset to idle after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section id="contact" className="py-24 relative bg-[#121212]">
            <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
                    >
                        GET IN <span className="text-blue-500 italic">TOUCH</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg font-light mt-4"
                    >
                        Always open to collaboration and innovative digital projects.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-blue-500/60 uppercase tracking-widest font-bold mb-1">Email</p>
                                    <a href="mailto:samruddhisr4@gmail.com" className="text-lg text-white hover:text-blue-400 transition-colors">
                                        samruddhisr4@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Linkedin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-blue-500/60 uppercase tracking-widest font-bold mb-1">LinkedIn</p>
                                    <a href="https://www.linkedin.com/in/samruddhi-shital-ramdhave-0187a9374/" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-blue-400 transition-colors">
                                        linkedin.com/in/samruddhi-shital-ramdhave
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-blue-500/60 uppercase tracking-widest font-bold mb-1">Phone</p>
                                    <a href="tel:+919372676593" className="text-lg text-white hover:text-blue-400 transition-colors">
                                        +91-9372676593
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <a href="https://github.com/samruddhisr4" target="_blank" rel="noopener noreferrer" className="flex-1 glass py-5 flex items-center justify-center rounded-2xl hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-wider text-blue-400">GitHub</a>
                            <a href="https://drive.google.com/file/d/1MezqfKhYhJAfdp_n4ek3cPOR11wSUT1I/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex-1 glass py-5 flex items-center justify-center rounded-2xl hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-wider text-blue-400">Resume</a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass p-8 rounded-3xl border border-white/5"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500 pl-1 uppercase tracking-tighter">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500 pl-1 uppercase tracking-tighter">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500 pl-1 uppercase tracking-tighter">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-white"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500 pl-1 uppercase tracking-tighter">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-white resize-none"
                                    placeholder="Let's build something great..."
                                ></textarea>
                            </div>

                            <div className="space-y-4">
                                <motion.button
                                    type="submit"
                                    disabled={status === "sending"}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className={`w-full py-5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-xl uppercase tracking-widest text-sm ${status === "sent"
                                        ? "bg-green-600 shadow-green-500/20"
                                        : status === "error"
                                            ? "bg-red-600 shadow-red-500/20"
                                            : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
                                        }`}
                                >
                                    {status === "idle" && (
                                        <>Send Message <Send size={18} /></>
                                    )}
                                    {status === "sending" && (
                                        <>Sending...</>
                                    )}
                                    {status === "sent" && (
                                        <>Message Sent! <CheckCircle2 size={18} /></>
                                    )}
                                    {status === "error" && (
                                        <>Failed to Send <AlertCircle size={18} /></>
                                    )}
                                </motion.button>

                                {status === "error" && (
                                    <p className="text-red-500 text-xs text-center font-medium">
                                        Invalid Form ID. Please check your Formspree configuration.
                                    </p>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
