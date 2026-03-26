import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ✅ added
import "./Collections.css";

function Collections() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth(); // ✅ added
  const [goldPrice, setGoldPrice] = useState(0);

  const [jewellery, setJewellery] = useState([]);
  const [filteredJewellery, setFilteredJewellery] = useState([]);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [loginMessage, setLoginMessage] = useState(false);

  const [openTry, setOpenTry] = useState(false);

  const webcamRef = useRef(null);

  // ========================
  // FETCH JEWELLERY
  // ========================
  useEffect(() => {

    axios.get("http://localhost:5000/api/jewels")
      .then(res => {
        setJewellery(res.data);
        setFilteredJewellery(res.data);
      })
      .catch(err => {
        console.log(err);
        setError("Failed to load collections");
      });

  }, []);

  useEffect(() => {
  fetch("http://localhost:5000/api/gold-price")
    .then(res => res.json())
    .then(data => setGoldPrice(data.price))
    .catch(err => console.log(err));
}, []);

  // ========================
  // FILTER LOGIC
  // ========================
  useEffect(() => {

    let filtered = [...jewellery];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMaterial) {
      filtered = filtered.filter(item =>
        item.category === selectedMaterial
      );
    }

    if (selectedType) {
      filtered = filtered.filter(item =>
        item.subCategory === selectedType
      );
    }

    setFilteredJewellery(filtered);

  }, [searchTerm, selectedMaterial, selectedType, jewellery]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedMaterial("");
    setSelectedType("");
  };

  // ========================
  // LOGIN MESSAGE
  // ========================
  const showLogin = () => {

    setLoginMessage(true);
    window.dispatchEvent(new Event("openLogin"));

    setTimeout(() => {
      setLoginMessage(false);
    }, 3000);

  };

  // ========================
  // ADD TO WISHLIST
  // ========================
  const handleAddToWishlist = async (productId) => {

    if (!user) { // ✅ changed
      showLogin();
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/wishlist/add", {
        mobile: user.mobile,
        productId
      });

      alert("Added to Wishlist ❤️");

    } catch (err) {

      console.log(err.response?.data || err);
      alert("Error adding to wishlist");

    }

  };

  // ========================
  // ADD TO CART
  // ========================
  const handleAddToCart = async (productId) => {

    if (!user) { // ✅ changed
      showLogin();
      return;
    }

    try {

      const product = jewellery.find(item => item._id === productId);

      if (!product) {
        alert("Product not found");
        return;
      }

      await axios.post("http://localhost:5000/api/cart/add", {
        mobile: user.mobile,
        productId
      });

      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: `http://localhost:5000${product.image}`, // ✅ fixed
        category: product.category,
        subCategory: product.subCategory
      });

      alert("Added to Cart 🛒");

    } catch (err) {

      console.log(err.response?.data || err);
      alert("Error adding to cart");

    }

  };

  // ========================
  // CAPTURE IMAGE
  // ========================
  const captureImage = () => {

    const imageSrc = webcamRef.current.getScreenshot();

    console.log("Captured Image:", imageSrc);

    alert("Image captured!");

  };

  return (

    <div className="collections-page">

      {loginMessage && (
        <div className="login-warning">
          Please login to continue
        </div>
      )}

      <h1 className="collections-title">
        All Jewellery Collections
      </h1>

      <div className="filters">

        <input
          type="text"
          placeholder="Search by name..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filter-buttons">

          <div>
            <label>Material:</label>

            <button onClick={() => setSelectedMaterial("gold")}>Gold</button>
            <button onClick={() => setSelectedMaterial("silver")}>Silver</button>
            <button onClick={() => setSelectedMaterial("diamond")}>Diamond</button>
            <button onClick={() => setSelectedMaterial("")}>All</button>
          </div>

          <div>
            <label>Type:</label>

            <button onClick={() => setSelectedType("bangle")}>Bangle</button>
            <button onClick={() => setSelectedType("ring")}>Ring</button>
            <button onClick={() => setSelectedType("necklace")}>Necklace</button>
            <button onClick={() => setSelectedType("")}>All</button>
          </div>

          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>

        </div>

      </div>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}

      <div className="collections-container">

        {filteredJewellery.map(item => (

          <div key={item._id} className="jewel-card">

            <Link to={`/category/${item.category}`}>

              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                className="jewel-image"
              />

              <h3>{item.name}</h3>
              <p className="weight-display">{item.weight}g</p>
              <p className="price-display"> ₹ {goldPrice ? item.weight * goldPrice : "..."}</p>

            </Link>

            {/* ✅ ALWAYS SHOW BUTTONS */}
            <div className="card-actions">

              <button
                className="wishlist-btn"
                onClick={() => handleAddToWishlist(item._id)}
              >
                ❤️ Wishlist
              </button>

              <button
                className="cart-btn"
                onClick={() => handleAddToCart(item._id)}
              >
                🛒 Add to Cart
              </button>

              <button
                className="try-btn"
                onClick={() =>
                  navigate("/tryon", {
                    state: {
                      image: `http://localhost:5000${item.image}`,
                      type: item.subCategory
                    }
                  })
                }
              >
                ✨ Try This
              </button>

            </div>

          </div>

        ))}

      </div>

      {openTry && (

        <div className="tryon-overlay">

          <div className="tryon-box">

            <h2>Virtual Try On</h2>

            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="try-camera"
            />

            <button onClick={captureImage}>
              Capture
            </button>

            <button onClick={() => setOpenTry(false)}>
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default Collections;