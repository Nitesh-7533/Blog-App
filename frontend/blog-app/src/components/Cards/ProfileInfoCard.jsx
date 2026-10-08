import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
 const { user, clearUser } = useContext(UserContext);
 const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.clear();
  clearUser();
  navigate("/");
 }

 // Cloudinary URL Transformation Helper (Auto-Face Crop)
 const getFaceCroppedUrl = (url) => {
  if (!url) return "";
  if (url.includes("cloudinary.com") && url.includes("/upload/")) {
   // Automatic Face Detection & Smart Crop apply karega
   return url.replace("/upload/", "/upload/c_thumb,g_face,w_200,h_200/");
  }
  return url;
 };

 const getInitials = (name) => {
  if (!name) return "U";
  const words = name.trim().split(" ");
  let initials = words[0][0];
  if (words.length > 1) {
   initials += words[1][0];
  }
  return initials.toUpperCase();
 };

 return user && (
  <div className='flex items-center gap-3'>
   {user.profileImageUrl ? (
    <img
     src={getFaceCroppedUrl(user.profileImageUrl)}
     alt={user.name || "Profile"}
     className='w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0'
    />
   ) : (
    <div className='w-13 h-13 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-base border border-sky-200 flex-shrink-0'>
     {getInitials(user.name)}
    </div>
   )}

   <div className='flex flex-col justify-center'>
    <div className='text-[17px] text-gray-900 font-bold leading-tight capitalize'>
     {user.name || ""}
    </div>
    <button
     type='button'
     className='text-sky-600 text-12px font-semibold cursor-pointer hover:underline text-left mt-0.5'
     onClick={handleLogout}
    >
     Logout
    </button>
   </div>
  </div>
 )
}

export default ProfileInfoCard