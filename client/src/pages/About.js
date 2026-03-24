import { useEffect } from "react";
import "./About.css";

function About() {

  useEffect(() => {
    const sections = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach(sec => observer.observe(sec));
  }, []);

  return (
    <div className="about-page">

      {/* Title Section */}
      <section className="about-title fade-section">
        <h1>
          About <span>SSM Jewellery</span>
        </h1>
        <p>
          Crafting timeless jewellery with purity,
          trust, and tradition for generations.
        </p>
      </section>

      {/* Main Content */}
      <section className="about-content fade-section">

        {/* Left */}
        <div className="about-text">
          <h2>Our Legacy</h2>
          <p>
            SSM Jewellery is a trusted name in fine jewellery,
            known for BIS hallmarked gold and elegant designs
            that beautifully blend tradition with modern artistry.
          </p>
          <p>
            Every piece we create represents emotion,
            culture, and a promise of everlasting value.
          </p>

          {/* Timeline */}
          <div className="timeline">
            <div className="timeline-item">
              <h4>1998</h4>
              <p>Founded with a vision of purity and excellence.</p>
            </div>
            <div className="timeline-item">
              <h4>2008</h4>
              <p>Introduced BIS hallmark certification.</p>
            </div>
            <div className="timeline-item">
              <h4>2018</h4>
              <p>Recognized as a leading bridal jewellery brand.</p>
            </div>
            <div className="timeline-item">
              <h4>Today</h4>
              <p>Serving generations with trust and craftsmanship.</p>
            </div>
          </div>
        </div>

        {/* Right Cards */}
        <div className="about-highlights">
          <div className="highlight-card glow-card">
            <h3>Purity Assured</h3>
            <p>BIS hallmarked jewellery with transparent pricing.</p>
          </div>

          <div className="highlight-card glow-card">
            <h3>Custom Designs</h3>
            <p>Unique creations crafted to match your style.</p>
          </div>

          <div className="highlight-card glow-card">
            <h3>Trusted Brand</h3>
            <p>Decades of honesty and customer satisfaction.</p>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="founder fade-section">
        <h2>Founder’s Message</h2>
        <p>
          Jewellery is not just gold — it is trust,
          emotion, and memories passed through generations.
          Our commitment is to preserve that trust forever.
        </p>
        <span>— Founder, SSM Jewellery</span>
      </section>

      {/* Trust Section */}
      <section className="trust-section fade-section">
        <h2>Why Customers Trust Us</h2>

        <div className="trust-grid">
          <div className="trust-card">
            <h3>✓</h3>
            <p>BIS Hallmarked Gold</p>
          </div>
          <div className="trust-card">
            <h3>★</h3>
            <p>Premium Craftsmanship</p>
          </div>
          <div className="trust-card">
            <h3>♛</h3>
            <p>Trusted Since 1998</p>
          </div>
          <div className="trust-card">
            <h3>❤</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
