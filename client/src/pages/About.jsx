import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container py-5">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">About Us</h1>
          <p className="lead text-muted">
            Discover who we are, what we do, and why we do it.
          </p>
        </div>

        {/* Content Section */}
        <div className="row align-items-center">
          {/* Styled Image Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(0, 0, 0, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.15)";
              }}
            >
              <img
                src="/images/aboutus.jpeg"
                alt="About Us"
                className="img-fluid"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="col-md-6">
            <h2 className="fw-semibold mb-3">Our Story</h2>
            <p className="text-muted">
              We are a passionate team committed to delivering top-quality
              products and services. Our journey began with a simple idea – to
              make shopping smarter, easier, and more enjoyable for everyone.
            </p>
            <p className="text-muted">
              With innovation, dedication, and customer satisfaction at our
              core, we've grown into a trusted name. Whether you're a long-time
              supporter or just discovering us, we're glad you're here.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
