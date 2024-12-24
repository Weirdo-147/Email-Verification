import React from "react";
import Navbar from "./Navbar";
import backGroundVideo from "./img/cherry blossom. [lofi jazzhop chill mix] (online-video-cutter.com).mp4"
import Searchbar from "./Searchbar";
import Fortune from "./Fortune";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_URL from '../config';

const Home = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  const fetchProfilePicture = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/registration/user-profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfilePicture(response.data.profile_picture);
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

  return (
    <div className="relative text-center font-custom  bg-cherry-blossom bg-cover bg-no-repeat bg-center " style={{  height: "100vh" }}>
        <video id="video" loop autoPlay muted style={{zIndex:-1}}><source src={backGroundVideo} type="video/mp4" ></source></video>
        <div className="mt-4 absolute top-6 right-4 cursor-pointer flex items-center" style={{zIndex:2}}>
        <Link to="/dashboard" className="flex items-center">
          <span className="mr-2 text-neutral-900 font-semibold hover:text-blue-300 transition-colors duration-300 text-xl">Dashboard</span>
          <img
            src={profilePicture ? `http://localhost:8000${profilePicture}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwmIX0QTCFsuRh9xhzW_LbbgxpLc6GnixJFNmQ56AEgmDuBBpvKee9a8l5rrU8iZPmNPQ&usqp=CAU"}
            alt="Profile"
            style={{ height: 50, width: 50, borderRadius: "50%", objectFit: "cover" }}
          />
        </Link>
      </div>
      <Navbar />
        <Searchbar/>
        <Fortune/>

    </div>
  );
};

export default Home;
