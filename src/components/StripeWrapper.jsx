import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QZz8CJiFOOk4zjno8t5Z0TR17DSktasAndTdOfamjjOdAMjGH846nwwBXWZt4y9mgylRfTedw4xQg2Is1gYzOu800400MHx8t"
);

const StripeWrapper = ({ clientSecret, children }) => {
  if (!clientSecret) {
    return children;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0066cc',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
