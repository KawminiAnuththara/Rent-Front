import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'

const Items = () => {
  const [state,setState] = useState("loading") //loading,success,error
  const [items,setItems]=useState([])

  useEffect(()=>{
    if(state == "loading"){
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`).then((res)=>{
        console.log(res.data)
        setItems(res.data)
        setState("success")
      }).catch((err)=>{
        toast.error(err?.response?.data?.error || "An error occured")
        setState("error")
      })
    }
  },[])
  return (
    <div className='w-full min-h-screen bg-amber-50 px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
  {
    state === "loading" ? (
      <div className='col-span-full flex justify-center items-center'>
        <div className='w-[50px] h-[50px] border-4 border-t-green-500 border-gray-300 rounded-full animate-spin'></div>
      </div>
    ) : state === "success" ? (
      items.map((item) => (
        <ProductCard key={item.key} item={item} />
      ))
    ) : null
  }
</div>

  )
}

export default Items