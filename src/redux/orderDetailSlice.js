import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const INITIAL_ORDER = {
    pickUp: null,
    deliveryAddress: null,
    dateTime: null,
    vehicel: null,
    paymentMethod: null,
    comment: null,
    productType: null,
    mass: null,
}


const orderDetailSlice = createSlice({
    name: 'orderdetail',
    initialState: {
        items: [],
        status: 'idle'
    },
    reducers: {
        addPickUp: (state, action) => {
            state.pickUp = action.payload
        }
    }
})
export const { addPickUp } = orderDetailSlice.actions
export default orderDetailSlice.reducer