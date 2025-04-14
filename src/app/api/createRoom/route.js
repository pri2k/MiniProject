import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Step 1: Create the room
    const roomRes = await fetch("https://api.100ms.live/v2/rooms", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HMS_MANAGEMENT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `room-${Date.now()}`,
        description: "Video call room",
        template_id: process.env.HMS_TEMPLATE_ID,
      }),
    });

    const roomData = await roomRes.json();

    if (!roomRes.ok || !roomData.id) {
      console.error("Room creation failed:", roomData);
      return NextResponse.json(
        { success: false, message: "Failed to create 100ms room" },
        { status: 500 }
      );
    }

    const roomId = roomData.id;

    // Step 2: Create room codes for all roles
    const codeRes = await fetch(
      `https://api.100ms.live/v2/room-codes/room/${roomId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HMS_MANAGEMENT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const codeData = await codeRes.json();

    if (!codeRes.ok || !codeData.data || codeData.data.length === 0) {
      console.error("Room code creation failed:", codeData);
      return NextResponse.json(
        { success: false, message: "Failed to create room codes" },
        { status: 500 }
      );
    }

    // Find the room code for the 'host' role
    const hostCodeObj = codeData.data.find((entry) => entry.role === "host");

    if (!hostCodeObj || !hostCodeObj.code) {
      console.error("Host room code not found:", codeData);
      return NextResponse.json(
        { success: false, message: "Host room code not found" },
        { status: 500 }
      );
    }

    const roomCode = hostCodeObj.code;

    return NextResponse.json({ success: true, id: roomId, roomCode });
  } catch (err) {
    console.error("API /createRoom error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
