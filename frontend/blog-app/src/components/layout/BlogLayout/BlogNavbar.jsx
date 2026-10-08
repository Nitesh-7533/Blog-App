import React, { useContext, useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { BLOG_NAVBAR_DATA } from "../../../utils/data"

import Logo from '../../../assets/logo.png'
import SideMenu from '../SideMenu';
import { UserContext } from '../../../context/userContext';
import ProfileInfoCard from '../../Cards/ProfileInfoCard';
import Login from '../../Auth/Login';
import SignUp from '../../Auth/SignUp';
import Model from '../../Model';

const BlogNavbar = ({ activeMenu }) => {
 const { user, setOpenAuthForm } = useContext(UserContext);
 const [openSideMenu, setOpenSideMenu] = useState(false)
 const [openSearchBar, setOpenSearchBar] = useState(false)

 return (
  <>


   <div className='bg-[#384959]/15 border-b border-[#384959]/30 backdrop-blur-md sticky top-0 z-30 py-3'>
    <div className='container mx-auto px-4 sm:px-6 flex items-center justify-between gap-5'>
     <div className='flex items-center gap-5'>

      <button
       type="button"
       className="block md:hidden text-black -mt-1 cursor-pointer"
       onClick={() => {
        setOpenSideMenu(!openSideMenu)
       }}
      >
       {openSideMenu ? (
        <HiOutlineX className="text-2xl" />
       ) : (
        <HiOutlineMenu className="text-2xl" />
       )}
      </button>

      <Link to='/'>
       <img
        src={Logo}
        alt='logo'
        className='h-8 md:h-20 pl-8 w-auto object-contain cursor-pointer'
       />
      </Link>
     </div>

     <nav className='hidden md:flex items-center gap-10'>
      {BLOG_NAVBAR_DATA.map((item, index) => {
       if (item?.onlySideMenu) return;

       return (
        <Link key={item.id} to={item.path}>
         <li className='text-[15px] text-black font-medium list-none relative group cursor-pointer'>
          {item.label}
          <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-sky-500 transition-all duration-300 origin-left ${index == 0 ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100`}></span>
         </li>
        </Link>
       )
      })}
     </nav>

     <div className='flex items-center gap-6'>
      <button
       className='hover:text-sky-500 cursor-pointer'
       onClick={() => setOpenSearchBar(true)}
      >
       <LuSearch className='text-[22px]' />
      </button>

      {!user ? <button
       className='flex items-center justify-center gap-3 bg-linear-to-r from-sky-800 to-cyan-300 text-xs md:text-sm font-semibold text-white px-6 md:px-7 py-2 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-cyan-200  '
       onClick={() => setOpenAuthForm(true)}
      >
       Login/SignUp
      </button> : <div className='hidden md:block'>
       <ProfileInfoCard />
      </div>}
     </div>

     {openSideMenu && (
      <div className='fixed top-15 -ml-4 bg-white'>
       <SideMenu activeMenu={activeMenu} isBlogMenu
        setOpenSideMenu={setOpenSideMenu}
       />
      </div>
     )}

    </div>
   </div>



   <AuthModel />
  </>
 )
}

export default BlogNavbar


const AuthModel = () => {
 const { openAuthForm, setOpenAuthForm } = useContext(UserContext);
 const [currentPage, setCurrentPage] = useState("login");

 return (
  <>
   <Model
    isOpen={openAuthForm}
    onClose={() => {
     setOpenAuthForm(false);
     setCurrentPage("login");
    }}
    hideHeader
   >
    <div className=''>
     {currentPage === "login" && (
      <Login setCurrentPage={setCurrentPage} />
     )}

     {currentPage === "signup" && (
      <SignUp setCurrentPage={setCurrentPage} />
     )}
    </div>
   </Model>
  </>
 )
}

