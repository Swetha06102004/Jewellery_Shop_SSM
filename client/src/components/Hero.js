import "./Hero.css";
import heroImg from "../assets/hero-jewel.png"; 
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${heroImg})`,
        maxWidth: "1420px"
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-left">
        <h1>
          Timeless <span>Elegance</span><br />
          Crafted in Gold
        </h1>

        <p>
          Exclusive gold, diamond & silver collections
          crafted with tradition and elegance.
        </p>

        <button onClick={() => navigate("/collections")} className="hero-btn">
          Explore Collections
        </button>
      </div>
    </div>
  );
}

export default Hero;
