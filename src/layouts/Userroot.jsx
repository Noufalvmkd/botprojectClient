import React, { useEffect, useState } from 'react'
import Userheader from '../components/Userheader'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import UserLoggedHeader from '../components/user/UserLoggedHeader'
import axiosinstance from '../config/axiosinstance'
import { useDispatch, useSelector } from 'react-redux'
import { saveUser } from '../globalstate/features/UserSlice'

const Userroot = () => {
  const {isUserAuth , userData} = useSelector((state)=>state.user);
  const dispatch = useDispatch();

  console.log("dfsdf" , isUserAuth);
  console.log("dfsdf" , userData);
  

const checkUser = async () => {
    try {
      const response = await axiosinstance({
        method: "GET",
        url:"/user/check-user"
      });
      dispatch(saveUser(response?.data?.data))
    } catch (err) {
      console.error(err);
     
    }
  };
  
  useEffect(()=>{
    checkUser();
  },[])
  return (
    <div className="layout">
      {isUserAuth ? <UserLoggedHeader /> : <Userheader />}

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Userroot
