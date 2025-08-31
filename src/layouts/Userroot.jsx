import React, { useEffect, useState } from 'react';
import Userheader from '../components/Userheader';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import UserLoggedHeader from '../components/user/UserLoggedHeader';
import axiosinstance from '../config/axiosinstance';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, clearUser } from '../globalstate/features/UserSlice';
import { Spinner } from 'react-bootstrap';

const Userroot = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [checkingUser, setCheckingUser] = useState(true); // loading state

  const checkUser = async () => {
    try {
      const response = await axiosinstance.get('/user/check-user', {
        withCredentials: true,
      });

      // Save user data to Redux
      dispatch(saveUser(response.data.data));
    } catch (err) {
      console.error('user not authorized', err);

      // Clear Redux user data
      dispatch(clearUser());

      // Only redirect if user is trying to access protected route
      if (location.pathname.startsWith('/user')) {
        navigate('/login');
      }
    } finally {
      setCheckingUser(false); // stop loading
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  // Show a loading spinner while checking auth
  if (checkingUser) {
    return (
      <div
        style={{ minHeight: '100vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="layout">
      {isUserAuth ? <UserLoggedHeader /> : <Userheader />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Userroot;







// import React, { useEffect, useState } from 'react'
// import Userheader from '../components/Userheader'
// import { Outlet, useLocation } from 'react-router-dom'
// import Footer from '../components/Footer'
// import UserLoggedHeader from '../components/user/UserLoggedHeader'
// import axiosinstance from '../config/axiosinstance'
// import { useDispatch, useSelector } from 'react-redux'
// import { saveUser } from '../globalstate/features/UserSlice'

// const Userroot = () => {
//   const {isUserAuth , userData} = useSelector((state)=>state.user);
  
//   const dispatch = useDispatch();
//   const location = useLocation()

  
  

// const checkUser = async () => {
  
//     try {
//       const response = await axiosinstance({
//         method: "GET",
//         url:"/user/check-user",
//         withCredentials:true,
//       });
//       dispatch(saveUser(response?.data?.data))
//     } catch (err) {
//       console.error("user not authorized" ,err);
     
//     }
//   };
//   console.log("path" , location.pathname )

//   useEffect(()=>{
//     checkUser();
//   },[location.pathname])
//   return (
//     <div className="layout">
//       {isUserAuth ? <UserLoggedHeader /> : <Userheader />}

//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   )
// }

// export default Userroot
