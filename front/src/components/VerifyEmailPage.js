import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ax from 'axios';
import API_URL from '../config';

const VerifyEmailPage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    if (!token) {
      setError('Invalid verification link. Please use the link from your email.');
    } else {
      setMessage('Please click the button below to verify your email.');
    }
  }, [location.search]);

  const handleVerifyClick = async () => {
    const token = new URLSearchParams(location.search).get('token');
    if (!token) {
      setError('Invalid verification link. Please use the link from your email.');
      return;
    }

    setVerifying(true);
    setMessage('Verifying your email...');

    try {
      const response = await ax.get(`${API_URL}/registration/verify-email/?token=${token}`);
      if (response.data.success) {
        setMessage('Email verified successfully! Redirecting to home page...');
        setTimeout(() => navigate('/homepage'), 3000);
      } else {
        setError(response.data.message || 'Verification failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
      {message && <p className="text-center mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!verifying && !error && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleVerifyClick}
        >
          Verify Email
        </button>
      )}
      {verifying && (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H6c0 3.309-2.691 6-6 6z" />
          </svg>
          <p className="text-gray-600">Verifying...</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;