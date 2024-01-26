import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API, { authAPI, shipperEndpoints } from "../configs/API";

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

            .addCase(login.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload.user
                }
                state.status = 'idle'
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'idle'
            })
    }
})

export const register = createAsyncThunk("user,registerUser",
    async (form, { rejectWithValue }) => {
        try {
            let account = await API.post(shipperEndpoints['shipper-register'], form, {
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
export const login = createAsyncThunk('user,loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const token = await API.post(shipperEndpoints['login'], {
                "username": data?.username,
                "password": data?.password,
                "client_id": "FRIKdrZpG2VTtJqye7oijXxjfXUthIuAhgCKuMJL",
                "client_secret": "XVGhzSO1fk9cR0RzLW0rGfYjRnQqghs3aDLHYb166zgJfiz3TfnMrtXc5sz3ThkeVqOfb5ti9g7F0WcjonYEefGt79vspJkC7iv2ZpRUWDYGXwZ6DuqPt7FluKqlMgVg",
                "grant_type": "password"
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            let user = await authAPI(token.data.access_token).get(shipperEndpoints['current-user'])
            return {
                user: user?.data,
                token: token?.data
            }
        } catch (err) {
            console.log(err)
            return rejectWithValue(err?.response?.data)
        }
    }
)
export default shipperSlice.reducer