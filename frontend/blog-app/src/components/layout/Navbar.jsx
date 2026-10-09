import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';

import LOGO from "../../assets/logo.png"

const Navbar = ({ activeMenu }) => {
 const [openSideMenu, setOpenSideMenu] = useState(false);
 return (
  <div className='flex gap-5 bg-white border border-b border-sky-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
   <button
    className='black lg:hidden text-black -mt-1'
    onClick={() => {
     setOpenSideMenu(!openSideMenu);
    }}
   >{openSideMenu ? (
    <HiOutlineX className="text-2xl" />
   ) : (
    <HiOutlineMenu className='text-2xl' />
   )}
   </button>

   <img src={LOGO} alt='logo' className='h-15 md:h-20' />

   {openSideMenu && (
    <div className='fixed top-15.25 -ml-4 bg-white'>
     <SideMenu activeMenu={activeMenu} setOpenSideMenu={setOpenSideMenu} />
    </div>
   )}
  </div>
 )
}

export default Navbar