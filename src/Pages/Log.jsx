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

const Log = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accounts, setAccounts] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.loggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
   isLoggedIn && navigate("/")
  }, [])
  

  console.log(isLoggedIn)
  

  // const [previousPage, setPreviousPage] = useState(null);

  // useEffect(() => {
  //   // Store the previous page's URL in the state
  //   setPreviousPage(document.referrer);
  // }, []);

  const {logIn, logOut} = authSlice.actions;

  const handleSubmit = async (e) => {
    e.preventDefault();

   
  
    const Account = collection(db, "Accounts");
    const res = await getDocs(Account);
    const account = await res.docs.map(doc => ({
      data: doc.data(),
      
      id: doc.id,
    }))
    
    const user = account.find(item => item.data.Email === email && item.data.Password === password)

    if (user){
      alert("logged in")
      dispatch(logIn());
      navigate(-1);
      localStorage.setItem('Account', user.data.Email === email &&  user.data.Password === password)

    }else{
      alert('Password or email incorrect')
    }
    console.log(user, 'here')


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
        <div className="bg-lightblue flex justify-center items-center h-[100vh]">
          <div className="bg-white w-[30%] flex justify-between items-center flex-col px-[20px] py-[30px] h-[40%] mt-[100px]">
            <input
              type="email "
              placeholder="Email"
              className="w-[100%] outline-none px-[10px] h-[20%] bg-divider"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="email "
              placeholder="Password"
              className="w-[100%] outline-none px-[10px] h-[20%] bg-divider"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="bg-blue w-[100%] h-[20%] text-[14px] text-white"
              onClick={handleSubmit}>
              LOGIN
            </button>
            <p className="text-[14px]">
              Not a member?{" "}
              <Link to="/signup">
                <span className="text-lightblue cursor-pointer">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Log;
