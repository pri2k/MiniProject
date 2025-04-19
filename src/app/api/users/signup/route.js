import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { apiErrorResponse } from "@/lib/apiErrorResponse";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password, image, age, gender } = reqBody;
  
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
  
        const hashedPassword = await bcryptjs.hash(password, 10);
  
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            image,
            age,  
            gender 
        });
  
        await newUser.save();
  
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (err) {
        return apiErrorResponse(err, "Failed to register user");
    }
}
