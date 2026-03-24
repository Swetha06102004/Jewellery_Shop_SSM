const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/gold-price", async (req, res) => {

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

    console.log(error);
    res.status(500).json({ error: "Failed to fetch metal price" });

  }

});

module.exports = router;