import { useContext, useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { Link } from 'react-router-dom'
import { imagesContext } from './context/FetchImages'

function App() {
  const [file, setFile] = useState(null)
  const { images, fetchImages } = useContext(imagesContext)

  useEffect(() => {
    fetchImages()
  }, [])

  function handleFileChange(e) {
    setFile(e.target.files[0])
    console.log(e.target.files[0]);
  }

  function uploadImage(e) {
    e.preventDefault()

    if (!file) {
      alert('Please select a file')
      return
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      alert('please select a image')
      setFile(null)
      document.getElementById('upload').value = ''
      return
    }
    const formData = new FormData()
    formData.append('image', file)

    axios.post('http://localhost:3000/upload-image', formData)
      .then((response) => {
        console.log("Image uploaded successfully", response);
        fetchImages()
      })
      .catch((error) => {
        console.log("Error uploading image", error);
      })
      .finally(() => {
        setFile(null)
        document.getElementById('upload').value = ''
      })
  }

  return (
    <div>

      <form onSubmit={uploadImage} className='flex justify-end items-center mb-5 mt-1'>
        <label htmlFor="upload">Upload Image: </label>
        <input type="file" name="image" id='upload' onChange={handleFileChange} />
        <input type="submit" value="submit" className='bg-green-600 text-white px-5 py-1 font-semibold mr-[20px] cursor-pointer' />
      </form>

      {images.length > 0 ?
        <div className='w-full flex flex-wrap gap-14 px-20'>
          {images.map((image, index) => <Link to={`displayimage/${image}`} key={index}><img src={`http://localhost:3000/public/storage/${image}`} className='w-72 h-40 hover:scale-110 cursor-pointer transition-transform duration-200' /></Link>)}
        </div>
        : <h1>No images are avaliable</h1>
      }

    </div>
  )
}

export default App
