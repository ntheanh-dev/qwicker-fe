import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API, { endpoints } from "../../configs/API";

const shipperSlice = createSlice({
    name: 'shipperSlice',
    initialState: {
        user: {},
        status: 'idle',
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload
                }
                state.status = 'idle'
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'idle'
            })
    }
})

export const register = createAsyncThunk("user,registerUser",
    async (form, { rejectWithValue }) => {
        const { basic, additional } = form
        try {
            let account = await API.post(endpoints['shipper-register'], basic, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            additional.append('user', account.data.id)
            await API.post(endpoints['shipper-more'], additional, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return account.data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export default shipperSlice.reducer