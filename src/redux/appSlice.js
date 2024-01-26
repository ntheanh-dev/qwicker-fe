import { createSlice } from "@reduxjs/toolkit";
import API, { basicUserEndpoints } from "../configs/API";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isUseAppBefore: false,
        role: 2, // 1:user, 2:shipper,
        typeChoosingLocation: 1, // 1: pick up, 2:deliver address,
        token: null
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setTypeChoosingLocation: (state, action) => {
            state.typeChoosingLocation = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    }
})



export const getRole = (state) => state.app.role
export const getIsUseAppBefore = (state) => state.app.isUseAppBefore
export const getTypeChoosingLocation = state => state.app.typeChoosingLocation
export const { setRole, setTypeChoosingLocation, setToken } = appSlice.actions
export default appSlice.reducer