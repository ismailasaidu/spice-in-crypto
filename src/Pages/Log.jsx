import React from "react";
import { useState, useEffect, Component } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "../lib/init-firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../redux/AuthSlice";

import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../lib/init-firebase"

const Log = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accounts, setAccounts] = useState("");

// smoke33@gmail.Component
// @Bigsmok1

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    isLoggedIn && navigate("/");
    // navigate(-1);
  }, []);

  // const [previousPage, setPreviousPage] = useState(null);

  // useEffect(() => {
  //   // Store the previous page's URL in the state
  //   setPreviousPage(document.referrer);
  // }, []);

  const { logIn, logOut } = authSlice.actions;
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      // signInWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //     console.log(userCredential.user.uid, "authData");
      //     dispatch(logIn({id: userCredential.user.uid, accountId}));
      //     navigate("/");
      //     localStorage.setItem("Account", JSON.stringify({loggedIn: true, id: userCredential.user.uid}));
      //   })
      //   .catch(
      //     (err) => {
      //       // toast.error(err.message);
      //       console.log(err)
      //   }
      // );
      
      try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uId = userCredential.user.uid;

        if (uId) {
          const Account = collection(db, "Accounts");
          const res = await getDocs(Account);
          const accountIds = res.docs.map((doc) => ({uId: doc.data().id, accountId: doc.id}));
          // console.log("The response that matters", accountIds);
          const accountIdSet = accountIds.find((idSet) => idSet.uId === uId);
          // console.log("The response that i need", accountId, uId, accountIds);

          dispatch(logIn({id: uId, accountId: accountIdSet.accountId}));
          navigate("/");
          localStorage.setItem("Account", JSON.stringify({loggedIn: true, id: uId, accountId: accountIdSet.accountId}));

        }
      }
      catch(err){
          toast.error(err.message);
          console.log(err)
      }
          // const Account = collection(db, "Accounts");
          // const res = await getDocs(Account);
          // const account = await res.docs.map((doc) => ({
            //   data: doc.data(),
            //   id: doc.id,
            // }));

            
    // console.log('User', user);
    // if (user) {
    //   alert("logged in");
    //   console.log(user.id)
    //   dispatch(logIn(user.id));
    //   navigate("/");

    //   localStorage.setItem("Account", JSON.stringify({loggedIn: true, id: user.id}));
    // } else {
    //   alert("Password or email incorrect");
    // }

    // getDocs(Account)
    //   .then((response) => {
    //     const account = response.docs.map((doc) => ({
    //       data: doc.data(),
    //       id: doc.id,
    //     }))
    //     .then(account => {
    //       const user = account.find(item => item.data.Email === email && item.data.Password === password)
    //     })
    //     .then(user => console.log(user, 'me'))
    // account.find((item) => {
    //   if (item.data.Email === email && item.data.Password === password) {
    //     alert("logged in")
    //     dispatch(logIn());
    //     navigate(-1);
    //     // localStorage.setItem("isLoggedIn", "true");
    //   } else if(item.data.Email !== email && item.data.Password !== password) {
    //     alert("password or email incorrect");
    //   }

    // if (previousPage) {
    //   window.location.href = previousPage;
    //   // console.log(previousPage)
    // } else {
    //   // If no previous page, redirect to a default page
    //   window.location.href = '/';
    // }
    // });
    // console.log(accounts);
    // })

    //     .catch((error) => toast.error(error.message));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="bg-lightblue flex justify-center items-center h-[100vh] ">
          <div className="bg-white w-[30%] sm:w-[80%] sm:mt-[-20px] flex justify-between md:gap-[10px]  flex-col px-[20px] py-[30px] h-[40%] mt-[100px] md:mt-[40px] ">
            <input
              type="email "
              placeholder="Email"
              className="w-[100%] outline-none px-[10px] h-[20%] bg-divider"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[100%] outline-none px-[10px] h-[20%] bg-divider"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
      <Link to="/forgetpassword">
      <p className="text-[12px] text-lightblue">Forgot Password?</p>
      </Link>

    

            <button
              className="bg-blue w-[100%] h-[20%] text-[14px]  text-white"
              onClick={handleSubmit}>
              LOGIN
            </button>
            <p className="text-[14px] text-center ">
              Not a member?{" "}
              <Link to="/signup">
                <span className="text-lightblue cursor-pointer">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Log;
