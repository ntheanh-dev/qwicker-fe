import { createSlice } from "@reduxjs/toolkit";

const dateTimeSlice = createSlice({
    name: 'datetime',
    initialState: {
        date: null,
        time: null,
        isDateTimeFullFill: false
    },
    reducers: {
        addDate: (state, action) => {
            state.date = action.payload
            state.isDateTimeFullFill = state.time !== null
        },
        addTime: (state, action) => {
            state.time = action.payload
            state.isDateTimeFullFill = state.date !== null
        }
    }
})
export const { addDate, addTime } = dateTimeSlice.actions
export default dateTimeSlice.reducer

export const getIsDateTimeFullFill = state => state.datetime.isDateTimeFullFill
export const getDate = state => state?.datetime.date
export const getTime = state => state?.datetime.time