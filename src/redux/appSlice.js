import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isUseAppBefore: false,
        role: null // 1:user, 2:shipper
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
    }
})
export const getRole = (state) => state.app.role
export const getIsUseAppBefore = (state) => state.app.isUseAppBefore
export const { setRole } = appSlice.actions
export default appSlice.reducer