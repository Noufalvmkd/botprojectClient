import React from 'react'
import Userheader from '../components/Userheader'
import { Outlet } from 'react-router-dom'

const AdminRoot = () => {
  return (
    <>
    <Userheader />
    <Outlet />
    </>
  )
}

export default AdminRoot