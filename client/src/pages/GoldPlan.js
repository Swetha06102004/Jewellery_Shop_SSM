import "./GoldPlan.css";
import { FaCoins, FaCalendarAlt, FaGift } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function GoldPlan() {

  const navigate = useNavigate();
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const joinPlan = (planName) => {

    if (!user) {
      setShowPopup(true);
      return;
    }

    navigate("/plan-form", { state: { plan: planName } });

  };

  return (
    <div className="goldplan-page">

      {/* Title */}
      <section className="goldplan-title">
        <h1>
          Gold <span>Saving Plans</span>
        </h1>
        <p>
          Join our monthly jewellery savings scheme and
          purchase beautiful gold ornaments with ease.
        </p>
      </section>

      {/* Plans Section */}
      <section className="goldplan-container">

        {/* Plan 1 */}
        <div className="plan-card">
          <h2>Subam Plan</h2>

          <div className="plan-info">
            <p><FaCalendarAlt className="icon" /> Duration : 10 Months</p>
            <p><FaCoins className="icon" /> Monthly Saving : ₹1000 – ₹10000</p>
            <p><FaGift className="icon" /> 100% Gold Purchase Option</p>
          </div>

          <button onClick={() => joinPlan("Subam Plan")}>
            Join Plan
          </button>
        </div>

        {/* Plan 2 */}
        <div className="plan-card">
          <h2>Mangalam Plan</h2>

          <div className="plan-info">
            <p><FaCalendarAlt className="icon" /> Duration : 11 Months</p>
            <p><FaCoins className="icon" /> Flexible Monthly Amount</p>
            <p><FaGift className="icon" /> Jewellery Purchase After Maturity</p>
          </div>

          <button onClick={() => joinPlan("Mangalam Plan")}>
            Join Plan
          </button>
        </div>

        {/* Plan 3 */}
        <div className="plan-card">
          <h2>Thanga Puthaiyal</h2>

          <div className="plan-info">
            <p><FaCalendarAlt className="icon" /> Duration : 12 Months</p>
            <p><FaCoins className="icon" /> Monthly Gold Savings</p>
            <p><FaGift className="icon" /> Special Festival Benefits</p>
          </div>

          <button onClick={() => joinPlan("Thanga Puthaiyal")}>
            Join Plan
          </button>
        </div>

      </section>

      {/* Login Popup */}
      {showPopup && (
        <div className="login-popup">
          <div className="login-box">
            <h3>Login Required</h3>
            <p>Please login first to join the plan.</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default GoldPlan;