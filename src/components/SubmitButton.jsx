"use client";

export default function SubmitButton({ loading, onClick, disabled, children }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`w-full p-2 border rounded-lg mb-4 text-black font-bold bg-[#D7A529] 
                ${disabled || loading ? "cursor-not-allowed" : "hover:-translate-y-2"} 
                transition-all duration-300`}
        >
            {loading ? "Processing..." : children}
        </button>
    );
}
