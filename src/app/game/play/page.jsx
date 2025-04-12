"use client";

import { illusions } from "@/data/illusionData";
import { useEffect, useState } from "react";

function getRandomThree(arr) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

export default function PlayGame() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);

    useEffect(() => {
        const randomImages = getRandomThree(illusions);
        setSelectedImages(randomImages);
    }, []);

    useEffect(() => {
        if (currentIndex < 3) {
        const timer = setTimeout(() => {
            handleNextImage();
        }, 5000);
        return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    const handleNextImage = () => {
        const current = selectedImages[currentIndex];
        if (current && current.options.map(opt => opt.toLowerCase()).includes(userAnswer.toLowerCase())) {
        setScore(prev => prev + 5);
        }
        if (currentIndex < 2) {
        setCurrentIndex(prev => prev + 1);
        setUserAnswer("");
        } else {
        setGameEnded(true);
        }
    };

    if (selectedImages.length === 0) return <div className="text-white p-10">Loading...</div>;

    if (gameEnded) {
        return (
        <div className="h-screen flex flex-col items-center justify-center text-white bg-black">
            <h1 className="text-3xl">Game Over</h1>
            <p className="text-xl mt-4">Your Score: {score} / 15</p>
        </div>
        );
    }

    const current = selectedImages[currentIndex];

    return (
        <div className="h-screen flex flex-col items-center justify-center text-white bg-black">
        <img src={current.filename} alt="illusion" className="w-80 h-80 object-contain rounded-lg" />
        <p className="mt-4">{current.question}</p>
        <input
            type="text"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            placeholder="Type what you see"
            className="mt-3 p-2 text-black rounded"
        />
        <p className="mt-2 text-sm text-gray-300">Auto-next in 5 seconds...</p>
        </div>
    );
}
