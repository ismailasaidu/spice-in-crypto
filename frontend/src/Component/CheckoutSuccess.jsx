import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const tx_ref = params.get("tx_ref");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${process.env.REACT_APP_OPAY_SECRET_KEY}`,
          "Content-Type": "application/json",
          MerchantId: process.env.REACT_APP_OPAY_MERCHANT_ID,
        };

        const response = await axios.get(
          `${process.env.REACT_APP_OPAY_BASE_URL}/payments/verify?reference=${tx_ref}`,
          { headers }
        );

        const result = response.data?.data;
        if (result?.status === "SUCCESS") setStatus("SUCCESS");
        else setStatus("FAILED");
      } catch (err) {
        console.error("Payment verification error:", err.message);
        setStatus("FAILED");
      } finally {
        setLoading(false);
      }
    };

    if (tx_ref) verifyPayment();
  }, [tx_ref]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">
        {status === "SUCCESS" ? "Payment Successful 🎉" : "Payment Failed ❌"}
      </h1>
      <p className="mt-2 text-lg">Transaction Reference: {tx_ref}</p>
      <Link
        to="/dashboard"
        className={`mt-6 px-4 py-2 rounded-lg ${
          status === "SUCCESS"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
