const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const Booking = require("../models/Booking");
const Order = require("../models/Order");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// =====================
// IMAGE UPLOAD SETUP
// =====================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Relative to backend cwd
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// =====================
// AUTH CHECK (simple)
// =====================

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  console.log("Received Auth header:", auth);
  if (!auth || !auth.startsWith('Bearer ')) {
    console.log("Auth failed: header missing or invalid");
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}

// =====================
// GET ALL CUSTOMERS
// =====================

router.get("/admin/customers", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// =====================
// UPDATE GOLD PLAN PAYMENT
// =====================

router.put("/admin/update-payment", async (req, res) => {
  const { mobile, planIndex, paidMonths } = req.body;
  const user = await User.findOne({ mobile });
  user.goldPlans[planIndex].paidMonths = paidMonths;
  await user.save();
  res.json({ success: true });
});

// =====================
// GET BOOKINGS
// =====================

router.get("/admin/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// =====================
// ADD PRODUCT
// =====================

router.post("/admin/add-product", upload.single("image"), async (req, res) => {
  try {
    const { name, category, subCategory, weight, price } = req.body;

    const product = new Product({
      name,
      category,
      subCategory,
      weight,
      price,
      image: `/uploads/${req.file.filename}` // store full path for frontend
    });

    await product.save();

    console.log("File saved:", req.file.filename);
    console.log("Product saved:", product);

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Product upload failed" });
  }
});

// =====================
// GET PRODUCTS
// =====================

router.get("/admin/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add alias route for frontend
router.get("/api/jewels", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// =====================
// ADD TO WISHLIST
// =====================

router.post("/api/wishlist/add", async (req, res) => {
  const { mobile, productId } = req.body;
  if (!mobile || !productId) return res.status(400).json({ error: "mobile and productId required" });

  try {
    const user = await User.findOne({ mobile });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.wishlist) user.wishlist = [];
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    console.log("Added to wishlist for", mobile, ":", productId);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
});

// =====================
// ADD TO CART
// =====================

router.post("/api/cart/add", async (req, res) => {
  const { mobile, productId } = req.body;
  if (!mobile || !productId) return res.status(400).json({ error: "mobile and productId required" });

  try {
    const user = await User.findOne({ mobile });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.cart) user.cart = [];
    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      await user.save();
    }
    console.log("Added to cart for", mobile, ":", productId);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// =====================
// DELETE PRODUCT
// =====================

router.delete("/admin/product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// =====================
// CREATE ORDER
// =====================

router.post("/api/order", async (req, res) => {
  const { mobile, items, total } = req.body;
  try {
    const user = await User.findOne({ mobile });
    if (!user) return res.status(404).json({ error: "User not found" });

    const order = new Order({
      customerId: user._id,
      customerName: user.name,
      mobile: user.mobile,
      items,
      total
    });

    await order.save();
    res.json({ success: true, orderId: order._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// =====================
// GET ORDERS
// =====================

router.get("/admin/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;