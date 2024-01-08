import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const INITIAL_ADDRESS = {
    pickUp: {
        location: null,
        title: null,
    },
    deliveryAddress: {
        location: null,
        title: null,

    },
}
const INITIAL_ADDRESS_2 = {
    pickUp: {
        location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
        title: '5, Hẻm 89',
    },
    deliveryAddress: {
        location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
        title: '5, Hẻm 89',
    },
}


const addressSlice = createSlice({
    name: 'address',
    initialState: {
        ...INITIAL_ADDRESS_2,
        status: 'idle'
    },
    reducers: {
        addPickUp: (state, action) => {
            state.pickUp.location = action.payload.location
            state.pickUp.title = action.payload.title
        },
        addDeliveryAddress: (state, action) => {
            state.deliveryAddress.location = action.payload.location
            state.deliveryAddress.title = action.payload.title
        }
    }
})
export const { addPickUp, addDeliveryAddress } = addressSlice.actions
export default addressSlice.reducer

export const getPickUP = state => state?.address.pickUp
export const getDeliveryAddress = state => state?.address.deliveryAddress