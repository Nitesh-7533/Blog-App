import React from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'
import AUTH_IMg from "../../assets/AUTH_IMG.jpg"
import Input from '../Inputs/Input'
import { validateEmail } from '../../utils/helper'

const Login = ({ setCurrentPage }) => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("")
 const [error, setError] = useState(null);

 const { updateUser, setOpenAuthForm } = useContext(UserContext);
 const navigate = useNavigate();

 //Handle Login Form Submit
 const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
   setError("Please enter a valid email address");
   return;
  }

  if (!password) {
   setError("Please enter a valid password");
   return;
  }

  setError("");

  try {
   const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
    email,
    password,
   })

   const { token, role } = response.data;

   if (token) {
    localStorage.setItem("token", token);
    updateUser(response.data)

    //Redirect based on role
    if (role === "admin") {
     setOpenAuthForm(false)
     navigate("/admin/dashboard");
    }
    setOpenAuthForm(false)
   }
  } catch (error) {
   if (error.response && error.response.date, message) {
    setError(error.response.date.message);
   } else {
    setError("Something went wrong.Please try again.");
   }
  }
 };
 return (
  <div className='flex items-center'>
   <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
    <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
    <p className='text-xs text-slate-900 mt-[2px] mb-6'>
     Please Enter Your Details to login
    </p>
    <form onSubmit={handleLogin}>

     <Input
      value={email}
      onChange={({ target }) => setEmail(target.value)}
      label="Email Address"
      placeholder="example@gmail.com"
      type='text'
     />

     <Input
      value={password}
      onChange={({ target }) => setPassword(target.value)}
      label="Password"
      placeholder="Min 8 charactert an one special char"
      type="password"
     />

     {error && <p className='text-red-600 text-xs pb-3'>{error}</p>}

     <button type='submit' className='btn-primary'>
      LOGIN
     </button>

     <p className='text-[13px] text-slate-900 mt-3'>
      Don't have an account? {""}
      <button
       className='font-medium text-primary text-sky-500 underline cursor-pointer'
       onClick={() => {
        setCurrentPage("signup");
       }}
      >
       SingUp
      </button>
     </p>
    </form>
   </div>
   <div className='hidden md:block'>
    <img src={AUTH_IMg} alt='Login' className='h-100' />
   </div>
  </div>
 )
}

export default Login