import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image Section */}
          <div>
            <img
              src="/images/contactus.jpeg"
              alt="contact us"
              className="rounded-lg shadow-lg w-full h-[450px] object-cover"
            />
          </div>

          {/* Contact Info Card */}
          <div className="bg-gray-100 shadow-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-6 text-sm text-center md:text-left">
              For any queries or information about our products, feel free to reach out. We are available 24×7!
            </p>
            <div className="flex items-center gap-3 mb-4">
              <BiMailSend size={24} className="text-blue-600" />
              <span className="font-medium text-gray-800">help@ecommerceapp.com</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <BiPhoneCall size={24} className="text-green-600" />
              <span className="font-medium text-gray-800">012-3456789</span>
            </div>
            <div className="flex items-center gap-3">
              <BiSupport size={24} className="text-red-600" />
              <span className="font-medium text-gray-800">1800-0000-0000 (Toll Free)</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
