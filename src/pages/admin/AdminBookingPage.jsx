import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const AdminBookingPage = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [modelOpened, setModelOpened] = useState(false);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  function handleOrderStatusChange(orderId, status) {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setModelOpened(false);
        setLoading(true); // Reload updated data
      })
      .catch((err) => {
        console.error(err);
        setModelOpened(false);
        setLoading(true);
      });
  }

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
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Approved</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((b, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setActiveOrder(b);
                    setModelOpened(true);
                  }}
                >
                  <td className="py-2 px-4 border-b">{b.orderId}</td>
                  <td className="py-2 px-4 border-b">{b.email}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(b.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(b.startingDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(b.endingDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{b.days}</td>
                  <td className="py-2 px-4 border-b">
                    {b.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        b.status === "Approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modelOpened && activeOrder && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000075] flex justify-center items-center">
          <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg relative">
            <IoMdCloseCircleOutline
              className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-600"
              onClick={() => setModelOpened(false)}
            />
            <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
            <div className="flex flex-col gap-2">
              <p>
                <span className="font-semibold">Order ID: </span>
                {activeOrder.orderId}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                {activeOrder.email}
              </p>
              <p>
                <span className="font-semibold">Days: </span>
                {activeOrder.days}
              </p>
              <p>
                <span className="font-semibold">Starting Date: </span>
                {new Date(activeOrder.startingDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Ending Date: </span>
                {new Date(activeOrder.endingDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Total Amount: </span>
                {activeOrder.totalAmount.toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Approval Status: </span>
                {activeOrder.status}
              </p>
              <p>
                <span className="font-semibold">Order Date: </span>
                {new Date(activeOrder.orderDate).toLocaleDateString()}
              </p>
            </div>

            <div className="w-full my-5 flex justify-between items-center gap-2">
              <button
                className="flex bg-green-500 text-white px-4 py-1 rounded-md"
                onClick={() =>
                  handleOrderStatusChange(activeOrder.orderId, "Approved")
                }
              >
                Approve
              </button>
              <button
                className="flex bg-red-500 text-white px-4 py-1 rounded-md"
                onClick={() =>
                  handleOrderStatusChange(activeOrder.orderId, "Rejected")
                }
              >
                Reject
              </button>
            </div>

            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {activeOrder.orderedItems.map((item) => (
                  <tr key={item.product.key}>
                    <td>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10"
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookingPage;
