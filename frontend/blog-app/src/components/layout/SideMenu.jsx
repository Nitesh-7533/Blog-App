import React, { useContext } from 'react'
import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from '../../utils/data'
import { LuLogOut } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'
import { UserContext } from '../../context/userContext'

const SideMenu = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
 const { user, setUser } = useContext(UserContext);
 const navigate = useNavigate();

 const handleclick = (route) => {
  if (route === "logout") {
   handelLogout();
   return;
  }

  setOpenSideMenu((prevState) => !prevState);
  navigate(route);
 };

 const handelLogout = () => {
  localStorage.clear();
  setUser(null);
  setOpenSideMenu((prevState) => !prevState);
  navigate("/")
 }
 return (
  <div className='w-64 h-[calc(100vh-61px)] bg-gradient-to-b from-white via-sky-50/30 to-sky-100/20 border-r border-slate-100 p-5 sticky top-15 z-20'>
   {user && (
    <div className='flex flex-col items-center justify-center gap-1 my-3 mb-7'>
     {user?.profileImageUrl ? (
      <img
       src={user?.profileImageUrl || ""}
       alt='Profile Image'
       className='w-20 h-20 bg-slate-100 rounded-full border border-sky-100 object-cover'
      ></img>
     ) : (
      <CharAvatar
       fullName={user?.name || ''}
       width="w-20"
       height="h-20"
       style='text-xl'
      />
     )}

     <div>
      <h5 className='text-slate-800 font-semibold text-center leading-6 mt-1'>
       {user.name || ""}
      </h5>

      <p className='text-[13px] font-medium text-slate-500 text-center'>
       {user?.email || ""}
      </p>
     </div>
    </div>
   )}

   {(isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA).map((item, index) => (
    <button
     key={`menu_${index}`}
     className={`w-full flex items-center gap-4 text-[15px] font-medium ${activeMenu == item.label
      ? "text-sky-600 bg-sky-50/80 border border-sky-200/60"
      : "text-slate-600 hover:text-sky-600 hover:bg-slate-50"
      } px-4 py-3 rounded-xl mb-2 cursor-pointer transition-colors duration-150`}
     onClick={() => handleclick(item.path)}
    >
     <item.icon className='text-xl' />
     {item.label}
    </button>
   ))}

   {user && (
    <button
     className={`w-full flex items-center gap-4 text-[15px] font-medium text-slate-600 hover:text-red-500 hover:bg-red-50/60 py-3 px-4 rounded-xl mt-4 cursor-pointer transition-colors duration-150`}
     onClick={() => handelLogout()}
    >
     <LuLogOut className='text-xl' />
     Logout
    </button>
   )}

  </div>
 )
}

export default SideMenu