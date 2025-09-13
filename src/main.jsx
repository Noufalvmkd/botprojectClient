import { Profiler, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
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
import ErrorPage from './pages/shared/ErrorPage.jsx';
import AdminPage from './pages/admin/AdminPage.jsx';
import Products from './pages/user/Products.jsx';
import ProductDetails from './pages/user/ProductDetails.jsx';
import Profile from './pages/user/Profile.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import ProtectedRouterAdmin from './routes/ProtectedRouterAdmin.jsx';
import AddProduct from './pages/admin/AdminProducts.jsx';
import Cart from './pages/user/Cart.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Userroot />,
    errorElement: <ErrorPage />,
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
  ,
   {
    path: "/products",
    element: <Products />,
  }
  ,
   {
    path: "/productDetails/:productId",
    element: <ProductDetails />,
  },
  {
    element: <ProtectedRoute />,
    path: "user",
    children : [
            {
              path:"wishlist",
              element:""
            },
            {
              path: "profile",
              element: <Profile />
            },
            {path: "cart",
              element:<Cart />
            }
    ]
  }
  
    ]
  },
  {path: "admin",
  element: <AdminRoot />,
  errorElement: <ErrorPage role={"admin"} />,
  children : [
    {path :"login",
      element :<Login role="admin" />
      },
       {
        element: <ProtectedRouterAdmin />,
        children:[
          {
            path:"dashboard",
            element: <AdminPage />
          },
          {
            path:"profile",
            element: <h1>admin profile page</h1>
          },
          {
            path: "admin-about",
            element:<h1>admin about page</h1>
          },
          {
            path: "all-products",
          },
          {
            path: "manage-product",
            element: <AdminProducts />
          }
        ] 
      }
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
