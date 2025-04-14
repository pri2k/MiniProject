"use client";
import { useState } from "react";
import axios from "axios";

export default function EmailVerification({ email, setEmail, onVerified }) {
    const [codeSent, setCodeSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");

    const sendVerification = async () => {
        if (!email) {
            alert("Please enter an email first");
            return;
        }
        try {
            await axios.post("/api/verifyEmail/sendCode", { email });
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
                email,
                code: verificationCode,
            });
            if (res.data.verified) {
                setEmailVerified(true);
                onVerified(true);
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
        <>
            <div className="w-full">
                <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600"
                />
            </div>

            <button
                type="button"
                onClick={sendVerification}
                className="p-2 bg-blue-500 text-white rounded mb-2"
            >
                Send Verification Code
            </button>

            {codeSent && !emailVerified && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                    />
                    <button
                        type="button"
                        onClick={validateCode}
                        className="p-2 bg-green-500 text-white rounded"
                    >
                        Verify Code
                    </button>
                </div>
            )}
        </>
    );
}
