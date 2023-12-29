import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {},
    reducers: {
        deleteData: (state, action) => {
            state = null;
        },
    }
})

export default orderSlice.reducer