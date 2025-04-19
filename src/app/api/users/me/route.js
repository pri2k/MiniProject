import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/User";

connect();

export async function GET(request) {
    try {
      const userId = await getDataFromToken(request);
      const user = await User.findById(userId).select("-password");
  
      return NextResponse.json({
        message: "User found",
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          image: user.image || "",
        },
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
  