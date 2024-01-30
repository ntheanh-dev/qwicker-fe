import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const INITIAL_ORDER = {
    pickUp: null,
    deliveryAddress: null,
    dateTime: null,
    vehicle: null,
    paymentMethod: null,
    comment: null,
    productType: null,
    mass: null,
}


const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        items: [],
        status: 'idle'
    },
    reducers: {
        addPickUp: (state, action) => {
            state.pickUp = action.payload
        },
        addVehicle: (state, action) => {
            state.vehicle = action.payload
        },
        addComment: (state, action) => {
            state.comment = action.payload
        },
    }
})
export const getSelectedVehicle = state => state.orderDetail.vehicle
export const { addPickUp, addVehicle, addComment } = orderDetailSlice.actions
export default orderDetailSlice.reducer