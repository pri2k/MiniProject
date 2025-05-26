"use client";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [breathText, setBreathText] = useState("Breathe In");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setBreathText((prev) => (prev === "Breathe In" ? "Breathe Out" : "Breathe In"));
        setAnimate(false);
      }, 5000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing_page px-8 py-12 md:px-16 md:py-20 bg-white">
      <div className="flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-6xl text-blue-500 font-bold mb-4 md:pl-10 sm:mt-20">Hope begins with a conversation</h1>
          <h6 className="text-lg text-blue-600 text-gray-600 md:pl-10">
            Brighter Beyond is your safe space to heal—with caring volunteers, expert support, calming tools, and a community that listens
          </h6>

          {/* Breathing Circle - Mobile only */}
          <div className="mt-10 md:hidden flex justify-center">
            <div className="relative w-48 h-48 border-4 border-blue-300 rounded-full">
              {/* Rotating Dot */}
              <div className="absolute inset-0 spin-slow">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-md" />
              </div>

              {/* Fixed Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`breath-text ${animate ? "animate" : "normal"}`}>
                    {breathText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 relative hidden md:flex justify-center">
          <img
            src="/images/bg/help2.jpg"
            alt="Background"
            className="w-64 h-auto rounded-xl shadow-md absolute top-20 left-20"
          />
          <img
            src="/images/bg/help.jpg"
            alt="Foreground"
            className="w-64 h-auto rounded-xl shadow-lg relative z-10 absolute bottom-15 left-20"
          />
        </div>
      </div>
    </div>
  );
}
