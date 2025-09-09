// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const ProductDetails = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   // Fetch product when slug changes
//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params?.slug]);

//   // Get product details
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data?.product);
//       getSimilarProduct(data?.product._id, data?.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Get related products
//   const getSimilarProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/related-product/${pid}/${cid}`
//       );
//       setRelatedProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Product Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Image */}
//           <div className="flex justify-center">
//             {product?._id ? (
//               <img
//                 src={`/api/v1/product/product-photo/${product._id}`}
//                 alt={product?.name || "Product"}
//                 className="rounded-xl shadow-md max-h-96 object-cover"
//               />
//             ) : (
//               <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-xl shadow-md">
//                 <span className="text-gray-400">Loading image...</span>
//               </div>
//             )}
//           </div>

//           {/* Product Info */}
//           <div className="flex flex-col justify-center">
//             <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
//               Product Details
//             </h1>
//             <h6 className="text-gray-700">
//               <span className="font-semibold">Name:</span> {product?.name}
//             </h6>
//             <h6 className="text-gray-700 mt-2">
//               <span className="font-semibold">Description:</span>{" "}
//               {product?.description}
//             </h6>
//             <h6 className="text-gray-700 mt-2">
//               <span className="font-semibold">Price:</span> ${product?.price}
//             </h6>
//             <h6 className="text-gray-700 mt-2">
//               <span className="font-semibold">Category:</span>{" "}
//               {product?.category?.name}
//             </h6>

//             <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* Divider */}
//         <hr className="my-8" />

//         {/* Similar Products Section */}
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Similar Products
//           </h2>

//           {relatedProducts.length < 1 && (
//             <p className="text-center text-gray-500">
//               No Similar Products found
//             </p>
//           )}

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {relatedProducts?.map((p) => (
//               <div
//                 key={p._id}
//                 className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
//               >
//                 {p?._id ? (
//                   <img
//                     src={`/api/v1/product/product-photo/${p._id}`}
//                     alt={p.name}
//                     className="h-48 w-full object-cover"
//                   />
//                 ) : (
//                   <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
//                     <span className="text-gray-400">No image</span>
//                   </div>
//                 )}
//                 <div className="p-4">
//                   <h5 className="text-lg font-semibold text-gray-800 truncate">
//                     {p.name}
//                   </h5>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {p.description.substring(0, 50)}...
//                   </p>
//                   <p className="text-blue-600 font-bold mt-2">$ {p.price}</p>

//                   <div className="mt-4 flex space-x-2">
//                     <button
//                       onClick={() => navigate(`/product/${p.slug}`)}
//                       className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                     >
//                       More Details
//                     </button>
//                     <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition">
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetails;

// ==============================================================================================================
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart(); // ✅ cart context

  // Fetch product when slug changes
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get related products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Add to Cart handler
  const handleAddToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${item.name} added to cart`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex justify-center">
            {product?._id ? (
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product?.name || "Product"}
                className="rounded-xl shadow-md max-h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-xl shadow-md">
                <span className="text-gray-400">Loading image...</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Product Details
            </h1>
            <h6 className="text-gray-700">
              <span className="font-semibold">Name:</span> {product?.name}
            </h6>
            <h6 className="text-gray-700 mt-2">
              <span className="font-semibold">Description:</span>{" "}
              {product?.description}
            </h6>
            <h6 className="text-gray-700 mt-2">
              <span className="font-semibold">Price:</span> ${product?.price}
            </h6>
            <h6 className="text-gray-700 mt-2">
              <span className="font-semibold">Category:</span>{" "}
              {product?.category?.name}
            </h6>

            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8" />

        {/* Similar Products Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Similar Products
          </h2>

          {relatedProducts.length < 1 && (
            <p className="text-center text-gray-500">
              No Similar Products found
            </p>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts?.map((p) => (
              <div
                key={p._id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                {p?._id ? (
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-800 truncate">
                    {p.name}
                  </h5>
                  <p className="text-sm text-gray-600 mt-1">
                    {p.description.substring(0, 50)}...
                  </p>
                  <p className="text-blue-600 font-bold mt-2">$ {p.price}</p>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      More Details
                    </button>
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

