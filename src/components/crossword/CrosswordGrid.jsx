"use client";
import React from "react";

export default function CrosswordGrid({
    grid,
    isSelected,
    isFound,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    gameOver
}) {
    return (
        <div className="overflow-auto max-w-full mt-4">
            <table className="border border-black mx-auto select-none" onMouseLeave={onMouseUp}>
                <tbody>
                {grid.map((row, rIdx) => (
                    <tr key={rIdx}>
                    {row.map((letter, cIdx) => (
                        <td
                        key={cIdx}
                        className={`w-8 h-8 border text-center font-bold text-lg
                        ${isSelected(rIdx, cIdx) ? "bg-yellow-300" : ""}
                        ${isFound(rIdx, cIdx) ? "bgMain text-white" : ""}
                        `}
                        onMouseDown={() => !gameOver && onMouseDown(rIdx, cIdx)}
                        onMouseEnter={() => onMouseEnter(rIdx, cIdx)}
                        onMouseUp={onMouseUp}
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
