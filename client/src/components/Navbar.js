import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import BookVisitPopup from "../pages/BookVisitPopup";
import AuthPopup from "../pages/AuthPopup";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {

  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const [openVisit, setOpenVisit] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // Book Visit Logic
  const handleBookVisit = () => {

    if (!user) {
      alert("Please login first to book a visit");
      setOpenAuth(true);
      return;
    }

    setOpenVisit(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">

          {/* Logo */}
          <div className="nav-logo">
            <img src={logo} alt="SSM Jewellery" className="logo-image" />
            <span>Shree Shubba Mangala Thangamaligai</span>
          </div>

          {/* Links */}
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/about">About Us</Link>
            <Link to="/gold-plan">Gold Plan</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Actions */}
          <div className="nav-actions">

            {/* CART → show only if logged in */}
            {user && (
              <Link to="/cart" className="nav-cart">
                🛒
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            )}

            {/* NOT LOGGED IN */}
            {!user && (
              <button
                className="nav-login-btn"
                onClick={() => setOpenAuth(true)}
              >
                Login
              </button>
            )}

            {/* LOGGED IN */}
            {user && (
              <div className="nav-user">
                <span onClick={() => setOpenMenu(!openMenu)}>
                  👤 {user.name}
                </span>

                {openMenu && (
                  <div className="nav-dropdown">
                    <span>My Visits</span>
                    <span>My Profile</span>
                    <span className="logout" onClick={logout}>
                      Logout
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Book Visit */}
            <button
              className="nav-btn"
              onClick={handleBookVisit}
            >
              Book Visit
            </button>

          </div>
        </div>
      </nav>

      {/* Login Popup */}
      <AuthPopup
        open={openAuth}
        onClose={() => setOpenAuth(false)}
      />

      {/* Visit Popup */}
      <BookVisitPopup
        open={openVisit}
        onClose={() => setOpenVisit(false)}
      />
    </>
  );
}

export default Navbar;