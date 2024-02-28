import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { imagesContext } from '../context/FetchImages'
import axios from 'axios'

function DisplayImage() {
    const {imagename} = useParams()
    const {fetchImages} = useContext(imagesContext)
    const navigate = useNavigate()

    function deleteImage(image) {
        axios.delete(`http://localhost:3000/delete-image/${image}`)
          .then((response) => {
            console.log("image deleted sucessfully", response);
            fetchImages()
            navigate("/")
          })
          .catch((error) => {
            console.log(error);
          })
      }
    
  return (
    <div className='h-screen flex justify-center items-center relative'>
        <button onClick={() => deleteImage(imagename)} className='bg-red-500 text-white font-semibold cursor-pointer px-3 py-1 absolute top-10 right-52'>Delete image</button>
        <img src={`http://localhost:3000/public/storage/${imagename}`} alt="image" className='w-3/4 h-2/3'/>
    </div>
  )
}

export default DisplayImage