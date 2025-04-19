import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req) {
    try {
      const reqBody = await req.json();
      const { email, password } = reqBody;
  
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ error: "User does not exist" }, { status: 400 });
      }
  
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json({ error: "Invalid password" }, { status: 400 });
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
      );
  
      const response = NextResponse.json({
        message: "Login Successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          image: user.image || ""
        },
      });
  
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
  
      return response;
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
