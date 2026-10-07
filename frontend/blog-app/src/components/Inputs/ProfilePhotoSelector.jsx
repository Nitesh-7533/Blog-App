import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu"

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
 const inputRef = useRef(null);
 const [previewUrl, setPreviewUrl] = useState(null);

 // File Change Handler
 const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
   // Update image file state
   setImage(file);

   // Generate preview URL from file
   const url = URL.createObjectURL(file);
   setPreviewUrl(url);
   if (setPreview) {
    setPreview(url);
   }
  }
 };

 // Remove Image Handler (Moved outside handleImageChange)
 const handleRemoveImage = () => {
  setImage(null);
  setPreviewUrl(null);
  if (setPreview) {
   setPreview(null);
  }
 };

 const onChooseFile = () => {
  inputRef.current.click();
 };

 return (
  <div className='flex justify-center mb-6'>
   <input
    type='file'
    accept='image/*'
    ref={inputRef}
    onChange={handleImageChange}
    className='hidden'
   />

   {!image ? (
    <div
     className='w-20 h-20 flex items-center justify-center bg-sky-200 rounded-full relative cursor-pointer'
     onClick={onChooseFile}
    >
     <LuUser className='text-4xl text-sky-600' />

     <button
      type='button'
      className='w-8 h-8 flex items-center justify-center bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
      onClick={(e) => {
       e.stopPropagation();
       onChooseFile();
      }}
     >
      <LuUpload />
     </button>
    </div>
   ) : (
    <div className='relative'>
     <img
      src={preview || previewUrl}
      alt='profile photo'
      className='w-20 h-20 rounded-full object-cover'
     />
     <button
      type='button'
      className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
      onClick={handleRemoveImage}
     >
      <LuTrash />
     </button>
    </div>
   )}
  </div>
 )
}

export default ProfilePhotoSelector