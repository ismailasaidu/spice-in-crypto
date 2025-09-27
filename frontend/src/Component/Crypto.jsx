import React from "react";
import logo from "../Assets/logo.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { GrFormClose } from "react-icons/gr";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const cryptos = [
  {
    img: "/btc.png",
    name: "BTC",
    address: "bc1qcrpm3df07qgpzqdckn2xgjtdgyxnh7y3zd3avm",
  },
  {
    img: "/usdt.png",
    name: "USDT(BEP20)",
    address: "0x7683c15417ae4c5C02CC99406CB048eb26aebA34",
  },
  {
    img: "/usdt.png",
    name: "USDT(TRC20)",
    address: "TVEe3kqh1CRFSePhSL3JXJjxhni2GFrw5R",
  },
];

const Crypto = (props) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // const [first, setfirst] = useState(second)

  const handleButtonClick = () => {
    // Update the state in the parent by invoking the callback function
    props.updateParentState(false);
  };

  let totalAmount = localStorage.getItem("carttotal");
  const handleCopyAddress = (address) => {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);

    // Set its value to the crypto address
    tempInput.value = address;

    // Select the input field
    tempInput.select();

    // Execute the copy command
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Optionally, provide user feedback (e.g., toast message)
    toast.success(`Address ${address} copied to clipboard!`);
  };

  return (
    <div>
      <div
        data-aos="zoom-out"
        className="flex flex-col gap-[5%] justify-center w-[30vw] sm:w-[90%] h-[60vh] bg-divider p-[5%] ">
        <div className="flex justify-between items-center ">
          <h1 className="text-[1rem]">Pay with Cryptocurrency</h1>
          <h1
            className="text-[22px] cursor-pointer"
            onClick={handleButtonClick}>
            <GrFormClose />
          </h1>
        </div>
        <div className=" text-grey">
          <p className="text-[14px]">
            Pay <span className="font-bold text-lightblue">${totalAmount}</span>{" "}
            worth of crypto to any of the address below. click Confirm Payment
            below to validate your transaction.
          </p>
        </div>
        {cryptos.map((item, index) => (
          <div className=" text-black px-[3%] cursor-pointer flex items-center justify-between text-[12px] bg-white rounded w-[100%] h-[40%] ">
            <div className="flex items-center gap-[10px]">
              <img width={30} src={item.img} />
              <h1 className="text-[12px]">{item.name}</h1>
            </div>

            <div className="w-[40%] overflow-hidden">
              <p>{item.address}</p>
            </div>
            <h1 onClick={() => handleCopyAddress(item.address)}>Copy</h1>
          </div>
        ))}
        <div className="flex w-[100%] h-[40%] justify-center  items-center bg-blue">
          <button
            className="text-white font-bold"
            onClick={() => {
              window.open("https://wa.link/0c3bzp");
            }}>
            Confirm Payment
          </button>
        </div>

        {/* <div className=' text-black bg-white w-[100%] rounded h-[20%] '>
                <h1>USDT(BEP20)</h1>
            </div>
            <div className=' text-black bg-white w-[100%] rounded h-[20%] '>
                <h1>USDT(TRC20)</h1>
            </div> */}
      </div>
    </div>
  );
};

export default Crypto;
