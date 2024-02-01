import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, jobEndpoints } from "../configs/API";


const jobSlice = createSlice({
    name: 'job',
    initialState: {
        postedJob: {},
        myJob: [],
        status: 'idle'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postJob.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(postJob.fulfilled, (state, action) => {
                state.myJob = action.payload
                state.status = 'idle'
            })
            .addCase(postJob.rejected, (state, action) => {
                state.status = 'idle'
            })
    }
})

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


export default jobSlice.reducer