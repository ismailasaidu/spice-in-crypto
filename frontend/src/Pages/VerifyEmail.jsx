import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAuth, applyActionCode } from "firebase/auth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");
  const auth = getAuth();

  useEffect(() => {
    const oobCode = searchParams.get("oobCode");

    if (!oobCode) {
      setMessage("❌ No verification code found in the link.");
      return;
    }

    applyActionCode(auth, oobCode)
      .then(() => {
        setMessage("✅ Email verified successfully! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/log";
        }, 2000); // waits 2s before redirect
      })
      .catch((error) => {
        setMessage(`❌ Verification failed: ${error.message}`);
      });
  }, [searchParams, auth]);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <h1 className="text-xl font-bold">{message}</h1>
    </div>
  );
};

export default VerifyEmail;
