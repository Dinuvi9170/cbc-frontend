import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL+ "/api/reviews/", {
                headers: {
                    Authorization: `Bearer `+token,
                },
                });
                setReviews(res.data.reviews);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) {
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

    return (
        <div className="max-w-6xl pt-[100px] md:pt-[140px] mx-auto p-4">
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
                My Reviews
            </h1>
            {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-10">You have not added any reviews yet.</p>
            ) : (
                <div className="space-y-6">
                {reviews.map((review) => (
                    <div
                    key={review._id}
                    className="p-5 border border-acsent rounded-xl shadow-sm hover:shadow-md transition bg-white"
                    >
                    <div className="flex gap-5">
                        <img
                        src={review.productId?.images?.[0]}
                        alt="product"
                        className="w-24 h-24 rounded-lg object-cover border border-acsent"
                        />
                        <div>
                        <h2 className="text-xl font-semibold">
                            {review.productId?.name}
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            {review.productId?.description}
                        </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 mt-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={18}
                            className={`${
                            star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                            }`}
                        />
                        ))}
                    </div>

                    <p className="mt-3 text-gray-800">{review.comment}</p>

                    <p className="text-xs text-gray-500 mt-2">
                        {new Date(review.date).toLocaleDateString()}
                    </p>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};

export default MyReviews;
