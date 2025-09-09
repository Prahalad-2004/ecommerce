import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [cart, setCart] = useCart(); // ✅ useCart hook

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Add to Cart handler
  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Category Info */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Category: {category?.name}
            </h2>
            <p className="text-gray-600 mt-2">
              {products?.length} product{products?.length !== 1 && "s"} found
            </p>
          </div>

          {/* Products Grid */}
          {products?.length === 0 ? (
            <p className="text-center text-gray-500">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      ${p.price}
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h5 className="text-lg font-semibold text-gray-800 truncate">
                      {p.name}
                    </h5>
                    <p className="text-gray-500 text-sm mb-3">
                      {p?.description
                        ? `${p.description.substring(0, 60)}...`
                        : "No description available"}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        More Details
                      </button>
                      <button
                        onClick={() => handleAddToCart(p)} // ✅ add to cart
                        className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
