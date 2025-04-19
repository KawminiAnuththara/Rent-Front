import React, { useState } from 'react'

const Contact = () => {

  const [count,setCount]=useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=>{
        const newCount=count+1;
        setCount(newCount);
      }}>
        Click
        </button>
    </div>
  )
}

export default Contact