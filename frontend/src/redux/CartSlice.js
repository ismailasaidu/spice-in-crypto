
import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify"

const initialState = {
 
  value:localStorage.getItem("CartValue")? JSON.parse(localStorage.getItem("CartValue")) :[],
  cart: localStorage.getItem("CartItems")? JSON.parse(localStorage.getItem("CartItems")) :[],
  cartTotalQuantity:[],
  cartTotalAmount: localStorage.getItem("Carttotal")? JSON.parse(localStorage.getItem("Carttotal")) :[],

 

};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      if (state.value.length > 0) {
        if (state.value.includes(action.payload.id)) {
          toast.warning(`${action.payload.data.Description} already in the cart`);
        } else {
          state.value.push(action.payload.id);
          state.cart.push(action.payload);
          toast.success(`${action.payload.data.Description} added to cart`)
          localStorage.setItem("CartItems",JSON.stringify(state.cart))
          localStorage.setItem("CartValue",JSON.stringify(state.value))

        
        }
       
      
      } else {
        state.value.push(action.payload.id);
        state.cart.push(action.payload);
        toast.success(`${action.payload.data.Description} added to cart`)
         localStorage.setItem("CartItems",JSON.stringify(state.cart))
         localStorage.setItem("CartValue",JSON.stringify(state.value))
      
      }
      
     
    // localStorage.setItem("cartItems",JSON.stringify(state.cart))
    // localStorage.setItem("CartValue",JSON.stringify(state.value))
    },

    remove: (state, action) => {
      state.cart = state.cart.filter((item) => {
        return action.payload.id !== item.id;
    
      });
  
      state.value.pop();
     
 
      localStorage.setItem("CartItems",JSON.stringify(state.cart))
      localStorage.setItem("CartValue",JSON.stringify(state.value))
    },

    increaseQuantity: (state, action) => {
      let item = state.cart.find((a) => {
        return a.id === action.payload;
      });
        
      item.data.quantity += 1;
  
   
      localStorage.setItem("CartItems",JSON.stringify(state.cart))
    },

    decreaseQuantity: (state, action) => {
      let item = state.cart.find((a) => {
        return a.id === action.payload;
      });
      if (item.data.quantity > 1) {
        item.data.quantity -= 1;
      }
      localStorage.setItem("CartItems",JSON.stringify(state.cart))
    },

  

    Subtotal: (state, action) => {
      const values = state.cart.map((item) => {
        return item.data.quantity * (item.data.Price ); 
      });

      const newValue = values.reduce((a, b) => {
        return a + b;
      }, 0);

    const Total = Math.round(newValue)
      state.cartTotalAmount  = Total;
      localStorage.setItem("carttotal",JSON.stringify(state.cartTotalAmount))
    },

    // Total: (state, action) => {
    //   const values = state.cart.map((item) => {
       
    //     if (state.value > 2) {
    //       return (item.data.quantity * item.data.Price) + 500;
    //     } else {
    //       return item.data.quantity * item.data.Price
    //     }
    //   });

    //   const total = values.reduce((a, b) => {
    //     return a + b;
    //   }, 0);

    //   state.cartTotal = total;
    //   localStorage.setItem("cartItems",JSON.stringify(state.cart))
    // },


  },
});

export const { add, remove , increaseQuantity ,Subtotal, decreaseQuantity, Total} =
  cartSlice.actions;

export default cartSlice.reducer;
