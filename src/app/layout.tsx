import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Samruddhi Ramdhave | Creative Developer",
    description: "Portfolio of Samruddhi Ramdhave, a Senior Creative Developer specializing in high-performance digital experiences.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} font-sans antialiased bg-[#121212] text-white`}>
                {children}
            </body>
        </html>
    );
}
