import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API, { ShipperJobEndpoints, authAPI, shipperEndpoints } from "../configs/API";
import { JOBSTATUS } from "../constants";

const shipperSlice = createSlice({
    name: 'shipperSlice',
    initialState: {
        user: {},
        status: 'idle',
        token: null,
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
                "client_id": "RiYOr07gNa0xh6dbcnQKySftZ8KHnip88Cps9Jk8",
                "client_secret": "et1xaPdvN7jDXyPLN45Axnbj1irvoHjItxJUwqXA42Pnd5fevezK96118PvwHgw5wFr9fLOwz985lW4eRkTk6VdHsj8zLbdHHiPGt0csWlqbNEGdvkRgTKS3CaWyxPPE",
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
        const formData = new FormData()
        formData.append('status', JOBSTATUS.FINDING_SHIPPER)
        try {
            const res = API.authAPI(access_token).get(ShipperJobEndpoints['find-job'], formData)
            return res.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err?.response?.data)
        }
    }
)
export const { setToken } = shipperSlice.actions
export const getToken = state => state.shipperSlice.token
export default shipperSlice.reducer