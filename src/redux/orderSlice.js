import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
    },
    reducers: {
        addVehicle: (state, action) => {
            state.vehicle = action.payload
        },
        addDescription: (state, action) => {
            state.description = action.payload
        },
    }
})
export const getSelectedVehicle = state => state.order.vehicle
export const getOrder = state => state.order
export const { addVehicle, addDescription } = orderSlice.actions
export default orderSlice.reducer