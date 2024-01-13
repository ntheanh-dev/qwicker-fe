import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isUseAppBefore: false,
        role: 2, // 1:user, 2:shipper,
        typeChoosingLocation: 1, // 1: pick up, 2:deliver address
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setTypeChoosingLocation: (state, action) => {
            state.typeChoosingLocation = action.payload;
        },

    }
})
export const getRole = (state) => state.app.role
export const getIsUseAppBefore = (state) => state.app.isUseAppBefore
export const getTypeChoosingLocation = state => state.app.typeChoosingLocation
export const { setRole, setTypeChoosingLocation } = appSlice.actions
export default appSlice.reducer