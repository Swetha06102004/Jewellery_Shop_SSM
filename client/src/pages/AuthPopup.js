import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthPopup.css";

function AuthPopup({ open, onClose }) {

  const { login } = useAuth();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    otp: "",
  });

  const [serverOtp, setServerOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // =========================
  // SEND OTP FROM BACKEND
  // =========================
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile
        })
      });

      const data = await res.json();

      if (data.success) {
        setServerOtp(data.otp);
        setStep(2);
      } else {
        alert("Failed to send OTP");
      }

    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  // =========================
  // VERIFY OTP LOGIN
  // =========================
  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mobile: form.mobile,
          otp: form.otp
        })
      });

      const data = await res.json();

      if (data.success) {

        localStorage.setItem("mobile", form.mobile);
        localStorage.setItem("token", data.token);

        login(data.user);   // AuthContext login

        onClose();

        setStep(1);
        setForm({ name: "", mobile: "", otp: "" });

      } else {
        alert(data.msg || "Invalid OTP");
      }

    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">

        <h2>Customer Login</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={sendOtp}>

            <input
              type="text"
              placeholder="Customer Name"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              maxLength="10"
              required
              value={form.mobile}
              onChange={(e) =>
                setForm({ ...form, mobile: e.target.value })
              }
            />

            <button className="auth-btn" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>

          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={verifyOtp}>

            <input
              type="text"
              placeholder="Enter OTP"
              required
              value={form.otp}
              onChange={(e) =>
                setForm({ ...form, otp: e.target.value })
              }
            />

            <button className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

          </form>
        )}

        {/* OTP DISPLAY */}
        {step === 2 && (
          <p className="otp-note">
            Your OTP: <b>{serverOtp}</b>
          </p>
        )}

        <button className="close-btn" onClick={onClose}>✕</button>

      </div>
    </div>
  );
}

export default AuthPopup;