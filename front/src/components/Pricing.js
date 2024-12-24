import React from 'react';

const PricingPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      period: 'per month',
      features: [
        'Access to core features',
        '5 GB storage',
        'Email support',
        'Limited API access'
      ],
      cta: 'Start Basic',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'Pro',
      price: '$29.99',
      period: 'per month',
      features: [
        'All Basic features',
        '50 GB storage',
        'Priority email support',
        'Full API access',
        'Advanced analytics'
      ],
      cta: 'Go Pro',
      highlighted: true,
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'All Pro features',
        'Unlimited storage',
        '24/7 phone support',
        'Custom integrations',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 via-gray-200 to-cyan-200">
      <main className="max-w-6xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Choose Your Plan</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`shadow-md rounded-lg p-6 ${plan.bgColor} ${plan.highlighted ? 'border-2 border-blue-500' : ''}`}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{plan.name}</h2>
              <p className="text-4xl font-bold mb-2 text-gray-900">{plan.price}</p>
              <p className="text-gray-500 mb-6">{plan.period}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-2 px-4 rounded font-bold ${
                  plan.highlighted 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Need a custom plan?</h2>
          <p className="mb-4 text-gray-600">We offer tailored solutions for large teams and specific needs.</p>
          <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block">
            Contact Sales
          </a>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
