import "./WhyChooseUs.css";

function WhyChooseUs() {
  return (
    <section className="why-us">
      <div className="why-us-header">
        <h2>Why Choose SSM Jewellery</h2>
        <p>
          A legacy of purity, craftsmanship and trust that shines
          through every piece we create.
        </p>
      </div>

      <div className="why-us-grid">
        <div className="why-us-card">
          <h3>Assured Purity</h3>
          <p>
            Every jewellery piece is BIS hallmarked and carefully
            tested to ensure uncompromised gold purity.
          </p>
        </div>

        <div className="why-us-card">
          <h3>Expert Craftsmanship</h3>
          <p>
            Designed by skilled artisans blending traditional
            techniques with modern elegance.
          </p>
        </div>

        <div className="why-us-card">
          <h3>Trusted by Generations</h3>
          <p>
            Decades of trust built through transparency,
            quality assurance and customer satisfaction.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
