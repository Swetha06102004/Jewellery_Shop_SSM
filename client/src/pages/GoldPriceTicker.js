import { useEffect, useState } from "react";
import "./GoldTicker.css";

function GoldPriceTicker(){

 const [gold,setGold] = useState(0);
 const [silver,setSilver] = useState(0);

 useEffect(()=>{

  const fetchMetalPrice = async () => {

    try{

      const res = await fetch("http://localhost:5000/api/gold-price");

      const data = await res.json();

      setGold(data.gold);
      setSilver(data.silver);

    }catch(err){

      console.log("Metal API error:",err);

    }

  };

  fetchMetalPrice();

 },[]);


 return(

  <div className="metal-ticker">

   <div className="ticker-label">
    Today's Metal Rate 📈
   </div>

   <div className="ticker-scroll">

    <div className="ticker-move">

     <span>
      91.6 (22 KT): ₹{Math.round(gold*0.916)} |
      24 KT GOLD: ₹{gold} |
      SILVER: ₹{silver} |
      LIVE RATE UPDATE |
     </span>

     <span>
      91.6 (22 KT): ₹{Math.round(gold*0.916)} |
      24 KT GOLD: ₹{gold} |
      SILVER: ₹{silver} |
      LIVE RATE UPDATE |
     </span>

     <span>
      91.6 (22 KT): ₹{Math.round(gold*0.916)} |
      24 KT GOLD: ₹{gold} |
      SILVER: ₹{silver} |
      LIVE RATE UPDATE |
     </span>

    </div>

   </div>

  </div>

 );

}

export default GoldPriceTicker;