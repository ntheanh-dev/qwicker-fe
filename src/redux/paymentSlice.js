import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const INIT_PAYMENT = {
  method: null,
  price: null,
  is_poster_pay: true,
  paid_at: null,
};

const paymentSlice = createSlice({
  name: "orderdetail",
  initialState: {
    payment: INIT_PAYMENT,
    status: "idle",
  },
  reducers: {
    resetPaymentSlice: (state, action) => {
      Object.assign(state, INIT_PAYMENT);
    },
    addPayment: (state, action) => {
      state.payment = action.payload;
    },
    initPayment: (state, action) => {
      state.payment = INIT_PAYMENT;
    },
  },
});
export const getPayment = (state) => state.paymentSlice.payment;
export const { addPayment, initPayment, resetPaymentSlice } =
  paymentSlice.actions;
export default paymentSlice.reducer;
