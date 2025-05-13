import React, { useEffect, useState } from 'react'
import axios from "axios"

const AdminReviewPage = () => {
  const [reviews,setReviews] = useState([]);
  const [loading ,setLoading] = useState(true);
  const [error , setError] = useState("");

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

  function handleApproveReviews(email){
    const token = localStorage.getItem("token");

    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/approve/${email}`,{},{
      headers : {
        Authorization : `Bearer ${token}`
      }
    }).then(()=>{
      setLoading(true);
    }).catch((err)=>{
      console.error(err);
    })
  }

  return (
    <div className='p-6'>
      {loading ?(
       <div className='flex justify-center items-center mt-10'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500'></div>
       </div>
      ):reviews.length === 0?(
        <div className="text-center text-gray-500">No Reviews found.</div>
      ):(
        <div className='overflow-x-auto'>
           <table className='min-w-full bg-white rounded-lg border border-gray-200'>
             <thead className="bg-blue-100 text-left">
              <tr>
                <th className="py-2 px-4 border-b">Profile</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Rating</th>
                <th className="py-2 px-4 border-b">Comment</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Approved</th>
              </tr>
             </thead>
             <tbody>
              {reviews.map((review,index)=>(
                <tr 
                  key={index}
                  className='hover:bg-gray-100 cursor-pointer'
                >
                  <td className='py-2 px-4 border-b'>
                     <img
                        src={review.profilePicture}
                        alt='Profile'
                        className='w-10 h-10 rounded-full object-cover'
                     />
                  </td>
                  <td className='py-2 px-4 border-b'>
                    {review.name}
                  </td>
                  <td className='py-2 px-4 border-b'>{review.email}</td>
                  <td className='py-2 px-4 border-b'>{review.email}</td>
                  <td className='py-2 px-4 border-b'>{review.rating}</td>
                  <td className='py-2 px-4 border-b'>{review.comment}</td>
                  <td onClick={()=>{handleApproveReviews(review.email)}} className='py-2 px-4 border-b cursor-pointer'>{review.isApproved ? "APPROVED":"REJECTED"}</td>

                </tr>
              ))}
             </tbody>
           </table>
        </div>
      )}
    </div>
  )
}

export default AdminReviewPage