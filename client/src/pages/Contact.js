import "./Contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

function Contact() {
  return (
    <div className="contact-page">

      {/* Title */}
      <section className="contact-title">
        <h1>
          Contact <span>SSM Jewellery</span>
        </h1>
        <p>
          We’d love to hear from you. Reach out for enquiries,
          custom orders, or support.
        </p>
      </section>

      {/* Main Section */}
      <section className="contact-container">

        {/* Left Info */}
        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="info-card">
            <h3><FaMapMarkerAlt className="icon" />  Address</h3>
            <p>
              64/306 MAHALAKHSMI TOWERS<br />
                POST OFFICE STREET<br />
                AVINASHI – 641654<br />
            </p>
          </div>

          <div className="info-card">
            <h3><FaPhoneAlt className="icon" />  Phone</h3>
            <p>+91 88259 56528</p>
          </div>

          <div className="info-card">
            <h3><FaEnvelope className="icon" />  Email</h3>
            <p>ssmthangamaligai@gmail.com</p>
          </div>

          <div className="info-card">
            
            <h3><FaClock className="icon" />  Working Hours</h3>
            <p>
              Mon – Sat : 10:00 AM – 7:00 PM<br />
              Sunday : Closed
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>

          <form>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>

            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>

            <div className="form-group">
              <input type="text" placeholder="Phone Number" />
            </div>

            <div className="form-group">
              <textarea placeholder="Your Message" rows="4"></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>

      </section>

    </div>
  );
}

export default Contact;
