import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  const links = [
    { to: "/dashboard/user/profile", label: "Profile" },
    { to: "/dashboard/user/orders", label: "Orders" },
  ];

  return (
    <div className="w-full max-w-xs mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h4 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Dashboard
      </h4>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-gray-700 font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-green-500 text-white shadow-md"
                  : "hover:bg-green-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default UserMenu;
