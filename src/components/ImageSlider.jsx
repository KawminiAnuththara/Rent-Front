import React, { useState } from 'react'

const ImageSlider = (props) => {
    const image = props.images;
    console.log(image);

    const [selectedImage,setSelectedImage] = useState(image[0]);
  return (
    <div className='w-full h-full flex flex-col items-center'>
        <img src={selectedImage} alt='product' className='w-full h-[300px] md:h-[500px] object-cover'/>
        <div className=' mt-[20px] w-full h-[150px] flex justify-center'>
           {
            image.map((image,index)=>{
                return <img key={index} src={image} alt='product' className={`w-[100px] h-[100px] mr-[3px] object-cover cursor-pointer ${image == selectedImage && "border border-accent"}`} onClick={
                    ()=>{
                        setSelectedImage(image);
                    }
                } />
            })
           }
        </div>
    </div>
  )
}

export default ImageSlider