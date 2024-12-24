import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Login');
    }
    navigate('/');
  }, [navigate]);

  return null;
}

export default HomePage;