import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const INITIAL_ADDRESS = {
    contact: '',
    phone_number: '',
    contry: '',
    city: '',
    district: '',
    street: '',
    home_number: '',
    short_name: '',
    long_name: '',
    latitude: '',
    longitude: '',
}

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        pick_up: INITIAL_ADDRESS,
        delivery_address: INITIAL_ADDRESS,
        status: 'idle',
    },
    reducers: {
        addPickUp: (state, action) => {
            state.pick_up = action.payload
        },
        addDeliveryAddress: (state, action) => {
            state.delivery_address = action.payload
        },
        addAdditionalPickUpInfo: (state, action) => {
            state.pick_up.contact = action.contact
            state.pick_up.phone_number = action.phone_number
        },
        addAdditionalDeliveryAddressInfo: (state, action) => {
            state.pick_up.contact = action.contact
            state.pick_up.phone_number = action.phone_number
        }
    }
})

export const { addPickUp, addDeliveryAddress, addAdditionalPickUpInfo, addAdditionalDeliveryAddressInfo } = addressSlice.actions
export const getPickUP = state => state.address.pick_up
export const getDeliveryAddress = state => state.address.delivery_address
export default addressSlice.reducer