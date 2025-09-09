// import React from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";

// const CartPage = () => {
//   const [auth] = useAuth();
//   const [cart, setCart] = useCart();
//   const navigate = useNavigate();

//   // Calculate total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.forEach((item) => {
//         total += item.price;
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Remove item from cart
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Hello {auth?.token && auth?.user?.name}
//           </h1>
//           <p className="text-gray-600 mt-2">
//             {cart?.length
//               ? `You have ${cart.length} item${
//                   cart.length > 1 ? "s" : ""
//                 } in your cart ${
//                   auth?.token ? "" : "— please login to checkout"
//                 }`
//               : "Your cart is empty"}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="md:col-span-2 space-y-4">
//             {cart?.map((p) => (
//               <div
//                 key={p._id}
//                 className="flex items-center bg-white shadow rounded-lg p-4 hover:shadow-md transition"
//               >
//                 {/* Product Image */}
//                 <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   alt={p.name}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />

//                 {/* Product Info */}
//                 <div className="ml-4 flex-1">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {p.name}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {p.description.substring(0, 40)}...
//                   </p>
//                   <p className="text-blue-600 font-medium mt-1">
//                     ${p.price}
//                   </p>
//                 </div>

//                 {/* Remove Button */}
//                 <button
//                   onClick={() => removeCartItem(p._id)}
//                   className="ml-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Cart Summary */}
//           <div className="bg-white shadow rounded-lg p-6 text-center">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">
//               Cart Summary
//             </h2>
//             <p className="text-gray-600">Total | Checkout | Payment</p>
//             <hr className="my-4" />
//             <h4 className="text-lg font-semibold text-gray-800">
//               Total: {totalPrice()}
//             </h4>

//             {/* Address Section */}
//             {auth?.user?.address ? (
//               <div className="mt-4">
//                 <h4 className="text-gray-700 font-medium">Current Address</h4>
//                 <p className="text-sm text-gray-500 mb-3">
//                   {auth?.user?.address}
//                 </p>
//                 <button
//                   className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
//                   onClick={() => navigate("/dashboard/user/profile")}
//                 >
//                   Update Address
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-4">
//                 {auth?.token ? (
//                   <button
//                     className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 ) : (
//                   <button
//                     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                     onClick={() =>
//                       navigate("/login", {
//                         state: "/cart",
//                       })
//                     }
//                   >
//                     Please Login to Checkout
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;
// ==============================================================================================

// import React from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const CartPage = () => {
//   const [auth] = useAuth();
//   const [cart, setCart] = useCart();
//   const navigate = useNavigate();

//   // ✅ Calculate total price (USD shown but using INR for Razorpay)
//   const getCartTotal = () => {
//     return (cart || []).reduce((sum, item) => sum + Number(item.price || 0), 0);
//   };

//   // ✅ Remove item from cart
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ Open Razorpay checkout
//   const openRazorpay = (order) => {
//     const key = import.meta.env.VITE_RAZORPAY_KEY_ID; // from .env
//     const options = {
//       key,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Ecommerce App",
//       description: "Order Payment",
//       order_id: order.id,
//       handler: async function (response) {
//         try {
//           const verify = await axios.post("/api/v1/payment/verify-payment", response);
//           if (verify.data.success) {
//             toast.success("Payment Successful!");
//             setCart([]);
//             localStorage.removeItem("cart");
//             navigate("/dashboard/user/orders");
//           } else {
//             toast.error("Payment verification failed");
//           }
//         } catch {
//           toast.error("Verification error");
//         }
//       },
//       prefill: {
//         name: auth?.user?.name || "Customer",
//         email: auth?.user?.email || "customer@example.com",
//         contact: "9999999999",
//       },
//       theme: { color: "#3399cc" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   // ✅ Handle payment
//   const handlePayNow = async () => {
//     try {
//       const amount = getCartTotal();
//       if (!amount) return toast.error("Your cart is empty");

//       const { data } = await axios.post("/api/v1/payment/create-order", { amount });
//       if (!data?.success) return toast.error("Unable to create order");

//       openRazorpay(data.order);
//     } catch (e) {
//       console.log(e);
//       toast.error("Payment init failed");
//     }
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Hello {auth?.token && auth?.user?.name}
//           </h1>
//           <p className="text-gray-600 mt-2">
//             {cart?.length
//               ? `You have ${cart.length} item${cart.length > 1 ? "s" : ""} in your cart ${
//                   auth?.token ? "" : "— please login to checkout"
//                 }`
//               : "Your cart is empty"}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="md:col-span-2 space-y-4">
//             {cart?.map((p) => (
//               <div
//                 key={p._id}
//                 className="flex items-center bg-white shadow rounded-lg p-4 hover:shadow-md transition"
//               >
//                 {/* Product Image */}
//                 <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   alt={p.name}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />

//                 {/* Product Info */}
//                 <div className="ml-4 flex-1">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {p.name}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {p.description.substring(0, 40)}...
//                   </p>
//                   <p className="text-blue-600 font-medium mt-1">${p.price}</p>
//                 </div>

//                 {/* Remove Button */}
//                 <button
//                   onClick={() => removeCartItem(p._id)}
//                   className="ml-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Cart Summary */}
//           <div className="bg-white shadow rounded-lg p-6 text-center">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">
//               Cart Summary
//             </h2>
//             <p className="text-gray-600">Total | Checkout | Payment</p>
//             <hr className="my-4" />
//             <h4 className="text-lg font-semibold text-gray-800">
//               Total: ${getCartTotal()}
//             </h4>

//             {/* Address Section */}
//             {auth?.user?.address ? (
//               <div className="mt-4">
//                 <h4 className="text-gray-700 font-medium">Current Address</h4>
//                 <p className="text-sm text-gray-500 mb-3">
//                   {auth?.user?.address}
//                 </p>
//                 <button
//                   className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
//                   onClick={() => navigate("/dashboard/user/profile")}
//                 >
//                   Update Address
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-4">
//                 {auth?.token ? (
//                   <button
//                     className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 ) : (
//                   <button
//                     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                     onClick={() =>
//                       navigate("/login", {
//                         state: "/cart",
//                       })
//                     }
//                   >
//                     Please Login to Checkout
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* ✅ Razorpay Pay Button */}
//             {auth?.token && cart?.length > 0 && (
//               <button
//                 onClick={handlePayNow}
//                 className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
//               >
//                 Pay Now
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;
// ======================================================================================

import React, { useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // ✅ Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Calculate total price
  const getCartTotal = () => {
    return (cart || []).reduce((sum, item) => sum + Number(item.price || 0), 0);
  };

  // ✅ Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Open Razorpay checkout
  const openRazorpay = (order) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load. Check your internet.");
      return;
    }

    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const options = {
      key,
      amount: order.amount,
      currency: order.currency,
      name: "Zentro",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response) {
        try {
          const verify = await axios.post(
            "/api/v1/payment/verify-payment",
            response
          );
          if (verify.data.success) {
            toast.success("Payment Successful!");
            setCart([]);
            localStorage.removeItem("cart");
            navigate("/dashboard/user/orders");
          } else {
            toast.error("Payment verification failed");
          }
        } catch {
          toast.error("Verification error");
        }
      },
      prefill: {
        name: auth?.user?.name || "Customer",
        email: auth?.user?.email || "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ Handle payment
  const handlePayNow = async () => {
    try {
      const amount = getCartTotal();
      if (!amount) return toast.error("Your cart is empty");

      const { data } = await axios.post("/api/v1/payment/create-order", {
        amount,
      });

      if (!data?.success) return toast.error("Unable to create order");

      openRazorpay(data.order);
    } catch (e) {
      console.log(e);
      toast.error("Payment init failed");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Hello {auth?.token && auth?.user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            {cart?.length
              ? `You have ${cart.length} item${
                  cart.length > 1 ? "s" : ""
                } in your cart ${
                  auth?.token ? "" : "— please login to checkout"
                }`
              : "Your cart is empty"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart?.map((p, index) => (
              <div
                key={p.slug || `${p._id}-${index}`} // ✅ Fix duplicate key issue
                className="flex items-center bg-white shadow rounded-lg p-4 hover:shadow-md transition"
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {p.description.substring(0, 40)}...
                  </p>
                  <p className="text-blue-600 font-medium mt-1">₹{p.price}</p>
                </div>

                <button
                  onClick={() => removeCartItem(p._id)}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Cart Summary
            </h2>
            <p className="text-gray-600">Total | Checkout | Payment</p>
            <hr className="my-4" />
            <h4 className="text-lg font-semibold text-gray-800">
              Total: ₹{getCartTotal()}
            </h4>

            {/* Address Section */}
            {auth?.user?.address ? (
              <div className="mt-4">
                <h4 className="text-gray-700 font-medium">Current Address</h4>
                <p className="text-sm text-gray-500 mb-3">
                  {auth?.user?.address}
                </p>
                <button
                  className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mt-4">
                {auth?.token ? (
                  <button
                    className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}

            {/* ✅ Pay Button */}
            {auth?.token && cart?.length > 0 && (
              <button
                onClick={handlePayNow}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
