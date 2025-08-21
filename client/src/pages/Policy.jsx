import React from "react";
import Layout from "../components/Layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div
        className="bg-cover bg-center min-h-screen py-16 px-4"
        style={{ backgroundImage: "url('/images/policy-bg.jpg')" }}
      >
        <div className="max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
            <p className="text-gray-600 text-lg">
              Your privacy is important to us. Learn how we handle your data.
            </p>
          </div>

          <div className="text-gray-700 space-y-6">
            <div>
              <h4 className="text-lg font-semibold">1. Information We Collect</h4>
              <p>
                We collect personal information such as your name, email address,
                phone number, and shipping address when you register or place an
                order on our website.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold">2. How We Use Your Information</h4>
              <p>
                We use your information to process orders, personalize your
                experience, improve our services, and send promotional
                communications (if opted in).
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold">3. Sharing of Information</h4>
              <p>
                We do not sell or rent your personal data to third parties.
                However, we may share it with trusted service providers for
                payment processing, order fulfillment, or analytics.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold">4. Cookies</h4>
              <p>
                We use cookies to improve your experience, track usage, and
                remember preferences. You can disable cookies in your browser
                settings.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold">5. Data Security</h4>
              <p>
                We implement strict security measures to protect your personal
                information from unauthorized access, alteration, or disclosure.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold">6. Your Rights</h4>
              <p>
                You have the right to access, update, or delete your personal
                data. Contact us at{" "}
                <strong>privacy@ecommerceapp.com</strong> for any
                privacy-related inquiries.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold">7. Changes to This Policy</h4>
              <p>
                We may update our privacy policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </div>

            <p className="text-sm text-gray-500 pt-4">Last updated: August 3, 2025</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
