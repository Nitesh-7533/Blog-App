import React from 'react'

const DashboardSummaryCard = ({ icon,
 label,
 value,
 bgColor,
 color }) => {
 return (
  <div className=''>
   <div className={`w-10 md:w-8 h-10 md:h-8 flex items-center justify-center ${color} ${bgColor} rounded-sm`}></div>
  </div>
 )
}

export default DashboardSummaryCard