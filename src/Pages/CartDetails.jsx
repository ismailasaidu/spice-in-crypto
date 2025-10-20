import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, Subtotal, syncCart } from "../redux/CartSlice";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { useParams } from "react-router-dom";
import phone from "../Assets/phone.png";
import { ToastContainer } from "react-toastify";

const CartDetails = () => {
  const accountId = useSelector((state) => state.auth.accountId);
  const [paidCourses, setPaidCourses] = useState([]);
  const [Ebooks, setEbooks] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const ebookIndex = parseInt(id);

  // Fetch paid courses
  const retrievePaidCourses = async () => {
    if (!accountId) return;
    try {
      const userRef = doc(db, "Accounts", accountId);
      const res = await getDoc(userRef);
      const data = res.data();
      if (!data) return;
      setPaidCourses(data.userPaidCourse || []);
    } catch (err) {
      console.error("Unable to fetch purchased courses", err);
    }
  };

  // Fetch ebooks
  const getEbooks = async () => {
    try {
      const EbookCol = collection(db, "Ebooks");
      const response = await getDocs(EbookCol);
      const ebookData = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setEbooks(ebookData);
    } catch (err) {
      console.error("Error fetching ebooks:", err);
    }
  };

  useEffect(() => {
    if (accountId) retrievePaidCourses();
  }, [accountId]);

  useEffect(() => {
    getEbooks();
  }, []);

  const ebook = Ebooks[ebookIndex];
  if (!ebook) return <p>Loading...</p>;

  const handleBuy = async () => {
    dispatch(add(ebook)); // slice handles toast
    dispatch(Subtotal());
    await dispatch(syncCart());
  };

  return (
    <div className="pt-[50px] sm:pt-[100px] md:pt-[50px] px-[100px] sm:px-[20px] md:px-[50px]">
      <div className="px-14 sm:px-[20px]">
        <div className="flex mt-[100px] sm:flex-col md:justify-between">
          <div className="flex-1 md:pt-[80px] sm:mt-[-100px] relative">
            <img
              src={phone}
              alt=""
              className="w-[490px] h-[500px] object-cover sm:h-[300px] sm:w-[400px] md:w-[500px] md:h-[370px]"
            />
          </div>
          <div className="flex flex-1 gap-[10px] flex-col sm:mt-[20px] sm:gap-[20px] md:gap-[10px]">
            <h1 className="text-lightblue text-[16px]">Membership & E-book</h1>
            <h1 className="capitalize text-[24px] text-black md:text-[22px] sm:text-[22px]">
              {ebook.data.Description}
            </h1>
            <h1 className="text-[20px] text-textcolor">
              ₦{ebook.data.Price}.00
            </h1>
            <button
              className="bg-blue w-[150px] h-[50px] text-white"
              onClick={handleBuy}
            >
              {paidCourses.includes(ebook.id) ? "UNLOCKED" : "BUY NOW"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default CartDetails;
