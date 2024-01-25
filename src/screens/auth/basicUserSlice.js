import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API, { endpoints } from "../../configs/API";

const basicUserSlice = createSlice({
    name: 'basicUserSlice',
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
        try {
            let res = await API.post(endpoints['basic-user-register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return res.data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export default basicUserSlice.reducer