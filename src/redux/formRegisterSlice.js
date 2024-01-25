import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getRole } from "./appSlice";
import { ROLE } from "../constants";

const formRegisterSlice = createSlice({
    name: 'formRegister',
    initialState: {
        basicAccountInfo: {},
        additionalInfo: {} // use for driver
    },
    reducers: {
        addBasicField: (state, action) => {
            state.basicAccountInfo = { ...state.basicAccountInfo, ...action.payload }
        },
        addAdditionalField: (state, action) => {
            state.additionalInfo = { ...state.additionalInfo, ...action.payload }
        },
    }
})

export const { addBasicField, addAdditionalField } = formRegisterSlice.actions
export const getBasicAccountInfo = state => state.formRegister.basicAccountInfo
export const getAdditionalInfo = state => state.formRegister.additionalInfo
export default formRegisterSlice.reducer