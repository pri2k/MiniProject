import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Illusion from "@/models/illusion"; 

// Ensure MongoDB is connected before handling requests
export async function GET(req: NextRequest) {
    try {
        await connect()
        const illusions = await Illusion.aggregate([{ $sample: { size: 3 } }]); 

        if (!illusions || illusions.length === 0) {
            return NextResponse.json({ success: false, message: "No illusions found" }, { status: 404 });
        }

        // Ensure images are served with correct path
        const illusionsWithData= illusions.map((illusion) => ({
            _id: illusion._id,
            question: illusion.question,
            options: illusion.options,
            imageData: illusion.imageData,  // Direct filename since frontend handles path
        }));

        console.log("Successfully fetched illusions:", illusionsWithData);

        return NextResponse.json({ success: true, illusions: illusionsWithData });

    } catch (error) {
        console.error("Error fetching illusions:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch illusions" }, { status: 500 });
    }
}

        // Fetch 3 random illusions from MongoDB
//         const illusions = await Illusion.find().select('filename options question');
//         return NextResponse.json({success:true, illusions})


//         } catch (error) {
        
//         return NextResponse.json({success:false, error: "Failed"});
//     }
// }
