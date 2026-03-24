import { useState } from "react";
import "./BookVisitPopup.css";
import { useAuth } from "../context/AuthContext";

function BookVisitPopup({ open, onClose }) {

  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    visitType: "Store Visit",
    date: "",
    time: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const sendWhatsApp = () => {

    // LOGIN CHECK
    if (!user) {
      alert("Please login first to book your visit");
      return;
    }

    const msg = `
Hello SSM Jewellery 👋
I would like to book a visit.

👤 Name: ${form.name}
📞 Phone: ${form.phone}
💍 Visit Type: ${form.visitType}
📅 Date: ${form.date}
⏰ Time: ${form.time}
    `;

    window.open(
      `https://wa.me/918825956528?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };


  return (
    <div className="bv-overlay">
      <div className="bv-popup">

        <button className="bv-close" onClick={onClose}>×</button>

        <h2>✨ Book Your Visit</h2>

        <p className="bv-sub">
          Experience personalized jewellery shopping at SSM Jewellery
        </p>

        <select
          name="visitType"
          value={form.visitType}
          onChange={handleChange}
        >
          <option>Store Visit</option>
          <option>Custom Jewellery Discussion</option>
          <option>Wedding Jewellery Consultation</option>
          <option>Gold Exchange / Old Gold</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          onChange={handleChange}
        />

        <div className="bv-row">
          <input type="date" name="date" onChange={handleChange} />
          <input type="time" name="time" onChange={handleChange} />
        </div>

        <button className="bv-btn" onClick={sendWhatsApp}>
          Confirm Visit via WhatsApp
        </button>

        <p className="bv-trust">
          🔒 No spam • 🕒 Quick confirmation • ⭐ Trusted jewellery store
        </p>

      </div>
    </div>
  );
}

export default BookVisitPopup;