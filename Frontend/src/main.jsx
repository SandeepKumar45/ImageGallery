import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DisplayImage from './components/DisplayImage.jsx';
import { ImagesProvider } from './context/FetchImages.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/displayimage/:imagename',
    element: <DisplayImage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ImagesProvider>
      <RouterProvider router={router} />
    </ImagesProvider>
  </React.StrictMode>,
)
