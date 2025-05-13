import { GoGraph } from "react-icons/go";
import { FaQuestionCircle, FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineAudiotrack } from "react-icons/md";
import { VscCodeReview } from "react-icons/vsc";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemPage from "./AdminItemPage";
import AddItemsPage from "./AddItemPage";
import UpdateItemPage from "./UpdateItemPage";
import AdminUsersPage from "./AdminUsersPage";
import AdminBookingPage from "./AdminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaStarHalf, FaStarHalfStroke, FaStarOfDavid } from "react-icons/fa6";
import AdminReviewPage from "./AdminReviewPage";
import AdminInquiryPage from "./AdminInquiryPage";

export default function AdminPage(){
   const[userValidated, setUserValidated] = useState(false);

   useEffect(()=>{
      const token = localStorage.getItem("token");
      if(!token){
         window.location.href = "/login";
      }
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{
         headers:{
            Authorization : `Bearer ${token}`
         }
      }).then((res)=>{
         console.log(res.data);
         const user = res.data;
         if(user.role == "admin"){
            setUserValidated(true);
         }
         else{
            window.location.href = "/";
         }
      }).catch((err)=>{
         console.error(err);
         setUserValidated(false);
      })
   },[])

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
         <Link to="/admin/users" className='w-full h-[40px] text-[20px] font-bold flex justify-center items-center'>
         <FaRegUser/>
              Users
         </Link>
         <Link to="/admin/review" className='w-full h-[40px] text-[20px] font-bold flex justify-center items-center'>
         <FaStarHalfStroke/>
              Reviews
         </Link>
         <Link to="/admin/inquiries" className='w-full h-[40px] text-[20px] font-bold flex justify-center items-center'>
         <FaQuestionCircle/>
              Inquiries
         </Link>
      </div>
      <div className='w-[calc(100vw-250px)] '>
         {userValidated &&<Routes path="/*">
           <Route path="/booking" element={<AdminBookingPage/>}/>
           <Route path="/users" element={<AdminUsersPage/>}/>
           <Route path="/items" element={<AdminItemPage/>}/>
           <Route path="/item/add" element={<AddItemsPage/>}/>
           <Route path="/item/edit" element={<UpdateItemPage/>}/>
           <Route path="/review" element={<AdminReviewPage/>}/>
           <Route path="/inquiries" element={<AdminInquiryPage/>}/>
         </Routes>}
      </div>

    </div>
    )
}