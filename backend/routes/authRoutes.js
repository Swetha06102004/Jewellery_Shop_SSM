const express = require("express");
const router = express.Router();
const User = require("../models/User");

let otpStore = {};


// ==================
// SEND OTP
// ==================
router.post("/send-otp", (req,res)=>{

  const {name,mobile} = req.body;

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  otpStore[mobile] = otp;
  console.log(`Generated OTP for ${mobile}: ${otp}`);


  res.json({
    success:true,
  });

});


// ==================
// VERIFY OTP
// ==================
router.post("/verify-otp", async (req, res) => {

  const { mobile, otp, name } = req.body;

  const savedOtp = otpStore[mobile];

  if (!savedOtp || savedOtp !== otp) {
    return res.json({
      success: false,
      msg: "Invalid OTP"
    });
  }

  // ✅ OTP verified → delete it
  delete otpStore[mobile];

  // ✅ Check if user exists
  let user = await User.findOne({ mobile });

  if (!user) {
    user = new User({
      name,
      mobile,
      purchases: [],
      goldPlans: [],
      wishlist: [],
      cart: []
    });
    await user.save();
  }

  res.json({
    success: true,
    user: user,
    token: "dummy-token"
  });

});
// ADD TO WISHLIST
router.post("/wishlist/add", async (req,res)=>{

  const { mobile, productId } = req.body;

  try{

    const user = await User.findOne({ mobile });

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    user.wishlist.push(productId);

    await user.save();

    res.json({
      success:true,
      message:"Added to wishlist"
    });

  }catch(err){

    console.log(err);

    res.status(500).json({
      success:false
    });

  }

});


// ADD TO CART
router.post("/cart/add", async (req,res)=>{

  const { mobile, productId } = req.body;

  try{

    const user = await User.findOne({ mobile });

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    user.cart.push(productId);

    await user.save();

    res.json({
      success:true,
      message:"Added to cart"
    });

  }catch(err){

    console.log(err);

    res.status(500).json({
      success:false
    });

  }

});

// ==================
// ADD PURCHASE
// ==================
router.post("/add-purchase", async (req,res)=>{

  const {mobile,productId,productName,weight} = req.body;

  const user = await User.findOne({mobile});

  user.purchases.push({
    productId,
    productName,
    weight
  });

  await user.save();

  res.json({
    success:true
  });

});


// ==================
// ADD GOLD PLAN
// ==================
router.post("/add-gold-plan", async (req,res)=>{

  const {mobile,planName,monthlyAmount,months} = req.body;

  const user = await User.findOne({mobile});

  user.goldPlans.push({
    planName,
    monthlyAmount,
    months,
    startDate:new Date()
  });

  await user.save();

  res.json({
    success:true
  });

});

module.exports = router;