import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const INIT_PAYMENT = {
    method_id: null,
    amount: null,
    is_poster_pay: true,
    payment_date: null
}

const paymentSlice = createSlice({
    name: 'orderdetail',
    initialState: {
        payment: INIT_PAYMENT,
        status: 'idle'
    },
    reducers: {
        addPayment: (state, action) => {
            state.payment = action.payload
        },
        initPayment: (state, action) => {
            state.payment = INIT_PAYMENT
        }
    }
})
export const getPayment = state => state.paymentSlice.payment
export const { addPayment, initPayment } = paymentSlice.actions
export default paymentSlice.reducer