import React from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'
import AUTH_IMg from "../../assets/AUTH_IMG.jpg"
import Input from '../Inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../Inputs/ProfilePhotoSelector'
import uploadimage from "../../utils/uploadimage"

const SignUp = ({ setCurrentPage }) => {
 const [profilePic, setProfilePic] = useState(null);
 const [fullname, setFullname] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [adminAccessToken, setAdminAccessToken] = useState("")
 const [error, setError] = useState(null);

 const { updateUser, setOpenAuthForm } = useContext(UserContext);
 const navigate = useNavigate();

 //Handle Singup form submit
 const handleSignUp = async (e) => {
  e.preventDefault();

  let profileImageUrl = "";

  if (!fullname) {
   setError("Please enter full name")
   return;
  }

  if (!validateEmail(email)) {
   setError("Please enter a valid email address");
   return;
  }

  if (!password) {
   setError("Please enter the password");
   return;
  }
  setError("");

  //Signup API call
  try {
   // Upload Image if present
   if (profilePic) {
    const imgUploadRes = await uploadimage(profilePic);
    profileImageUrl = imgUploadRes.imageUrl || "";
   }

   const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
    name: fullname,
    email,
    password,
    profileImageUrl,
    adminAccessToken,
   });

   // Extract token & role correctly (handling nested user object)
   const token = response.data?.token;
   const role = response.data?.role || response.data?.user?.role;

   if (token) {
    localStorage.setItem("token", token);
    updateUser(response.data);
    if (setOpenAuthForm) setOpenAuthForm(false);

    // If admin token/invite code was used and role is admin
    if (role === "admin") {
     navigate("/admin/dashboard");
    } else {
     navigate("/");
    }
   }
  } catch (error) {
   // Fixed typo from .date to .data
   if (error.response && error.response.data && error.response.data.message) {
    setError(error.response.data.message);
   } else {
    setError("Something went wrong. Please try again.");
   }
  }
 }
 return (
  <div className='flex items-center h-130px'>
   <div className='w-[90vw] md:w-[43vw] p-7 flex flex-col justify-center'>
    <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
    <p className='text-xs text-slate-900 mt-1.5 mb-6'>Join today by entering your details below</p>

    <form onSubmit={handleSignUp}>
     <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />


     <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <Input
       value={fullname}
       onChange={({ target }) => setFullname(target.value)}
       label="Full name"
       placeholder="Nitesh"
       text="text"
      />

      <Input
       value={email}
       onChange={({ target }) => setEmail(target.value)}
       label="Email Address"
       placeholder="example@gmail.com"
       text="text"
      />

      <Input
       value={password}
       onChange={({ target }) => setPassword(target.value)}
       label="Fpassword"
       placeholder="Min 8 Character"
       text="password"
      />

      <Input
       value={adminAccessToken}
       onChange={({ target }) => setAdminAccessToken(target.value)}
       label="Admin Invite Token"
       placeholder="6 Digit code"
       text="Number"
      />
     </div>
     {error && <p className='text-red-700 text-xs pb-2.5'>{error}</p>}
     <button type='submit' className='btn-primary'> SIGN UP</button>
     <p className='text-[16px] text-slate-800 mt-3'>Already an account? {""}
      <button
       className='font-medium text-primary text-sky-500 underline cursor-pointer' onCanPlay={() => {
        setCurrentPage("login")
       }}
      > Login</button>
     </p>
    </form>
   </div>
   <div className='hidden  md:block'>
    <img src={AUTH_IMg} alt='Login' className='h-130 w-[33vw]' />
   </div>
  </div>
 )
}

export default SignUp