import React from 'react'
import pic11 from "/3.webp"
import pic12 from "/4.png"
import pic13 from "/5.webp"
import pic14 from "/6.webp"

const MenuData = [
    {
        id:1,
        title :"Lights",
        link:"/gallery",
        img:pic1,
        
    },
    {
        id:2,
        title :"Speakers",
        link:"/gallery",
        img:pic2,
        
    },
    {
        id:3,
        title :"Lights",
        link:"/gallery",
        img:pic3,
        
    },
    {
        id:4,
        title :"Lights",
        link:"/gallery",
        img:pic4,
        
    }
]

const Menu = () => {
  return (
    <div>
        <h1 className='text-2xl font-bold text-left pb-10 uppercase'>
            Rent Item
        </h1>
        <div>
            {
                MenuData.map((menu)=>(
                    <div>
                    <img 
                     src={menu.img}
                     alt=''
                     className='w-[60px] mb-4 scale-125 transform-translate-y-6'
                    />
                    <div>
                        <h1>{menu.title}</h1>
                        <p>{menu.price}</p>
                    </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Menu