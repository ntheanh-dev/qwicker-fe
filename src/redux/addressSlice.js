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
            for (var key in action.payload) {
                if (state.pick_up.hasOwnProperty(key)) {
                    state.pick_up[key] = action.payload[key]
                }
            }
        },
        addDeliveryAddress: (state, action) => {
            for (var key in action.payload) {
                if (state.delivery_address.hasOwnProperty(key)) {
                    state.delivery_address[key] = action.payload[key]
                }
            }
        },
        addAdditionalPickUpInfo: (state, action) => {
            state.pick_up.contact = action.payload.contact
            state.pick_up.phone_number = action.payload.phone_number
        },
        addAdditionalDeliveryAddressInfo: (state, action) => {
            state.delivery_address.contact = action.payload.contact
            state.delivery_address.phone_number = action.payload.phone_number
        }
    }
})

export const { addPickUp, addDeliveryAddress, addAdditionalPickUpInfo, addAdditionalDeliveryAddressInfo } = addressSlice.actions
export const getPickUP = state => state.address.pick_up
export const getDeliveryAddress = state => state.address.delivery_address
export default addressSlice.reducer