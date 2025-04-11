"use client";
import { useState } from "react";
import ProblemSelect from "@/components/ProblemSelect"
import ImageUpload from "@/components/ImageUpload"
import axios from "axios";

export default function VolunteerForm() {
    const [volunteer, setVolunteer] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        description: "",
        image: "",
        problem: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/volunteer/register", volunteer);
            console.log("Volunteer Registered:", response.data);
        } catch (error) {
            console.error("Error registering volunteer: ", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 w-[70%] max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Volunteer Registration</h1>
            <hr className="w-full border-gray-300 mb-4" />

            <div className="w-full">
                <label htmlFor="name" className="block font-semibold mb-1">Name</label>
                <input
                    id="name"
                    type="text"
                    value={volunteer.name}
                    onChange={(e) => setVolunteer({ ...volunteer, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                />
            </div>

            <div className="w-full">
                <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                <input
                    id="email"
                    type="email"
                    value={volunteer.email}
                    onChange={(e) => setVolunteer({ ...volunteer, email: e.target.value })}
                    placeholder="Enter email"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                />
            </div>

            <div className="w-full">
                <label htmlFor="password" className="block font-semibold mb-1">Password</label>
                <input
                    id="password"
                    type="password"
                    value={volunteer.password}
                    onChange={(e) => setVolunteer({ ...volunteer, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                />
            </div>

            <div className="w-full">
                <label htmlFor="age" className="block font-semibold mb-1">Age</label>
                <input
                    id="age"
                    type="number"
                    value={volunteer.age}
                    onChange={(e) => setVolunteer({ ...volunteer, age: e.target.value })}
                    placeholder="Enter age"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                />
            </div>

            <div className="w-full">
                <label htmlFor="description" className="block font-semibold mb-1">Description</label>
                <textarea
                    id="description"
                    value={volunteer.description}
                    onChange={(e) => setVolunteer({ ...volunteer, description: e.target.value })}
                    placeholder="Briefly describe yourself"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                />
            </div>

            <ImageUpload data={volunteer} setData={setVolunteer} />

            <ProblemSelect volunteer={volunteer} setVolunteer={setVolunteer} />

            <button
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none transition-transform duration-300 bg-yellow-500 text-white font-semibold hover:bg-yellow-600 hover:-translate-y-1 shadow-md hover:shadow-lg"
                onClick={handleSubmit}
            >
                Register as Volunteer
            </button>
        </div>
    );
}
