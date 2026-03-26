import "./FeaturedCollections.css";
import gold from "../assets/gold.png";
import diamond from "../assets/diamond.png";
import silver from "../assets/silver.png";
import { useNavigate } from "react-router-dom";
function FeaturedCollections() {
  const navigate = useNavigate();

  return (
    <section className="collections">
      <h2 className="collections-title">Featured Collections</h2>
      <p className="collections-subtitle">
        Discover our finest jewellery crafted with elegance & purity
      </p>

      <div className="collection-cards">
        <div className="collection-card">
          <img src={gold} alt="Gold Jewellery" />
          <h3>Gold Jewellery</h3>
          <p>Traditional & modern gold designs</p>
          <button onClick={() => navigate("/collections?material=Gold")}>View Collection</button>
        </div>

        <div className="collection-card">
          <img src={diamond} alt="Diamond Jewellery" />
          <h3>Diamond Jewellery</h3>
          <p>Elegant diamonds crafted with perfection</p>
          <button onClick={() => navigate("/collections?material=Diamond")}>View Collection</button>
        </div>

        <div className="collection-card">
          <img src={silver} alt="Silver Jewellery" />
          <h3>Silver Jewellery</h3>
          <p>Minimal and classy silver ornaments</p>
          <button onClick={() => navigate("/collections?material=Silver")}>View Collection</button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollections;
