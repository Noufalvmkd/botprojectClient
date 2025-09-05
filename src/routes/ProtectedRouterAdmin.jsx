import React from 'react'
import { Outlet ,useNavigate } from 'react-router-dom'

const ProtectedRouterAdmin = () => {

  const isAdminAUTH = true;

  const navigate =useNavigate();

  if(!isAdminAUTH){
    navigate("/login")
    return;
  }
  return <Outlet />
}

export default ProtectedRouterAdmin