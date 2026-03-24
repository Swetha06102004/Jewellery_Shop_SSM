import "./Hero.css";
import heroImg from "../assets/hero-jewel.png"; 

function Hero() {
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

        <button className="hero-btn">
          Explore Collections
        </button>
      </div>
    </div>
  );
}

export default Hero;
