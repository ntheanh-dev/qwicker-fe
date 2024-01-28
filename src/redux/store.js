import { configureStore, createSelector } from "@reduxjs/toolkit";
import orderDetailSlice, { getSelectedVehicle } from "./orderDetailSlice";
import orderSlice from "./orderSlice";
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
        order: orderSlice,
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


export const isFormOrderFullFill = createSelector(
    getPickUP, getDeliveryAddress, getSelectedVehicle,
    (pickUp, deliveryAddress, vehicle) => {
        // console.log(pickUp, deliveryAddress, vehicle)
        if (pickUp.short_name !== null && deliveryAddress.short_name !== null && vehicle !== null) {
            return true
        } else {
            return false
        }
    }
)