import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";
import { ClipLoader } from "react-spinners";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../lib/init-firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../Component/ScrollToTop";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const userId = useSelector((state) => state.auth.accountId);
  const loginInfo = JSON.parse(localStorage.getItem("Account"));

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [currency, setCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState(1600);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 2000 });

    const fetchRate = async () => {
      try {
        const rateDocRef = doc(db, "Rate", "current");
        const rateSnap = await getDoc(rateDocRef);
        if (rateSnap.exists()) {
          const rateData = rateSnap.data();
          if (rateData.nairaRate) setExchangeRate(Number(rateData.nairaRate));
        }
      } catch (error) {
        console.error("Error fetching rate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validationErrors = {};
    if (!formValues.firstname)
      validationErrors.firstname = "First name required!";
    if (!formValues.lastname) validationErrors.lastname = "Last name required!";
    if (!formValues.email) validationErrors.email = "Email required!";
    else if (!regex.test(formValues.email))
      validationErrors.email = "Invalid email format!";
    if (!currency)
      validationErrors.currency = "Please select your home currency!";
    return validationErrors;
  };

  const totalUSD = cart.reduce((acc, item) => {
    const price = parseFloat(item.data.Price) || 0;
    const qty = parseInt(item.data.quantity) || 1;
    return acc + price * qty;
  }, 0);

  const totalAmount =
    currency === "NGN" ? totalUSD * (Number(exchangeRate) || 0) : totalUSD;

  const publicKey = process.env.REACT_APP_FLW_PUBLIC_KEY;

  const fwConfig = {
    public_key: publicKey,
    tx_ref: `TX-${Date.now()}`,
    amount: 100,
    currency,
    payment_options: "card, banktransfer, ussd",
    customer: {
      email: formValues.email,
      name: `${formValues.firstname} ${formValues.lastname}`,
    },
    customizations: {
      title: "Spice In Crypto Academy",
      description: "Payment for courses",
      logo: `${window.location.origin}/logo.png`,
    },
    callback: async (response) => {
      try {
        const status = (response.status || "").toLowerCase();
        const isSuccessful = ["successful", "success", "completed"].includes(
          status
        );

        if (!isSuccessful || !response.transaction_id) {
          toast.error(
            `❌ Payment failed. Status: ${response.status || "unknown"}`
          );
          closePaymentModal();
          return;
        }

        const PurchaseRef = collection(db, "Purchase");
        const purchaseDetailsRef = collection(db, "PurchaseDetails");
        const userRef = doc(db, "Accounts", userId);
        const coursesIds = cart.map((item) => item.id);

        await addDoc(purchaseDetailsRef, { cart });
        await addDoc(PurchaseRef, {
          firstname: formValues.firstname,
          lastname: formValues.lastname,
          email: formValues.email,
          totalUSD,
          totalAmount,
          currency,
          exchangeRate,
          cart,
          loginInfo,
          transaction_id: response.transaction_id,
        });

        // 🔑 Add purchased courses to user's account (real-time sync)
        await updateDoc(userRef, {
          userPaidCourse: arrayUnion(...coursesIds),
        });

        dispatch(clearCart());
        toast.success(
          `✅ Payment successful! Transaction ID: ${response.transaction_id}`
        );
        closePaymentModal();
        navigate("/");
      } catch (error) {
        console.error("Error handling payment callback:", error);
        toast.error("⚠️ Error processing payment. Please check your account.");
        closePaymentModal();
      }
    },
    onClose: () => toast.info("Payment cancelled"),
  };

  const handlePaymentClick = (launchPayment) => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.warning("⚠️ Please complete all required fields");
      return;
    }

    launchPayment();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4f9ef7" size={60} />
      </div>
    );
  }

  return (
    <div className="px-14 sm:px-[10px] pt-[200px] md:pt-[100px] sm:pt-[200px] relative">
      <ScrollToTop trigger={!loading} />

      <h1 className="text-grey mt-[50px] sm:mt-[-40px]">
        <span onClick={() => navigate("/")}>HOME/</span>{" "}
        <Link to="/cart">
          <span className="text-dark">CART</span>
        </Link>
      </h1>

      <h1 className="font-bold text-[38px] font-Arimo sm:text-[30px] mt-[40px]">
        Billing details
      </h1>

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

        <div className="flex flex-col mt-4">
          <label className="text-darktext text-[12px]">
            Select Home Currency<sup className="text-star">*</sup>
          </label>
          <select
            className="w-[600px] md:w-[100%] border-divider border-[2px] h-[35px] outline-none px-[20px]"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="">-- Choose Your Home Currency --</option>
            <option value="NGN">Nigeria (₦ Naira)</option>
            <option value="USD">Abroad ($ Dollar)</option>
          </select>
          <p className="text-red text-[12px]">{errors.currency}</p>
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

        {cart.map((item) => {
          const price = parseFloat(item.data.Price) || 0;
          const qty = parseInt(item.data.quantity) || 1;
          const itemTotal =
            currency === "NGN" ? price * qty * exchangeRate : price * qty;

          return (
            <div
              key={item.id}
              className="flex flex-row justify-between border-divider border-[1px] py-[5px] px-[50px] h-[30px]"
            >
              <p className="font-medium text-[14px] lowercase text-darktext font-Arimo">
                {item.data.Description}
              </p>
              <p className="font-medium text-[14px] text-darktext font-Arimo">
                {currency === "NGN" ? "₦" : "$"}
                {Math.round(itemTotal)}
              </p>
            </div>
          );
        })}

        <div className="flex flex-row justify-between border-divider border-[1px] py-[5px] px-[50px] h-[30px]">
          <p className="font-bold text-[16px] text-darktext font-Arimo">
            Subtotal
          </p>
          <p className="font-bold text-[16px] text-dark font-Arimo">
            {currency === "NGN" ? "₦" : "$"}
            {totalAmount.toFixed(2)}
          </p>
        </div>

        <p className="text-[12px] text-grey mt-2">
          💱 Current Rate: 1 USD = ₦{exchangeRate}
        </p>
      </div>

      <FlutterWaveButton
        {...fwConfig}
        text="Pay Now"
        className="bg-blue text-white mt-[20px] w-[100%] h-[40px]"
        onClick={(e, launchPayment) => handlePaymentClick(launchPayment)}
      />

      <ToastContainer />
    </div>
  );
};

export default Checkout;
