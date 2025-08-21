import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              🛒 Ecommerce App
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className="hover:text-blue-500">Home</NavLink>
            <NavLink to="/category" className="hover:text-blue-500">Category</NavLink>

            {!auth?.user ? (
              <>
                <NavLink to="/register" className="hover:text-blue-500">Register</NavLink>
                <NavLink to="/login" className="hover:text-blue-500">Login</NavLink>
              </>
            ) : (
              <div className="relative group">
                <button className="hover:text-blue-500 flex items-center space-x-1">
                  <span>{auth?.user?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-40">
                  <NavLink
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </NavLink>
                </div>
              </div>
            )}

            <NavLink to="/cart" className="hover:text-blue-500">Cart (0)</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-2 p-4">
            <NavLink to="/" className="hover:text-blue-500">Home</NavLink>
            <NavLink to="/category" className="hover:text-blue-500">Category</NavLink>

            {!auth?.user ? (
              <>
                <NavLink to="/register" className="hover:text-blue-500">Register</NavLink>
                <NavLink to="/login" className="hover:text-blue-500">Login</NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="hover:text-blue-500"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  onClick={handleLogout}
                  to="/login"
                  className="hover:text-blue-500"
                >
                  Logout
                </NavLink>
              </>
            )}

            <NavLink to="/cart" className="hover:text-blue-500">Cart (0)</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
