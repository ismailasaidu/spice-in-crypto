import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../redux/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/init-firebase";
import { getDocs, collection } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { fetchCartFromFirestore, setCartFromRemote } from "../redux/CartSlice";

const Log = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logIn } = authSlice.actions;

  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password)
      return toast.error("Please fill in email and password");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        return toast.error("Please verify your email before logging in.");
      }

      // Fetch account ID
      const Account = collection(db, "Accounts");
      const res = await getDocs(Account);
      const accountIds = res.docs.map((doc) => ({
        uId: doc.data().id,
        accountId: doc.id,
      }));
      const account = accountIds.find((item) => item.uId === user.uid);

      // Update Redux auth state
      dispatch(logIn({ id: user.uid, accountId: account.accountId }));
      localStorage.setItem(
        "Account",
        JSON.stringify({
          loggedIn: true,
          id: user.uid,
          accountId: account.accountId,
        })
      );

      // Fetch cart from Firestore and set in Redux
      const cartData = await fetchCartFromFirestore(user.uid);
      dispatch(setCartFromRemote(cartData));

      toast.success("Welcome!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="bg-lightblue flex justify-center items-center h-[100vh]">
          <div className="bg-white w-[30%] sm:w-[80%] flex flex-col px-[20px] py-[30px] h-[40%] mt-[100px] md:mt-[40px]">
            <input
              type="email"
              placeholder="Email"
              className="w-[100%] outline-none px-[10px] h-[20%] bg-divider"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[100%] outline-none px-[10px] h-[20%] bg-divider"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/forgetpassword">
              <p className="text-[12px] text-lightblue">Forgot Password?</p>
            </Link>
            <button
              type="submit"
              className="bg-blue w-[100%] h-[20%] text-white">
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
