import axios from "axios";
import React, { useState } from "react";


export const imagesContext = React.createContext(null)

export const ImagesProvider = ({ children }) => {
    const [images, setImages] = useState([])
    function fetchImages() {
        axios.get('http://localhost:3000/get-images')
            .then((response) => setImages(response.data.files))
            .catch((error) => console.log(error))
    }
    return (
        <imagesContext.Provider value={{ fetchImages, images }}>
            {children}
        </imagesContext.Provider>
    )
}
