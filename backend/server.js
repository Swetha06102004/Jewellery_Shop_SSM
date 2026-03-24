const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
require("dotenv").config();
const path = require("path");

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// =====================
// MULTER CONFIG (IMAGE UPLOAD)
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });


// =====================
// ROUTES IMPORT
// =====================
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/", authRoutes);
app.use("/", adminRoutes);


// =====================
// IMAGE UPLOAD ROUTE
// =====================
app.post("/api/jewels/upload", upload.single("image"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  res.json({
    success: true,
    imageUrl
  });

});


// =====================
// GOLD + SILVER PRICE API
// =====================
app.get("/api/gold-price", async (req, res) => {

  try {

    const goldRes = await axios.get(
      "https://www.goldapi.io/api/XAU/INR",
      {
        headers: {
          "x-access-token": process.env.GOLD_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const silverRes = await axios.get(
      "https://www.goldapi.io/api/XAG/INR",
      {
        headers: {
          "x-access-token": process.env.GOLD_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const gold = Math.round(goldRes.data.price / 31.1035);
    const silver = Math.round(silverRes.data.price / 31.1035);

    res.json({ gold, silver });

  } catch (error) {

    console.log("Gold API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch metal price" });

  }

});

// =====================
// AI VIRTUAL TRYON API
// =====================

app.post("/api/tryon", async (req, res) => {

  try {

    const { image } = req.body;

    const response = await axios.post(
      "https://api.example.com/tryon",
      {
        image: image
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TRYON_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log("TryOn API Error:", error.message);
    res.status(500).json({ error: "AI TryOn failed" });

  }

});


// =====================
// MONGODB CONNECTION
// =====================
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// =====================
// TEST ROUTE
// =====================
app.get("/", (req,res)=>{
  res.send("Backend Running");
});


// =====================
// SERVER START
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});