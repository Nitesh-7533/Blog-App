import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { BLOG_NAVBAR_DATA } from "../../../utils/data"

import Logo from '../../../assets/logo.png'
import SideMenu from '../SideMenu';

const BlogNavbar = ({ activeMenu }) => {
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
        className='h-10 md:h-20 w-auto object-contain cursor-pointer'
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

      <button
       className='flex items-center justify-center gap-3 bg-linear-to-r from-sky-800 to-cyan-300 text-xs md:text-sm font-semibold text-white px-6 md:px-7 py-2 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-cyan-200  '
       onClick={() => setOpenAuthForm(true)}
      >
       Login/SignUp
      </button>
     </div>

     {openSideMenu && (
      <div className='fixed top-15 -ml-4 bg-white'>
       <SideMenu activeMenu={activeMenu} isBlogMenu />
      </div>
     )}

    </div>
   </div>
  </>
 )
}

export default BlogNavbar