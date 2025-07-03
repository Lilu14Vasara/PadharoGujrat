import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Review = () => {
  const [token, setToken] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== "undefined") {
      setToken(storedToken);
      const decoded = jwtDecode(storedToken);
      setLoggedInUserId(decoded.userId);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.response?.data || error.message);
    }
  };

  const handleSubmitReview = async () => {
    if (!newReview || !rating) {
      alert("Please enter a review and rating.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        { text: newReview, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews([...reviews, response.data]);
      setNewReview("");
      setRating(0);
    } catch (error) {
      console.error("Error adding review:", error.response?.data || error.message);
      alert("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert("Review deleted successfully!");
        setReviews(reviews.filter((r) => r._id !== reviewId));
      }
    } catch (error) {
      console.error("Error deleting review:", error.response?.data || error.message);
      alert("Failed to delete review.");
    }
  };

  return (
    <div className="mb-10 p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-3xl font-bold text-green-800 mb-6 border-b pb-2">User Reviews</h3>

      {/* Review Form */}
      {token ? (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <div className="flex items-center gap-2 my-3">
            <span className="text-lg text-gray-800 font-medium">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition ${
                  rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmitReview}
            className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      ) : (
        <p className="text-gray-600 italic mb-6">Login to leave a review.</p>
      )}

      {/* Display Reviews */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold">
                  {review.user?.name ? review.user.name[0].toUpperCase() : "A"}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {review.user?.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Rating:{" "}
                    <span className="text-yellow-500 font-bold">
                      {review.rating} ★
                    </span>
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-2">{review.text}</p>

              {token && review.user && review.user._id === loggedInUserId && (
                <button
                  className="text-sm text-red-500 hover:underline mt-2"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 italic">No reviews yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
};

export default Review;
