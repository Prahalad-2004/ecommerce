// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { NavLink, Link } from "react-router-dom";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import SearchInput from "../Form/SearchInput";
// import useCategory from "../../hooks/useCategory";
// import { useCart } from "../../context/cart";

// const Header = () => {
//   const [auth, setAuth] = useAuth();
//   const[cart] = useCart();
//   const categories = useCategory();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [catOpen, setCatOpen] = useState(false);
//   const [userOpen, setUserOpen] = useState(false);

//   const handleLogout = () => {
//     setAuth({ ...auth, user: null, token: "" });
//     localStorage.removeItem("auth");
//     toast.success("Logout Successfully");
//   };

//   return (
//     <nav className="bg-white shadow sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Brand */}
//           <Link to="/" className="text-xl font-bold text-blue-600">
//             🛒 Ecommerce
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6">
//             <SearchInput />

//             <NavLink to="/" className="hover:text-blue-600">
//               Home
//             </NavLink>

//             {/* Categories Dropdown */}
//             <div
//               className="relative group"
//               onMouseEnter={() => setCatOpen(true)}
//               onMouseLeave={() => setCatOpen(false)}
//             >
//               <button className="flex items-center space-x-1 hover:text-blue-600">
//                 <span>Categories</span>
//               </button>
//               <div
//                 className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-all duration-300 overflow-hidden ${
//                   catOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
//                 }`}
//               >
//                 <Link
//                   className="block px-4 py-2 hover:bg-gray-100"
//                   to="/categories"
//                 >
//                   All Categories
//                 </Link>
//                 {categories?.map((c) => (
//                   <Link
//                     key={c._id}
//                     className="block px-4 py-2 hover:bg-gray-100"
//                     to={`/category/${c.slug}`}
//                   >
//                     {c.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Auth Dropdown */}
//             {!auth?.user ? (
//               <>
//                 <NavLink to="/register" className="hover:text-blue-600">
//                   Register
//                 </NavLink>
//                 <NavLink to="/login" className="hover:text-blue-600">
//                   Login
//                 </NavLink>
//               </>
//             ) : (
//               <div
//                 className="relative group"
//                 onMouseEnter={() => setUserOpen(true)}
//                 onMouseLeave={() => setUserOpen(false)}
//               >
//                 <button className="flex items-center space-x-1 hover:text-blue-600">
//                   <span>{auth?.user?.name}</span>
//                 </button>
//                 <div
//                   className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-all duration-300 overflow-hidden ${
//                     userOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
//                   }`}
//                 >
//                   <NavLink
//                     to={`/dashboard/${
//                       auth?.user?.role === 1 ? "admin" : "user"
//                     }`}
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Dashboard
//                   </NavLink>
//                   <NavLink
//                     onClick={handleLogout}
//                     to="/login"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Logout
//                   </NavLink>
//                 </div>
//               </div>
//             )}

//             <NavLink to="/cart" className="hover:text-blue-600">
//               Cart (0)
//             </NavLink>
//           </div>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden">
//             <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden transition-all duration-300 overflow-hidden ${
//           menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="px-4 pb-4 space-y-2 bg-gray-50 shadow-md">
//           <SearchInput />
//           <NavLink to="/" className="block py-2 hover:text-blue-600">
//             Home
//           </NavLink>

//           {/* Mobile Categories Dropdown */}
//           <div>
//             <button
//               className="flex justify-between w-full py-2 hover:text-blue-600"
//               onClick={() => setCatOpen(!catOpen)}
//             >
//               <span>Categories</span>
//               <span>{catOpen ? "▴" : "▾"}</span>
//             </button>
//             <div
//               className={`pl-4 transition-all duration-300 overflow-hidden ${
//                 catOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//               }`}
//             >
//               <Link className="block py-1" to="/categories">
//                 All Categories
//               </Link>
//               {categories?.map((c) => (
//                 <Link
//                   key={c._id}
//                   className="block py-1"
//                   to={`/category/${c.slug}`}
//                 >
//                   {c.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Mobile Auth Dropdown */}
//           {!auth?.user ? (
//             <>
//               <NavLink to="/register" className="block py-2 hover:text-blue-600">
//                 Register
//               </NavLink>
//               <NavLink to="/login" className="block py-2 hover:text-blue-600">
//                 Login
//               </NavLink>
//             </>
//           ) : (
//             <div>
//               <button
//                 className="flex justify-between w-full py-2 hover:text-blue-600"
//                 onClick={() => setUserOpen(!userOpen)}
//               >
//                 <span>{auth?.user?.name}</span>
//                 <span>{userOpen ? "▴" : "▾"}</span>
//               </button>
//               <div
//                 className={`pl-4 transition-all duration-300 overflow-hidden ${
//                   userOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <NavLink
//                   to={`/dashboard/${
//                     auth?.user?.role === 1 ? "admin" : "user"
//                   }`}
//                   className="block py-1"
//                 >
//                   Dashboard
//                 </NavLink>
//                 <NavLink
//                   onClick={handleLogout}
//                   to="/login"
//                   className="block py-1"
//                 >
//                   Logout
//                 </NavLink>
//               </div>
//             </div>
//           )}

//           <NavLink to="/cart" className="block py-2 hover:text-blue-600">
//             Cart
//           </NavLink>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;
// ----------------------------------------------------------------------------------------------------------------------------------------------------



import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="text-lg font-bold text-blue-600">
            🛒 Ecommerce App
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <SearchInput />

            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              Home
            </NavLink>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <span>Categories</span>
              </button>
              {catOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                  <Link
                    to="/categories"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    All Categories
                  </Link>
                  {categories?.map((c) => (
                    <Link
                      key={c._id}
                      to={`/category/${c.slug}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Links */}
            {!auth?.user ? (
              <>
                <NavLink
                  to="/register"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                >
                  <span>{auth?.user?.name}</span>
                </button>
                {userOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
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
                )}
              </div>
            )}

            {/* Cart with Badge */}
            <NavLink
              to="/cart"
              className="relative flex items-center text-gray-700 hover:text-blue-600"
            >
              Cart
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 shadow-md px-4 pb-4 space-y-2">
          <SearchInput />

          <NavLink to="/" className="block py-2 text-gray-700 hover:text-blue-600">
            Home
          </NavLink>

          {/* Mobile Categories Dropdown */}
          <div>
            <button
              className="flex justify-between w-full py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setCatOpen(!catOpen)}
            >
              <span>Categories</span>
              <span>{catOpen ? "▴" : "▾"}</span>
            </button>
            {catOpen && (
              <div className="pl-4">
                <Link className="block py-1" to="/categories">
                  All Categories
                </Link>
                {categories?.map((c) => (
                  <Link
                    key={c._id}
                    className="block py-1"
                    to={`/category/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Auth Dropdown */}
          {!auth?.user ? (
            <>
              <NavLink to="/register" className="block py-2 text-gray-700 hover:text-blue-600">
                Register
              </NavLink>
              <NavLink to="/login" className="block py-2 text-gray-700 hover:text-blue-600">
                Login
              </NavLink>
            </>
          ) : (
            <div>
              <button
                className="flex justify-between w-full py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setUserOpen(!userOpen)}
              >
                <span>{auth?.user?.name}</span>
                <span>{userOpen ? "▴" : "▾"}</span>
              </button>
              {userOpen && (
                <div className="pl-4">
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                    className="block py-1"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="block py-1"
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          )}

          <NavLink to="/cart" className="block py-2 text-gray-700 hover:text-blue-600">
            Cart {cart?.length > 0 && `(${cart.length})`}
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Header;
