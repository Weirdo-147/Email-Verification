import React from 'react'
import { useState } from 'react';
import Visible from './img/Icons/visible.png'
import Invisible from './img/Icons/invisible.png'
import Lock from './img/Icons/lock-50.png'
import Email from './img/Icons/email.png'
import User from './img/Icons/user.png'
import addImage from './img/Icons/add-image.png'
import { Link } from 'react-router-dom';
import ax from 'axios';
import vividGif from './img/vivid.gif';
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth,storage,db} from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
//import UserDetails from './UserDetails';
import Cookies from 'js-cookie';
import API_URL from '../config';

const Signup = () => {
  const [showPassword1, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [message, setMessage] = useState('');
  const [err, setErr] = useState(false);
  const navigate = new useNavigate();


  const getCSRFToken = () => {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const file = e.target[4].files[0];

    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill out all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('cpassword', confirmPassword);
    formData.append('img', file);

    try{
      setErr(false);
      const response= await ax.post(`${API_URL}/registration/`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data' ,
        'X-CSRFToken': getCSRFToken(),
      },
    });

    if(response.status === 200 || response.status === 201){
      console.log('User Created Successfully');
      Cookies.set('token', response.data.token);
      console.log(response.data.token)
      navigate('/check-email', { state: { email: email } });
    }
    else{
      console.log('User not created');
      setErr(true);
    }
  }catch(err){
    setErr(true);
    console.error('There was an error!', err);
    if (err.response.status === 426) {
      setMessage('An account with this email already exists.');
    }
    else if (err.response.status === 424) {
      setMessage('Passwords do not match.');
    }
    else{
      setMessage('An error occurred. Please try again later.');
    }
  }
};

  
  return (
    <div>
      <div className='bg-[#E4C5FB] bg-signupbg relative flex items-center justify-center space-x-16 ' style={{ height: "100vh",backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
        <div className='bg-[#4cb69b] bg-opacity-50 w-60 rounded-lg mb-20' style={{ height: "75vh" }}>
          <div className="description px-4 py-2 font-bold">
            <span>Welcome to</span>
            <p className="text-2xl text text-pink-500 pl-4 font-bold font-custom1"> Quantum Auth</p>
            <div className="w-36 h-36 mb-2 ml-4 overflow-hidden rounded-lg">
              <img src={vividGif} alt="Vivid animation" className="w-full h-full object-cover"/>
            </div>
            <p className=' font-mono text-base text-center text-orange-500'>
            Your one-stop platform for efficient collaboration and communication. We provide a unified space for idea sharing, task management, and staying connected. 
            </p>
            <p className=' mt-1 font-serif text-sm text-center'>
            Join us and experience productivity at its best.
            </p>
          </div>
        </div>
        <div className='bg-[#4cb69b]  bg-opacity-50 w-72 rounded-2xl mt-16 flex flex-col justify-center' style={{ height: "74vh" }}>
          <div className='bg-[#b4e7da] bg-opacity-50 w-full rounded-2xl mt-auto' style={{ height: "66vh" }}>
            <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
              <h1 className='text-3xl font-bold mt-4'>Sign Up</h1>
              <div className='flex flex-col justify-center items-center mt-6'>
                <div className='relative'>
                  <input className='w-60 h-8 rounded-lg mb-4 pl-8' placeholder='Username'></input>
                  <img alt="" src={User} className='absolute left-2 top-2 h-4 w-4'/>
                </div>
                
                <div className='relative'>
                  <input className='w-60 h-8 rounded-lg mb-4 pl-8' placeholder='Email'></input>
                  <img alt="" src={Email} className='absolute left-2 top-2 h-4 w-4'/>
                </div>
                
                <div className='relative'>
                  <input className='w-60 h-8 rounded-lg mb-4 pl-8' placeholder='Password' type={showPassword1 ? 'text' : 'password'}></input>
                  <img
                    src={showPassword1 ? Invisible : Visible}
                    alt=''
                    className='absolute right-2 top-2 h-4 w-4 cursor-pointer'
                    onClick={togglePasswordVisibility1}
                  />
                  <img alt="" src={Lock} className='absolute left-2 top-2 h-4 w-4'/>
                </div>
                <div className='relative'>
                  <input className='w-60 h-8 rounded-lg mb-4 pl-8' placeholder='Confirm Password' type={showPassword2 ? 'text' : 'password'}></input>
                  <img
                    src={showPassword2 ? Invisible : Visible}
                    alt=''
                    className='absolute right-2 top-2 h-4 w-4 cursor-pointer'
                    onClick={togglePasswordVisibility2}
                  />
                  <img alt="" src={Lock} className='absolute left-2 top-2 h-4 w-4'/>
                </div>
                <div className='mb-4'>
                  <label htmlFor='fileUpload' className='cursor-pointer'>
                    <img src={addImage} alt='Upload Icon' className='inline-block mr-2 h6 w-6'/>
                  </label>
                  <span className='text-sm text-gray-700'>Upload Profile Picture</span>
                  <input
                    id='fileUpload'
                    type='file'
                    src=''
                    alt=''
                    className='hidden'
                    accept='image/*'
                  />
                </div>
                <button className='w-60 h-10 rounded-lg mb-2 bg-[#4cb69b] text-white'  onSubmit={handleSubmit}>Sign Up</button>
                {err && <span className='text-red-500 break-words ml-6 mr-6 text-center'>{message}</span>}
              </div>
              <div className='text-sm text-gray-500 mt-2'>
                Already registered? <Link to='/Login' className='text-blue-600 underline  '>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup