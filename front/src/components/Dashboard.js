
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from "./img/download.jpeg";
import API_URL from '../config';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/registration/user-profile/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchActivityLogs = async () => {
      try {
        const response = await axios.get('/api/activity-logs/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setActivityLogs(response.data);
      } catch (error) {
        console.error('Error fetching activity logs:', error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news/');
        setNewsItems(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchUserData();
    fetchActivityLogs();
    fetchNews();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const faqItems = [
    {
      question: "How do I update my profile information?",
      answer: "To update your profile information, navigate to the 'Profile' section from the dashboard. Here, you'll find options to edit various details such as your name, contact information, and profile picture. Click on the 'Edit' button next to each field you wish to modify, make your changes, and then click 'Save' to confirm the updates. Remember to review all changes before saving to ensure accuracy."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "If you've forgotten your password, don't worry! On the login page, you'll find a 'Forgot Password' link. Click on this and enter the email address associated with your account. We'll send you a password reset link. Follow the instructions in the email to create a new password. For security reasons, this link will expire after 24 hours. If you don't receive the email, check your spam folder or contact our support team for assistance."
    },
    {
      question: "How can I change my email address?",
      answer: "To change your email address, go to the 'Account Settings' page. Look for the 'Email' section and click on 'Change Email'. Enter your new email address and your current password for verification. We'll send a confirmation link to your new email address. Click on this link to verify and complete the change. Remember, you'll need to use this new email address for future logins."
    },
    {
      question: "Is my personal information secure?",
      answer: "We take your privacy and security very seriously. All personal information is encrypted and stored securely. We use industry-standard SSL encryption for all data transmissions. Our servers are protected by advanced firewalls and we regularly update our security measures. We never share your personal information with third parties without your explicit consent. You can review our full privacy policy for more detailed information on how we protect and use your data."
    },
    {
      question: "How do I delete my account?",
      answer: "If you wish to delete your account, please go to 'Account Settings' and scroll to the bottom where you'll find the 'Delete Account' option. Click this and follow the prompts. You'll need to enter your password to confirm. Please note that account deletion is permanent and cannot be undone. All your data will be permanently removed from our systems. If you have any ongoing subscriptions or pending transactions, please resolve these before deleting your account. If you're having issues with our service, we encourage you to contact support first to see if we can resolve your concerns."
    },
    {
      question: "What types of notifications can I receive?",
      answer: "Our platform offers various types of notifications to keep you informed. These include account activity alerts, security notifications, feature updates, and optional promotional messages. You can customize your notification preferences in the 'Notifications' section of your account settings. Here, you can choose which types of notifications you want to receive and how you want to receive them (email, push notifications, or in-app alerts). We recommend keeping security notifications enabled to stay informed about important account activities."
    },
    {
      question: "How often is my data backed up?",
      answer: "We perform regular backups of all user data to ensure the safety and integrity of your information. Our system automatically backs up data daily, with full backups performed weekly. These backups are stored in secure, geographically distributed locations to protect against data loss. While we maintain these backups, we always recommend that users keep their own copies of important data as an additional precaution."
    },
    {
      question: "Can I link multiple accounts?",
      answer: "Yes, you can link multiple accounts to enhance your user experience. To do this, go to 'Account Settings' and look for the 'Linked Accounts' section. Here, you'll see options to link various social media or other service accounts. Click on the service you want to link and follow the prompts to authorize the connection. Linking accounts can enable features like easier login, data sharing between platforms, or enhanced functionality within our app. You can unlink accounts at any time from the same section."
    },
    {
      question: "What should I do if I notice suspicious activity on my account?",
      answer: "If you notice any suspicious activity on your account, it's important to act quickly. First, change your password immediately. Then, go to the 'Security' section in your account settings and review your recent account activity. If you see any logins or actions you don't recognize, use the 'Report Suspicious Activity' button. This will alert our security team, who will investigate and take necessary actions. We also recommend enabling two-factor authentication for an extra layer of security. If you believe your account has been compromised, contact our support team right away for further assistance."
    },
    {
      question: "How can I provide feedback or suggest new features?",
      answer: "We greatly value user feedback and suggestions! There are several ways to share your thoughts with us. In the app, you'll find a 'Feedback' option in the main menu. Use this to submit your ideas, report issues, or share your experience. You can also email our dedicated feedback team at feedback@yourapp.com. We regularly review all suggestions and use them to guide our product development. While we can't implement every suggestion, we appreciate all input and use it to improve our service. For major feature requests, we sometimes conduct user surveys or beta testing programs, which you can opt into through your account settings."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center">
                  <img src={logo} alt="Logo" className="h-8 w-8 mr-2 rounded-full" />
                  <span className="text-white text-lg font-bold">Quantum Auth</span>
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <a href='/' className="text-white hover:text-yellow-300 transition duration-300">Home</a>
                <Link to="/features" className="text-white hover:text-yellow-300 transition duration-300">Features</Link>
                <Link to="/pricing" className="text-white hover:text-yellow-300 transition duration-300">Pricing</Link>
                <Link to="/contact" className="text-white hover:text-yellow-300 transition duration-300">Contact</Link>
              </div>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="bg-yellow-400 text-gray-900 py-2 px-4 rounded hover:bg-yellow-500 transition duration-300"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto mt-6 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-600 mb-6">We're glad to have you here. Explore your personalized space and make the most of our features.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Your Profile</h2>
              {user && (
                <div className="flex items-center mb-6">
                  {user.profile_picture ? (
                    <img 
                      src={`http://localhost:8000${user.profile_picture}`} 
                      alt="Profile" 
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                      <span className="text-2xl text-gray-600">{user.username[0].toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Member since:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Quick Actions</h3>
                  <ul className="space-y-2">
                    <li><a href="/profile" className="text-blue-500 hover:underline">Edit Profile</a></li>
                  </ul>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Recent Activity</h3>
                  {activityLogs.length > 0 ? (
                    <ul className="space-y-2">
                      {activityLogs.slice(0, 3).map((log, index) => (
                        <li key={index} className="text-sm text-gray-700">{log.action} - {new Date(log.timestamp).toLocaleString()}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No recent activity to display.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">Latest Updates</h2>
              {newsItems.length > 0 ? (
                <ul className="space-y-4">
                  {newsItems.map((item, index) => (
                    <li key={index} className="border-b pb-2">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600">{item.summary}</p>
                      <a href={item.link} className="text-blue-500 hover:underline">Read more</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No updates available at the moment.</p>
              )}
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-purple-600 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.slice(0, showAllFaqs ? faqItems.length : 3).map((item, index) => (
                  <div key={index} className="border-b pb-2">
                    <h3 className="font-semibold text-gray-800">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
              {!showAllFaqs && (
                <button
                  onClick={() => setShowAllFaqs(true)}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View More FAQs
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">Need Help?</h2>
              <p className="mb-4 text-gray-600">Our support team is here to assist you. Feel free to reach out if you have any questions or concerns.</p>
              <a href="/contact" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block">Contact Support</a>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
              <p className="text-gray-600">Stay tuned for updates on our upcoming events and webinars.</p>
              <a href="/events" className="text-blue-500 hover:underline">View Events</a>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Quantum Auth is dedicated to providing the best user experience and innovative solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="/pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2">
                <li><a href="https://www.facebook.com/" className="text-gray-400 hover:text-white">Facebook</a></li>
                <li><a href="https://x.com/" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="https://www.linkedin.com/" className="text-gray-400 hover:text-white">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/" className="text-gray-400 hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Quantum Auth . All rights reserved. | Email: <a href="mailto:noreply.quantumauth@gmail.com" className="hover:text-white">noreply.quantumauth@gmail.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
