import { configureStore, createSelector } from "@reduxjs/toolkit";
import orderDetailSlice from "./orderDetailSlice";
import orderSlice from "./orderSlice";
import appSlice from "./appSlice";
import vehicleSilce, { getPickedVehicle } from "./vehicleSilce";
import addressSlice from "./addressSlice";
import { getPickUP, getDeliveryAddress } from "./addressSlice";
import dateTimeSlice from "./dateTimeSlice";
import formRegisterSlice from "./formRegisterSlice";
import basicUserSlice from "../screens/auth/basicUserSlice";
export default configureStore({
    reducer: {
        orderDetail: orderDetailSlice,
        address: addressSlice,
        order: orderSlice,
        app: appSlice,
        vehicle: vehicleSilce,
        datetime: dateTimeSlice,
        formRegister: formRegisterSlice,
        basicUserSlice: basicUserSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


export const isFormOrderFullFill = createSelector(
    getPickUP, getDeliveryAddress, getPickedVehicle,
    (pickUp, deliveryAddress, vehicle) => {
        // console.log(pickUp, deliveryAddress, vehicle)
        if (pickUp.location !== null && deliveryAddress.location !== null && vehicle !== null) {
            return true
        } else {
            return false
        }
    }
)