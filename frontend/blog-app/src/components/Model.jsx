import React from 'react'

const Model = ({ children, isOpen, onClose, hideHeader, title }) => {
 if (!isOpen) return null
 return (
  <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40 backdrop-blur-xs'>

   {/* Model Context */}
   <div className='relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden z-10'>
    {!hideHeader && (
     <div className='flex items-center justify-between p-4 border-b border-gray-300'>
      <h3 className='md:text-lg font-bold text-gray-900'>{title || ""}</h3>
     </div>
    )}
    <button
     type='button'
     className='text-gray-500 bg-transparent hover:bg-sky-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer z-20'
     onClick={onClose}
    >
     <svg
      className='w-3 h-3'
      aria-hidden="true"
      xmlns='http://www.w3.org/2000/svg'
      fill="none"
      viewBox='0 0 14 14'
     >
      {/* FIXED: className='currentColor' -> stroke="currentColor" */}
      <path
       stroke="currentColor"
       strokeLinecap='round'
       strokeLinejoin='round'
       strokeWidth="2"
       d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
     </svg>
    </button>

    {/* Model Body (Scrollable) */}
    <div className='flex-1 overflow-y-auto custom-scrollbar'>
     {children}
    </div>
   </div>
  </div>
 )
}

export default Model