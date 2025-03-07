import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        const user = await User.findOne({email});

        console.log("user in signup",user);

        if (user) {
            return NextResponse.json({
                error: "User already exists",
                status: 400
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        })

        const savedUser = newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            status: 201
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500  
        })
    }
}