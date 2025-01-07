import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const getProgressColor = (percentage) => {
  if (percentage >= 90) return '#ef4444'; // red
  if (percentage >= 75) return '#f97316'; // orange
  if (percentage >= 50) return '#eab308'; // yellow
  return '#22c55e'; // green
};

const getProgressBackground = (percentage) => {
  if (percentage >= 90) return '#fee2e2'; // light red
  if (percentage >= 75) return '#ffedd5'; // light orange
  if (percentage >= 50) return '#fef9c3'; // light yellow
  return '#dcfce7'; // light green
};

const UsageCard = ({ title, used, limit, unit = '', icon }) => {
  const percentage = (used/limit) * 100;
  const color = getProgressColor(percentage);
  const backgroundColor = getProgressBackground(percentage);

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4">
        <CircularProgressbar
          value={percentage}
          text={`${Math.round(percentage)}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: backgroundColor,
            backgroundColor: backgroundColor,
            pathTransitionDuration: 0.5,
            strokeLinecap: 'round',
            textSize: '20px',
          })}
        />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-sm md:text-base mb-1">{title}</h3>
        <p className="text-xs md:text-sm text-gray-600 mb-2">
          {used.toLocaleString()}/{limit.toLocaleString()} {unit}
        </p>
        <div className="text-xs text-gray-500">
          {icon}
          <span>{Math.round((limit - used).toLocaleString())} {unit} remaining</span>
        </div>
      </div>
    </div>
  );
};

const Billing = () => {
  const [isCurrentPlanOpen, setIsCurrentPlanOpen] = useState(true);
  const [isPreviousPlansOpen, setIsPreviousPlansOpen] = useState(false);
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card1');

  // Mock data
  const usage = {
    emailsSent: 850,
    emailLimit: 1000,
    storageUsed: 7.5,
    storageLimit: 10,
    apiCalls: 8500,
    apiLimit: 10000
  };

  const paymentMethods = [
    { id: 'card1', last4: '4242', brand: 'visa', expiry: '04/24' },
    { id: 'card2', last4: '5555', brand: 'mastercard', expiry: '05/25' }
  ];

  const currentPlan = {
    name: "Premium",
    price: "$29.99/month",
    features: ["Unlimited access", "Priority support", "Free updates"],
    validity: "2023-12-31",
  };

  const previousPlans = [
    {
      name: "Standard",
      price: "$19.99/month",
      features: ["Access to basic features", "Email support"],
      validity: "2023-06-30",
    },
    {
      name: "Basic",
      price: "$9.99/month",
      features: ["Limited access", "Community support"],
      validity: "2023-01-31",
    },
  ];

  const billingHistory = [
    { id: 1, date: '2023-11-01', amount: 29.99, status: 'Paid', invoice: '#INV-001' },
    { id: 2, date: '2023-10-01', amount: 29.99, status: 'Paid', invoice: '#INV-002' }
  ];

  const handleUpdatePlan = () => {
    // Logic to update the plan
    console.log("Update plan clicked");
  };

  return (
    <div className="w-full p-2 sm:p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Usage Statistics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <UsageCard
          title="Email Usage"
          used={usage.emailsSent}
          limit={usage.emailLimit}
          unit="emails"
          icon={
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        <UsageCard
          title="Storage Usage"
          used={usage.storageUsed}
          limit={usage.storageLimit}
          unit="GB"
          icon={
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          }
        />
        <UsageCard
          title="API Calls"
          used={usage.apiCalls}
          limit={usage.apiLimit}
          unit="calls"
          icon={
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
      </div>

      {/* Current Plan Section with Enhanced UI */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div
          className="px-3 sm:px-4 md:px-6 py-3 md:py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
          onClick={() => setIsCurrentPlanOpen(!isCurrentPlanOpen)}
        >
          <h2 className="text-xl font-semibold text-gray-800">Current Plan</h2>
          <svg
            className={`w-6 h-6 transform ${isCurrentPlanOpen ? 'rotate-180' : ''} transition-transform duration-200`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCurrentPlanOpen ? 'max-h-[2000px] border-t' : 'max-h-0'
        }`}>
          <div className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{currentPlan.name}</h3>
                <p className="text-lg text-blue-600 font-semibold">{currentPlan.price}</p>
              </div>
              <button
                onClick={handleUpdatePlan}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center"
              >
                Update Plan
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-600 mb-3">Features Included:</h4>
              <ul className="space-y-2">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add Plan Comparison Table */}
          <div className="p-3 sm:p-4 md:p-6 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-2 sm:space-y-0">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Plan Comparison</h3>
              <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setIsYearlyBilling(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    !isYearlyBilling 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setIsYearlyBilling(true)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isYearlyBilling 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Yearly
                  <span className="ml-1 text-xs text-green-500 font-normal">Save 20%</span>
                </button>
              </div>
            </div>
            
            {/* Plan Comparison Grid - Scrollable on mobile */}
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <div className="inline-grid min-w-full sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3 sm:p-0">
                {[
                  {
                    name: 'Basic',
                    price: isYearlyBilling ? '$95.88/year' : '$9.99/month',
                    features: ['Limited access', 'Community support', '1GB storage', '1000 emails/month'],
                    highlight: false,
                    action: 'Get Started'
                  },
                  {
                    name: 'Standard',
                    price: isYearlyBilling ? '$191.88/year' : '$19.99/month',
                    features: ['Access to basic features', 'Email support', '5GB storage', '5000 emails/month'],
                    highlight: false,
                    action: 'Upgrade'
                  },
                  {
                    name: 'Premium',
                    price: isYearlyBilling ? '$287.88/year' : '$29.99/month',
                    features: ['Unlimited access', 'Priority support', '15GB storage', 'Unlimited emails'],
                    highlight: true,
                    action: 'Current Plan'
                  },
                  {
                    name: 'Enterprise',
                    price: 'Custom pricing',
                    features: ['All Premium features', 'Dedicated support', 'Custom storage', 'Custom limits'],
                    highlight: false,
                    action: 'Contact Sales'
                  }
                ].map((plan) => (
                  <div 
                    key={plan.name} 
                    className={`relative rounded-xl p-6 transition-all duration-200 ${
                      plan.highlight 
                        ? 'bg-blue-50 border-2 border-blue-500 shadow-lg' 
                        : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    {plan.highlight && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    )}
                    
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{plan.name}</h4>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-gray-900">{plan.price.split('/')[0]}</span>
                      <span className="text-gray-500">/{plan.price.split('/')[1]}</span>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      className={`w-full py-2 rounded-lg font-medium transition-colors duration-200 ${
                        plan.highlight
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : plan.name === 'Enterprise'
                            ? 'bg-gray-800 text-white hover:bg-gray-900'
                            : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {plan.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Payment Methods</h2>
        <div className="space-y-3 md:space-y-4">
          {paymentMethods.map(method => (
            <div 
              key={method.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg ${
                selectedPaymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedPaymentMethod(method.id)}
            >
              <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                {method.brand === 'visa' ? (
                  <svg className="w-12 h-8" viewBox="0 0 48 32">
                    {/* Visa card SVG */}
                  </svg>
                ) : (
                  <svg className="w-12 h-8" viewBox="0 0 48 32">
                    {/* Mastercard SVG */}
                  </svg>
                )}
                <div>
                  <p className="font-medium">•••• {method.last4}</p>
                  <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <button className="text-blue-600 hover:text-blue-700">Edit</button>
                <button className="text-red-600 hover:text-red-700">Remove</button>
              </div>
            </div>
          ))}
          <button className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors">
            + Add New Payment Method
          </button>
        </div>
      </div>

      {/* Billing History Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-3 sm:p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Billing History</h2>
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {billingHistory.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{bill.date}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{bill.invoice}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">${bill.amount}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{bill.status}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Plans Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div
          className="px-3 sm:px-4 md:px-6 py-3 md:py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
          onClick={() => setIsPreviousPlansOpen(!isPreviousPlansOpen)}
        >
          <h2 className="text-xl font-semibold text-gray-800">Previous Plans</h2>
          <svg
            className={`w-6 h-6 transform ${isPreviousPlansOpen ? 'rotate-180' : ''} transition-transform duration-200`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isPreviousPlansOpen ? 'max-h-[1000px] border-t' : 'max-h-0'
        }`}>
          <div className="p-3 sm:p-4 md:p-6">
            <div className="space-y-4">
              {previousPlans.map((plan, index) => (
                <div key={index} className="border rounded-lg p-4 hover:border-blue-200 transition-colors duration-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{plan.name}</h3>
                      <p className="text-gray-600">{plan.price}</p>
                    </div>
                    <span className="text-sm text-gray-500">Valid until: {plan.validity}</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
