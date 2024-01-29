import { configureStore, createSelector } from "@reduxjs/toolkit";
import orderDetailSlice, { getSelectedVehicle } from "./orderDetailSlice";
import appSlice from "./appSlice";
import dateTimeSlice from "./dateTimeSlice";
import formRegisterSlice from "./formRegisterSlice";
import basicUserSlice from "./basicUserSlice";
import shipperSlice from "./shipperSlice";
import productSlice from "./productSlice";
import paymentSlice from "./paymentSlice";
import shipmentSlice, { getDeliveryAddress, getPickUP } from "./shipmentSlice";
export default configureStore({
    reducer: {
        orderDetail: orderDetailSlice,
        shipment: shipmentSlice,
        app: appSlice,
        datetime: dateTimeSlice,
        formRegister: formRegisterSlice,
        basicUserSlice: basicUserSlice,
        shipperSlice: shipperSlice,
        productSlice: productSlice,
        paymentSlice: paymentSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


export const isLocationAndShipmentFulfill = createSelector(
    getPickUP, getDeliveryAddress, getSelectedVehicle,
    (pickUp, deliveryAddress, vehicle) => {
        if (pickUp.short_name && deliveryAddress.short_name && vehicle !== null) {
            return true
        } else {
            return false
        }
    }
)