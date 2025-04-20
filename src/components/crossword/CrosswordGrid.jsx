"use client";
import React from "react";

export default function CrosswordGrid({
    grid,
    isSelected,
    isFound,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onTouchEnd,
    gameOver
}) {
    const handleTouchStart = (e, r, c) => {
        e.preventDefault();
        if (!gameOver) onMouseDown(r, c);
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target?.tagName === "TD") {
            const r = parseInt(target.getAttribute("data-row"));
            const c = parseInt(target.getAttribute("data-col"));
            if (!isNaN(r) && !isNaN(c)) {
                onMouseEnter(r, c);
            }
        }
    };

    const handleTouchEnd = () => {
        handleMouseUp(); // Same logic as desktop
    };

    return (
        <div
            className="overflow-auto max-w-full mt-4"
            onTouchMove={handleTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <table className="border border-black mx-auto select-none" onMouseLeave={onMouseUp}>
                <tbody>
                    {grid.map((row, rIdx) => (
                        <tr key={rIdx}>
                            {row.map((letter, cIdx) => (
                                <td
                                    key={cIdx}
                                    data-row={rIdx}
                                    data-col={cIdx}
                                    className={`w-8 h-8 border text-center font-bold text-lg
                                        ${isSelected(rIdx, cIdx) ? "bg-yellow-300" : ""}
                                        ${isFound(rIdx, cIdx) ? "bgMain text-white" : ""}
                                    `}
                                    onMouseDown={() => !gameOver && onMouseDown(rIdx, cIdx)}
                                    onMouseEnter={() => onMouseEnter(rIdx, cIdx)}
                                    onMouseUp={onMouseUp}
                                    onTouchStart={(e) => handleTouchStart(e, rIdx, cIdx)}
                                >
                                    {letter}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
