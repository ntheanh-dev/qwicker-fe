import { createSlice } from "@reduxjs/toolkit";
import { vehicleType } from "../data";

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState: {
        // items: vehicleType,
        items: [],
        pickedVehicle: null
    },
    reducers: {
        setVehicle: (state, action) => {
            state.items = action.payload
        },
        pickVehicle: (state, action) => {
            state.pickedVehicle = action.payload;
        },
    }
})

export const getVehicle = (state) => state.vehicle.items
export const getPickedVehicle = (state) => state?.vehicle.pickedVehicle
export const { pickVehicle, setVehicle } = vehicleSlice.actions
export default vehicleSlice.reducer