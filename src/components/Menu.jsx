import React from 'react'
import pic1 from "/3.webp"
import pic2 from "/4.png"
import pic3 from "/5.webp"
import pic4 from "/6.webp"

import { motion } from 'framer-motion'
import {FadeLeft} from "../assets/utilities/animation"

const MenuData = [
    {
        id:1,
        title :"Lights",
        link:"/gallery",
        img:pic1,
        price:"Rs 500-Up",
        delay :0.3
        
    },
    {
        id:2,
        title :"Speakers",
        link:"/gallery",
        img:pic2,
        price:"Rs 500-Up",
        delay:0.6
        
    },
    {
        id:3,
        title :"Lights",
        link:"/gallery",
        img:pic3,
        price:"Rs 500-Up",
        delay :0.9
        
    },
    {
        id:4,
        title :"Lights",
        link:"/gallery",
        img:pic4,
        price:"Rs 500-Up",
        delay :1.2
        
    }
]

const Menu = () => {
  return (
    <div>
        <motion.h1
        initial={{opacity :0, x:-200}}
        whileInView={{opacity:1,x:0}}
        transition={{duration:1 ,delay :0.3}}
         className='text-2xl font-bold text-left pb-10 uppercase'>
            Rent Item
        </motion.h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
            {
                MenuData.map((menu)=>(
                    <motion.div 
                    variants={FadeLeft(menu.delay)}
                    initial ="hidden"
                    whileInView={"visible"}
                    whileHover={{scale:1.1}}
                    className='bg-white rounded-3xl px-4 py-2 shadow-[0_0_22px_0_rgba(0,0,0,0.15)] flex flex-row justify-around items-center gap-3'>
                    <img 
                     src={menu.img}
                     alt=''
                     className='w-[60px] mb-4 scale-110 transform translate-y-2'
                    />
                    <div>
                        <h1 className='text-lg font-semibold'>{menu.title}</h1>
                        <p className='text-lg font-semibold text-danger'>{menu.price}</p>
                    </div>
                    </motion.div>
                ))
            }
        </div>
    </div>
  )
}

export default Menu