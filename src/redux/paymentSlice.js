import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PAYMENT_METHOD } from "../constants";

export const INIT_PAYMENT = {
  method: PAYMENT_METHOD.CASH,
  price: null,
  isPosterPay: true,
  paid_at: null,
};

const paymentSlice = createSlice({
  name: "orderdetail",
  initialState: {
    payment: INIT_PAYMENT,
  },
  reducers: {
    resetPaymentSlice: (state, action) => {
      Object.assign(state, INIT_PAYMENT);
    },
    saveStateAsTemp: (state, action) => {
      return {
        payment: { ...INIT_PAYMENT },
        temp: { ...state },
      };
    },
    restoreStateFromTemp: (state, action) => {
      if (state.temp) {
        return {
          ...state.temp,
        };
      }
      return state;
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
export const {
  addPayment,
  initPayment,
  resetPaymentSlice,
  saveStateAsTemp,
  restoreStateFromTemp,
} = paymentSlice.actions;
export default paymentSlice.reducer;
