import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useCart } from "../context/CartContext";
import "./Collections.css";

function Collections() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [jewellery, setJewellery] = useState([]);
  const [filteredJewellery, setFilteredJewellery] = useState([]);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [loginMessage, setLoginMessage] = useState(false);

  const [openTry, setOpenTry] = useState(false);

  const webcamRef = useRef(null);

  const token = localStorage.getItem("token");

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

    const mobile = localStorage.getItem("mobile");

    if (!mobile) {
      showLogin();
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/wishlist/add", {
        mobile,
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

    const mobile = localStorage.getItem("mobile");

    if (!mobile) {
      showLogin();
      return;
    }

    try {

      // Find the product from the jewellery array
      const product = jewellery.find(item => item._id === productId);

      if (!product) {
        alert("Product not found");
        return;
      }

      // Add to backend
      await axios.post("http://localhost:5000/api/cart/add", {
        mobile,
        productId
      });

      // Add to local cart context
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: `http://localhost:5000/uploads/${product.image}`,
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

    alert("Image captured! (You can send this to AI Try-On API)");

  };

  return (

    <div className="collections-page">

      {/* LOGIN MESSAGE */}
      {loginMessage && (
        <div className="login-warning">
          Please login to continue
        </div>
      )}

      <h1 className="collections-title">
        All Jewellery Collections
      </h1>

      {/* ================= FILTERS ================= */}

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

      {/* ERROR */}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}

      {/* ================= PRODUCTS ================= */}

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
              <p className="price-display">₹{item.price}</p>

            </Link>

            {token ? (

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

            ) : (

              <button
                className="login-btn"
                onClick={showLogin}
              >
                Login to Buy
              </button>

            )}

          </div>

        ))}

      </div>

      {/* ================= CAMERA POPUP ================= */}

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