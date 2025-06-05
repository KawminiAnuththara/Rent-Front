import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Review({ user }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching Reviews:", err.response?.data || err.message);
        toast.error("Failed to load reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchReviews();
  }, [loading]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please login first");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Review submitted successfully");
      setEditing(true);
      setComment('');
      setRating(0);
      setShowForm(false);
      setLoading(true);
    } catch (err) {
      toast.error(err.response?.data?.error || "Error submitting review.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/reviews/${user.email}`);
      toast.success(res.data.message);
      setComment('');
      setRating(0);
      setEditing(false);
      setLoading(true);
    } catch (err) {
      toast.error("Failed to delete review.");
    }
  };

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-6 px-4">
      {/* Reviews Section */}
      <div className="w-full md:w-3/4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">What Others Say</h3>

        {visibleReviews.map((r, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 mb-6 relative">
            <div className="flex justify-center">
              <img
                src={r.profilePicture}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white shadow absolute -top-10"
              />
            </div>
            <div className="mt-12 text-center">
              <h4 className="text-lg font-bold uppercase">{r.name}</h4>
              <div className="text-yellow-500 mt-1">{'★'.repeat(r.rating)}</div>
              <p className="text-gray-600 mt-2 italic">"{r.comment}"</p>
            </div>
          </div>
        ))}

        {reviews.length > 2 && !showAll && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              See More Reviews
            </button>
          </div>
        )}
      </div>

      {/* Add Review Section */}
      <div className="w-full md:w-1/4">
        <button
          onClick={() => setShowForm(!showForm)}
          className='primary-btn'
        >
          {showForm ? 'Close Form' : 'Add Review'}
        </button>

        {showForm && (
          <div className="bg-white p-5 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4">Submit Your Feedback</h4>

            <div className="flex justify-center mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl cursor-pointer transition ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows={4}
              placeholder="Write your feedback..."
            />

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
              >
                {editing ? 'Update Review' : 'Submit Review'}
              </button>

              {editing && (
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;
