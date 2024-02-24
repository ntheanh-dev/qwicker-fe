import { combineReducers, configureStore, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import orderSlice, { getOrder, getSelectedVehicle } from "./orderSlice";
import appSlice from "./appSlice";
import formRegisterSlice from "./formRegisterSlice";
import basicUserSlice from "./basicUserSlice";
import shipperSlice from "./shipperSlice";
import productSlice, { getProduct } from "./productSlice";
import paymentSlice, { getPayment } from "./paymentSlice";
import shipmentSlice, { getDeliveryAddress, getPickUP, getShipMentForm } from "./shipmentSlice";
import { objectToFormData } from "../features/ultils";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appReducer = combineReducers({
    order: orderSlice,
    shipment: shipmentSlice,
    app: appSlice,
    formRegister: formRegisterSlice,
    basicUserSlice: basicUserSlice,
    shipperSlice: shipperSlice,
    productSlice: productSlice,
    paymentSlice: paymentSlice,
})



const reducerProxy = (state, action) => {
    if (action.type === 'logout/LOGOUT') {
        const { app, ...restState } = state;
        const newAppReducer = appReducer(undefined, action);
        newAppReducer.app = app
        return newAppReducer
    } else if (action.type === 'resetOrder/RESETORDER') {
        return {
            ...state,
            order: undefined,
            shipment: undefined,
            productSlice: undefined,
            paymentSlice: undefined,
        }
    }
    return appReducer(state, action);
}

const persistedReducer = persistReducer({
    key: 'root',
    storage: AsyncStorage,
}, reducerProxy)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

const persistor = persistStore(store)

export { store, persistor }

export const logout = createAsyncThunk(
    "auth/logout",
    async function (_payload, thunkAPI) {
        thunkAPI.dispatch({ type: 'logout/LOGOUT' });
    }
);

export const resetOrder = createAsyncThunk(
    "auth/logout",
    async function (_payload, thunkAPI) {
        thunkAPI.dispatch({ type: 'resetOrder/RESETORDER' });
    }
);

export const isLocationAndShipmentFulfill = createSelector(
    getPickUP, getDeliveryAddress, getSelectedVehicle,
    (pickUp, deliveryAddress, vehicle) => {
        return pickUp.short_name && deliveryAddress.short_name && vehicle
    }
)

export const orderForm = createSelector(
    getShipMentForm, getProduct, getPayment, getOrder,
    (shipment, prod, pay, ord) => {
        const { vehicle, ...order } = ord
        order.vehicle_id = vehicle?.id
        const formData = new FormData()
        formData.append('shipment', JSON.stringify(shipment))
        formData.append('product', JSON.stringify(prod))
        formData.append('payment', JSON.stringify(pay))
        formData.append('order', JSON.stringify(order))
        return formData
    }
)