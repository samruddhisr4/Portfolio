"use client";
import React from "react";

import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Certificates from "@/components/Certificates";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="relative bg-[#121212]">
            <Navbar />

            {/* Hero Section */}
            <Hero />

            {/* Rest of the content */}
            <div className="relative z-20 bg-[#121212]">
                <Skills />
                <Certificates />
                <Projects />
                <Experience />
                <Contact />
                <Footer />
            </div>
        </main>
    );
}
