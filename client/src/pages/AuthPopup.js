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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // =========================
  // VALIDATE STEP 1
  // =========================
  const validateStep1 = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 3) {
      newErrors.name = "Minimum 3 characters required";
    }

    if (!form.mobile) {
      newErrors.mobile = "Mobile number required";
    } else if (!/^[0-9]{10}$/.test(form.mobile)) {
      newErrors.mobile = "Enter valid 10 digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // VALIDATE OTP
  // =========================
  const validateOtp = () => {
    let newErrors = {};

    if (!form.otp) {
      newErrors.otp = "OTP is required";
    } else if (!/^[0-9]{4,6}$/.test(form.otp)) {
      newErrors.otp = "Invalid OTP";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // SEND OTP
  // =========================
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!validateStep1()) return;

    setLoading(true);

    try {
      const res = await fetch("https://jewellery-shop-ssm-1.onrender.com/send-otp", {
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
        setStep(2);
      } else {
        alert(data.msg || "Failed to send OTP");
      }

    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  // =========================
// VERIFY OTP
// =========================
const verifyOtp = async (e) => {
  e.preventDefault();

  if (!validateOtp()) return;

  setLoading(true);

  try {
    const res = await fetch("https://jewellery-shop-ssm-1.onrender.com/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mobile: form.mobile,
        otp: form.otp,
        name: form.name   // ✅ Add this line
      })
    });

    const data = await res.json();

    if (data.success) {

      localStorage.setItem("mobile", form.mobile);
      localStorage.setItem("token", data.token);

      login(data.user);

      alert("Login successful ✅");

      onClose();

      setStep(1);
      setForm({ name: "", mobile: "", otp: "" });
      setErrors({});

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
            value={form.name}
            className={errors.name ? "input-error" : ""}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
            {errors.name && <p className="error">{errors.name}</p>}

            <input
              type="tel"
              placeholder="Mobile Number"
              maxLength="10"
              value={form.mobile}
              className={errors.mobile ? "input-error" : ""}
              onChange={(e) =>
                setForm({ ...form, mobile: e.target.value })
              }
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}

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
              value={form.otp}
              className={errors.otp ? "input-error" : ""}
              onChange={(e) =>
                setForm({ ...form, otp: e.target.value })
              }
            />
            {errors.otp && <p className="error">{errors.otp}</p>}

            <button className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

          </form>
        )}

        <button className="close-btn" onClick={onClose}>✕</button>

      </div>
    </div>
  );
}

export default AuthPopup;