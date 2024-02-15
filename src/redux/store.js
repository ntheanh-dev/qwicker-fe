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


export const isLocationAndShipmentFulfill = createSelector(
    getPickUP, getDeliveryAddress, getSelectedVehicle,
    (pickUp, deliveryAddress, vehicle) => {
        return pickUp.short_name && deliveryAddress.short_name && vehicle
    }
)

export const orderForm = createSelector(
    getShipMentForm, getProduct, getPayment, getOrder,
    (shipment, prod, pay, ord) => {
        /// Order
        const vehicle = ord.vehicle?.id
        const order = {
            ...ord,
            vehicle_id: vehicle
        }
        const formData = objectToFormData({
            shipment: shipment,
            product: prod,
            payment: pay,
            order: order
        })
        return formData
    }
)