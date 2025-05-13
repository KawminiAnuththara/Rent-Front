import { useEffect, useState } from 'react';
import axios from 'axios';

function Review({ user }) {
  const [reviews, setReviews] = useState([]);
  const [loading ,setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [editing, setEditing] = useState(false);

  useEffect(()=>{
    const fetchReviews = async ()=>{
      try{
        const token = localStorage.getItem('token');

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`,{
          headers :{
            Authorization: `Bearer ${token}`,
          }
        });

        setReviews(res.data);
      }
      catch(err){
      console.error("Error fetching Reviews :",err.response?.data || err.message);
      setError ("Failed to load Reviews.Please try again");
      }finally{
        setLoading(false);
      }
    };

    if(loading){
      fetchReviews();
    }
  },[loading]);

  const handleSubmit = () => {
    axios.post('/api/reviews', { rating, comment }).then(res => {
      alert(res.data.message);
      setEditing(true);
    });
  };

  const handleDelete = () => {
    axios.delete(`/api/reviews/${user.email}`).then(res => {
      alert(res.data.message);
      setComment('');
      setRating(0);
      setEditing(false);
    });
  }; 

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Customer Feedback</h2>

      {/* Star Rating Input */}
      <div className="flex space-x-1 mb-2">
        {[1,2,3,4,5].map(star => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >★</span>
        ))}
      </div>

      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Write your feedback..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex gap-2">
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded">
          {editing ? "Update" : "Submit"} Review
        </button>
        {editing && (
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-1 rounded">
            Delete
          </button>
        )}
      </div>

      {/* Display All Approved Reviews */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">What Others Say</h3>
        {reviews.map((r, idx) => (
          <div key={idx} className="border-b py-2">
            <div className="flex items-center gap-2">
              <img src={r.profilePicture} alt="" className="w-8 h-8 rounded-full" />
              <strong>{r.name}</strong>
              <span className="text-yellow-500 ml-2">{'★'.repeat(r.rating)}</span>
            </div>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Review
