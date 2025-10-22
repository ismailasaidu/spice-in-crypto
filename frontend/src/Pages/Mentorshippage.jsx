import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../lib/init-firebase";
import MentorshipCard from "../Component/MentorshipCard";
import { ClipLoader } from "react-spinners";
import ScrollToTop from "../Component/ScrollToTop";

const Mentorship = () => {
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMentorships = async () => {
    setLoading(true);
    try {
      const mentorshipCollection = collection(db, "Mentorship");
      const response = await getDocs(mentorshipCollection);

      const mentorshipData = response.docs
        .map((doc) => ({ data: doc.data(), id: doc.id }))
        // ✅ sort by Order field
        .sort(
          (a, b) => (Number(a.data.Order) || 0) - (Number(b.data.Order) || 0)
        );

      setMentorships(mentorshipData);
    } catch (error) {
      toast.error("Failed to load mentorships: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMentorships();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4f9ef7" size={60} />
      </div>
    );
  }

  return (
    <div className="mx-[100px] md:px-0 mt-[100px] sm:pt-[100px] sm:mx-0">
      <ScrollToTop />
      <div className="text-center flex items-center gap-[30px] flex-col mt-[50px]">
        <h1 className="text-[34px] sm:text-[20px] text-textcolor text-MT font-bold">
          Our Mentorship
        </h1>
        <div className="w-[80px] h-[3px] bg-anime"></div>
      </div>

      <div
        data-aos="zoom-out"
        className="mx-[100px] sm:mx-[10px] md:flex-col justify-center gap-[40px] items-center flex sm:flex-col flex-row pt-[70px]"
      >
        {mentorships.map((item) => (
          <MentorshipCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Mentorship;
