import React from 'react'
import Userheader from '../components/Userheader'
import { Outlet } from 'react-router-dom'
import AdminPage from '../pages/admin/AdminPage'
import AdminHeader from '../components/admin/AdminHeader'
import Footer from '../components/Footer'

const AdminRoot = () => {
   const isUserAuth = true;
  return (
    <>
   <div className="layout">
      {isUserAuth ? <AdminHeader /> : <Userheader />}

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default AdminRoot