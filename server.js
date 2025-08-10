const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Review", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  text: String,
  date: String,
});

const Review = mongoose.model("Review", reviewSchema);

// Routes
app.get("/reviews", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

app.post("/reviews", async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.status(201).json(newReview);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
