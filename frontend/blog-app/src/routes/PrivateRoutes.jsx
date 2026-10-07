import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const PrivateRoutes = ({ allowedRoute = [] }) => {
 const { user, loading } = useContext(UserContext);

 if (loading) {
  return <div>Loading...</div>;
 }

 if (!user) {
  return <Navigate to="/admin-login" replace />;
 }

 if (!allowedRoute.includes(user.role)) {
  return <Navigate to="/" replace />;
 }

 return <Outlet />;
};

export default PrivateRoutes;