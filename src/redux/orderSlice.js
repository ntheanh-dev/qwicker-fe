import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        status: 'idle'
    },
    reducers: {
        addVehicle: (state, action) => {
            state.vehicle = action.payload
        },
        addComment: (state, action) => {
            state.comment = action.payload
        },
    }
})
export const getSelectedVehicle = state => state.order.vehicle
export const { addVehicle, addComment } = orderSlice.actions
export default orderSlice.reducer