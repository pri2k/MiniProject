import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("image");

        if (!file) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        const mimeType = file.type;
        const dataURI = `data:${mimeType};base64,${base64Image}`;

        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
            folder: "profile_pictures",
        });

        return NextResponse.json({ imageUrl: uploadResponse.secure_url });
    } catch (error) {
        console.error("Upload error: ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
