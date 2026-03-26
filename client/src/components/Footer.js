import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2>SSM Jewellery</h2>
          <p>
            Timeless jewellery crafted with purity,
            tradition, and elegance.
          </p>

          {/* Social Icons */}
          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/collections">Collections</a>
          <a href="/gold-plan">Gold Plan</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>64/306 MAHALAKHSMI TOWERS</p>
          <p>POST OFFICE STREET</p>
          <p>AVINASHI – 641654</p>
          <p>CONTACT NO: 8825956528</p>
          <p>EMAIL ID: ssmthangamaligai@gmail.com</p>
        </div>
                {/* Policies */}
        <div className="footer-policies">
          <h4>Our Policies</h4>
          <ul>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/return-policy">Return Policy</a></li>
            <li><a href="/shipping">Shipping & Delivery</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>
    </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SSM Jewellery. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
