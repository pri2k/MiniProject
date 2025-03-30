"use client";
import { useState } from "react";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Volunteer Data:", volunteer);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Volunteer Registration</h1>
        <hr/>

        <label htmlFor="name">Name</label>
        <input
            id="name"
            type="text"
            value={volunteer.name}
            onChange={(e) => setVolunteer({ ...volunteer, name: e.target.value })}
            placeholder="Enter full name"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        />

        <label htmlFor="email">Email</label>
        <input
            id="email"
            type="email"
            value={volunteer.email}
            onChange={(e) => setVolunteer({ ...volunteer, email: e.target.value })}
            placeholder="Enter email"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        />

        <label htmlFor="password">Password</label>
        <input
            id="password"
            type="password"
            value={volunteer.password}
            onChange={(e) => setVolunteer({ ...volunteer, password: e.target.value })}
            placeholder="Enter password"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        />

        <label htmlFor="age">Age</label>
        <input
            id="age"
            type="number"
            value={volunteer.age}
            onChange={(e) => setVolunteer({ ...volunteer, age: e.target.value })}
            placeholder="Enter age"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        />

        <label htmlFor="description">Description</label>
        <textarea
            id="description"
            value={volunteer.description}
            onChange={(e) => setVolunteer({ ...volunteer, description: e.target.value })}
            placeholder="Briefly describe yourself"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        />

        <label htmlFor="image">Profile Image URL</label>
        <input
            id="image"
            type="text"
            value={volunteer.image}
            onChange={(e) => setVolunteer({ ...volunteer, image: e.target.value })}
            placeholder="Enter image URL"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        />

        <label htmlFor="problem">Problem Expertise</label>
        <input
            id="problem"
            type="text"
            value={volunteer.problem}
            onChange={(e) => setVolunteer({ ...volunteer, problem: e.target.value })}
            placeholder="e.g., Depression, Anxiety"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        />

        <button
            className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none transition-transform duration-300 bg-yellow-500 text-white font-semibold hover:bg-yellow-600 hover:-translate-y-2 shadow-md hover:shadow-lg"
            onClick={handleSubmit}
        >
            Register as Volunteer
        </button>
        </div>
    );
}