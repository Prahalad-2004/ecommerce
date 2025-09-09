// /* eslint-disable no-unsafe-optional-chaining */
// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Prices } from "../components/Prices";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Get products
//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   // Get total count
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/product-count");
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Load more products
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts([...products, ...data?.products]);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   // Filter by category
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setChecked([]);
//     setRadio([]);
//     getAllProducts();
//   };

//   // Effects
//   useEffect(() => {
//     getAllCategory();
//     getTotal();
//   }, []);

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);

//   useEffect(() => {
//     if (!checked.length && !radio.length) getAllProducts();
//   }, [checked.length, radio.length]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//   }, [checked, radio]);

//   // Get filtered products
//   const filterProduct = async () => {
//     try {
//       const { data } = await axios.post("/api/v1/product/product-filters", {
//         checked,
//         radio,
//       });
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout title={"All Products - Best Offers"}>
//       <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-50 min-h-screen">
//         {/* Sidebar */}
//         <aside className="w-full md:w-1/4 bg-white p-6 shadow-lg rounded-2xl sticky top-4 h-fit">
//           <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
//             Filter By Category
//           </h4>
//           <div className="flex flex-col gap-3">
//             {categories?.map((c) => (
//               <label
//                 key={c._id}
//                 className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   onChange={(e) => handleFilter(e.target.checked, c._id)}
//                   checked={checked.includes(c._id)}
//                 />
//                 {c.name}
//               </label>
//             ))}
//           </div>

//           {/* Price filter */}
//           <h4 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b pb-2">
//             Filter By Price
//           </h4>
//           <div className="flex flex-col gap-3">
//             {Prices?.map((p) => (
//               <label
//                 key={p._id}
//                 className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   name="price"
//                   value={p.array}
//                   checked={radio === p.array}
//                   className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                   onChange={() => setRadio(p.array)}
//                 />
//                 {p.name}
//               </label>
//             ))}
//           </div>

//           <div className="mt-6">
//             <button
//               className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//               onClick={resetFilters}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </aside>

//         {/* Products Section */}
//         <main className="w-full md:w-3/4">
//           <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
//             Our Products
//           </h1>

//           {/* Products Grid */}
//           {products?.length === 0 ? (
//             <p className="text-center text-gray-600">No products found</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {products?.map((p) => (
//                 <div
//                   key={p._id}
//                   className="bg-white shadow-md rounded-2xl overflow-hidden group hover:shadow-xl transition"
//                 >
//                   <div className="relative">
//                     <img
//                       src={`/api/v1/product/product-photo/${p._id}`}
//                       alt={p.name}
//                       className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
//                     />
//                     <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
//                       ${p.price}
//                     </span>
//                   </div>
//                   <div className="p-4">
//                     <h5 className="text-lg font-semibold text-gray-800 truncate">
//                       {p.name}
//                     </h5>
//                     <p className="text-gray-500 text-sm mb-3">
//                       {p?.description
//                         ? `${p.description.substring(0, 50)}...`
//                         : "No description available"}
//                     </p>
//                     <div className="flex gap-3">
//                       <button
//                         className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                         onClick={() => navigate(`/product/${p.slug}`)}
//                       >
//                         More Details
//                       </button>
//                       <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition">
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Load More Button */}
//           <div className="flex justify-center mt-10">
//             {products && products.length < total && (
//               <button
//                 className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Load More"}
//               </button>
//             )}
//           </div>
//         </main>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;
// -------------------------------------------------------------------------



// /* eslint-disable no-unsafe-optional-chaining */
// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Prices } from "../components/Prices";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 new state for mobile filters

//   // Get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Get products
//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   // Get total count
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/product-count");
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Load more products
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts([...products, ...data?.products]);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   // Filter by category
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setChecked([]);
//     setRadio([]);
//     getAllProducts();
//   };

//   // Effects
//   useEffect(() => {
//     getAllCategory();
//     getTotal();
//   }, []);

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);

//   useEffect(() => {
//     if (!checked.length && !radio.length) getAllProducts();
//   }, [checked.length, radio.length]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//   }, [checked, radio]);

//   // Get filtered products
//   const filterProduct = async () => {
//     try {
//       const { data } = await axios.post("/api/v1/product/product-filters", {
//         checked,
//         radio,
//       });
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout title={"All Products - Best Offers"}>
//       <div className="flex flex-col md:flex-row gap-8 p-4 sm:p-6 bg-gray-50 min-h-screen">
//         {/* Mobile Filter Button */}
//         <div className="md:hidden mb-4">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="w-full flex justify-between items-center bg-white px-4 py-2 shadow rounded-lg"
//           >
//             <span className="font-semibold text-gray-800">Filters</span>
//             <span className="text-gray-600">
//               {sidebarOpen ? "✖" : "☰"}
//             </span>
//           </button>

//           {sidebarOpen && (
//             <aside className="mt-4 bg-white p-6 shadow-lg rounded-2xl">
//               <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
//                 Filter By Category
//               </h4>
//               <div className="flex flex-col gap-3">
//                 {categories?.map((c) => (
//                   <label
//                     key={c._id}
//                     className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                       onChange={(e) => handleFilter(e.target.checked, c._id)}
//                       checked={checked.includes(c._id)}
//                     />
//                     {c.name}
//                   </label>
//                 ))}
//               </div>

//               {/* Price filter */}
//               <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3 border-b pb-2">
//                 Filter By Price
//               </h4>
//               <div className="flex flex-col gap-3">
//                 {Prices?.map((p) => (
//                   <label
//                     key={p._id}
//                     className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
//                   >
//                     <input
//                       type="radio"
//                       name="price"
//                       value={p.array}
//                       checked={radio === p.array}
//                       className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                       onChange={() => setRadio(p.array)}
//                     />
//                     {p.name}
//                   </label>
//                 ))}
//               </div>

//               <div className="mt-6">
//                 <button
//                   className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//                   onClick={resetFilters}
//                 >
//                   RESET FILTERS
//                 </button>
//               </div>
//             </aside>
//           )}
//         </div>

//         {/* Desktop Sidebar */}
//         <aside className="hidden md:block w-1/4 bg-white p-6 shadow-lg rounded-2xl sticky top-4 h-fit">
//           <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
//             Filter By Category
//           </h4>
//           <div className="flex flex-col gap-3">
//             {categories?.map((c) => (
//               <label
//                 key={c._id}
//                 className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   onChange={(e) => handleFilter(e.target.checked, c._id)}
//                   checked={checked.includes(c._id)}
//                 />
//                 {c.name}
//               </label>
//             ))}
//           </div>

//           <h4 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b pb-2">
//             Filter By Price
//           </h4>
//           <div className="flex flex-col gap-3">
//             {Prices?.map((p) => (
//               <label
//                 key={p._id}
//                 className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   name="price"
//                   value={p.array}
//                   checked={radio === p.array}
//                   className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                   onChange={() => setRadio(p.array)}
//                 />
//                 {p.name}
//               </label>
//             ))}
//           </div>

//           <div className="mt-6">
//             <button
//               className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//               onClick={resetFilters}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </aside>

//         {/* Products Section */}
//         <main className="w-full md:w-3/4">
//           <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
//             Our Products
//           </h1>

//           {/* Products Grid */}
//           {products?.length === 0 ? (
//             <p className="text-center text-gray-600">No products found</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {products?.map((p) => (
//                 <div
//                   key={p._id}
//                   className="bg-white shadow-md rounded-2xl overflow-hidden group hover:shadow-xl transition"
//                 >
//                   <div className="relative">
//                     <img
//                       src={`/api/v1/product/product-photo/${p._id}`}
//                       alt={p.name}
//                       className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
//                     />
//                     <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
//                       ${p.price}
//                     </span>
//                   </div>
//                   <div className="p-4">
//                     <h5 className="text-lg font-semibold text-gray-800 truncate">
//                       {p.name}
//                     </h5>
//                     <p className="text-gray-500 text-sm mb-3">
//                       {p?.description
//                         ? `${p.description.substring(0, 50)}...`
//                         : "No description available"}
//                     </p>
//                     <div className="flex gap-3">
//                       <button
//                         className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                         onClick={() => navigate(`/product/${p.slug}`)}
//                       >
//                         More Details
//                       </button>
//                       <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition">
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Load More Button */}
//           <div className="flex justify-center mt-10">
//             {products && products.length < total && (
//               <button
//                 className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Load More"}
//               </button>
//             )}
//           </div>
//         </main>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;


// ===================================================================================================================================================

// 

// ===============================================================================================================================================
/* eslint-disable no-unsafe-optional-chaining */
// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart";
// import toast from "react-hot-toast";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useCart();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer toggle

//   // get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) setCategories(data?.category);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // get all products
//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   // get total count
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/product-count");
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // load more
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts([...products, ...data?.products]);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   // filter by category
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) all.push(id);
//     else all = all.filter((c) => c !== id);
//     setChecked(all);
//   };

//   // reset filters
//   const resetFilters = () => {
//     setChecked([]);
//     setRadio([]);
//     getAllProducts();
//   };

//   // get filtered products
//   const filterProduct = async () => {
//     try {
//       const { data } = await axios.post("/api/v1/product/product-filters", {
//         checked,
//         radio,
//       });
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // effects
//   useEffect(() => {
//     getAllCategory();
//     getTotal();
//   }, []);

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);

//   useEffect(() => {
//     if (!checked.length && !radio.length) getAllProducts();
//   }, [checked.length, radio.length]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//   }, [checked, radio]);

//   return (
//     <Layout title={"All Products - Best Offers"}>
//       <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 bg-gray-50 min-h-screen">
//         {/* Mobile Filter Button */}
//         <div className="md:hidden mb-4">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="w-full flex justify-between items-center bg-white px-4 py-2 shadow rounded-lg"
//           >
//             <span className="font-semibold text-gray-800">Filters</span>
//             <span className="text-gray-600">☰</span>
//           </button>
//         </div>

//         {/* Mobile Sidebar Drawer */}
//         {sidebarOpen && (
//           <div className="fixed inset-0 z-50 flex">
//             {/* Backdrop */}
//             <div
//               className="fixed inset-0 bg-black/50"
//               onClick={() => setSidebarOpen(false)}
//             ></div>

//             {/* Drawer */}
//             <aside className="relative w-3/4 max-w-xs bg-white p-6 shadow-lg h-full z-50 overflow-y-auto">
//               {/* Close Button */}
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="absolute top-4 right-4 text-gray-600 hover:text-black"
//               >
//                 ✖
//               </button>

//               {/* Category Filter */}
//               <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
//                 Filter By Category
//               </h4>
//               <div className="flex flex-col gap-3">
//                 {categories?.map((c) => (
//                   <label
//                     key={c._id}
//                     className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                       onChange={(e) => handleFilter(e.target.checked, c._id)}
//                       checked={checked.includes(c._id)}
//                     />
//                     {c.name}
//                   </label>
//                 ))}
//               </div>

//               {/* Price Filter */}
//               <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3 border-b pb-2">
//                 Filter By Price
//               </h4>
//               <div className="flex flex-col gap-3">
//                 {Prices?.map((p) => (
//                   <label
//                     key={p._id}
//                     className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
//                   >
//                     <input
//                       type="radio"
//                       name="price"
//                       value={p.array}
//                       checked={radio === p.array}
//                       className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                       onChange={() => setRadio(p.array)}
//                     />
//                     {p.name}
//                   </label>
//                 ))}
//               </div>

//               <div className="mt-6">
//                 <button
//                   className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//                   onClick={resetFilters}
//                 >
//                   RESET FILTERS
//                 </button>
//               </div>
//             </aside>
//           </div>
//         )}

//         {/* Desktop Sidebar */}
//         <aside className="hidden md:block w-1/4 bg-white p-6 shadow-lg rounded-2xl sticky top-4 h-fit">
//           <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
//             Filter By Category
//           </h4>
//           <div className="flex flex-col gap-3">
//             {categories?.map((c) => (
//               <label
//                 key={c._id}
//                 className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   onChange={(e) => handleFilter(e.target.checked, c._id)}
//                   checked={checked.includes(c._id)}
//                 />
//                 {c.name}
//               </label>
//             ))}
//           </div>

//           <h4 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b pb-2">
//             Filter By Price
//           </h4>
//           <div className="flex flex-col gap-3">
//             {Prices?.map((p) => (
//               <label
//                 key={p._id}
//                 className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   name="price"
//                   value={p.array}
//                   checked={radio === p.array}
//                   className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                   onChange={() => setRadio(p.array)}
//                 />
//                 {p.name}
//               </label>
//             ))}
//           </div>

//           <div className="mt-6">
//             <button
//               className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//               onClick={resetFilters}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </aside>

//         {/* Products Section */}
//         <main className="w-full md:w-3/4">
//           <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
//             All Products
//           </h1>

//           {/* Products Grid */}
//           {products?.length === 0 ? (
//             <p className="text-center text-gray-600">No products found</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products?.map((p) => (
//                 <div
//                   key={p._id}
//                   className="bg-white shadow-md rounded-2xl overflow-hidden group hover:shadow-xl transition"
//                 >
//                   <div className="relative">
//                     <img
//                       src={`/api/v1/product/product-photo/${p._id}`}
//                       alt={p.name}
//                       className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
//                     />
//                     <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
//                       ${p.price}
//                     </span>
//                   </div>
//                   <div className="p-4">
//                     <h5 className="text-lg font-semibold text-gray-800 truncate">
//                       {p.name}
//                     </h5>
//                     <p className="text-gray-500 text-sm mb-3">
//                       {p?.description
//                         ? `${p.description.substring(0, 50)}...`
//                         : "No description available"}
//                     </p>
//                     <div className="flex gap-3">
//                       <button
//                         className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                         onClick={() => navigate(`/product/${p.slug}`)}
//                       >
//                         More Details
//                       </button>
//                       <button
//                         className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
//                         onClick={() => {
//                           setCart([...cart, p]);
//                           localStorage.setItem(
//                             "cart",
//                             JSON.stringify([...cart, p])
//                           );
//                           toast.success("Item Added to Cart");
//                         }}
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Load More Button */}
//           <div className="flex justify-center mt-10">
//             {products && products.length < total && (
//               <button
//                 className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Load More"}
//               </button>
//             )}
//           </div>
//         </main>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;


// ======================================================================================




import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Hero Banner Carousel Component
const slides = [
  { id: 1, image: "/banners/banners1.jpg", alt: "Sale 1" },
  { id: 2, image: "/banners/banners2.jpg", alt: "Sale 2" },
  { id: 3, image: "/banners/banners3.jpg", alt: "Sale 3" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px] overflow-hidden rounded-2xl shadow-lg mb-8">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full bg-center bg-cover transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        ></div>
      ))}

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/60"
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/60"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};


const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  // reset filters
  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    getAllProducts();
  };

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // effects
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best Offers"}>
      {/* Hero Banner Carousel */}
      <HeroCarousel />

      <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 bg-gray-50 min-h-screen">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-full flex justify-between items-center bg-white px-4 py-2 shadow rounded-lg"
          >
            <span className="font-semibold text-gray-800">Filters</span>
            <span className="text-gray-600">☰</span>
          </button>
        </div>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Drawer */}
            <aside className="relative w-3/4 max-w-xs bg-white p-6 shadow-lg h-full z-50 overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                ✖
              </button>

              {/* Category Filter */}
              <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                Filter By Category
              </h4>
              <div className="flex flex-col gap-3">
                {categories?.map((c) => (
                  <label
                    key={c._id}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      checked={checked.includes(c._id)}
                    />
                    {c.name}
                  </label>
                ))}
              </div>

              {/* Price Filter */}
              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3 border-b pb-2">
                Filter By Price
              </h4>
              <div className="flex flex-col gap-3">
                {Prices?.map((p) => (
                  <label
                    key={p._id}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="price"
                      value={p.array}
                      checked={radio === p.array}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      onChange={() => setRadio(p.array)}
                    />
                    {p.name}
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <button
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={resetFilters}
                >
                  RESET FILTERS
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-1/4 bg-white p-6 shadow-lg rounded-2xl sticky top-4 h-fit">
          <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Filter By Category
          </h4>
          <div className="flex flex-col gap-3">
            {categories?.map((c) => (
              <label
                key={c._id}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  checked={checked.includes(c._id)}
                />
                {c.name}
              </label>
            ))}
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b pb-2">
            Filter By Price
          </h4>
          <div className="flex flex-col gap-3">
            {Prices?.map((p) => (
              <label
                key={p._id}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                <input
                  type="radio"
                  name="price"
                  value={p.array}
                  checked={radio === p.array}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  onChange={() => setRadio(p.array)}
                />
                {p.name}
              </label>
            ))}
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              onClick={resetFilters}
            >
              RESET FILTERS
            </button>
          </div>
        </aside>

        {/* Products Section */}
        <main className="w-full md:w-3/4">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            All Products
          </h1>

          {/* Products Grid */}
          {products?.length === 0 ? (
            <p className="text-center text-gray-600">No products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="bg-white shadow-md rounded-2xl overflow-hidden group hover:shadow-xl transition"
                >
                  <div className="relative">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                      ${p.price}
                    </span>
                  </div>
                  <div className="p-4">
                    <h5 className="text-lg font-semibold text-gray-800 truncate">
                      {p.name}
                    </h5>
                    <p className="text-gray-500 text-sm mb-3">
                      {p?.description
                        ? `${p.description.substring(0, 50)}...`
                        : "No description available"}
                    </p>
                    <div className="flex gap-3">
                      <button
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to Cart");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          <div className="flex justify-center mt-10">
            {products && products.length < total && (
              <button
                className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default HomePage;
