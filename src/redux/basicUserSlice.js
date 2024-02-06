import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API, { authAPI, basicUserEndpoints, jobEndpoints } from "../configs/API";

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
                "client_id": "RiYOr07gNa0xh6dbcnQKySftZ8KHnip88Cps9Jk8",
                "client_secret": "et1xaPdvN7jDXyPLN45Axnbj1irvoHjItxJUwqXA42Pnd5fevezK96118PvwHgw5wFr9fLOwz985lW4eRkTk6VdHsj8zLbdHHiPGt0csWlqbNEGdvkRgTKS3CaWyxPPE",
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

export const postJob = createAsyncThunk('job,PostJob',
    async (data, { rejectWithValue }) => {
        const { access_token, formData } = data
        try {
            const res = await authAPI(access_token).post(jobEndpoints['jobs'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return res.data
        } catch (err) {
            return rejectWithValue(err?.response.data)
        }

    }
)

export const myJob = createAsyncThunk('job,myJob',
    async (data, { rejectWithValue }) => {
        const { access_token, params } = data
        try {
            const res = await authAPI(access_token).get(basicUserEndpoints['my-jobs'](params))
            return res.data
        } catch (err) {
            return rejectWithValue(err?.response.data)
        }

    }
)

export const retrieve = createAsyncThunk('job,Retrieve',
    async (data, { rejectWithValue }) => {
        const { access_token, orderId } = data
        try {
            const res = await authAPI(access_token).get(basicUserEndpoints['job-retrieve'](orderId))
            return res.data
        } catch (err) {
            return rejectWithValue(err?.response.data)
        }

    }
)

export const getJoinedShipper = createAsyncThunk('job,getShipper',
    async (data, { rejectWithValue }) => {
        const { access_token, orderId } = data
        try {
            const res = await authAPI(access_token).get(jobEndpoints['listShipper'](orderId))
            return res.data
        } catch (err) {
            return rejectWithValue(err?.response.data)
        }

    }
)

export const assignJob = createAsyncThunk('job,assignJob',
    async (data, { rejectWithValue }) => {
        const { access_token, orderId, shipperId } = data
        const formData = new FormData()
        formData.append('shipper', shipperId)
        try {
            const res = await authAPI(access_token).post(basicUserEndpoints['assign-job'](orderId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return res.status
        } catch (err) {
            return rejectWithValue(err?.response.data)
        }

    }
)

export const getBasicUserToken = state => state.basicUserSlice.token
export const getBasicUserStatus = state => state.basicUserSlice.status
export const { setToken } = basicUserSlice.actions
export default basicUserSlice.reducer