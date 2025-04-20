"use client";

import React, { useState, useEffect, useRef } from "react";
import { getRandomWords } from "../../../utils/words";
import CrosswordGrid from "../../../components/crossword/CrosswordGrid";
import WordList from "../../../components/crossword/WordList";
import GameControls from "../../../components/crossword/GameControls";

const GRID_SIZE = 12;

const directions = [
    { dr: 0, dc: 1 }, // Horizontal
    { dr: 1, dc: 0 }  // Vertical
];

function generateGrid(words) {
    const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(""));
    const placedWords = [];

    for (const word of words) {
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
    const [words, setWords] = useState(getRandomWords());
    const [{ grid, placedWords }, setGridData] = useState(generateGrid(words));
    const [selectedCells, setSelectedCells] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [mouseDown, setMouseDown] = useState(false);
    const [score, setScore] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(120);
    const [gameOver, setGameOver] = useState(false);
    const timerRef = useRef(null);

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
        if (mouseDown) setSelectedCells(prev => [...prev, { row: r, col: c }]);
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

    const restartGame = () => {
        const newWords = getRandomWords();
        setWords(newWords);
        setGridData(generateGrid(newWords));
        setFoundWords([]);
        setSelectedCells([]);
        setScore(0);
        setSecondsLeft(120);
        setGameOver(false);
        clearInterval(timerRef.current);
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
    };

    const stopGame = () => {
        clearInterval(timerRef.current);
        setGameOver(true);
    };

    return (
        <div className="crossword w-full min-h-screen py-10 px-6 flex flex-col lg:flex-row justify-center gap-20">
        <div className="">
            <h1 className="text-3xl font-bold mb-4 text-center ">Crossword Puzzle</h1>
            <CrosswordGrid
                grid={grid}
                isSelected={isSelected}
                isFound={isFound}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
                gameOver={gameOver}
            />

            <GameControls 
                onRestart={restartGame} 
                onStop={stopGame} 
                gameOver={gameOver} 
            />
            {gameOver && (
                <div className="mt-6 text-2xl text-red-600 font-semibold text-center lg:text-left">
                    Game Over! Final Score: {score}
                </div>
            )}
        </div>
        <WordList 
            words={words} 
            foundWords={foundWords} 
            score={score} 
            timeLeft={secondsLeft} 
        />
        </div>
    );
}
