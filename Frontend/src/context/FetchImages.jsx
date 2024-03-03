import axios from "axios";
import React, { useEffect, useState } from "react";


export const imagesContext = React.createContext(null)

export const ImagesProvider = ({ children }) => {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    function fetchImages() {
        axios.get('https://clumsy-erin-crocodile.cyclic.app/get-images')
            .then((response) => (
                setImages(response.data)))
            .catch((error) => console.log(error))
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchImages()
    },[])
    return (
        <imagesContext.Provider value={{ fetchImages, images, loading, setLoading }}>
            {children}
        </imagesContext.Provider>
    )
}
