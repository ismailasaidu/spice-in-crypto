import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PaystackButton } from "react-paystack";
import { addDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../lib/init-firebase";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-toastify/dist/ReactToastify.css";
// import 'react-phone-number-input/style.css';
// import './custom-styles.css'; // Import your custom CSS
import { Link } from "react-router-dom";
import Crypto from "../Component/Crypto";
// import PhoneInput, {
//   formatPhoneNumber,
//   formatPhoneNumberIntl,
//   isPossiblePhoneNumber,
//   isValidPhoneNumber,
// } from "react-phone-number-input";

const Checkout = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [open, setOpen] = useState(false);
  const updateStateInParent = (newValue) => {
    setOpen(newValue);
  };

  open
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  const handleOpen = () => {
    setOpen(!open);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const logs = localStorage.getItem("Account");
  const loginInfo = JSON.parse(logs);
  console.log(loginInfo);

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const Cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.accountId);

  const [novalue, setnovalue] = useState(true);
  const [errors, seterrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  // const [Value, setValue] = useState("");
  console.log("Cart:", cart);
  // const coursesIds = cart.map(item => item.id)
  // console.log('CourseIds: ', coursesIds)

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
      // !formValues.address ||
      !formValues.fullname ||
      !formValues.email
      // !errors.invalid || !formValues.town
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

  const [value, setValue] = useState();

  // Submit the form

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {};
    // const regex
    if (!values.fullname) {
      errors.fullname = "Fullname required!";
    }
    // if (!values.address) {
    //   errors.address = "Adress required!";
    // }
    // if (!values.town) {
    //   errors.town = "Town/City required!";
    // }
    // if (!Value) {
    //   errors.Value = "Phone number required!";
    // } else if (Value && isValidPhoneNumber(Value)) {
    //   errors.invalid = "Invalid Phone number";
    // } else if (Value && isValidPhoneNumber(!Value)) {
    //   errors.invalid = "";
    // }

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

  let publicKey = process.env.REACT_APP_FLUTTER_KEY;

  let totalAmount = localStorage.getItem("carttotal");
  // let Total =;
  // localStorage.setItem("totalamount",JSON.stringify(Total))
  // const componentProps = {
  //   email: formValues.email,
  //   amount: `${totalAmount * 100}`,

  //   metadata: {
  //     formValues,
  //     // Value,
  //   },
  //   publicKey,
  //   text: `Pay Now(₦${totalAmount})`,
  //   onSuccess: () => {
  //     const PurchaseRef = collection(db, "Purchase");
  //     const purchaseDetailsRef = collection(db, "PurchaseDetails");
  //     const userRef = doc(db, "Accounts", userId);
  //     const coursesIds = cart.map((item) => item.id);

  //     addDoc(purchaseDetailsRef, { Cart });
  //     addDoc(PurchaseRef, {
  //       formValues,
  //       totalAmount,
  //       cart,
  //       Cart,
  //       loginInfo,
  //     })
  //       .then((response) => {
  //         navigate("/");
  //         localStorage.removeItem("CartItems");
  //         localStorage.removeItem("CartValue");

  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });

  //     // Set the "capital" field of the city 'DC'
  //     updateDoc(userRef, {
  //       userPaidCourse: arrayUnion(...coursesIds),
  //     });

  //     console.log("checkout", userId, "updated");
  //   },

  //   onClose: () => toast.error("payment cancelled"),
  // };

  const config = {
    public_key: publicKey,
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: formValues.email,
      phone_number: value,
      name: formValues.name,
    },
    customizations: {
      title: "Spice In Crypto Academy",
      description: "Payment for items in cart",
      // logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-i",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      if (response.status !== "completed") {
        toast.error("Failed Transaction");
      } else {
        const PurchaseRef = collection(db, "Purchase");
        const purchaseDetailsRef = collection(db, "PurchaseDetails");
        const userRef = doc(db, "Accounts", userId);
        const coursesIds = cart.map((item) => item.id);

        addDoc(purchaseDetailsRef, { Cart });
        addDoc(PurchaseRef, {
          formValues,
          totalAmount,
          cart,
          Cart,
          loginInfo,
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

        // Set the "capital" field of the city 'DC'
        updateDoc(userRef, {
          userPaidCourse: arrayUnion(...coursesIds),
        });

        console.log("checkout", userId, "updated");
      }
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => toast.error("payment cancelled"),
  };

  return (
    <div>
      <div
        className={`${
          open ? "opacity-[0.5]" : "opacity-1"
        }   px-14 sm:px-[10px] pt-[200px] md:pt-[100px] sm:pt-[200px]   relative`}>
        <div>
          <h1 className="text-grey mt-[50px] sm:mt-[-40px] className='cursor-pointer'">
            <span
              onClick={() => {
                navigate("/");
              }}>
              HOME/
            </span>{" "}
            <Link to="/cart">
              <span className="text-dark">CART</span>
            </Link>
          </h1>
        </div>
        <div className="mt-[40px] ">
          <h1 className="font-bold text-[38px] font-Arimo sm:text-[30px]">
            Billing details
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col  gap-[8px] mt-[50px]   ">
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
                {/* Phone Number<sup className="text-star">*</sup> */}
              </label>
              <PhoneInput
                defaultCountry="NG"
                className="w-[600px] input-phone-number border-divider  md:w-[100%] border-[2px] h-[30px] outline-none px-[20px]  sm:w-[100%]"
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />{" "}
              {/* <p className="text-red text-[12px]">{errors.phone}</p> */}
            </div>

            {/* <div className="flex flex-col">
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
            </div> */}

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
                        ${Math.round(item.data.Price * item.data.quantity)}
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
                ${totalAmount}
              </p>
            </div>
          </div>
          <div className="relative mt-[40px] justify-between border-divider border-[1px] px-[10px] py-[10px] h-[100%]   sm:h-[150px]">
            <div className="bg-white pl-[10px] pt-[10px] mr-[300px] md:mr-[10px]  text-[12px] text-darktext h-[45px]  md:h-[60px] sm:h-[80px]">
              <p className="md:px-[40px] md:py-[5px] ">
                Please contact us if you wish to make further enquiries.
              </p>
            </div>

            <button
              className="bg-blue text-white mt-[20px] w-[100%] h-[40px]   px-[10px]"
              style={{ display: isSubmit ? "none" : "block" }}
              onClick={handleSubmit}>
              Click here
            </button>

            {isSubmit ? (
              <div className="">
                <FlutterWaveButton
                  {...fwConfig}
                  className="bg-blue text-headerwhite w-[100%] h-[40px] mt-[10px] "
                />

                <button
                  className="bg-lightblue w-[100%] h-[40px] mt-[10px] "
                  onClick={handleOpen}>
                  Pay With Crypto(${totalAmount / 1000})
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
      <div
        className={`${
          open ? "block" : "hidden"
        }  absolute sm:top-[25vh] top-[30vh] sm:left-[7%] left-[35%]`}>
        <Crypto passedState={open} updateParentState={updateStateInParent} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { PaystackButton } from "react-paystack";
// import { addDoc, collection } from "firebase/firestore";
// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { doc, updateDoc, arrayUnion } from "firebase/firestore";
// // import {getStripe} from "@stripe/stripe-js"
// // import StripeCheckout from "react-stripe-checkout"

// import { ToastContainer, toast } from "react-toastify";
// import { db } from "../lib/init-firebase";
// import "react-toastify/dist/ReactToastify.css";
// // import 'react-phone-number-input/style.css';
// // import './custom-styles.css'; // Import your custom CSS
// import { Link } from "react-router-dom";
// import Crypto from "../Component/Crypto";
// import StripeCheckout from "react-stripe-checkout";
// import CheckoutForm from "../Component/CheckoutForm";
// // import PhoneInput, {
// //   formatPhoneNumber,
// //   formatPhoneNumberIntl,
// //   isPossiblePhoneNumber,
// //   isValidPhoneNumber,
// // } from "react-phone-number-input";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

// const Checkout = () => {
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);

//   const [open, setOpen] = useState(false);
//   const updateStateInParent = (newValue) => {
//     setOpen(newValue);
//   };

//   open
//     ? (document.body.style.overflow = "hidden")
//     : (document.body.style.overflow = "auto");

//   const handleOpen = () => {
//     setOpen(!open);
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const handleKeyPress = (event) => {
//     // Check if the pressed key is Enter (key code 13)
//     if (event.key === "Enter") {
//       // Trigger the button click
//       setisSubmit(true);
//     }
//   };

//   const logs = localStorage.getItem("Account");
//   const loginInfo = JSON.parse(logs);
//   console.log(loginInfo);

//   const navigate = useNavigate();
//   const cart = useSelector((state) => state.cart.cart);
//   const Cart = useSelector((state) => state.cart);
//   const userId = useSelector((state) => state.auth.accountId);

//   const [novalue, setnovalue] = useState(true);
//   const [errors, seterrors] = useState({});
//   const [isSubmit, setisSubmit] = useState(false);
//   // const [Value, setValue] = useState("");
//   // console.log('Cart:', cart);
//   // const coursesIds = cart.map(item => item.id)
//   // console.log('CourseIds: ', coursesIds)

//   useEffect(() => {
//     // console.log(errors);
//     if (Object.keys(errors).length === 0 && isSubmit) {
//     }
//   }, [errors]);

//   const initialValues = {
//     address: "",
//     fullname: "",
//     email: "",
//     //  value:Value,
//     town: "",
//   };
//   // console.log(initialValues);
//   const [formValues, setFormValues] = useState(initialValues);

//   const handleChange = (e) => {
//     console.log(e.target);
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     seterrors(validate(formValues));

//     if (
//       !formValues.address ||
//       !formValues.fullname ||
//       !formValues.email ||
//       // !Value ||
//       // !errors.invalid ||
//       !formValues.town
//     ) {
//       setisSubmit(false);
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     } else {
//       setisSubmit(true);
//     }
//   };

//   // Submit the form

//   const validate = (values) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     const errors = {};
//     // const regex
//     if (!values.fullname) {
//       errors.fullname = "Fullname required!";
//     }
//     if (!values.address) {
//       errors.address = "Adress required!";
//     }
//     if (!values.town) {
//       errors.town = "Town/City required!";
//     }
//     // if (!Value) {
//     //   errors.Value = "Phone number required!";
//     // } else if (Value && isValidPhoneNumber(Value)) {
//     //   errors.invalid = "Invalid Phone number";
//     // } else if (Value && isValidPhoneNumber(!Value)) {
//     //   errors.invalid = "";
//     // }

//     if (!values.email) {
//       errors.email = "Email required";
//     } else if (!regex.test(values.email)) {
//       errors.email = "This is not a valid email format!";
//     }

//     // if (Value && isValidPhoneNumber(Value)) {
//     //   errors.invalid=""
//     // } else {

//     // }
//     return errors;
//   };

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);

//   let totalAmount = localStorage.getItem("carttotal");

//   // const clientSecret = getClientSecret();

//   const item = {
//     price: totalAmount,
//     quantity: 1,
//   };

//   const checkoutOptions = {
//     lineItems: [item],
//     mode: "payment",
//     successUrl: `${window.location.origin}/success`,
//     cancelUrl: `${window.location.origin}/cancel`,
//   };

//   // const redirectToCheckout = async () => {
//   //   console.log("redirectToCheckout");

//   //   const stripe = await getStripe();
//   //   console.log(stripe);
//   //   const { error } = await stripe.confirmCardPayment(checkoutOptions);
//   //   console.log("Stripe checkout error", error);
//   // };

//   // stripe integration

//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("https://spice-in-crytp-api2.onrender.com/api/checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: totalAmount * 100 }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);

//   // const redirectToCheckout = async () => {
//   //   console.log("redirectToCheckout");
//   //   fetch("http://localhost:5000/api/checkout", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({ amount: totalAmount * 100 }),
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       setClientSecret(data.clientSecret);
//   //       console.log(data);
//   //     });
//   // };
//   const appearance = {
//     theme: "stripe",
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   // let publicKey = process.env.REACT_APP_API_KEY;

//   // const componentProps = {
//   //   email: formValues.email,
//   //   amount: `${totalAmount * 100}`,

//   //   metadata: {
//   //     formValues,
//   //     // Value,
//   //   },
//   //   publicKey,
//   //   text: `Pay Now(₦${totalAmount})`,
//   //   onSuccess: () => {
//   //     const PurchaseRef = collection(db, "Purchase");
//   //     const purchaseDetailsRef = collection(db, "PurchaseDetails");
//   //     const userRef = doc(db, "Accounts", userId);
//   //     const coursesIds = cart.map(item => item.id)

//   //     addDoc(purchaseDetailsRef, { Cart });
//   //     addDoc(PurchaseRef, {
//   //       formValues,
//   //       totalAmount,
//   //       cart,
//   //       Cart,
//   //       loginInfo,
//   //     })
//   //       .then((response) => {
//   //         navigate("/");
//   //         localStorage.removeItem("CartItems");
//   //         localStorage.removeItem("CartValue");

//   //         window.location.reload();
//   //       })
//   //       .catch((error) => {
//   //         // console.log(error.message);
//   //       });

//   //     // Set the "capital" field of the city 'DC'
//   //     updateDoc(userRef, {
//   //       userPaidCourse: arrayUnion(...coursesIds)
//   //     });

//   //     // console.log('checkout', userId, 'updated')
//   //   },

//   //   onClose: () => toast.error("payment cancelled"),
//   // };

//   return (
//     <div>
//       <div
//         className={`${
//           open ? "opacity-[0.5]" : "opacity-1"
//         }   px-14 sm:px-[10px] pt-[200px] md:pt-[100px] sm:pt-[200px]   relative`}>
//         <div>
//           <h1 className="text-grey mt-[50px] sm:mt-[-40px] className='cursor-pointer'">
//             <span
//               onClick={() => {
//                 navigate("/");
//               }}>
//               HOME/
//             </span>{" "}
//             <Link to="/cart">
//               <span className="text-dark">CART</span>
//             </Link>
//           </h1>
//         </div>
//         <div className="mt-[40px] ">
//           <h1 className="font-bold text-[38px] font-Arimo sm:text-[30px]">
//             Billing details
//           </h1>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-col  gap-[20px] mt-[50px]   ">
//             <div className="flex flex-col ">
//               <label htmlFor="FullName" className="text-darktext  text-[12px]">
//                 Full Name<sup className="text-star">*</sup>
//               </label>
//               <input
//                 id="FullName"
//                 type="name"
//                 name="fullname"
//                 required
//                 className="w-[600px] md:w-[100%] border-divider border-[2px] h-[30px] outline-none px-[20px]  sm:w-[100%]"
//                 value={formValues.fullname}
//                 onChange={handleChange}
//               />

//               <p className="text-red text-[12px]">{errors.fullname}</p>
//             </div>

//             <div className="flex flex-col">
//               <label
//                 htmlFor="StreetAddress"
//                 className="text-darktext text-[12px]">
//                 Street Address<sup className="text-star">*</sup>
//               </label>
//               <input
//                 id="StreetAddress"
//                 type="text"
//                 name="address"
//                 required
//                 className="w-[600px] border-divider  md:w-[100%] border-[2px] h-[30px] outline-none px-[20px]  sm:w-[100%]"
//                 value={formValues.address}
//                 onChange={handleChange}
//               />

//               <p className="text-red text-[12px]">{errors.address}</p>
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="T/C" className="text-darktext  text-[12px]">
//                 Town / City<sup className="text-star">*</sup>
//               </label>
//               <input
//                 id="T/C"
//                 type="text"
//                 name="town"
//                 className="w-[600px] border-divider border-[2px] h-[30px] outline-none px-[20px] md:w-[100%] sm:w-[100%]"
//                 value={formValues.town}
//                 onChange={handleChange}
//               />
//               <p className="text-red text-[12px]">{errors.town}</p>
//             </div>

//             {/* <div className="flex flex-col">
//               <label htmlFor="Phone" className="text-darktext  text-[12px]">
//                 Phone<sup className="text-star">*</sup>
//               </label>
//               <PhoneInput
//                 id="Phone"
//                 defaultCountry="NG"
//                 international={true}
//                 withCountryCallingCode
//                 useNationalFormatForDefaultCountryValue
//                 type="tel"
//                 name="Value"
//                 className="w-[600px] border-divider border-[2px] h-[30px] outline-none px-[20px] md:w-[100%] sm:w-[100%]"
//                 value={Value}
//                 onChange={(Value) => setValue(Value)}
//               />

//               <p className="text-red text-[12px]">{errors.Value}</p>
//               <p className="text-red text-[12px]"> {errors.invalid}</p>
//             </div> */}

//             <div className="flex flex-col">
//               <label htmlFor="Email" className="text-darktext  text-[12px]">
//                 Email address<sup className="text-star">*</sup>
//               </label>
//               <input
//                 id="Email"
//                 type="email"
//                 name="email"
//                 className="w-[600px] border-divider border-[2px] h-[30px] outline-none px-[20px] md:w-[100%]  sm:w-[100%]"
//                 value={formValues.email}
//                 onChange={handleChange}
//               />
//               <p className="text-red text-[12px]">{errors.email}</p>
//             </div>
//           </div>

//           <div className="mt-[40px] ">
//             <h1 className="font-bold text-[34px] font-Arimo sm:text-[30px]">
//               Your Order
//             </h1>
//           </div>
//           <div className="mt-[40px] ">
//             <div className="flex flex-row py-[5px] justify-between border-divider border-[1px] px-[250px] h-[30px] md:px-[50px] sm:px-[40px] ">
//               <p className="font-bold font-Arimo">Product</p>
//               <p className="font-bold font-Arimo">Total</p>
//             </div>
//             {cart.length > 0
//               ? cart.map((item) => {
//                   return (
//                     <div className="flex flex-row justify-between border-divider border-[1px] py-[5px] px-[250px] h-[30px]  md:px-[50px]   sm:px-[40px]">
//                       <p className="font-medium text-[14px] lowercase text-darktext font-Arimo">
//                         {item.data.Description}
//                       </p>
//                       <p className="font-medium text-[14px]  text-darktext font-Arimo">
//                         ₦{Math.round(item.data.Price * item.data.quantity)}
//                       </p>
//                     </div>
//                   );
//                 })
//               : ""}
//             <div className="flex flex-row justify-between border-divider border-[1px] py-[5px] px-[250px] h-[30px] md:px-[50px]  sm:px-[40px]">
//               <p className="font-bold text-[16px] text-darktext font-Arimo">
//                 Subtotal
//               </p>
//               <p className="font-bold text-[16px]  text-dark font-Arimo">
//                 {/* ₦{totalAmount} */}
//               </p>
//             </div>
//           </div>
//           <div className="relative mt-[40px] justify-between border-divider border-[1px] px-[10px] py-[10px] h-[100%]   sm:h-[150px]">
//             <div className="bg-white pl-[10px] pt-[10px] mr-[300px] md:mr-[10px]  text-[12px] text-darktext h-[45px]  md:h-[60px] sm:h-[80px]">
//               <p className="md:px-[40px] md:py-[5px] ">
//                 Please contact us if you wish to make further enquiries.
//               </p>
//             </div>

//             <button
//               className="bg-blue text-white mt-[20px] w-[100%] h-[40px]   px-[10px]"
//               style={{ display: isSubmit ? "none" : "block" }}
//               onClick={handleSubmit}>
//               Click here
//             </button>

//             <StripeCheckout
//               label="Buy Now"
//               currency="USD"
//               stripeKey="pk_test_51LuCt6KMMJ59eTi4rGHxzACXEwBTicT1VR4I7G0GClwMpz55WVTIoXeYaQRLusaxBnBPsb8sOxVX5qf1Nk9AMeIJ00Vph6MUDn"
//               description={`${totalAmount}`}
//             />

//             {isSubmit ? (
//               <div className="">
//                 <PaystackButton
//                   // {...componentProps}
//                   className="bg-secondary bg-blue    h-[40px] w-[100%]   text-white  sm:h-[40px] sm:text-[12px] sm:right-[10px] sm:top-[100px]"
//                 />

//                 <button
//                   className="bg-lightblue w-[100%] h-[40px] mt-[10px] "
//                   onClick={handleOpen}>
//                   {/* Pay With Crypto(${(totalAmount/1000)}) */}
//                 </button>
//               </div>
//             ) : (
//               ""
//             )}
//           </div>
//         </form>
//         {clientSecret && (
//           <Elements options={options} stripe={stripePromise}>
//             <CheckoutForm />
//           </Elements>
//         )}
//       </div>
//       <div
//         className={`${
//           open ? "block" : "hidden"
//         }  absolute sm:top-[25vh] top-[30vh] sm:left-[7%] left-[35%]`}>
//         <Crypto passedState={open} updateParentState={updateStateInParent} />
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Checkout;
