import mongoose from "mongoose";

const IllusionSchema = new mongoose.Schema({
  filename: String, // Link to the illusion image
  imageData: { type: String, required: true }, // Base64 image data

  question: String, // The question related to the image
  options: Object, // Choices {"Face": 5, "Tree": 3}
});

const Illusion = mongoose.model("Illusion", IllusionSchema);

export default Illusion;
