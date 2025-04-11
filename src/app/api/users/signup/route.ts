import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
      const reqBody = await request.json();
      const { username, email, password, image } = reqBody;
  
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
      });
  
      await newUser.save();
  
      return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  