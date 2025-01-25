import { GoGraph } from "react-icons/go";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineAudiotrack } from "react-icons/md";
import { VscCodeReview } from "react-icons/vsc";
import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className='w-full h-screen flex'>
      <div className='w-[300px] h-full bg-green-300'>
         <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
           <GoGraph />
            Dashboard
         </button>
         <Link to="/admin/booking" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
         <FaRegBookmark />
            Bookings
         </Link>
         <Link to="/admin/items" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
         <MdOutlineAudiotrack />
            Items
         </Link>
         <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
         <FaRegUser/>
              Users
         </button>
      </div>
      <div className='w-[calc(100vw-300px)] bg-red-200'>
         <Routes path="/*">
           <Route path="/booking" element={<h1>Booking</h1>}/>
           <Route path="/items" element={<h1>Items</h1>}/>
         </Routes>
      </div>

    </div>
    )
}