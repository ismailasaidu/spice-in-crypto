import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { remove, Subtotal, syncCart } from "../redux/CartSlice";
import close from "../Assets/close.png";
import ScrollToTop from "../Component/ScrollToTop";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const CartState = useSelector((state) => state.cart);

  // Ensure cart total is calculated and saved
  useEffect(() => {
    dispatch(Subtotal());
  }, [CartState, dispatch]);

  const handleRemove = (item) => {
    dispatch(remove(item));
    dispatch(Subtotal());
    dispatch(syncCart());
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    if (!cart.length) {
      toast.info("You have no items in cart");
      return;
    }
    if (!isLoggedIn) {
      navigate("/log");
      return;
    }
    navigate("/checkout");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCheckout();
  };

  return (
    <div className="py-[150px] md:py-[80px] sm:pt-[200px]">
      <ScrollToTop />
      <div className="px-14 sm:px-0 md:px-[30px]">
        <h1 className="text-grey mt-[50px] sm:mt-[-40px]">
          <span
            className="cursor-pointer sm:pl-[30px]"
            onClick={() => navigate("/signals")}
          >
            ENROLL/
          </span>
          <span className="text-dark cursor-pointer">CART</span>
        </h1>

        <div className="md:mt-[-50px]">
          {/* Cart Header */}
          <div className="grid grid-cols-2 sm:grid-cols-2 sm:place-items-center w-[600px] sm:w-[100%] border-b-[1px] gap-[130px] border-divider pl-[100px] sm:pl-[50px] sm:pr-[50px] h-[50px] mt-[100px] sm:gap-0 sm:mt-[140px] sm:text-[14px] md:gap-[90px] md:pl-[35px]">
            <h1 className="font-bold text-[18px] pt-[15px] sm:text-[16px]">
              Product
            </h1>
            <h1 className="font-bold text-[18px] pt-[15px] sm:text-[16px]">
              Price
            </h1>
          </div>

          {/* Cart Items */}
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-2 sm:grid-cols-2 items-center w-[600px] sm:w-[100%] sm:place-items-center border-b-[1px] gap-[130px] border-divider sm:gap-0 pl-[100px] sm:h-[80px] md:h-[80px] h-[60px] mt-[40px] font-display relative sm:pl-[80px] sm:pr-[50px] sm:text-[14px] md:gap-[70px] md:items-center md:pl-[35px] md:pb-[20px]"
              >
                <img
                  src={close}
                  className="absolute left-0 md:mt-[-5px] sm:left-[30px] cursor-pointer"
                  onClick={() => handleRemove(item)}
                />
                <h1 className="font-bold text-[16px] uppercase md:text-[14px] mr-[40px] md:mt-[15px] text-grey sm:text-[12px] sm:text-center md:text-center">
                  {item.data?.Description || "Unnamed Product"}
                </h1>
                <h1 className="font-medium text-[18px] text-grey md:mt-[15px] md:pl-[10px]">
                  ${item.data?.Price ?? "0.00"}
                </h1>
              </div>
            ))
          ) : (
            <p className="mt-10 text-center text-grey">Your cart is empty</p>
          )}
        </div>

        {/* Cart Totals */}
        <div className="mt-[100px] sm:px-[30px]">
          <h1 className="font-display text-[34px] font-black">Cart Totals</h1>
          <div className="flex justify-between font-display w-[440px] mt-[20px] border-b-[2px] border-grey h-[40px] sm:w-[340px]">
            <h1 className="text-[18px] font-medium text-grey">Subtotal</h1>
            <p className="font-medium text-[18px]">
              ${CartState.cartTotalAmount}
            </p>
          </div>
          <div className="flex justify-between font-display w-[440px] mt-[20px] h-[40px] border-b-[2px] border-grey sm:w-[340px]">
            <h1 className="text-grey text-[18px] font-semibold">Total</h1>
            <p className="font-medium text-[18px]">
              ${CartState.cartTotalAmount}
            </p>
          </div>

          <button
            className="w-[280px] bg-blue sm:lightblue text-white h-[50px] mt-[40px]"
            onClick={handleCheckout}
            onKeyDown={handleKeyDown}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
