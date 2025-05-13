import React from 'react'
import banner from "/girll.jpg"
import { motion } from 'framer-motion'
import { FadeUp } from '../assets/utilities/animation'

const Banner = () => {
  return (
    <div className='bg-secondary'>
        <div className='grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0 py-14'>
        <div className='flex justify-center items-center'>
            <motion.img
            initial ={{opacity:0, scale:0.5}}
            whileInView={{opacity:1 , scale:1}}
            transition={{type:"spring", stiffness:100 ,delay:0.2}}
            viewport={{once:true}}
             src={banner}  alt='' className='w-[300px] md:max-w-[400px] h-full object-cover'/>
        </div>
        <div className='flex flex-col justify-center'>
            <div className='text-center md:text-left space-y-4 lg:max-w-[400px]'>
                   <motion.h1 
                   variants={FadeUp(0.5)}
                   initial="hidden"
                   whileInView="visible"
                   viewport={{once:true}}
                   className='text-3xl lg:text-6xl font-bold uppercase'>KV Audio</motion.h1>
                    <motion.p
                    variants={FadeUp(0.7)}
                   initial="hidden"
                   whileInView="visible"
                   viewport={{once:true}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Illum odit quo officiis. Quod odio nostrum maiores fugit 
                    voluptates dignissimos porro ratione accusamus et repellat dolor, 
                    quas recusandae veritatis distinctio laborum!
                    </motion.p>
                    <motion.p
                    variants={FadeUp(0.9)}
                   initial="hidden"
                   whileInView="visible"
                   viewport={{once:true}}
                    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos earum
                         dignissimos necessitatibus assumenda excepturi, esse odio repellat
                          consequatur error placeat.
                    </motion.p>
                    <motion.div 
                variants={FadeUp(1.1)}
                initial = "hidden"
                animate = "visible"
                className='flex justify-center md:justify-start  mt-[20px]'>
                    <button className='primary-btn'>Learn More</button>
                </motion.div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Banner