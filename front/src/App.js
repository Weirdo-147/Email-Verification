import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VerifyEmailPage from "./components/VerifyEmailPage";
import HomePage from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CheckEmailPage from "./components/CheckEmailPage";
import PasswordResetRequestPage from "./components/PasswordResetRequestPage";
import PasswordReset from "./components/PasswordReset";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import FeaturesPage from "./components/Features";
import PricingPage from "./components/Pricing";
import Contact from "./components/Contact";
import ProfilePage from "./components/ProfilePage";
import Home from "./components/Home";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/SignUp" element={<Signup/>}></Route>
        <Route path="/verify-email" element={<VerifyEmailPage/>}></Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/HomePage" element={<HomePage/>}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/" element={<Home/>}></Route>
        </Route>
        <Route path="/check-email" element={<CheckEmailPage/>}></Route>
        <Route path="/reset-password" element={<PasswordReset/>}></Route>
        <Route path="/password-reset-request" element={<PasswordResetRequestPage/>}></Route>
        <Route path="/features" element={<FeaturesPage/>}></Route>
        <Route path="/pricing" element={<PricingPage/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        
      </Routes>
    </Router>
  )
}

export default App;