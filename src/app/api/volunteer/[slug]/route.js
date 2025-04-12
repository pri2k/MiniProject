import { connect } from "@/dbConfig/dbConfig";
import Volunteer from "@/models/volunteer";
import { NextResponse } from "next/server";
import problemCategories from "../../../../data/groups";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
    await connect();
  
    const resolvedParams = await params;
    const { slug } = resolvedParams;
  
    const matchedCategory = problemCategories.find(cat => cat.slug === slug);
    const problemTitle = matchedCategory?.title || slug.replace(/-/g, ' ');
  
    if (!problemTitle) {
      return NextResponse.json({ success: false, error: "Problem title is missing" }, { status: 400 });
    }
  
    try {
      const volunteers = await Volunteer.find({
        problem: { $in: [problemTitle] }
      });
  
      return NextResponse.json({ success: true, volunteers });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
