import React, { useState } from 'react'
import mediaUpload from '../utils/MediaUpload';

const File = () => {

    const [file,setFile] = useState(null);

    function uploadFile(){
        console.log(file)
        mediaUpload(file).then((url)=>{
            console.log(url)
        })
    }

  return (
    <div className='w-full flex flex-col justify-center items-center h-screen'>
        <input type='file'  multiple onChange={(e)=>{setFile(e.target.files[0])}}/>
        <button onClick={uploadFile} className='w-[200px] h-[50px] bg-accent text-white py-2 rounded-lg hover:bg-danger transition-discrete'>
            Upload
        </button>
    </div>
  )
}

export default File
