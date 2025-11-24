import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const ReviewPage = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if(isLoading){
        axios
        .get(import.meta.env.VITE_BACKEND_URL + `/api/reviews/${productId}`)
        .then((res) => {
            setReviews(res.data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            toast.error("Failed to load reviews");
            setIsLoading(false);
        });
    }
  }, [isLoading,productId]);

  const handleSubmit = async () => {
    if (!token) {
      toast.error("Please login to add a review");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews",
        { productId, rating, comment },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast.success("Review added!");
      setReviews([res.data.review, ...reviews]);
      setIsLoading(true);
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error);
      toast.error("Error creating review");
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + `/api/reviews/${reviewId}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      setReviews(reviews.filter((r) => r._id !== reviewId));
      toast.success("Review deleted");
    } catch (error) {
      toast.error("Cannot delete review");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center p-10">
        <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin text-gray-500" />
        <p className="text-gray-500 mt-2">Loading ...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-[100px] p-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Customer Reviews
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Write a Review
        </h2>
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={28}
              onMouseEnter={() => setHoverStar(star)}
              onMouseLeave={() => setHoverStar(0)}
              onClick={() => setRating(star)}
              className={`cursor-pointer transition 
                ${
                  star <= (hoverStar || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
            />
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-acsent"
          placeholder="Write your review (optional)"
          rows="3"
        ></textarea>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-acsent text-white px-5 py-2 rounded-lg shadow hover:bg-acsent/80 transition"
        >
          Submit Review
        </button>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white shadow rounded-lg p-5 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={r.userId?.profileimage}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {r.userId?.firstName} {r.userId?.lastName}
                  </p>
                  <span className="text-sm text-gray-500">
                    {new Date(r.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <FaStar key={i} size={18} />
                ))}
              </div>

              <p className="text-gray-600">{r.comment}</p>

              {(r.userId?._id === JSON.parse(atob(token.split(".")[1]))._id ||
                JSON.parse(atob(token.split(".")[1])).role === "Admin") && (
                <button
                  onClick={() => deleteReview(r._id)}
                  className="self-end text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
