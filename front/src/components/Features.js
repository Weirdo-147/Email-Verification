import React from 'react';

const FeaturesPage = () => {
  const features = [
    {
      title: 'Intuitive Dashboard',
      description: 'Get a quick overview of all your important metrics and activities in one place.',
      icon: '📊',
      gradient: 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'
    },
    {
      title: 'Advanced Analytics',
      description: 'Dive deep into your data with our powerful analytics tools and customizable reports.',
      icon: '📈',
      gradient: 'bg-gradient-to-r from-green-400 via-green-300 to-green-200'
    },
    {
      title: 'Secure Data Storage',
      description: 'Rest easy knowing your data is protected with state-of-the-art encryption and security measures.',
      icon: '🔒',
      gradient: 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200'
    },
    {
      title: 'Collaboration Tools',
      description: 'Work seamlessly with your team using our built-in collaboration features and real-time updates.',
      icon: '👥',
      gradient: 'bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200'
    },
    {
      title: 'Mobile App',
      description: 'Access your account on-the-go with our fully-featured mobile app for iOS and Android.',
      icon: '📱',
      gradient: 'bg-gradient-to-r from-red-400 via-red-300 to-red-200'
    },
    {
      title: 'API Integration',
      description: 'Easily integrate our platform with your existing tools and workflows using our comprehensive API.',
      icon: '🔗',
      gradient: 'bg-gradient-to-r from-teal-400 via-teal-300 to-teal-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 via-gray-200 to-cyan-200">
      <main className="max-w-6xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Our Features</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className={`shadow-md rounded-lg p-6 ${feature.gradient}`}>
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{feature.icon}</span>
                <h2 className="text-2xl font-semibold text-gray-800">{feature.title}</h2>
              </div>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-white via-gray-50 to-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h2>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              User-friendly interface designed for efficiency
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Regular updates and new feature releases
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Dedicated customer support team
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Scalable solutions for businesses of all sizes
            </li>
          </ul>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ready to get started?</h2>
          <p className="mb-4 text-gray-600">Experience the power of our platform for yourself.</p>
          <a href="/pricing" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block">
            View Pricing Plans
          </a>
        </div>
      </main>
    </div>
  );
};

export default FeaturesPage;
