import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

connect();

export async function PUT(request) {
  try {
    const userId = await getDataFromToken(request);    
    const body = await request.json();
    console.log("userId", userId);
    console.log("body", body);

    const { name, image } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const u = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`);
    console.log("Fetched user data:", u);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, image },
      { new: true }
    ).select("-password");

    console.log("Updated user:", updatedUser);

    return NextResponse.json({
      success: true,
      message: "User updated",
      updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, message: "Update failed" });
  }
}
