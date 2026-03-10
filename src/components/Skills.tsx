"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Brain, Cloud } from "lucide-react";

interface SkillCardProps {
    title: string;
    skills: string[];
    icon: React.ElementType;
    index: number;
    color: string;
}

const SkillCard = ({ title, skills, icon: Icon, index, color }: SkillCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
        viewport={{ once: true }}
        whileHover={{ y: -8, transition: { duration: 0.25 } }}
        className="card-shimmer-wrap glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/50 transition-all group relative overflow-hidden"
    >
        {/* Gradient corner accent */}
        <div
            className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity duration-500"
            style={{ background: color }}
        />

        {/* Animated icon */}
        <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative"
            style={{ background: `${color}18` }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <Icon size={26} style={{ color }} />
            {/* Ping ring on appear */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0.8 }}
                whileInView={{ scale: 2, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.15 }}
                className="absolute inset-0 rounded-2xl"
                style={{ border: `1px solid ${color}` }}
            />
        </motion.div>

        <h3 className="text-xl font-bold mb-5 tracking-tight text-white">{title}</h3>

        <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
                <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + i * 0.04 }}
                    whileHover={{ scale: 1.12, y: -2 }}
                    className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-400 border border-white/5 hover:border-blue-500/40 hover:text-white cursor-default transition-colors"
                >
                    {skill}
                </motion.span>
            ))}
        </div>
    </motion.div>
);

const Skills = () => {
    const skillCategories = [
        {
            title: "Programming",
            icon: Code2,
            color: "#3b82f6",
            skills: ["Java", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3", "Python"],
        },
        {
            title: "Libraries & Frameworks",
            icon: Database,
            color: "#8b5cf6",
            skills: ["React", "Node.js", "Express.js", "Next.js", "Tailwind CSS", "LangChain", "Framer Motion"],
        },
        {
            title: "Databases & AI",
            icon: Brain,
            color: "#06b6d4",
            skills: ["MongoDB", "MySQL", "PostgreSQL", "Google Cloud Vertex AI", "OpenAI API", "Vector DBs"],
        },
        {
            title: "Tools & DevOps",
            icon: Cloud,
            color: "#10b981",
            skills: ["Git", "GitHub", "Postman", "Vercel", "Render", "RESTful APIs", "Docker"],
        },
    ];

    return (
        <section id="skills" className="py-24 relative bg-[#121212] overflow-hidden">
            {/* Background decoration */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none"
                style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />

            <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-white"
                    >
                        TECHNICAL{" "}
                        <motion.span
                            className="text-blue-500 italic inline-block"
                            animate={{ skewX: [0, -3, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            ARSENAL
                        </motion.span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed"
                    >
                        Powering sophisticated digital solutions with a modern, high-performance tech stack.
                    </motion.p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-px bg-gradient-to-r from-blue-500 via-purple-500 to-transparent mt-4 origin-left"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillCategories.map((category, index) => (
                        <SkillCard key={category.title} {...category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
