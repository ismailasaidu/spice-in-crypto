import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../lib/init-firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    fullname: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const Cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.accountId);

  const logs = localStorage.getItem("Account");
  const loginInfo = JSON.parse(logs);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};
    if (!values.firstname) errors.firstname = "First name required!";
    if (!values.lastname) errors.lastname = "Last name required!";
    if (!values.email) errors.email = "Email required!";
    else if (!regex.test(values.email)) errors.email = "Invalid email format!";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setErrors(validationErrors);
    const isValid = Object.keys(validationErrors).length === 0;
    setIsSubmit(isValid);
    if (!isValid) {
      toast.error("Please fill in all fields correctly!");
    }
  };

  const totalAmount = localStorage.getItem("carttotal");
  const publicKey = process.env.REACT_APP_FLUTTER_KEY;

  const fwConfig = {
    public_key: publicKey,
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: "USD",
    payment_options: "card, banktransfer, ussd",
    customer: {
      email: formValues.email,
      name: `${formValues.firstname} ${formValues.lastname}`,
    },
    customizations: {
      title: "Spice In Crypto Academy",
      description: "Payment for items in cart",
    },
    callback: async (response) => {
      if (response.status === "successful") {
        try {
          const PurchaseRef = collection(db, "Purchase");
          const purchaseDetailsRef = collection(db, "PurchaseDetails");
          const userRef = doc(db, "Accounts", userId);
          const coursesIds = cart.map((item) => item.id);

          await addDoc(purchaseDetailsRef, { Cart });
          await addDoc(PurchaseRef, {
            formValues,
            totalAmount,
            cart,
            Cart,
            loginInfo,
            paymentResponse: response,
            date: new Date().toISOString(),
          });

          await updateDoc(userRef, {
            userPaidCourse: arrayUnion(...coursesIds),
          });

          toast.success("Payment successful!");
          localStorage.removeItem("CartItems");
          localStorage.removeItem("CartValue");
          navigate("/signals"); // redirect after success
        } catch (error) {
          console.error(error);
          toast.error("Error saving purchase details");
        }
      } else {
        toast.error("Payment failed");
      }
      closePaymentModal();
    },
    onClose: () => toast.info("Payment cancelled"),
    text: `Pay with Flutterwave ($${totalAmount})`,
  };

  return (
    <div className="px-14 sm:px-[10px] pt-[200px] md:pt-[100px] sm:pt-[200px] relative">
      <h1 className="text-grey mt-[50px] sm:mt-[-40px]">
        <span onClick={() => navigate("/")}>HOME/</span>{" "}
        <Link to="/cart">
          <span className="text-dark">CART</span>
        </Link>
      </h1>

      <h1 className="font-bold text-[38px] font-Arimo sm:text-[30px] mt-[40px]">
        Billing details
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[8px] mt-[50px]">
          <div className="flex flex-col">
            <label className="text-darktext text-[12px]">
              First Name<sup className="text-star">*</sup>
            </label>
            <input
              type="text"
              name="firstname"
              className="w-[600px] md:w-[100%] border-divider border-[2px] h-[30px] outline-none px-[20px]"
              value={formValues.firstname}
              onChange={handleChange}
            />
            <p className="text-red text-[12px]">{errors.firstname}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-darktext text-[12px]">
              Last Name<sup className="text-star">*</sup>
            </label>
            <input
              type="text"
              name="lastname"
              className="w-[600px] md:w-[100%] border-divider border-[2px] h-[30px] outline-none px-[20px]"
              value={formValues.lastname}
              onChange={handleChange}
            />
            <p className="text-red text-[12px]">{errors.lastname}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-darktext text-[12px]">
              Email address<sup className="text-star">*</sup>
            </label>
            <input
              type="email"
              name="email"
              className="w-[600px] md:w-[100%] border-divider border-[2px] h-[30px] outline-none px-[20px]"
              value={formValues.email}
              onChange={handleChange}
            />
            <p className="text-red text-[12px]">{errors.email}</p>
          </div>
        </div>

        <h1 className="font-bold text-[34px] font-Arimo sm:text-[30px] mt-[40px]">
          Your Order
        </h1>
        <div className="mt-[40px]">
          <div className="flex flex-row py-[5px] justify-between border-divider border-[1px] px-[50px] h-[30px]">
            <p className="font-bold font-Arimo">Product</p>
            <p className="font-bold font-Arimo">Total</p>
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-row justify-between border-divider border-[1px] py-[5px] px-[50px] h-[30px]"
            >
              <p className="font-medium text-[14px] lowercase text-darktext font-Arimo">
                {item.data.Description}
              </p>
              <p className="font-medium text-[14px] text-darktext font-Arimo">
                ${Math.round(item.data.Price * item.data.quantity)}
              </p>
            </div>
          ))}

          <div className="flex flex-row justify-between border-divider border-[1px] py-[5px] px-[50px] h-[30px]">
            <p className="font-bold text-[16px] text-darktext font-Arimo">
              Subtotal
            </p>
            <p className="font-bold text-[16px] text-dark font-Arimo">
              ${totalAmount}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue text-white mt-[20px] w-[100%] h-[40px]"
        >
          Proceed to Payment
        </button>
      </form>

      {isSubmit && (
        <div className="mt-[20px]">
          <FlutterWaveButton
            {...fwConfig}
            className="bg-blue text-white w-[100%] h-[40px]"
          />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Checkout;
