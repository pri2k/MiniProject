"use client";
import { useState } from "react";
import ProblemSelect from "@/components/ProblemSelect";
import ImageUpload from "@/components/ImageUpload";
import GenderDropdown from "@/components/GenderDropdown";
import axios from "axios";
import EmailVerification from "@/components/EmailVerification";

export default function VolunteerForm() {
    const [volunteer, setVolunteer] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        description: "",
        image: "",
        problem: "",
    });

    const [codeSent, setCodeSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/volunteer/register", volunteer);
            if (res.status === 200) {
                alert("Volunteer registered successfully!");
                setVolunteer({
                    name: "",
                    email: "",
                    password: "",
                    age: "",
                    gender: "",
                    description: "",
                    image: "",
                    problem: [],
                });
            }
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Error registering volunteer");
        }
    };

    const sendVerification = async () => {
        if (!volunteer.email) {
            alert("Please enter an email first");
            return;
        }
        try {
            await axios.post("/api/verifyEmail/sendCode", { email: volunteer.email });
            setCodeSent(true);
            alert("Verification code sent!");
        } catch (err) {
            console.error(err);
            alert("Failed to send code");
        }
    };
    
    const validateCode = async () => {
        try {
            const res = await axios.post("/api/verifyEmail/validateCode", {
                email: volunteer.email,
                code: verificationCode,
            });
            if (res.data.verified) {
                setEmailVerified(true);
                alert("Email verified!");
            } else {
                alert("Invalid code");
            }
        } catch (err) {
            console.error(err);
            alert("Verification failed");
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

            <EmailVerification
                email={volunteer.email}
                setEmail={(email) => setVolunteer({ ...volunteer, email })}
                onVerified={(status) => setEmailVerified(status)}
            />


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

            <GenderDropdown volunteer={volunteer} setVolunteer={setVolunteer} />


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
                disabled={!emailVerified}
                onClick={handleSubmit}
                className={`w-full p-3 border rounded-lg mb-4 text-white font-semibold transition ${
                    emailVerified
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-gray-400 cursor-not-allowed"
                }`}
            >
                Register as Volunteer
            </button>

        </div>
    );
}
