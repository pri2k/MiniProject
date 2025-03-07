import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Illusion from "@/models/illusion"; // Adjust the path to your model

connect();
export async function GET(req: NextRequest) {
    try {

        // Fetch 3 random illusions from MongoDB
        const illusions = await Illusion.aggregate([{ $sample: { size: 3 } }]);

        return NextResponse.json(illusions, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching illusions", error }, { status: 500 });
    }
}
