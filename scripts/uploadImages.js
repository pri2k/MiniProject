import mongoose from "mongoose";
import Illusion from "../src/models/illusion.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const images = [
  { filename: "/images/illusionim/illusions1.jpg", question: "What do you see first?", options: { "Faces": 3, "Trophy": 5 } },
  { filename: "/images/illusionim/illusions2.webp", question: "What do you see first?", options: { "Animals": 4, "Scenery": 2 } },
  { filename: "/images/illusionim/illusions3.jpeg", question: "What do you see first?", options: { "Sheep": 6, "Wolf": 3 } },
  { filename: "/images/illusionim/illusions4.jpeg", question: "What do you see first?", options: { "Chess": 6, "Person": 3 } },
  { filename: "/images/illusionim/illusions5.png", question: "What do you see first?", options: { "Scenery": 6, "Face": 3 } },
  { filename: "/images/illusionim/illusions6.jpg", question: "What do you see first?", options: { "Face": 6, "Rat": 3 } },
  { filename: "/images/illusionim/illusions7.jpg", question: "What do you see first?", options: { "Tree": 6, "Faces": 3 } },
  { filename: "/images/illusionim/illusions8.jpg", question: "What do you see first?", options: { "Animals": 6, "Tree": 3 } },
  { filename: "/images/illusionim/illusions9.jpg", question: "What do you see first?", options: { "Dog": 6, "Cat": 3 } },
];

const uploadImages = async () => {
  try {
    // await connectDB(); // Connect to MongoDB
    for (const image of images) {
        await Illusion.updateOne(
          { filename: image.filename }, // Find by filename
          { $set: image }, // Update the existing record
          { upsert: true } // Insert if not found
        );
        
    }
    console.log(` Inserted/Updated successfully`);
  } catch (err) {
    console.error(" Error uploading images:", err);
  } finally {
    mongoose.connection.close();
  }
};

uploadImages();
