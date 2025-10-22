import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { add, syncCart } from "../redux/CartSlice";
import { toast } from "react-toastify";
import logo from "../Assets/logo.png";

const SignalPrice = ({ item }) => {
  const accountId = useSelector((state) => state.auth?.accountId);
  const cartItems = useSelector((state) => state.cart.value || []);
  const [paidCourses, setPaidCourses] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accountId) {
      setLoadingUserData(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "Accounts", accountId),
      (snapshot) => {
        if (snapshot.exists()) {
          setPaidCourses(snapshot.data()?.userPaidCourse || []);
        } else {
          setPaidCourses([]);
        }
        setLoadingUserData(false);
      },
      (error) => {
        console.error(error);
        setPaidCourses([]);
        setLoadingUserData(false);
      }
    );

    return () => unsubscribe();
  }, [accountId]);

  const handleAddToCart = async () => {
    if (!accountId) {
      toast.info("Please login to enroll in this signal", { autoClose: 2000 });
      return;
    }

    if (paidCourses.includes(item.id)) {
      toast.warning(`You have already enrolled in ${item.data.Description}`);
      return;
    }

    if (cartItems.find((i) => i.id === item.id)) {
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

  const { Description, Price } = item.data;

  return (
    <div className="flex justify-center items-start mt-[50px] sm:mt-[30px]">
      {loadingUserData ? (
        <div className="flex justify-center items-center w-[320px] h-[400px]">
          <div className="loader rounded-full border-4 border-t-4 border-blue-500 w-[50px] h-[50px] animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white shadow-2xl rounded-xl p-[25px] sm:p-[20px] w-[320px] sm:w-[90%] flex flex-col items-center">
          <div className="flex flex-col items-center text-center gap-[10px] mb-[20px]">
            <h1 className="text-[26px] sm:text-[20px] font-bold text-black">
              {Description}
            </h1>
            <div className="flex justify-center items-center">
              <img
                src={logo}
                alt="Logo"
                className="w-[50px] h-[50px] mt-[5px]"
              />
            </div>
            <h2 className="text-[22px] font-bold text-blue mt-[10px]">
              ${Price}.00
            </h2>
          </div>

          <div className="bg-anime w-[120px] h-[40px] rounded-2xl flex justify-center items-center mb-[20px]">
            {paidCourses.includes(item.id) ? (
              <button
                onClick={() => window.open(item.data.link)}
                className="text-white text-[14px] font-bold"
              >
                UNLOCKED
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="text-white text-[14px] font-bold"
              >
                {adding ? "Adding..." : "BUY NOW"}
              </button>
            )}
          </div>

          <div className="bg-white flex flex-col justify-between gap-[15px] text-center w-[100%] text-[16px] font-bold text-textcolor rounded-xl py-[15px]">
            <div className="flex  gap-[10px] justify-center border-b border-footer py-[8px] px-[5px]">
              <p>✅</p>
              <p className="sm:text-[14px]">
                Daily signals on a variety of currency pairs
              </p>
            </div>
            <div className="flex  gap-[10px] justify-center border-b border-footer py-[8px] px-[5px]">
              <p>✅</p>
              <p className="sm:text-[14px]">95% Win-Rate</p>
            </div>
            <div className="flex  gap-[10px] justify-center border-b border-footer py-[8px] px-[5px]">
              <p>✅</p>
              <p className="sm:text-[14px]">Well calculated risk</p>
            </div>
            <div className="flex  gap-[10px] justify-center border-b border-footer py-[8px] px-[5px]">
              <p>✅</p>
              <p className="sm:text-[14px]">
                Daily Market Updates and Guidance
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignalPrice;
