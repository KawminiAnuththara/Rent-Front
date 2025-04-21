import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AdminBookingPage = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder,setActiveOrder] = useState(null);
  const [modelOpened,setModelOpened] = useState(false);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          setBooking(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
    
  }, [loading]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Bookings</h1>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : booking.length === 0 ? (
        <div className="text-center text-gray-500">No bookings found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg border border-gray-200">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Customer Email</th>
                <th className="py-2 px-4 border-b">Order Date</th>
                <th className="py-2 px-4 border-b">Start Date</th>
                <th className="py-2 px-4 border-b">End Date</th>
                <th className="py-2 px-4 border-b">Days</th>
                <th className="py-2 px-4 border-b">Total </th>
                <th className="py-2 px-4 border-b">Approved</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((b, index) => (
                <tr key={index} className="hover:bg-gray-100 cursor-pointer" onClick={()=>{
                  setActiveOrder(order);
                  setModelOpened(true);
                }}>
                  <td className="py-2 px-4 border-b">{b.orderId}</td>
                  <td className="py-2 px-4 border-b">{b.email}</td>
                  <td className="py-2 px-4 border-b">{new Date(b.orderDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{new Date(b.startingDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{new Date(b.endingDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{b.days}</td>
                  <td className="py-2 px-4 border-b">{b.totalAmount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded text-white ${b.isApproved ? "bg-green-500" : "bg-red-500"}`}>
                      {b.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {
        modelOpened &&(
          <div className='fixed top-0 left-0 w-full h-full bg-[#000000075] flex justify-center items-center'>
              <div className='w-[500px] bg-white p-4 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-semibold mb-4'>Order Details</h1>
                <div className='flex flex-col gqp-2'>
                    <p><span className='font-semibold'>Order ID:</span>{activeOrder.orderId}</p>
                    <p><span className='font-semibold'>Email:</span>{activeOrder.email}</p>
                    <p><span className='font-semibold'>Days:</span>{activeOrder.days}</p>
                    <p><span className='font-semibold'>Starting Date:</span>{new Date(activeOrder.startingDate).toLocaleDateString()}</p>
                    <p><span className='font-semibold'>Ending Date:</span>{new Date(activeOrder.endingDate).toLocaleDateString()}</p>
                    <p><span className='font-semibold'>Total Amount:</span>{activeOrder.totalAmount.toFixed(2)}</p>
                    <p><span className='font-semibold'>Approval Status:</span>{activeOrder.isApproved ? "Approved":"Pending"}</p>
                    <p><span className='font-semibold'>Order Date:</span>{new Date(activeOrder.orderDate).toLocaleDateString()}</p>
                </div>
              </div>
              {
                activeOrder.orderedItems.map((item)=>{
                  
                })
              }
          </div>
        )
      }
    </div>
  );
};

export default AdminBookingPage;
