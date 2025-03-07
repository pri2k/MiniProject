const mongoose = require("mongoose");

const IllusionSchema = new mongoose.Schema({
  imageFilename: String, // Link to the illusion image
  question: String, // The question related to the image
  options: Object, // Choices {"Face": 5, "Tree": 3}
});

const Illusion = mongoose.model("Illusion", IllusionSchema);

module.exports = Illusion;
