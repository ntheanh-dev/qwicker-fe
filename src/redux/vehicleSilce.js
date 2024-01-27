import { createSlice } from "@reduxjs/toolkit";
import { vehicleType } from "../data";
import API, { baseEndpoints } from "../configs/API";

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicle.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchVehicle.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = 'idle'
            })
            .addCase(fetchVehicle.rejected, (state, action) => {
                state.status = 'idle'
            })
    }
})

export const fetchVehicle = createAsyncThunk("user,registerUser",
    async (form, { rejectWithValue }) => {
        try {
            const res = await API.get(baseEndpoints['vehicles'])
            return res.data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const getVehicle = (state) => state.vehicle.items
export const getPickedVehicle = (state) => state?.vehicle.pickedVehicle
export const { pickVehicle, setVehicle } = vehicleSlice.actions
export default vehicleSlice.reducer