"use client";
import HomePage from "@/components/layout/HomePage";
import { AuroraBackground } from "@/components/ui/AuraBackground";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <main className="flex min-h-screen flex-col items-center justify-between py-12 lg:px-24 lg:max-w-screen-xl mx-auto">
          <HomePage />
        </main>
      </motion.div>
    </AuroraBackground>
  );
}
