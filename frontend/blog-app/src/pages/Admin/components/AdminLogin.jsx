import React, { useState } from 'react'
import LOGO from "../../../assets/logo.png"
import Login from '../../../components/Auth/Login'
import SignUp from '../../../components/Auth/SignUp'

const AdminLogin = () => {
 const [currentPage, setCurrentPage] = useState("login")

 return (
  <div className='min-h-screen flex flex-col bg-slate-50'>
   {/* Header */}
   <div className='bg-[#384959]/15 border-b border-[#384959]/30 backdrop-blur-md sticky top-0 z-30 py-3'>
    <div className='container mx-auto px-4'>
     <img src={LOGO} alt='logo' className='h-8 md:h-20 pl-8' />
    </div>
   </div>

   {/* Main Container - Centered */}
   <div className='flex-1 flex items-center justify-center p-4 w-full'>
    <div className='bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/60 w-full max-w-4xl'>
     {currentPage === "login" ? (
      <Login setCurrentPage={setCurrentPage} />
     ) : (
      <SignUp setCurrentPage={setCurrentPage} />
     )}
    </div>
   </div>
  </div>
 )
}

export default AdminLogin