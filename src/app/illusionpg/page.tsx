"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import Display from "@/components/ImageDisplay";

export default function illusionpg() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (

    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* Glitter/Sparkle Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 4}px`,
              height: `${Math.random() * 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.4,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [1.5, 2.0, 1.0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {step === 0 && (
        <motion.div
          
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1.5 }} 
          transition={{ duration: 0.4, ease: "easeOut" }} // Smooth transition
          className="px-6 py-3 text-3xl font-bold cursor-pointer rounded-full bg-white bg-opacity-20 backdrop-blur-md shadow-lg"
          onClick={nextStep}
        >
          Let's Play a Game
        </motion.div>
      )}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, scale:0.5 }}
          animate={{ opacity: 1, scale:1.5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-80 h-48 flex items-center justify-center text-center bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg"
        >
          <p className="text-lg font-semibold">Instructions: Look at the images and type what you see first.</p>
          <button className="absolute bottom-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={nextStep} >  
            Start
          </button>
        </motion.div>
      )}
      {step === 2 && <Display />}
    </div>
  );
}
