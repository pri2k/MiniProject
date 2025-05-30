import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/User";

connect();

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ message: "No user logged in", data: null });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found", data: null });
    }

    return NextResponse.json({
      message: "User found",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image || "",
      },
    });
  } catch (error) {
    // Instead of returning an error, return null user
    console.error("Error fetching user data:", error);
    return NextResponse.json({ message: "Not logged in", data: null });
  }
}
