import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/init-firebase";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Value, setValue] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const EbooksRef = collection(db, "Admin");

    getDocs(EbooksRef)
      .then((response) => {
        const Ebooks = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        Ebooks.map((item) => {
          setValue(item);
        });
        console.log(Value);

        if (Value.data.email === email && Value.data.password === password) {
          navigate("/newproduct");
          localStorage.setItem("user", JSON.stringify(Value));
        } else {
          alert("your are not an admin");
        }
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="flex items-center   justify-center h-screen text bg-blue ">
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
          <div className="form-control">
            <input className="outline-none px-[10px]"
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <input className="outline-none px-[10px]"
              type="text"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <button
              className="w-[30%] text-[14px] bg-white text-blue"
              onClick={handleSubmit}>
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
