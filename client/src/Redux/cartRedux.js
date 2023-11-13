import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    error: false,
    isFetching: false
  },
  reducers: {
    addCartSuccess: (state, action) => {
      state.quantity += action.payload.products[0].quantity;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      state.error= false
     
    },
    addCartFailure:  (state) => {
      state.error= true
    },
 
  },
});

export const { addCartSuccess, addCartFailure, } = cartSlice.actions;
export default cartSlice.reducer;