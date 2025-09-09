import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.put(
        `/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      toast.success("Status updated");
      getOrders();
    } catch (error) {
      console.log(error);
      toast.error("Could not update status");
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center text-2xl font-semibold mb-4">All Orders</h1>

          {orders?.map((o, i) => (
            <div key={o._id || i} className="border shadow mb-6 rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium">#</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Buyer</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Payment</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y">
                    <tr>
                      <td className="px-4 py-3 text-sm">{i + 1}</td>

                      <td className="px-4 py-3 text-sm">
                        <select
                          defaultValue={o?.status}
                          onChange={(e) => handleChange(o._id, e.target.value)}
                          className="block w-48 border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                          {status.map((s, idx) => (
                            <option key={idx} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-3 text-sm">{o?.buyer?.name}</td>
                      <td className="px-4 py-3 text-sm">{moment(o?.createAt).fromNow()}</td>
                      <td className="px-4 py-3 text-sm">{o?.payment?.success ? "Success" : "Failed"}</td>
                      <td className="px-4 py-3 text-sm">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="container p-4">
                {o?.products?.map((p) => (
                  <div
                    className="row mb-2 p-3 card flex flex-row items-center border rounded-md"
                    key={p._id}
                  >
                    <div className="w-24 flex-shrink-0">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="object-cover w-24 h-24 rounded"
                        alt={p.name}
                      />
                    </div>

                    <div className="pl-4 flex-1">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-gray-600">{p.description?.substring(0, 60)}</p>
                      <p className="text-sm mt-1">Price: {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {orders?.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No orders found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
