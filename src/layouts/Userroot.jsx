import React from 'react'
import Userheader from '../components/Userheader'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Userroot = () => {
  return (
    <>
    <Userheader />
    <Outlet />
    <Footer />
    </>
  )
}

export default Userroot