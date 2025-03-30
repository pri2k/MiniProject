import { useState, useRef, useEffect } from "react";

export default function ProblemSelect() {
    const problemOptions = ["Depression", "Anxiety", "Stress", "Loneliness", "Self-esteem Issues", "Relationship Problems", "Grief", "Career Stress", "Other"];
    
    const [volunteer, setVolunteer] = useState({ problem: [] });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelectProblem = (problem) => {
        if (!volunteer.problem.includes(problem)) {
            setVolunteer({ ...volunteer, problem: [...volunteer.problem, problem] });
        }
    };

    const handleRemoveProblem = (problem) => {
        setVolunteer({
            ...volunteer,
            problem: volunteer.problem.filter((p) => p !== problem),
        });
    };

    return (
        <div className="w-full relative" ref={dropdownRef}>
            <label htmlFor="problem" className="block font-semibold mb-1">Problem Expertise</label>
            
            {/* Display selected items as tags */}
            <div 
                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                {volunteer.problem.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {volunteer.problem.map((item) => (
                            <div key={item} className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                {item}
                                <button 
                                    className="ml-2 text-white hover:text-red-400"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveProblem(item);
                                    }}
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Select problems...</p>
                )}
            </div>

            {/* Dropdown for selecting problems */}
            {dropdownOpen && (
                <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10">
                    {problemOptions.map((problem) => (
                        <div 
                            key={problem} 
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectProblem(problem)}
                        >
                            {problem}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
