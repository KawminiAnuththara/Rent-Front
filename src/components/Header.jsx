import React, { useState } from 'react';
import { FaBars, FaBurger, FaCartShopping, FaMicrophone, FaSoundcloud, FaSpeakap, FaSpeakerDeck, FaWaveSquare } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import MobileNavPanel from './MobileNavPanel';
import {motion} from "framer-motion"

export default function Header() {

  const [navPanelOpen,setNavPanelOpen] = useState(false);
  const token = localStorage.getItem("token")

  return (
    <motion.header 
    initial ={{opacity:0}}
    animate ={{opacity:1}}
    transition={{duration:0.5,delay :0.5}}
    className="w-full h-[70px] shadow-2xl flex justify-center items-center relative bg-black text-white">
      
      <div className='text-2xl flex items-center gap-2 font-bold uppercase absolute left-1 font-mono'>
        <p className='text-pink-700'>KV</p>
        <p className='text-accent'>Audio</p>
        <FaMicrophone className='text-yellow-300'/>
      </div>
      <div className='hidden w-[450px] md:flex justify-evenly items-center'>
      <Link to="/" className="hidden md:block  text-[22px] font-bold m-1">
        Home
      </Link>
      <Link to="/contact" className="hidden md:block  text-[22px] font-bold m-1">
        Contact
      </Link>
      <Link to="/gallery" className="hidden md:block  text-[22px] font-bold m-1">
        Gallery
      </Link>
      <Link to="/items" className="hidden md:block  text-[22px] font-bold m-1">
        Items
      </Link>
      <Link to="/error" className="text-[22px] font-bold m-1">
        
      </Link>
      <Link to="/booking" className='hidden md:block  text-[22px] font-bold m-1 absolute right-30'>
       <FaCartShopping/>
      </Link>
      </div>
      <FaBars className='absolute right-5 text-[24px] md:hidden' onClick={()=>{setNavPanelOpen(true)}}/>
        {token !=null && <button className='hidden md:block absolute right-5 text-[24px]' onClick={()=>{
          localStorage.removeItem("token")
          window.location.href = "/login"
        }}>Logout</button>}
      <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen}/>
    </motion.header>
  );
}
