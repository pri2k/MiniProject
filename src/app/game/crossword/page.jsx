"use client";

import React, { useState, useEffect, useRef } from "react";

const positiveWords = [
  "HOPE", "PEACE", "LOVE", "HAPPY", "SMILE", "FAITH", "BRAVE", "SHINE", "KIND", "GRACE",
  "TRUST", "HEART", "LUCK", "DREAM", "LIGHT", "CALM", "GLOW", "ENERGY", "BLOOM", "JOLLY"
];

const directions = [
  { dr: 0, dc: 1 },    // right
  { dr: 1, dc: 0 },    // down
  { dr: 1, dc: 1 },    // diagonal down right
  { dr: -1, dc: 1 },   // diagonal up right
];

const GRID_SIZE = 12;

function generateGrid() {
    const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(""));
    const placedWords = [];

    for (const word of positiveWords) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 100) {
        attempts++;
        const dir = directions[Math.floor(Math.random() * directions.length)];
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        let fits = true;
        for (let i = 0; i < word.length; i++) {
            const r = row + i * dir.dr;
            const c = col + i * dir.dc;
            if (
            r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE ||
            (grid[r][c] && grid[r][c] !== word[i])
            ) {
            fits = false;
            break;
            }
        }

        if (fits) {
            for (let i = 0; i < word.length; i++) {
            const r = row + i * dir.dr;
            const c = col + i * dir.dc;
            grid[r][c] = word[i];
            }
            placedWords.push({ word, start: [row, col], direction: dir });
            placed = true;
        }
        }
    }

    // Fill empty spaces
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
        if (!grid[r][c]) {
            grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
        }
    }

    return { grid, placedWords };
    }

    export default function CrosswordGame() {
    const [{ grid, placedWords }, setGridData] = useState(generateGrid());
    const [selectedCells, setSelectedCells] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [mouseDown, setMouseDown] = useState(false);
    const [score, setScore] = useState(0);
    const timerRef = useRef(null);
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        timerRef.current = setInterval(() => {
        setSecondsLeft(prev => {
            if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameOver(true);
            return 0;
            }
            return prev - 1;
        });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    const handleMouseDown = (r, c) => {
        if (gameOver) return;
        setMouseDown(true);
        setSelectedCells([{ row: r, col: c }]);
    };

    const handleMouseEnter = (r, c) => {
        if (mouseDown) {
        setSelectedCells(prev => [...prev, { row: r, col: c }]);
        }
    };

    const handleMouseUp = () => {
        setMouseDown(false);
        const selectedWord = selectedCells.map(({ row, col }) => grid[row][col]).join("");

        const match = placedWords.find(({ word }) => word === selectedWord && !foundWords.includes(word));
        if (match) {
        setFoundWords(prev => [...prev, match.word]);
        setScore(prev => prev + 5);
        }
        setSelectedCells([]);
    };

    const isSelected = (r, c) => selectedCells.some(cell => cell.row === r && cell.col === c);
    const isFound = (r, c) => {
        return placedWords.some(p => {
        if (!foundWords.includes(p.word)) return false;
        for (let i = 0; i < p.word.length; i++) {
            const rr = p.start[0] + i * p.direction.dr;
            const cc = p.start[1] + i * p.direction.dc;
            if (rr === r && cc === c) return true;
        }
        return false;
        });
    };

    return (
        <div className="pt-[7em]">
        <div className="w-full min-h-screen bg-blue-50 py-10 px-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Crossword Puzzle</h1>
        <div className="text-xl mb-2">Time Left: {secondsLeft}s</div>
        <div className="mb-2 text-lg">Score: {score} / {positiveWords.length * 5}</div>

        <div className="overflow-auto max-w-full mt-4">
            <table className="border border-black mx-auto select-none"
            onMouseLeave={() => setMouseDown(false)}
            >
            <tbody>
                {grid.map((row, rIdx) => (
                <tr key={rIdx}>
                    {row.map((letter, cIdx) => (
                    <td
                        key={cIdx}
                        className={`w-8 h-8 border text-center font-bold text-lg
                        ${isSelected(rIdx, cIdx) ? "bg-yellow-300" : ""}
                        ${isFound(rIdx, cIdx) ? "bg-green-400 text-white" : ""}
                        `}
                        onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                        onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                        onMouseUp={handleMouseUp}
                    >
                        {letter}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Words to Find</h2>
            <div className="flex flex-wrap gap-3 justify-center max-w-xl">
            {positiveWords.map((word, i) => (
                <span
                key={i}
                className={`px-2 py-1 rounded-full border ${
                    foundWords.includes(word) ? "bg-green-300 line-through" : "bg-white"
                }`}
                >
                {word}
                </span>
            ))}
            </div>
        </div>

        {gameOver && (
            <div className="mt-6 text-2xl text-red-600 font-semibold">
            Game Over! Final Score: {score}
            </div>
        )}
        </div>
        </div>
    );
}
