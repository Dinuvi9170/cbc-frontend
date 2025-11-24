import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      setIsLoading(false);
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders/", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load orders");
        setIsLoading(false);
      });
  }, []);

  const filteredOrders = orders.filter((o) => {
    return (
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.status.toLowerCase().includes(search.toLowerCase()) ||
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      new Date(o.date).toLocaleDateString().includes(search)
    );
  });

  const StatusBadge = ({ status }) => {
    const base = "px-3 py-1 rounded-full text-sm font-medium";
    const styles =
      status === "completed"
        ? "bg-green-100 text-green-700"
        : status === "cancelled"
        ? "bg-red-100 text-red-700"
        :status==="processing"
        ?"bg-pink-100 text-pink-700"
        : "bg-yellow-100 text-yellow-700";

    return <span className={`${base} ${styles}`}>{status}</span>;
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col bg-primary justify-center items-center">
        <AiOutlineLoading3Quarters
          color="gray"
          className="w-8 h-8 animate-spin"
        />
        <h1 className="mt-2 animate-pulse text-lg font-semibold text-gray-600">
          Loading...
        </h1>
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col bg-primary pt-[100px] md:pt-[140px] items-center">
        <p className="text-2xl font-semibold text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl pt-[100px] md:pt-[140px] mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">My Orders</h1>
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search by order ID, name, status, or date"
          className="w-full md:w-1/3 px-4 py-2 border-2 border-acsent rounded-lg shadow-sm focus:ring-acsent focus:border-acsent text-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-5">
        {filteredOrders.map((order) => {
          const formattedDate = new Date(order.date).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          );

          return (
            <div
              key={order.orderId}
              className="bg-white border border-acsent rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
                <div className="flex flex-col md:flex-row md:gap-16 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Date Placed</p>
                    <p className="text-sm font-semibold">{formattedDate}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Order Status</p>
                    <div className="mt-1">
                      <StatusBadge status={order.status} />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-sm font-semibold">
                      Rs {order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <button 
                onClick={()=>navigate(`/myorders/${order.orderId}`)}
                className="px-5 py-2 text-sm font-medium border cursor-pointer border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition">
                  View Order
                </button>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-acsent flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{order.name}</p>
                  <p className="text-xs text-gray-500">
                    {order.products.length} items
                  </p>
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Total: Rs {order.total.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerOrders;
