import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API, { baseEndpoints } from "../configs/API";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isUseAppBefore: false,
        role: 1, // 1:user, 2:shipper,
        typeChoosingLocation: 1, // 1: pick up, 2:deliver address,
        vehicles: [],
        productcategories: []
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setTypeChoosingLocation: (state, action) => {
            state.typeChoosingLocation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.vehicles = action.payload
                state.status = 'idle'
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.status = 'idle'
            })

            .addCase(fetchProductCategories.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchProductCategories.fulfilled, (state, action) => {
                state.productcategories = action.payload
                state.status = 'idle'
            })
            .addCase(fetchProductCategories.rejected, (state, action) => {
                state.status = 'idle'
            })
    }
})

export const fetchVehicles = createAsyncThunk("vehicles,getVehicles",
    async (form, { rejectWithValue }) => {
        try {
            const res = await API.get(baseEndpoints['vehicles'])
            return res.data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const fetchProductCategories = createAsyncThunk("categories,getCategories",
    async (form, { rejectWithValue }) => {
        try {
            const res = await API.get(baseEndpoints['product-categories'])
            return res.data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const getCategories = (state) => state.app.productcategories
export const getVehicles = (state) => state.app.vehicles
export const getRole = (state) => state.app.role
export const getIsUseAppBefore = (state) => state.app.isUseAppBefore
export const getTypeChoosingLocation = state => state.app.typeChoosingLocation
export const { setRole, setTypeChoosingLocation } = appSlice.actions
export default appSlice.reducer