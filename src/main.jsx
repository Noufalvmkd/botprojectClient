import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Userheader from './components/Userheader.jsx'




import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Userroot from './layouts/Userroot.jsx';
import AdminRoot from './layouts/AdminRoot.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Userroot />,
    children : [
      {path: "",
    element: <Home />} ,
  //     {
  //   path: "/produt-details/:id",
  //   element: <Details />,
  // }
    ]
  },
  {path: "/admin",
  element: <AdminRoot />,
  children : [
    // {path :"add-movie",
    //   element :<AddMovie />
    //   }
    ]
  
  },
  


]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
   
    
  </StrictMode>,
)
