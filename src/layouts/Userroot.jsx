import React from 'react'
import Userheader from '../components/Userheader'
import { Outlet } from 'react-router-dom'

const Userroot = () => {
  return (
    <>
    <Userheader />
    <Outlet />
    </>
  )
}

export default Userroot