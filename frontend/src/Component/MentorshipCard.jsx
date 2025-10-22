import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { add, syncCart } from "../redux/CartSlice";
import { toast } from "react-toastify";
import logo from "../Assets/logo.png";

const MentorshipCard = ({ item }) => {
  const accountId = useSelector((state) => state.auth?.accountId);
  const cartItems = useSelector((state) => state.cart.value || []);
  const [paidCourses, setPaidCourses] = useState([]);
  const [adding, setAdding] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const retrievePaidCourses = async () => {
      if (!accountId) return;
      try {
        const userRef = doc(db, "Accounts", accountId);
        const res = await getDoc(userRef);
        setPaidCourses(res.exists() ? res.data()?.userPaidCourse || [] : []);
      } catch (error) {
        console.error("Error retrieving paid courses:", error);
        toast.error("Unable to fetch your purchased courses");
      }
    };
    retrievePaidCourses();
  }, [accountId]);

  const handleAddToCart = async () => {
    if (!accountId) {
      toast.info("Please login to enroll in this mentorship", {
        autoClose: 2000,
      });
      return;
    }

    if (paidCourses.includes(item.id)) {
      toast.warning(`You have already enrolled in ${item.data.Description}`);
      return;
    }

    if (cartItems.includes(item.id)) {
      toast.warning(`${item.data.Description} is already in your cart`);
      return;
    }

    try {
      setAdding(true);
      dispatch(add(item));
      await dispatch(syncCart());
      toast.success(`${item.data.Description} added to cart`);
    } finally {
      setAdding(false);
    }
  };

  if (!item?.data) return null;

  const { Description, Price, type } = item.data;

  return (
    <div className="flex justify-center items-start mt-[50px] sm:mt-[30px]">
      <div className="bg-white shadow-2xl rounded-xl p-[25px] sm:p-[20px] w-[320px] sm:w-[90%] flex flex-col items-center">
        {/* Title & Price */}
        <div className="flex flex-col items-center text-center gap-[10px] mb-[20px]">
          <h1 className="text-[26px] sm:text-[20px] font-bold text-black">
            {Description}
          </h1>
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="w-[50px] h-[50px] mt-[5px]" />
          </div>
          <h2 className="text-[22px] font-bold text-blue mt-[10px]">
            ${Price}.00
          </h2>
          <p className="text-sm text-gray-500 mt-1">{type?.toUpperCase()}</p>
        </div>

        {/* Button */}
        <div className="bg-lightblue w-[120px] h-[40px] rounded-2xl flex justify-center items-center mb-[20px]">
          {paidCourses.includes(item.id) ? (
            <button
              onClick={() => window.open(item.data.link)}
              className="text-white text-[14px] font-bold"
            >
              ENROLLED
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="text-white text-[14px] font-bold"
            >
              {adding ? "Adding..." : "ENROLL"}
            </button>
          )}
        </div>

        {/* Features Section */}
        <div className="bg-white flex flex-col justify-between gap-[15px] text-center w-[100%] text-[16px] font-bold text-textcolor rounded-xl py-[15px]">
          <div className="flex items-center gap-[10px] justify-center border-b border-footer py-[8px] px-[5px]">
            <p>✅</p>
            <p className="sm:text-[14px]">1 month of mentorship</p>
          </div>
          <div className="flex items-center gap-[10px] justify-center border-b border-footer py-[8px] px-[5px]">
            <p>✅</p>
            <p className="sm:text-[14px]">Daily Live Sessions</p>
          </div>
          <div className="flex items-center gap-[10px] justify-center border-b border-footer py-[8px] px-[5px]">
            <p>✅</p>
            <p className="sm:text-[14px]">Trading Books</p>
          </div>
          <div className="flex items-center gap-[10px] justify-center border-b border-footer py-[8px] px-[5px]">
            <p>✅</p>
            <p className="sm:text-[14px]">Certificate of Completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipCard;
