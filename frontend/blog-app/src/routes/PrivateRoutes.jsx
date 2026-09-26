import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoutes = ({ allowedRoute }) => {
 return (
  <Outlet />
 )
}

export default PrivateRoutes