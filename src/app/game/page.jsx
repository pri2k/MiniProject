"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function GameStartPage() {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const nextStep = () => setStep(prev => prev + 1);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        {step === 0 && (
            <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={nextStep}
            className="text-3xl px-6 py-3 rounded-full bg-white text-black font-bold"
            >
            Let's Play a Game
            </motion.button>
        )}

        {step === 1 && (
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 px-6"
            >
            <p className="text-lg">Instructions: Look at the images and type what you see first.</p>
            <button
                onClick={() => router.push("/game/play")}
                className="px-6 py-2 bg-blue-600 rounded"
            >
                Start
            </button>
            </motion.div>
        )}
        </div>
    );
}
