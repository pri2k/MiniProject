// writing the schema of our model

const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  userId: String,
  responses: [{ imageId: String, answer: String, points: Number }],
  totalPoints: Number,
  mood: String,
  timestamp: { type: Date, default: Date.now }
});

const Response = mongoose.model("Response", ResponseSchema);

module.exports = Response;
