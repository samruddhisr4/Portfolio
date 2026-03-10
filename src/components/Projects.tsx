"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github } from "lucide-react";
import { useRef } from "react";

interface Project {
    title: string;
    description: string;
    tags: string[];
    image: string;
    link?: string;
    github: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

const projects = [
    {
        title: "Wanderly-AI Travel Planner",
        description: "An intelligent travel planning application that generates personalized itineraries using AI.",
        tags: ["Next.js", "Tailwind CSS", "Gemini AI", "Framer Motion"],
        image: "/wanderly.png",
        link: "https://github.com/samruddhisr4/Wanderly---AI-Travel-Planner",
        github: "https://github.com/samruddhisr4/Wanderly---AI-Travel-Planner",
    },
    {
        title: "MealMind-AI",
        description: "AI-powered meal planning and nutrition tracking system for healthier lifestyle choices.",
        tags: ["React", "Node.js", "OpenAI API", "MongoDB"],
        image: "/mealmind.png",
        link: "https://github.com/samruddhisr4/MealMind-AI",
        github: "https://github.com/samruddhisr4/MealMind-AI",
    },
    {
        title: "Production-Grade RAG System",
        description: "Production-grade RAG system optimized for querying complex technical documentation.",
        tags: ["Python", "LangChain", "Vector stores", "FastAPI"],
        image: "/rag.png",
        link: "https://github.com/samruddhisr4/Production-Grade-Retrieval-Augmented-Generation-System-for-Technical-Docs",
        github: "https://github.com/samruddhisr4/Production-Grade-Retrieval-Augmented-Generation-System-for-Technical-Docs",
    },
    {
        title: "GeoSync",
        description: "A premium real-time map synchronization application with latency under 100ms. Features role-based access, live HUD, and auto-locking for seamless coordination.",
        tags: ["Next.js 15", "Socket.io", "React 19", "Leaflet.js", "Express"],
        image: "/geosync.png",
        link: "https://github.com/samruddhisr4/ReelOnGo-Assignment",
        github: "https://github.com/samruddhisr4/ReelOnGo-Assignment",
    },
    {
        title: "MangoNet",
        description: "Deep learning project leveraging transfer learning with VGG16 to classify mango varieties from images. Designed for deployment in agriculture, fruit markets, and processing facilities for automated, accurate mango sorting.",
        tags: ["Python", "TensorFlow", "Keras", "VGG16", "Transfer Learning"],
        image: "/mangonet.png",
        github: "https://github.com/samruddhisr4/MangoNet",
    },
    {
        title: "Learning Management System",
        description: "Comprehensive Learning Management System featuring course management, student progress tracking, and interactive assessment tools.",
        tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
        image: "/lms.png",
        link: "https://github.com/samruddhisr4/LMS-Project",
        github: "https://github.com/samruddhisr4/LMS-Project",
    },
];

// ── 3-D tilt card ────────────────────────────────────────────────────────
function ProjectCard({ project, index }: ProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const rotX = useMotionValue(0);
    const rotY = useMotionValue(0);
    const springX = useSpring(rotX, { stiffness: 120, damping: 18 });
    const springY = useSpring(rotY, { stiffness: 120, damping: 18 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        rotX.set(((e.clientY - top - height / 2) / height) * -12);
        rotY.set(((e.clientX - left - width / 2) / width) * 12);
    };
    const handleMouseLeave = () => { rotX.set(0); rotY.set(0); };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: springX,
                    rotateY: springY,
                    transformStyle: "preserve-3d",
                }}
                className="card-shimmer-wrap glass rounded-3xl overflow-hidden group border border-white/10 hover:border-blue-500/50 transition-all duration-300 h-full"
            >
                {/* Image area */}
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay always */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

                    {/* Hover: GitHub only */}
                    <motion.div
                        initial={false}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-blue-500/80 transition-colors border border-white/20"
                        >
                            <Github className="w-6 h-6 text-white" />
                        </motion.a>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-7">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 mb-5 font-light text-sm leading-relaxed">{project.description}</p>

                    {/* Tags with staggered entrance */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.7 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 + i * 0.05 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 cursor-default"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="py-20 px-6 md:px-20 bg-[#121212]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                {/* Heading */}
                <div className="mb-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
                    >
                        SELECTED{" "}
                        <span className="text-blue-500 italic">WORK</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-px bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent mt-4 origin-left"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1200px" }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
