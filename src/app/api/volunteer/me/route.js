import { NextResponse } from "next/server";
import Volunteer from "../../../../models/volunteer";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";

export async function GET(req) {
    try {
        const user = await getDataFromToken(req);
        if (!user) {
            return NextResponse.json({ 
                error: "Unauthorized" 
            }, { 
                status: 401 
            });
        }

        const volunteer = await  Volunteer.findOne({ userId: user });


        if (!volunteer) {
            return NextResponse.json({
                error: "Not a volunteer"
            }, {
                status: 200
            })
        }

        return NextResponse.json({
            volunteer
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching volunteer data:", error);
        return NextResponse.json({
            error: "Failed to fetch volunteer info"
        }, {
            status: 500
        });
    }
}