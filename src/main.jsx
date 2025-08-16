import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import Home from './pages/user/Home.jsx'
import { store } from './globalstate/Store.js';
import { Provider } from 'react-redux'
import Userheader from './components/Userheader.jsx'




import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Userroot from './layouts/Userroot.jsx';
import AdminRoot from './layouts/AdminRoot.jsx';
import Register from './pages/shared/Register.jsx';
import Login from './pages/shared/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Userroot />,
    children : [
      {path: "",
    element: <Home />} ,
      {
    path: "/login",
    element: <Login />,
  },
    {
    path: "/register",
    element: <Register />,
  }
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
    <Provider store ={store}>
    <RouterProvider router={router} />
   
    </Provider>
  </StrictMode>,
)
