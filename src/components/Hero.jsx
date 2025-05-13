import React from 'react'
import pic from "/top.png"
import pic1 from "/musicc.png"
import {motion} from "framer-motion"
import { FadeRight } from '../assets/utilities/animation'

const Hero = () => {
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 md:p-16 min-h-[650px] relative'>
            <div className='flex flex-col justify-center py-14 md:py-0 relative  z-10 '>
                <div className='text-center md:text-left space-y-1 lg:max-w-[400px] '>
                <motion.h1 
                variants={FadeRight(0.6)}
                initial = "hidden"
                animate = "visible"
                className='text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-loose'>Quality <br/><span className='text-accent '>Sound</span> Items!!</motion.h1>
                <motion.p 
                variants={FadeRight(0.9)}
                initial = "hidden"
                animate = "visible"
                className='text-2xl tracking-wide  mt-[-10px]'>Rent now for flexible PRICE</motion.p>
                <motion.p 
                variants={FadeRight(1.2)}
                initial = "hidden"
                animate = "visible"
                className='text-gray-400'>
                    Quality and newly sound items for your wonderful occations.Rent now and get 20% discount on your first order.
                </motion.p>
                <motion.div 
                variants={FadeRight(1.5)}
                initial = "hidden"
                animate = "visible"
                className='flex justify-center md:justify-start  mt-[20px]'>
                    <button className='primary-btn'>Rent Now</button>
                </motion.div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <motion.img 
                initial={{opacity:0,x:200,rotate:75}}
                animate ={{opacity:1,x:0,rotate:0}}
                transition={{duration:1,delay:0.2}}
                src={pic} alt='' className='w-[350px] md:w-[550px] drop-shadow'/>
            </div>
            <div className='absolute top-14 md:top-20 right-1/3 md:blur-none blur-xs opacity-80 rotate-[40deg]'>
                <motion.img
                initial={{opacity:0,x:-200,rotate:75}}
                animate ={{opacity:1,x:0,rotate:0}}
                transition={{duration:1,delay:1.5}} 
                src={pic1} alt='' className='w-full md:max-w-[300px]' />
            </div>
        </div>
    </div>
  )
}

export default Hero