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
  const [exchangeRate, setExchangeRate] = useState(1600);
  const [loading, setLoading] = useState(true);

  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [cryptoScreenshot, setCryptoScreenshot] = useState(null);

  const paystackKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const ownerWhatsAppNumber = "2349012916019"; // e.g., 2348012345678

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
    return validationErrors;
  };

  const totalUSD = cart.reduce((acc, item) => {
    const price = parseFloat(item.data.Price) || 0;
    const qty = parseInt(item.data.quantity) || 1;
    return acc + price * qty;
  }, 0);

  const totalAmount = totalUSD * exchangeRate;

  // =========================
  // Paystack Handler
  // =========================
  const handlePaymentClick = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.warning("⚠️ Please complete all required fields");
      return;
    }

    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }

    const paystackCallback = (response) => {
      (async () => {
        try {
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
            cart,
            loginInfo,
            transaction_id: response.reference,
          });

          await updateDoc(userRef, {
            userPaidCourse: arrayUnion(...coursesIds),
          });

          dispatch(clearCart());
          toast.success("✅ Payment successful!");
          navigate("/");
        } catch (error) {
          console.error("Payment processing error:", error);
          toast.error(
            "⚠️ Error processing payment. Please check your account."
          );
        }
      })();
    };

    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email: formValues.email,
      amount: totalAmount * 100,
      currency: "NGN",
      ref: `PSK-${Date.now()}`,
      onClose: () => toast.info("Payment cancelled"),
      callback: paystackCallback,
    });

    handler.openIframe();
  };

  // =========================
  // Crypto Modal Handlers
  // =========================
  const handleCryptoPayment = () => setShowCryptoModal(true);
  const closeCryptoModal = () => setShowCryptoModal(false);
  const handleScreenshotChange = (e) => setCryptoScreenshot(e.target.files[0]);

  const handleConfirmCryptoPayment = () => {
    const coursesList = cart.map((item) => item.data.Description).join(", ");
    const whatsappMessage = encodeURIComponent(
      `Hello, I’ve sent payment for the following courses: ${coursesList}, totaling $${totalUSD.toFixed(
        2
      )}. Kindly confirm my payment.`
    );

    const whatsappLink = `https://wa.me/${ownerWhatsAppNumber}?text=${whatsappMessage}`;
    window.open(whatsappLink, "_blank");
    closeCryptoModal();
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
        {/* First Name */}
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

        {/* Last Name */}
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

        {/* Email */}
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

        {cart.map((item) => {
          const price = parseFloat(item.data.Price) || 0;
          const qty = parseInt(item.data.quantity) || 1;
          const itemTotal = price * qty * exchangeRate;

          return (
            <div
              key={item.id}
              className="flex flex-row justify-between border-divider border-[1px] py-[5px] px-[50px] h-[30px]"
            >
              <p className="font-medium text-[14px] lowercase text-darktext font-Arimo">
                {item.data.Description}
              </p>
              <p className="font-medium text-[14px] text-darktext font-Arimo">
                ₦{Math.round(itemTotal)}
              </p>
            </div>
          );
        })}

        <div className="flex flex-row justify-between border-divider border-[1px] py-[5px] px-[50px] h-[30px]">
          <p className="font-bold text-[16px] text-darktext font-Arimo">
            Subtotal
          </p>
          <p className="font-bold text-[16px] text-dark font-Arimo">
            ₦{totalAmount.toFixed(2)}
          </p>
        </div>

        <p className="text-[12px] text-grey mt-2">
          💱 Current Rate: 1 USD = ₦{exchangeRate}
        </p>
      </div>

      <button
        className="bg-blue text-white mt-[20px] w-[100%] h-[40px]"
        onClick={handlePaymentClick}
      >
        Pay Now
      </button>
      <button
        style={{
          backgroundColor: "#16a34a", // green-600 equivalent
          color: "white",
          marginTop: "1rem",
          width: "100%",
          height: "2.75rem", // 11 * 0.25rem = 2.75rem
          fontWeight: "600",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s",
        }}
        onClick={handleCryptoPayment}
      >
        Pay with Crypto
      </button>

      {showCryptoModal && (
        <div className="fixed inset-0 z-50 flex mt-16 items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="relative w-full max-w-md shadow-2xl border bg-gradient-to-b from-[#0f172a] to-[#020617] text-white">
            {/* Close */}
            <button
              onClick={closeCryptoModal}
              className="absolute top-2 right-3 text-white text-xl font-bold hover:text-red-400"
            >
              &times;
            </button>

            {/* Header */}
            <div className="px-4 py-2 text-center border-b border-white/10 bg-gradient-to-r from-green-500/20 to-emerald-500/10">
              <h2 className="text-base font-extrabold tracking-wide">
                Pay with Crypto
              </h2>
              <p className="text-[10px] text-white/70">
                Send the exact USD amount to any wallet below
              </p>
            </div>

            {/* Content */}
            <div className="px-4 py-2 space-y-2">
              {/* Wallets */}
              {[
                {
                  name: "Bitcoin (BTC)",
                  address: "bc1qcrpm3df07qgpzqdckn2xgjtdgyxnh7y3zd3avm",
                  logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=014",
                  color: "#f7931a",
                },
                {
                  name: "USDT (BEP20)",
                  address: "0x7683c15417ae4c5C02CC99406CB048eb26aebA34",
                  logo: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=014",
                  color: "#26a17b",
                },
                {
                  name: "USDT (TRC20)",
                  address: "TVEe3kqh1CRFSePhSL3JXJjxhni2GFrw5R",
                  logo: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=014",
                  color: "#26a17b",
                },
                {
                  name: "Solana (SOL)",
                  address: "4WCPpEN68wkt1nYE4rF4DDcLsbQitwEWB9koTmd4U8vy",
                  logo: "https://cryptologos.cc/logos/solana-sol-logo.png?v=014",
                  color: "#8b5cf6",
                },
              ].map((wallet, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-1.5 bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <img src={wallet.logo} className="w-6 h-6" />
                    <div>
                      <p className="text-[11px] font-semibold flex items-center gap-1.5">
                        <span
                          className="w-2 h-2"
                          style={{ backgroundColor: wallet.color }}
                        />
                        {wallet.name}
                      </p>
                      <p className="font-mono text-[9px] text-white/70 break-all">
                        {wallet.address}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(wallet.address);
                      toast.success("Copied to clipboard");
                    }}
                    className="px-2 py-0.5 text-[10px] font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    }}
                  >
                    COPY
                  </button>
                </div>
              ))}

              {/* Courses */}
              <div className="p-2 bg-white/5 border border-white/10">
                <p className="text-[11px] font-bold mb-1">Courses (USD)</p>

                <ul className="space-y-0.5 text-[10px] text-white/80">
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span className="truncate max-w-[65%]">
                        {item.data.Description}
                      </span>
                      <span className="font-semibold">
                        ${Number(item.data.Price).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between mt-1 font-bold text-sm">
                  <span>Total (USD)</span>
                  <span className="text-green-400">${totalUSD.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Confirm */}
            <div className="p-2 border-t border-white/10">
              <button
                onClick={handleConfirmCryptoPayment}
                className="w-full h-10 font-extrabold tracking-wide text-white shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #15803d)",
                }}
              >
                CONFIRM PAYMENT
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Checkout;
