// src/components/ProductCard.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductCard = ({ p }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const addToCart = () => {
    const updatedCart = [...cart, p];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${p.name} added to cart`);
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={`/api/v1/product/product-photo/${p._id}`}
        alt={p.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h5 className="text-lg font-semibold text-gray-800 truncate">
          {p.name}
        </h5>
        <p className="text-sm text-gray-600 mt-1">
          {p.description?.substring(0, 50)}...
        </p>
        <p className="text-blue-600 font-bold mt-2">₹ {p.price}</p>

        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => navigate(`/product/${p.slug}`)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            More Details
          </button>
          <button
            onClick={addToCart}
            className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
