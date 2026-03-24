import React from "react";
import { useLocation } from "react-router-dom";

function PlanForm() {

  const location = useLocation();
  const amount = location.state?.planAmount;

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>Join Gold Plan</h1>

      <h2>Selected Plan : ₹{amount}</h2>

      <form>
        <input type="text" placeholder="Customer Name" /><br/><br/>
        <input type="text" placeholder="Phone Number" /><br/><br/>

        <button type="submit">
          Confirm Plan
        </button>
      </form>

    </div>
  );
}

export default PlanForm;