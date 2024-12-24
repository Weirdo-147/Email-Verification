import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is installed
import messageReadGif from './img/Icons/message-read.gif';
import paperPlaneGif from './img/Icons/paper-plane-unscreen.gif';
import API_URL from '../config';

const CheckEmailPage = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [resendStatus, setResendStatus] = useState('');
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendStatus('');
    try {
      const response = await axios.post(`${API_URL}/registration/resend-verification/`, { email });
      if (response.data.success) {
        setResendStatus('Verification email resent successfully!');
      } else {
        setResendStatus('Failed to resend email. Please try again.');
      }
    } catch (error) {
      setResendStatus('An error occurred. Please try again later.');
      console.error('Error resending email:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center">
          <img  
            src={messageReadGif} 
            alt="Mail" 
            className="w-12 h-12 mb-4" 
          />
          <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
          <p className="text-center mb-4 text-gray-700">
            We've sent a verification email to <span className="font-semibold">{email}</span>.
            Please check your inbox and click the verification link to complete your registration.
          </p>
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className={`flex items-center ${isResending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg transition duration-200`}
          >
            <img 
              src={paperPlaneGif} 
              alt="Send" 
              className="w-8 h-8 mr-2" 
            />
            {isResending ? 'Resending...' : 'Resend Email'}
          </button>
          {resendStatus && (
            <p className={`mt-4 text-center ${resendStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {resendStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckEmailPage;