import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => (
  <div className="px-14 pt-[150px]">
    <h1 className="text-2xl font-bold">Payment Successful!</h1>
    <p>Thank you for your purchase.</p>
    <Link to="/" className="text-blue-700 underline mt-4 block">
      Go to Home
    </Link>
  </div>
);

export default PaymentSuccess;
