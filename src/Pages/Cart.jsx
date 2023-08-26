import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  remove,
  increaseQuantity,
  decreaseQuantity,
  Subtotal,
} from "../redux/CartSlice";
import { FiPlus } from "react-icons/fi";
import close from "../Assets/close.png";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const Cart = useSelector((state) => state.cart);

  let Total = `${Cart.cartTotalAmount * 100}`;
  localStorage.setItem("totalamount", JSON.stringify(Total));

  const handleRemove = (i) => {
    dispatch(remove(i));
  };

  const increment = (item) => {
    dispatch(increaseQuantity(item));
  };
  const decrement = (item) => {
    dispatch(decreaseQuantity(item));
  };

  console.log(Cart.cartTotalAmount);

  useEffect(() => {
    dispatch(Subtotal());
  }, [Cart, dispatch]);

  return (
    <div className="">
      <div className="mt-[150px]">
        <div className="px-14 sm:px-0 md:px-[30px] ">
          <div>
            <h1 className="text-grey mt-[50px] sm:mt-[-40px]">
              <span
                className="cursor-pointer sm:pl-[30px]"
                onClick={() => {
                  navigate("/");
                }}>
                HOME/
              </span>
              <span className="text-dark cursor-pointer">SHOPPING CART</span>
            </h1>
          </div>
          <div>
            <div>
              <div className="grid grid-cols-4   border-b-[1px] gap-[150px] border-divider pl-[180px] h-[50px] mt-[100px] sm:mt-[40px] sm:pl-[30px] sm:gap-[50px] sm:text-[14px]  md:gap-[90px] md:pl-[35px]">
                <h1 className="font-bold text-[18px] pt-[15px] sm:text-[14px]">
                  Product
                </h1>
                <h1 className="font-bold text-[18px] pt-[15px] sm:text-[14px]">
                  Price
                </h1>
                <h1 className="font-bold text-[18px] pt-[15px] sm:text-[14px]">
                  Quantity
                </h1>
                <h1 className="font-bold text-[18px] pt-[15px] sm:text-[14px]">
                  Total
                </h1>
              </div>
              {cart.length > 0
                ? cart.map((item) => {
                    return (
                      <div className="grid grid-cols-4 items-center border-b-[1px] gap-[150px]  border-divider pl-[180px] sm:h-[80px] md:h-[80px] h-[60px] mt-[40px] font-display relative sm:px-[30px]  sm:gap-[45px] sm:text-[14px] md:gap-[70px] md:items-center md:pl-[35px] md:pb-[20px]">
                        <img
                          src={close}
                          className="absolute left-0 mt-[20px] md:mt-[-5px] sm:left-[5px] "
                          onClick={() => {
                            handleRemove(item);
                          }}
                        />
                        <h1 className="font-bold text-[16px] md:text-[14px] mr-[40px] md:mt-[0px] text-grey pt-[15px] sm:text-[14px] sm:text-center  md:text-center">
                          {item.data.Description}
                        </h1>
                        <h1 className="font-medium text-[18px] text-grey pt-[15px]  md:pl-[10px] ">
                          ${item.data.Price}
                          {/* ${item.data.Price - (item.data.Discount / 100) * item.data.Price} */}
                        </h1>
                        <div className="flex items-center gap-[5px]   md:pl-[10px]">
                          <button
                            onClick={() => {
                              decrement(item.id);
                            }}>
                            <AiOutlineMinus className="w-[12px] mt-[10px] font-black" />
                          </button>

                          <div className="font-bold text-[18px]  w-[40px] object-cover sm:px-[10px] py-[5px] text-center   sm:w-[60px]   h-[40px]    mt-[10px]  text-grey border-[2px] outline-none border-divider ">
                            {item.data.quantity}
                          </div>
                          <button
                            onClick={() => {
                              increment(item.id);
                            }}>
                            <AiOutlinePlus className="mt-[10px]" />
                          </button>
                        </div>
                        <h1 className="font-medium text-[18px] text-grey object-contain pt-[15px] md:pl-[20px]">
                        ₦{Math.round(item.data.Price * item.data.quantity)}
                        </h1>
                      </div>
                    );
                  })
                : ""}
            </div>

            <div className="mt-[100px] sm:px-[10px]">
              <div>
                <h1 className="font-display text-[34px] font-black  ">
                  Cart Totals
                </h1>
              </div>
              <div className="flex justify-between font-display w-[440px] mt-[20px] border-b-[2px] border-grey h-[40px] sm:w-[340px]">
                <h1 className=" text-[18px] font-medium text-grey ">
                  Subtotal
                </h1>
                <p className="font-medium text-[18px]">
                ₦{Cart.cartTotalAmount}
                </p>
              </div>

              <div className="flex justify-between font-display w-[440px] mt-[20px]  h-[40px]  border-b-[2px] border-grey sm:w-[340px]">
                <h1 className="text-grey text-[18px] font-semibold ">Total</h1>
                <p className="font-medium  text-[18px]">
                  ${Cart.cartTotalAmount}
                </p>
              </div>
              <div>
                <button
                  className="  w-[280px] bg-blue sm:lightblue text-white h-[50px] mt-[40px]"
                  onClick={() => {
                    cart.length > 0
                      ? navigate("/checkout")
                      : toast.info("You Have No Items In Cart");
                  }}>
                  PROCEED TO CHECKOUT
                </button>
              </div>
              <div />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Cart;
