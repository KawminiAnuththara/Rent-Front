import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaCartShopping } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

const MobileNavPanel = ({ isOpen, setOpen }) => {

  const navigate = useNavigate();

  function goTo(route){
    navigate(route);
    setOpen(false);
  }
  return (
    <>
      {isOpen && (
        <div className="w-full h-screen bg-[#00000070] fixed top-0 left-0 overflow-hidden z-50">
          {/* Side Panel */}
          <div className="h-full bg-white w-[300px] transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="bg-accent w-full relative h-[70px] flex justify-center items-center">
              <img
                src="/logo.png"
                alt="logo"
                className="w-[60px] h-[60px] object-cover border-[3px] absolute left-1 rounded-full"
              />
              <IoMdClose
                className="absolute right-3 text-3xl cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col mt-5 px-4 gap-4">
              <div onClick={()=>{goTo("/")}}  className="text-[20px] font-bold text-black">
                Home
              </div>
              <div onClick={()=>{goTo("/contact")}}  className="text-[20px] font-bold text-black">
                Contact
              </div>
              <div onClick={()=>{goTo("/gallery")}}  className="text-[20px] font-bold text-black">
                Gallery
              </div>
              <div onClick={()=>{goTo("/items")}}  className="text-[20px] font-bold text-black">
                Items
              </div>
              
              <div onClick={()=>{goTo("/booking")}}  className="flex items-center gap-2 text-[20px] font-bold text-black">
        
                Booking
              </div>
              <FaCartShopping  className='text-black'/>
            </div>
          
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavPanel;
