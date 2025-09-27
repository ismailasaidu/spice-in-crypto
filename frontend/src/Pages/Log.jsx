import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { db, auth } from "../lib/init-firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const Log = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        return;
      }

      // Fetch accountId from Firestore
      const Account = collection(db, "Accounts");
      const res = await getDocs(Account);
      const accountIds = res.docs.map((doc) => ({
        uId: doc.data().id,
        accountId: doc.id,
      }));

      const accountIdSet = accountIds.find((idSet) => idSet.uId === user.uid);

      // Save in Redux
      dispatch(logIn({ id: user.uid, accountId: accountIdSet.accountId }));

      // Save in localStorage
      localStorage.setItem(
        "Account",
        JSON.stringify({
          loggedIn: true,
          id: user.uid,
          accountId: accountIdSet.accountId,
        })
      );

      toast.success("Welcome");
      navigate("/"); // Redirect to homepage
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="bg-lightblue flex justify-center items-center h-[100vh]">
          <div className="bg-white w-[30%] sm:w-[80%] sm:mt-[-20px] flex flex-col px-[20px] py-[30px] h-[40%] mt-[100px] md:mt-[40px]">
            <input
              type="email"
              placeholder="Email"
              className="w-[100%] outline-none px-[10px] h-[20%] bg-divider mb-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[100%] outline-none px-[10px] h-[20%] bg-divider mb-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link to="/forgetpassword">
              <p className="text-[12px] text-lightblue mb-4">
                Forgot Password?
              </p>
            </Link>
            <button
              type="submit"
              className="bg-blue w-[100%] h-[20%] text-[14px] text-white mb-4">
              LOGIN
            </button>
            <p className="text-[14px] text-center">
              Not a member?{" "}
              <Link to="/signup">
                <span className="text-lightblue cursor-pointer">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Log;
