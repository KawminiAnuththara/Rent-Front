import { GoGraph } from "react-icons/go";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineAudiotrack } from "react-icons/md";
import { VscCodeReview } from "react-icons/vsc";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemPage from "./AdminItemPage";
import AddItemsPage from "./AddItemPage";
import UpdateItemPage from "./UpdateItemPage";

export default function AdminPage(){
    return(
        <div className='w-full h-screen flex'>
      <div className='w-[250px] h-full bg-green-300'>
         <button className='w-full h-[40px] text-[20px] font-bold flex justify-center items-center'>
           <GoGraph />
            Dashboard
         </button>
         <Link to="/admin/booking" className='w-full h-[40px] text-[20px] font-bold flex justify-center items-center'>
         <FaRegBookmark />
            Bookings
         </Link>
         <Link to="/admin/items" className='w-full h-[40px] text-[20px] font-bold flex justify-center items-center'>
         <MdOutlineAudiotrack />
            Items
         </Link>
         <button className='w-full h-[40px] text-[20px] font-bold flex justify-center items-center'>
         <FaRegUser/>
              Users
         </button>
      </div>
      <div className='w-[calc(100vw-250px)] '>
         <Routes path="/*">
           <Route path="/booking" element={<h1>Booking</h1>}/>
           <Route path="/items" element={<AdminItemPage/>}/>
           <Route path="/item/add" element={<AddItemsPage/>}/>
           <Route path="/item/edit" element={<UpdateItemPage/>}/>
         </Routes>
      </div>

    </div>
    )
}