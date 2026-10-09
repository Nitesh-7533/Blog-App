import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { UserContext } from '../../../context/userContext'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPaths';
import moment from "moment"
import { LuChartLine, LuCheckCheck, LuGalleryHorizontalEnd, LuHeart } from 'react-icons/lu';
import DashboardSummaryCard from '../../../components/Cards/DashboardSummaryCard';


const Dashboard = ({ }) => {
 const { user } = useContext(UserContext);
 const navigate = useNavigate()

 const [dashboardData, setDashboardData] = useState(null)
 const [maxViews, setMaxViews] = useState(0);

 const getDashboardData = async () => {
  try {
   const response = await axiosInstance.get(
    API_PATHS.DASHBOARD.GET_DASHBOARD_DATA
   );
   if (response.data) {
    setDashboardData(response.data);

    const topPosts = response.data?.topPosts || [];
    const totalViews = Math.max(...topPosts.map((p) => p.views), 1);
    setMaxViews(totalViews);
   }
  } catch (error) {
   console.error("Error fetching users: ", error)
  }
 }

 useEffect(() => {
  getDashboardData();

  return () => { };
 }, []);

 return (
  <DashboardLayout activeMenu='Dashboard'>
   {dashboardData && (
    <>
     <div className='bg-sky-200/50 p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 mt-4'>
      <div>
       <div className='col-span-3'>
        <h2 className='text-xl md:text-xl font-medium text-black'>
         Good Morning {user.name}
        </h2>
        <p className='text-xs md:text-[13px] font-medium text-gray-600 mt-2'>
         {moment().format('dddd MMM YYYY')}
        </p>
       </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 mt-5 '>

       <DashboardSummaryCard
        icon={<LuGalleryHorizontalEnd />}
        label="Total Posts"
        value={dashboardData?.stats?.topPosts || 0}
        bgColor="bg-sky-100/50"
        color="text-sky-500"
       />

       <DashboardSummaryCard
        icon={<LuCheckCheck />}
        label="Published"
        value={dashboardData?.stats?.published || 0}
        bgColor="bg-sky-100/50"
        color="text-sky-500"
       />

       <DashboardSummaryCard
        icon={<LuChartLine />}
        label="Total Views"
        value={dashboardData?.stats?.totalViews || 0}
        bgColor="bg-sky-100/50"
        color="text-sky-500"
       />

       <DashboardSummaryCard
        icon={<LuHeart />}
        label="PTotal Likes"
        value={dashboardData?.stats?.totalLikes || 0}
        bgColor="bg-sky-100/50"
        color="text-sky-500"
       />

      </div>
     </div>
    </>
   )}
  </DashboardLayout>
 )
}

export default Dashboard