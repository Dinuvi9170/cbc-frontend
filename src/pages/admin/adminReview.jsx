import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const AdminReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews/", {
            headers: { "Authorization": "Bearer " + token },
        })
        .then((res) => {
            setReviews(res.data.reviews);
            setLoading(false);
        })
        .catch(() => {
            toast.error("Failed to fetch reviews");
            setLoading(false);
        });
    }, []);

    const deleteReview = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/reviews/${id}`,{ 
                headers: { "Authorization": "Bearer " + token } 
            }
        );
        toast.success("Review deleted");
        setReviews((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
        toast.error("Delete failed");
        }
    };

    const filtered = reviews.filter((r) => {
        return (
        r.productId?.name.toLowerCase().includes(search.toLowerCase()) ||
        r.userId?.email.toLowerCase().includes(search.toLowerCase()) ||
        r.rating.toString().includes(search)
        );
    });

    if (loading) {
        return (
        <div className="w-full h-screen flex items-center justify-center flex-col bg-gray-50">
            <AiOutlineLoading3Quarters className="text-gray-400 w-8 h-8 animate-spin" />
            <p className="text-gray-500 mt-2">Loading ...</p>
        </div>
        );
    }

    return (
        <div className="w-full flex flex-col overflow-y-scroll p-4 shadow-md bg-gray-50">
            <input
            type="text"
            placeholder="Search by product, email, or rating..."
            className="w-full md:w-1/3 z-10 border-2 border-acsent rounded-xl shadow-sm mt-3 px-3 py-3 font-semibold text-lg "
            onChange={(e) => setSearch(e.target.value)}
            />

            <table className="w-full border-collapse mt-4">
                <thead className="bg-acsent text-white uppercase text-sm">
                <tr className="bg-acsent text-white ">
                    <th className="p-2">Product</th>
                    <th className="p-2">User</th>
                    <th className="p-2">Rating</th>
                    <th className="p-2">Comment</th>
                    <th className="p-2 text-center">Actions</th>
                </tr>
                </thead>

                <tbody>
                {filtered.length === 0 ? (
                    <tr>
                    <td
                        colSpan="5"
                        className="text-center py-8 text-gray-500 italic"
                    >
                        No reviews found
                    </td>
                    </tr>
                ) : (
                    filtered.map((r) => (
                    <tr
                        key={r._id}
                        className="border-b border-acsent hover:bg-secondary transition text-md"
                    >
                        <td className="px-6 py-4 flex gap-3 items-center">
                        <img
                            src={r.productId?.images[0]}
                            className="w-14 h-14 rounded-lg object-cover border"
                        />
                        <span className="font-medium">{r.productId?.name}</span>
                        </td>

                        <td className="px-6 py-4">
                        <p className="font-medium">{r.userId?.firstName}</p>
                        <p className="text-sm text-gray-500">{r.userId?.email}</p>
                        </td>

                        <td className="px-6 py-4">
                        <span className="text-yellow-500 font-semibold">
                            ⭐ {r.rating}
                        </span>
                        </td>

                        <td className="px-6 py-4">
                        <p className="truncate max-w-[300px]">{r.comment}</p>
                        </td>

                        <td className="px-6 py-4 text-center">
                        <button
                            onClick={() => deleteReview(r._id)}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2"
                        >
                            <MdDelete />
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReviewPage;
