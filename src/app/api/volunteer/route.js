import { NextResponse } from "next/server";
import Volunteer from "../../../models/volunteer";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST( req ) {
    console.log("volunteer req", req);

    try {
        const data = await req.json();
        console.log("data volunteer: ", data);
        const newVolunteer = new Volunteer(data);
        await newVolunteer.save(); 
        return NextResponse({
            success: true, 
            message: "Volunteer registered successfully", 
            volunteer: newVolunteer
        }, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error registering volunteer", 
            error: error.message
        }, {
            status: 500
        });
    }
}