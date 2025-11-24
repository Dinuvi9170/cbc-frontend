import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
        .get(import.meta.env.VITE_BACKEND_URL + `/api/orders/${orderId}`, {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            setOrder(res.data);
            setLoading(false);
        })
        .catch(() => {
            toast.error("Order not found");
            setLoading(false);
        });
    }, [orderId]);

    console.log(order)

    if (loading) {
        return (
        <div className="h-screen pt-[120px] flex items-center justify-center">
            <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-gray-500" />
        </div>
        );
    }

    if (!order) {
        return (
        <div className="pt-[120px] flex items-center justify-center text-xl text-gray-500">
            Order not found.
        </div>
        );
    }

    const formattedDate = new Date(order.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const StatusBadge = ({ status }) => {
        const base = "px-3 py-1 rounded-full text-sm font-medium";
        const styles =
        status === "completed"
            ? "bg-green-100 text-green-700"
            : status === "cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700";

        return <span className={`${base} ${styles}`}>{status}</span>;
    };

    return (
        <div className="max-w-6xl mx-auto pt-[120px] p-4">
        <Link
            to="/myorders"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
            <IoArrowBack size={22} />
            Back to Orders
        </Link>

        <h1 className="text-3xl font-bold text-gray-700 mb-6">Order Details</h1>
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row justify-between">

                <div className="mb-4 md:mb-0">
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-semibold">{order.orderId}</p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-semibold">{formattedDate}</p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <StatusBadge status={order.status} />
                </div>

                <div>
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-bold text-lg">Rs {order.total.toFixed(2)}</p>
                </div>

            </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Items in this Order</h2>

            <div className="flex flex-col gap-5">
                {order.products.map((p, index) => (
                    <div
                    key={index}
                    className="flex items-center justify-between border-b border-acsent pb-4"
                    >
                    <div className="flex items-center gap-4">
                        <img
                        src={p.productInfo.images?.[0]}
                        className="w-16 h-16 object-cover rounded"
                        />

                        <div>
                        <p className="font-medium text-gray-700">{p.productInfo.name}</p>
                        <p className="text-sm text-gray-500">Qty: {p.quantity}</p>
                        </div>
                    </div>

                    <p className="font-semibold">
                        Rs {(p.quantity * p.productInfo.normalPrice).toFixed(2)}
                    </p>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 mt-8">
            <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>

            <div className="flex flex-col gap-3 text-gray-700">
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs {order.labelTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span>Discount</span>
                <span>Rs {(order.labelTotal.toFixed(2) -order.total.toFixed(2)).toFixed(2)}</span>
            </div>

            <div className="border-t border-acsent pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>Rs {order.total.toFixed(2)}</span>
            </div>
            </div>
        </div>
        </div>
    );
};

export default OrderDetails;
