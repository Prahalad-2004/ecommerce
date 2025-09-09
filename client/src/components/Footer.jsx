import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-blue-900 to-black text-gray-200 py-8 mt-12 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        {/* Brand */}
        <h1 className="text-3xl font-extrabold mb-3 tracking-wide text-white">
          Ecommerce App
        </h1>

        {/* Links */}
        <nav className="space-x-6 text-sm uppercase font-medium">
          <Link
            to="/about"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            to="/policy"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs mt-6 text-gray-400 tracking-wide">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-200">Ecommerce App</span>. 
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
