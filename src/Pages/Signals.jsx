import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SignalPrice from "../Component/SignalPrice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import ScrollToTop from "../Component/ScrollToTop";

const Signals = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map for fixed render order (VIP names OR custom labels)
  const orderMap = {
    "VIP 1": 1,
    "VIP 2": 2,
    "VIP 3": 3,
    Gold: 1,
    Platinum: 2,
    Diamond: 3,
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.init({ duration: 3000 });
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    try {
      const signalCollection = collection(db, "Signals");
      const response = await getDocs(signalCollection);

      const signalData = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // ✅ Sort by admin Order first, fallback to our fixed orderMap or description
      const sortedSignals = signalData.sort((a, b) => {
        const orderA =
          a.Order || orderMap[a.Description?.trim()] || Number.MAX_SAFE_INTEGER;
        const orderB =
          b.Order || orderMap[b.Description?.trim()] || Number.MAX_SAFE_INTEGER;

        if (orderA !== orderB) return orderA - orderB;
        return a.Description?.localeCompare(b.Description || "");
      });

      setSignals(sortedSignals);
    } catch (error) {
      toast.error("⚠️ Failed to load signals: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4f9ef7" size={60} />
      </div>
    );
  }

  return (
    <div className="mx-[100px] md:px-0 mt-[120px] sm:mt-[20px] sm:pt-[100px] sm:mx-0">
      <ScrollToTop />

      {/* Header */}
      <div className="text-center flex items-center gap-[30px] flex-col mt-[50px]">
        <h1 className="text-[34px] sm:text-[20px] text-textcolor font-bold">
          Our Signals
        </h1>
        <div className="w-[80px] h-[3px] bg-anime"></div>
      </div>

      {/* Cards */}
      <div
        data-aos="zoom-out"
        className="mx-[100px] sm:mx-[10px] flex justify-center gap-[40px] items-center flex-row sm:flex-col pt-[70px]"
      >
        {signals.map((item) => (
          <SignalPrice key={item.id} item={{ id: item.id, data: item }} />
        ))}
      </div>

      {/* Footer text */}
      <div>
        <p className="text-[14px] text-center mt-[50px] sm:px-[20px] font-bold text-blue sm:text-lightblue sm:text-[18px]">
          Sign Up For Our Expert Signals
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signals;
