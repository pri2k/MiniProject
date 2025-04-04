import mongoose from "mongoose";
import path from "path";
import Illusion from "../src/models/illusion.js";
import dotenv from "dotenv";
import {fileURLToPath} from "url";
import fs from "fs";

dotenv.config(); // Load environment variables

await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const imageFolder= path.join(__dirname, "../public/images/illusionim");

const images = [
  { filename: "illusions1.jpg", question: "What do you see first?", options: { "Faces": 3, "Trophy": 5 } },
  { filename: "illusions2.webp", question: "What do you see first?", options: { "Animals": 4, "Scenery": 2 } },
  { filename: "illusions3.jpeg", question: "What do you see first?", options: { "Sheep": 6, "Wolf": 3 } },
  { filename: "illusions4.jpeg", question: "What do you see first?", options: { "Chess": 6, "Person": 3 } },
  { filename: "illusions5.png", question: "What do you see first?", options: { "Scenery": 6, "Face": 3 } },
  { filename: "illusions6.jpg", question: "What do you see first?", options: { "Face": 6, "Rat": 3 } },
  { filename: "illusions7.jpg", question: "What do you see first?", options: { "Tree": 6, "Faces": 3 } },
  { filename: "illusions8.jpg", question: "What do you see first?", options: { "Animals": 6, "Tree": 3 } },
  { filename: "illusions9.jpg", question: "What do you see first?", options: { "Dog": 6, "Cat": 3 } },
];


const uploadImages = async () => {
  try {
    for (const image of images) {
      const imagePath = path.join(imageFolder, image.filename);

      if (!fs.existsSync(imagePath)) {
        console.log(` Image not found: ${image.filename}`);
        continue;
      }

      // Read file and convert to Base64
      const imageData = fs.readFileSync(imagePath).toString("base64");

      await Illusion.updateOne(
        { filename: image.filename }, // Find by filename
        { $set: { ...image, imageData: `data:image/jpeg;base64,${imageData}` } }, // Store Base64
        { upsert: true } // Insert if not found
      );

      console.log(` Inserted/Updated: ${image.filename}`);
    }
  } catch (err) {
    console.error(" Error uploading images:", err);
  } finally {
    mongoose.connection.close();
  }
};


uploadImages();


// here change the filename by writing the full path
// const uploadImages = async () => {
//   try {
//     // await connectDB(); // Connect to MongoDB
//     for (const image of images) {
//         await Illusion.updateOne(
//           { filename: image.filename }, // Find by filename
//           { $set: image }, // Update the existing record
//           { upsert: true } // Insert if not found
//         );
        
//     }
//     console.log(` Inserted/Updated successfully`);
//   } catch (err) {
//     console.error(" Error uploading images:", err);
//   } finally {
//     mongoose.connection.close();
//   }
// };
