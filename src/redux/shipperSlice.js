import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, { ShipperJobEndpoints, accountEndpoints, authAPI, shipperEndpoints } from "../configs/API";
import { objectToFormData } from "../features/ultils";

const INIT_STATE = {
    user: {},
    status: 'idle',
    token: { access_token: '' },
}

const shipperSlice = createSlice({
    name: 'shipperSlice',
    initialState: INIT_STATE,
    reducers: {
        resetShipperSlice: (state, action) => {
            Object.assign(state, INIT_STATE);
        },
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
                    state.user = action.payload.user
                    state.token = action.payload.token
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
    async (obj, { rejectWithValue }) => {
        const formData = objectToFormData(obj)
        try {
            let user = await API.post(accountEndpoints['register-shipper'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const token = await API.post(accountEndpoints['login'], {
                "username": obj.username,
                "password": obj.password,
                "grant_type": "password"
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return {
                user: user?.data,
                token: token?.data
            }
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const login = createAsyncThunk('user,loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const token = await API.post(accountEndpoints['login'], {
                "username": data?.username,
                "password": data?.password,
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
export const findJob = createAsyncThunk('job, findJob',
    async (access_token, { rejectWithValue }) => {
        try {
            const res = await authAPI(access_token).get(ShipperJobEndpoints['find-job'])
            return res.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err?.response?.data)
        }
    }
)

export const viewJob = createAsyncThunk('job, viewJob',
    async (data, { rejectWithValue }) => {
        const { token, jobId } = data
        try {
            const res = await authAPI(token).get(ShipperJobEndpoints['job-retrieve'](jobId))
            return res.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err?.response?.data)
        }
    }
)

export const joinJob = createAsyncThunk('job, joinJob',
    async (data, { rejectWithValue }) => {
        const { token, jobId } = data
        try {
            const res = await authAPI(token).post(ShipperJobEndpoints['join-job'](jobId))
            return res.status
        } catch (err) {
            console.log(err)
            return rejectWithValue(err?.response)
        }
    }
)

export const myJobs = createAsyncThunk('job, myJobs',
    async (data, { rejectWithValue }) => {
        const { access_token, params } = data
        try {
            const res = await authAPI(access_token).get(ShipperJobEndpoints['my-jobs'](params))
            return res.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err?.response)
        }
    }
)

export const compeleteJob = createAsyncThunk('job, myJobs',
    async (data, { rejectWithValue }) => {
        const { access_token, jobId } = data
        try {
            const res = await authAPI(access_token).post(ShipperJobEndpoints['complete'](jobId))
            return res.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err?.response)
        }
    }
)

export const { setToken, resetShipperSlice } = shipperSlice.actions
export const getToken = state => state.shipperSlice.token
export const getShipperProfile = state => state.shipperSlice.user
export default shipperSlice.reducer