import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API, { authAPI, basicUserEndpoints } from "../configs/API";

const basicUserSlice = createSlice({
    name: 'basicUserSlice',
    initialState: {
        user: {},
        status: 'idle',
        token: null
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
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
                    state.token = action.payload.token
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
            let res = await API.post(basicUserEndpoints['basic-user-register'], form, {
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
export const login = createAsyncThunk('user,loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const token = await API.post(basicUserEndpoints['login'], {
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
            let user = await authAPI(token.data.access_token).get(basicUserEndpoints['current-user'])
            return {
                user: user.data,
                token: token.data
            }
        } catch (err) {
            return rejectWithValue(err?.response.data)
        }
    }
)
export const getBasicUserToken = state => state.basicUserSlice.token
export const getBasicUserStatus = state => state.basicUserSlice.status
export const { setToken } = basicUserSlice.actions
export default basicUserSlice.reducer