

'use client';

import { useState, useEffect } from 'react';
import QuestionCard from "@/components/QuestionCard";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const topics = ['Stress', 'Sleep'];

export default function Page() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const dummyQuestions = {
    Stress: [
      { question: 'How often do you feel overwhelmed?', options: ['Rarely', 'Sometimes', 'Often'], points: [1, 2, 3] },
      { question: 'Do you find it hard to relax?', options: ['No', 'Maybe', 'Yes'], points: [1, 2, 3] },
    ],
    Sleep: [
      { question: 'Do you sleep at least 7 hours a night?', options: ['Always', 'Sometimes', 'Never'], points: [1, 2, 3] },
      { question: 'Do you wake up feeling refreshed?', options: ['Yes', 'Somewhat', 'No'], points: [1, 2, 3] },
    ]
  };

  const questions = selectedTopic
    ? dummyQuestions[selectedTopic as keyof typeof dummyQuestions]
    : [];

  useEffect(() => {
    if (questions.length > 0 && currentQuestion >= questions.length) {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, questions]);

  const handleOptionClick = (point: number) => {
    setAnswers([...answers, point]);
    setTimeout(() => {
      setCurrentQuestion((prev) => prev + 1);
    }, 300);
  };

  if (!selectedTopic) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4">Choose a topic</h2>
        <div className="flex gap-4">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (questions.length > 0 && currentQuestion >= questions.length) {
    const totalScore = answers.reduce((a, b) => a + b, 0);

    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 backdrop-blur-md px-4">
        {!showResult ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-700 font-semibold">Calculating your result...</p>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-xl text-center"
          >
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">Your Result</h2>
            <p className="text-lg mb-6">Total Score: <span className="font-semibold">{totalScore}</span></p>
            <Link href="/">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full transition">
                Go back to Home
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 backdrop-blur-md px-4 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard
            question={current.question}
            options={current.options}
            onSelect={(idx) => handleOptionClick(current.points[idx])}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
