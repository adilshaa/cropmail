import React, { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { post } from "../services/apiService";
import StripeWrapper from "../components/StripeWrapper";
import { useSearchParams } from 'react-router-dom';

const PaymentForm = ({ selectedPlan, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [errors, setErrors] = useState({});

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!cardHolderName) newErrors.cardHolderName = "Card holder name is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/home/payment-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      console.error("Payment failed:", error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Payment successful!", paymentIntent);
      alert("Payment successful!");
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border p-2 rounded-lg w-full outline-none ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1" htmlFor="cardHolderName">
          Card Holder Name
        </label>
        <input
          type="text"
          id="cardHolderName"
          value={cardHolderName}
          onChange={(e) => setCardHolderName(e.target.value)}
          className={`border p-2 rounded-lg w-full outline-none ${
            errors.cardHolderName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.cardHolderName && <p className="text-red-500 text-xs mt-1">{errors.cardHolderName}</p>}
      </div>

      <div className="border p-4 rounded-lg shadow-sm mb-2 bg-white">
        {clientSecret && (
          <PaymentElement options={{ layout: 'tabs', hidePostalCode: true }} />
        )}
      </div>
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm mb-4 bg-white">
        <h3 className="text-gray-600 text-sm font-bold mb-2">Payment Summary</h3>
        <p className="text-gray-600">Plan: {selectedPlan ? selectedPlan.name : "None"}</p>
        <p className="text-gray-600">Price: {selectedPlan ? selectedPlan.price : "$0.00"}</p>
        <p className="text-gray-600">Taxes: $0.00</p>
        <p className="text-gray-600 font-bold">Total: {selectedPlan ? selectedPlan.price : "$0.00"}</p>
      </div>
      <div className="text-right">
        <button
          type="submit"
          disabled={!stripe}
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
};

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const plans = [
    { id: 1, name: "Basic", price: "$9.99/month", pay_amount: 999, description: "Limited access" },
    { id: 2, name: "Standard", price: "$19.99/month", pay_amount: 1999, description: "Access to basic features" },
    { id: 3, name: "Premium", price: "$29.99/month", pay_amount: 2999, description: "Unlimited access" },
  ];

  useEffect(() => {
    const planId = parseInt(searchParams.get('plan'));
    if (planId) {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        handlePlanChange(planId);
      }
    }
  }, [searchParams]);

  const handlePlanChange = async (planId) => {
    const plan = plans.find((p) => p.id === planId);
    setSelectedPlan(plan);
    setLoading(true);

    try {
      const amount = Math.round(plan.pay_amount);
      const response = await post("/payment/create-payment-intent", {
        amount,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          plan_id: plan.id,
          plan_name: plan.name
        }
      });

      if (response?.clientSecret) {
        setClientSecret(response.clientSecret);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      setErrors(prev => ({
        ...prev,
        payment: 'Failed to setup payment. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <StripeWrapper clientSecret={clientSecret}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Plans Section */}
              <div className="lg:w-1/2 p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Plan</h2>
                <div className="space-y-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`transform transition-all duration-300 ${
                        selectedPlan?.id === plan.id 
                          ? 'scale-105 border-blue-500 bg-white shadow-lg' 
                          : 'hover:scale-[1.02] border-gray-200'
                      } border-2 rounded-xl p-6 cursor-pointer`}
                      onClick={() => handlePlanChange(plan.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{plan.name}</h3>
                          <p className="text-2xl font-bold text-blue-600 mt-2">{plan.price}</p>
                          <p className="text-gray-500 mt-2">{plan.description}</p>
                        </div>
                        <input
                          type="radio"
                          checked={selectedPlan?.id === plan.id}
                          onChange={() => handlePlanChange(plan.id)}
                          className="w-6 h-6 text-blue-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Form Section */}
              <div className="lg:w-1/2 p-8">
                {selectedPlan && clientSecret ? (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Payment Details</h2>
                    <PaymentForm selectedPlan={selectedPlan} clientSecret={clientSecret} />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {loading ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading payment details...</p>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-lg">Please select a plan to continue</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StripeWrapper>
  );
};

export default Payment;
