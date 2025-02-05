import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const getUserDetails = async (req: NextRequest) => {
    try {
        const res = await axios.get("/api/users/me");
        console.log("res in getUserDetails", res);
        return NextResponse.json({
            status: "success",
            data: res.data.data
        })
    } catch (error : any) {
        throw new Error(error.message);
    }
}