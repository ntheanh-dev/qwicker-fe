import { createSlice } from "@reduxjs/toolkit";
import { vehicelType } from "../data";

const vehicelSlice = createSlice({
    name: 'vehicel',
    initialState: {
        items: vehicelType,
        pickedVehicel: null
    },
    reducers: {
        pickVehicel: (state, action) => {
            state.pickedVehicel = action.payload;
        },
    }
})

export const getVehicel = (state) => state.vehicel.items
export const getPickedVehicel = (state) => state?.vehicel.pickedVehicel
export const { pickVehicel } = vehicelSlice.actions
export default vehicelSlice.reducer