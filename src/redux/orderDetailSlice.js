import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const orderDetailSlice = createSlice({
    name: 'orderdetail',
    initialState: {
        items: [],
        status: 'idle'
    },
    reducers: {
        deleteData: (state, action) => {
            state = null;
        },
    }
})
export const { deleteData } = orderDetailSlice.actions
export default orderDetailSlice.reducer