import { useContext, useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { Link } from 'react-router-dom'
import { imagesContext } from './context/FetchImages'

function App() {
  const [file, setFile] = useState(null)
  const [buttonLoading, setButtonLoading] = useState(false)
  const { images, fetchImages } = useContext(imagesContext)

  useEffect(() => {
    fetchImages()
  }, [])

  function handleFileChange(e) {
    setFile(e.target.files[0])
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
    setButtonLoading(true)
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
        setButtonLoading(false)
      })
  }

  return (
    <div>

      <form onSubmit={uploadImage} className='flex justify-end items-center mb-5 mt-1'>
        <label htmlFor="upload">Upload Image: </label>
        <input type="file" name="image" id='upload' onChange={handleFileChange} />
        <button type="submit" className='bg-green-600 text-white w-20 h-8 font-semibold mr-[20px] cursor-pointer flex justify-center items-center'>
          {!buttonLoading ? 'submit' :

            <div role="status">
              <svg aria-hidden="true" className="w-5 h-5 text-green-600 animate-spin dark:text-gray-500 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>

          }
        </button>
      </form>

      {images.length > 0 ?
        <div className='w-full flex flex-wrap justify-center md:justify-start gap-14 px-20'>
          {images.map((image, index) => <Link to={`displayimage/${index}`} key={index}><img src={image.secure_url} className='w-72 h-40 hover:scale-110 cursor-pointer transition-transform duration-200' /></Link>)}
        </div>
        : <h1>No images are avaliable</h1>
      }

    </div>
  )
}

export default App
