import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PaystackButton } from "react-paystack";
import { addDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import { db } from "../lib/init-firebase";
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-number-input/style.css';
import { Link } from "react-router-dom";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";

const Checkout = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

 

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const Cart = useSelector((state) => state.cart);
  const [novalue, setnovalue] = useState(true);
  const [errors, seterrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [Value, setValue] = useState("");
  // console.log(Value);

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
    }
  }, [errors]);

  const initialValues = {
    address: "",
    fullname: "",
    email: "",
    //  value:Value,
    town: "",
  };
  console.log(initialValues);
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    seterrors(validate(formValues));

    if (
      !formValues.address ||
      !formValues.fullname ||
      !Value ||
      !errors.invalid ||
      !formValues.town
    ) {
      setisSubmit(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setisSubmit(true);
    }
  };

  // Submit the form

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {};
    // const regex
    if (!values.fullname) {
      errors.fullname = "Fullname required!";
    }
    if (!values.address) {
      errors.address = "Adress required!";
    }
    if (!values.town) {
      errors.town = "Town/City required!";
    }
    if (!Value) {
      errors.Value = "Phone number required!";
    } else if (Value && isValidPhoneNumber(Value)) {
      errors.invalid = "Invalid Phone number";
    } else if (Value && isValidPhoneNumber(!Value)) {
      errors.invalid = "";
    }

    if (!values.email) {
      errors.email = "Email required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    // if (Value && isValidPhoneNumber(Value)) {
    //   errors.invalid=""
    // } else {

    // }
    return errors;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  // pk_live_0ee68ae5a3a802ae06f2601a024d3626d4a3ab11
  let publicKey = "pk_test_d1f0052807510e076b88b932ec0951db128e0f9a";

  let totalAmount = localStorage.getItem("carttotal");
  // let Total =;
  // localStorage.setItem("totalamount",JSON.stringify(Total))
  const componentProps = {
    email: formValues.email,
    amount: `${totalAmount * 100}`,

    metadata: {
      formValues,
      Value,
    },
    publicKey,
    text: `Pay Now(₦${totalAmount})`,
    onSuccess: () => {
      const PurchaseRef = collection(db, "Purchase");
      const purchaseDetailsRef = collection(db, "PurchaseDetails");
      addDoc(purchaseDetailsRef, { Cart });
      addDoc(PurchaseRef, {
        formValues,
        totalAmount,
        cart,
        Cart,
      })
        .then((response) => {
          navigate("/");
          localStorage.removeItem("CartItems");
          localStorage.removeItem("CartValue");
       
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    onClose: () => toast.error("payment cancelled"),
  };

  return (
    <div>
      <div className="px-14 sm:px-[10px] pt-[200px] sm:pt-[200px]  relative">
        <div>
          <h1 className="text-grey mt-[50px] sm:mt-[-40px] className='cursor-pointer'">
            <span
              onClick={() => {
                navigate("/");
              }}>
              HOME/
            </span>{" "}
            <Link to="/cart">
            <span className="text-dark">SHOPPING CART</span>
            </Link>
         
          </h1>
        </div>
        <div className="mt-[40px] ">
          <h1 className="font-bold text-[38px] font-Arimo sm:text-[30px]">
            Billing details
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col  gap-[20px] mt-[50px]   ">
            <div className="flex flex-col ">
              <label htmlFor="FullName" className="text-darktext  text-[12px]">
                Full Name<sup className="text-star">*</sup>
              </label>
              <input
                id="FullName"
                type="name"
                name="fullname"
                required
                className="w-[600px] md:w-[100%] border-divider border-[2px] h-[30px] outline-none px-[20px]  sm:w-[100%]"
                value={formValues.fullname}
                onChange={handleChange}
              />

              <p className="text-red text-[12px]">{errors.fullname}</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="StreetAddress"
                className="text-darktext text-[12px]">
                Street Address<sup className="text-star">*</sup>
              </label>
              <input
                id="StreetAddress"
                type="text"
                name="address"
                required
                className="w-[600px] border-divider  md:w-[100%] border-[2px] h-[30px] outline-none px-[20px]  sm:w-[100%]"
                value={formValues.address}
                onChange={handleChange}
              />

              <p className="text-red text-[12px]">{errors.address}</p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="T/C" className="text-darktext  text-[12px]">
                Town / City<sup className="text-star">*</sup>
              </label>
              <input
                id="T/C"
                type="text"
                name="town"
                className="w-[600px] border-divider border-[2px] h-[30px] outline-none px-[20px] md:w-[100%] sm:w-[100%]"
                value={formValues.town}
                onChange={handleChange}
              />
              <p className="text-red text-[12px]">{errors.town}</p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Phone" className="text-darktext  text-[12px]">
                Phone<sup className="text-star">*</sup>
              </label>
              <PhoneInput
                id="Phone"
                defaultCountry="NG"
                international={true}
                withCountryCallingCode
                useNationalFormatForDefaultCountryValue
                type="tel"
                name="Value"
                className="w-[600px] border-divider border-[2px] h-[30px] outline-none px-[20px] md:w-[100%] sm:w-[100%]"
                value={Value}
                onChange={(Value) => setValue(Value)}
              />

              <p className="text-red text-[12px]">{errors.Value}</p>
              <p className="text-red text-[12px]"> {errors.invalid}</p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Email" className="text-darktext  text-[12px]">
                Email address<sup className="text-star">*</sup>
              </label>
              <input
                id="Email"
                type="email"
                name="email"
                className="w-[600px] border-divider border-[2px] h-[30px] outline-none px-[20px] md:w-[100%]  sm:w-[100%]"
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="text-red text-[12px]">{errors.email}</p>
            </div>
          </div>

          <div className="mt-[40px] ">
            <h1 className="font-bold text-[34px] font-Arimo sm:text-[30px]">
              Your Order
            </h1>
          </div>
          <div className="mt-[40px] ">
            <div className="flex flex-row py-[5px] justify-between border-divider border-[1px] px-[250px] h-[30px] md:px-[50px] sm:px-[40px] ">
              <p className="font-bold font-Arimo">Product</p>
              <p className="font-bold font-Arimo">Total</p>
            </div>
            {cart.length > 0
              ? cart.map((item) => {
                  return (
                    <div className="flex flex-row justify-between border-divider border-[1px] py-[5px] px-[250px] h-[30px]  md:px-[50px]   sm:px-[40px]">
                      <p className="font-medium text-[14px] lowercase text-darktext font-Arimo">
                        {item.data.Description}
                      </p>
                      <p className="font-medium text-[14px]  text-darktext font-Arimo">
                        ₦{Math.round(item.data.Price * item.data.quantity)}
                      </p>
                    </div>
                  );
                })
              : ""}
            <div className="flex flex-row justify-between border-divider border-[1px] py-[5px] px-[250px] h-[30px] md:px-[50px]  sm:px-[40px]">
              <p className="font-bold text-[16px] text-darktext font-Arimo">
                Subtotal
              </p>
              <p className="font-bold text-[16px]  text-dark font-Arimo">
                ₦{totalAmount}
              </p>
            </div>
          </div>
          <div className="relative mt-[40px] justify-between border-divider border-[1px] px-[10px] py-[10px] h-[160px]   sm:h-[150px]">
            <div className="bg-back pl-[10px] pt-[10px] mr-[300px] md:mr-[10px]  text-[12px] text-darktext h-[45px]  md:h-[60px] sm:h-[80px]">
              <p className="md:px-[40px] md:py-[5px] ">
                Cash on delivery. Please contact us if you require assistance or
                wish to make alternate arrangements.
              </p>
            </div>

            <button
              className="bg-blue text-white mt-[20px] px-[10px]"
              style={{ display: isSubmit ? "none" : "block" }}
              onClick={handleSubmit}
           
              >
              Click here
            </button>

            {isSubmit ? (
              <PaystackButton
                {...componentProps}
                className="bg-secondary bg-blue absolute right-[20px] top-[80px]  h-[50px] w-[150px]   text-white sm:w-[100px] sm:h-[40px] sm:text-[12px] sm:right-[10px] sm:top-[100px]"
              />
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
