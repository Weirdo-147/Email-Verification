import React, { useState } from 'react';
import axios from 'axios';
import Visible from './img/Icons/visible.png';
import Invisible from './img/Icons/invisible.png';
import Lock from './img/Icons/lock-50.png';
import Email from './img/Icons/email.png';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import API_URL from '../config';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    email.trim();
    password.trim();
    try {
      const response = await axios.post(`${API_URL}/registration/login/`, {
        email,
        password
      });

      if (response.data.success) {
        // Login successful
        localStorage.setItem('token', response.data.token); // Store the token
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store the user details
        console.log(response.data.user.username+' logged in');
        console.log(response.status);
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
        setError(err.response.data.message);
      }
  };

  return (
    <div>
      <div className='bg-[#E4C5FB] bg-loginbg relative flex items-center justify-center space-x-16' style={{ height: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
        <div className='bg-[#4cb69b] bg-opacity-50 w-72 rounded-2xl mt-16 flex flex-col justify-center' style={{ height: "57vh" }}>
          <div className='bg-[#8ec0ce] bg-opacity-50 w-full rounded-2xl mt-auto' style={{ height: "57vh" }}>
            <div className='flex flex-col justify-center items-center'>
              <form onSubmit={handleSubmit}>
                <div className="description px-4 py-2 font-bold">
                  <span>Welcome back, to</span>
                  <p className="text-4xl text text-pink-500 pl-8 font-custom1"> Quantum Auth</p>
                </div>
                <h1 className='text-3xl font-bold mt-2'>Login</h1>
                <div className='flex flex-col justify-center items-center mt-6'>
                  <div className='relative'>
                    <input 
                      className='w-60 h-8 rounded-lg mb-4 pl-8' 
                      placeholder='Email' 
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <img src={Email} className='absolute left-2 top-2 h-4 w-4' alt="Email icon"/>
                  </div>
                  <div className='relative'>
                    <input 
                      className='password w-60 h-8 rounded-lg mb-2 pl-8' 
                      placeholder='Password' 
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <img
                      src={showPassword ? Invisible : Visible}
                      alt='Toggle password visibility'
                      className='absolute right-2 top-2 h-4 w-4 cursor-pointer'
                      onClick={togglePasswordVisibility}
                    />
                    <img src={Lock} className='absolute left-2 top-2 h-4 w-4' alt="Lock icon"/>
                  </div>
                  <div className='text-base text-gray-800 mb-2 text-left'>
                    <Link to='/password-reset-request' className='text-orange-300'>Forgot Password?</Link>
                  </div>
                  <button className='w-60 h-10 rounded-lg mb-2 bg-[#4cb69b] text-white' type='submit'>Login</button>

                  {error && <span className='text-red-500'>{error}</span>}
                </div>
                <div className='text-sm text-gray-800 mt-3 text-center'>
                  Not registered? <Link to='/Signup' className='text-blue-600 underline'>Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;