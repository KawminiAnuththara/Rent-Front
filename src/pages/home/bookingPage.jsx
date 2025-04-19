import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/Cart";
import BookingItem from "../../components/BookingItem";
import Items from "./Items";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {
  const [cart, setCart] = useState(loadCart());

  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);

  const [total,setTotal] =useState(0);

  function reloadCart() {
    setCart(loadCart());
    calculateTotal();
  }

  function calculateTotal() {
    const cartInfo = loadCart();
    cartInfo.startingDate = startDate;
    cartInfo.endingDate = endDate;
    cartInfo.days = calculateDays();
  
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo)
      .then((res) => {
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error("Error calculating total:", err);
      });
  }
  
  useEffect(()=>{
    calculateTotal();
  },[startDate,endDate])

  function handleBookingCreation(){
    const cart = loadCart();
    cart.startingDate = startDate;
    cart.endingDate = endDate;
    cart.days = calculateDays();

    const token = localStorage.getItem("token");
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`,cart,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).then((res)=>{
        console.log(res.data);
        localStorage.removeItem("cart");
        toast.success("Booking Created");
        setCart(loadCart());
    }).catch((err)=>{
        console.error(err);
        toast.error("Failed to create booking");
    })
  }

  // Days difference calculator
  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.max((end - start) / (1000 * 60 * 60 * 24), 0);
    return Math.round(diff);
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-danger">Create Booking</h1>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8 w-full max-w-2xl">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            className="p-2 border border-accent rounded-md bg-white"
            value={startDate}
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            className="p-2 border border-accent rounded-md bg-white"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-gray-700 mb-1">Duration</span>
          <span className="text-base font-semibold text-danger">
            {calculateDays()} day{calculateDays() !== 1 && "s"}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-xl">
        {cart.orderedItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.orderedItems.map((item) => (
            <BookingItem
              itemKey={item.key}
              key={item.key}
              qty={item.qty}
              refresh={reloadCart}
            />
          ))
        )}
      </div>
      <div className="w-full flex justify-center mt-4">
        <p className="text-accent font-semibold">Total:{total.toFixed(2)}</p>
      </div>
      <div className="w-full flex justify-center mt-4">
        <button className="bg-accent text-white px-4 py-2 rounded-md" onClick={handleBookingCreation}>Create Booking</button>

      </div>
    </div>
  );
}
