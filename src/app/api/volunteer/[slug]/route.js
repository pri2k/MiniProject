import { connect } from "../../../../dbConfig/dbConfig";
import Volunteer from "../../../../models/volunteer";
import { NextResponse } from "next/server";
import problemCategories from "../../../../data/groups";
import "../../../../models/User"

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
    await connect();

    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const matchedCategory = problemCategories.find(cat => cat.slug === slug);
    const problemTitle = matchedCategory?.title || slug.replace(/-/g, " ");

    if (!problemTitle) {
        return NextResponse.json(
            { success: false, error: "Problem title is missing" },
            { status: 400 }
        );
    }

    try {
        const query = {
            problem: { $in: [problemTitle] }
        };

        // Exclude current user if userId is provided
        if (userId) {
            query.userId = { $ne: userId };
        }

        const volunteers = await Volunteer.find(query).populate("userId", "username image");

        return NextResponse.json({ success: true, volunteers });
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
