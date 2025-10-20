import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/init-firebase";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/AuthSlice";
import { listenToCart } from "../redux/CartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Log = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFriendlyErrorMessage = (error) => {
    const errorMap = {
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/too-many-requests": "Too many login attempts. Try again later.",
    };
    return errorMap[error.code] || "Something went wrong. Please try again.";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.warn("Please verify your email before logging in.", {
          position: "top-right",
        });

        try {
          await user.sendEmailVerification();
          toast.info("A new verification email has been sent.", {
            position: "top-right",
          });
        } catch (sendError) {
          console.error("Error resending verification email:", sendError);
        }

        await auth.signOut();
        setLoading(false);
        return;
      }

      dispatch(login({ id: user.uid, accountId: user.uid }));
      localStorage.setItem(
        "Account",
        JSON.stringify({ loggedIn: true, id: user.uid, accountId: user.uid })
      );
      dispatch(listenToCart(user.uid));
      toast.success("Welcome back!", { position: "top-right" });
      navigate("/");
    } catch (error) {
      toast.error(getFriendlyErrorMessage(error), { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-lightblue flex justify-center items-center h-[100vh]">
      <div className="bg-white w-[30%] sm:w-[80%] flex flex-col justify-between items-center px-[20px] py-[30px] h-[50%] mt-[100px] sm:mt-[-20px]">
        <input
          type="email"
          placeholder="Email"
          className="w-full outline-none px-[10px] h-[15%] bg-divider"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password field using browser-native eye */}
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="w-full outline-none px-[10px] h-[15%] bg-divider mt-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className={`w-full h-[15%] text-[14px] text-white mt-4 ${
            loading ? "bg-blue/80 cursor-not-allowed" : "bg-blue"
          }`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-[14px] cursor-pointer mt-2">
          Don’t have an account?{" "}
          <Link to="/signup">
            <span className="text-lightblue">Sign Up</span>
          </Link>
        </p>
        <p className="text-[14px] cursor-pointer mt-1">
          <Link to="/forgetpassword">
            <span className="text-lightblue">Forgot Password?</span>
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Log;
