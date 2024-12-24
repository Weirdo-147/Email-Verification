import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-gray-100 to-green-100">
      <main className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Contact Us</h1>
        
        <div className=" shadow-md rounded-lg p-6 mb-6 bg-blue-50">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Get in Touch</h2>
          <p className="mb-4 text-gray-700">We're here to help and answer any question you might have. We look forward to hearing from you!</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-blue-600">Email Us</h3>
              <p><a href="mailto:noreply.quantumauth@gmail.com" className="text-blue-500 hover:underline">noreply.quantumauth@gmail.com</a></p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-blue-600">Call Us</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-blue-600">Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
            </div>
          </div>
        </div>
        
        <div className="shadow-md rounded-lg p-6 mb-6 bg-green-50">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Visit Us</h2>
          <p className="mb-4 text-gray-700">Our office is located in the heart of Tech City. Feel free to stop by during business hours!</p>
          
          <div>
            <h3 className="font-semibold text-lg text-green-600">Address</h3>
            <p>123 App Street</p>
            <p>Tech City, State 12345</p>
            <p>United States</p>
          </div>
        </div>
        
        <div className="mt-8 shadow-md rounded-lg p-6 mb-6 bg-yellow-50">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-700">Connect With Us</h2>
          <p className="mb-4 text-gray-700">Stay up to date with our latest news and updates by following us on social media:</p>
          
          <div className="flex space-x-4">
            <a href="www.facebook.com" className="text-blue-500 hover:underline">Facebook</a>
            <a href="www.x.com" className="text-blue-500 hover:underline">Twitter</a>
            <a href="www.linkedin.com" className="text-blue-500 hover:underline">LinkedIn</a>
            <a href="www.instagram.com" className="text-blue-500 hover:underline">Instagram</a>
          </div>
        </div>
        
        <div className="mt-8 text-center bg-slate-50 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Need Help?</h2>
          <p className="mb-4 text-gray-600">Check out our <a href="/faq" className="text-blue-500 hover:underline">FAQ page</a> for quick answers to common questions.</p>
        </div>
      </main>
    </div>
  );
};

export default Contact;
