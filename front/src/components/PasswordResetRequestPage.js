import React, { useState } from 'react';
import axios from 'axios';  // Make sure axios is installed
import messageReadGif from './img/Icons/message-read.gif';
import paperPlaneGif from './img/Icons/paper-plane-unscreen.gif';
import API_URL from '../config';

const PasswordResetRequestPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handlePasswordReset = async (e) => {
    setIsSending(true);
    setMessage('');
    try {
      const response = await axios.post(`${API_URL}/registration/send-reset-password/`, { email: email },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        setMessage('Password reset email sent successfully! Please check your inbox.');
      } else {
        setMessage('Failed to send password reset email. Please try again.');
      }
    } catch (error) {
      if (error.response.status === 404) {
        setMessage('No account found with this email address. Please check and try again.');
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <div className="flex flex-col items-center">
          <img
            src={messageReadGif} 
            alt="Mail" 
            className="w-12 h-12 mb-4" 
          />
          <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
          <p className="text-center mb-4 text-gray-700">
            Enter your email address below and we'll send you a link to reset your password.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mb-4 p-2 border rounded-lg w-full"
            required
          />
          <button
            onClick={handlePasswordReset}
            disabled={isSending}
            className={`flex items-center ${isSending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-md transition duration-200`}
          >
            <img 
              src={paperPlaneGif} 
              alt="Send" 
              className="w-8 h-8 mr-2" 
            />
            {isSending ? 'Sending...' : 'Send Reset Link'}
          </button>
          {message && (
            <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequestPage;
