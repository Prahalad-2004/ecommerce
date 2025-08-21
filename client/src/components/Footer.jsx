import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-black text-white py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Ecommerce App</h1>
        <p className="space-x-4 text-sm uppercase">
          <Link
            to="/about"
            className="hover:text-yellow-300 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-300 transition duration-200"
          >
            Contact
          </Link>
          <Link
            to="/policy"
            className="hover:text-yellow-300 transition duration-200"
          >
            Privacy Policy
          </Link>
        </p>
        <p className="text-xs mt-4 text-gray-300">
          &copy; {new Date().getFullYear()} Ecommerce App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
