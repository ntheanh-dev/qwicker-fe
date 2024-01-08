import { configureStore, createSelector } from "@reduxjs/toolkit";
import orderDetailSlice from "./orderDetailSlice";
import orderSlice from "./orderSlice";
import appSlice from "./appSlice";
import vehicelSilce, { getPickedVehicel } from "./vehicelSilce";
import addressSlice from "./addressSlice";
import { getPickUP, getDeliveryAddress } from "./addressSlice";
import dateTimeSlice from "./dateTimeSlice";
export default configureStore({
    reducer: {
        orderDetail: orderDetailSlice,
        address: addressSlice,
        order: orderSlice,
        app: appSlice,
        vehicel: vehicelSilce,
        datetime: dateTimeSlice
    }
})


export const isFormOrderFullFill = createSelector(
    getPickUP, getDeliveryAddress, getPickedVehicel,
    (pickUp, deliveryAddress, vehicel) => {
        // console.log(pickUp, deliveryAddress, vehicel)
        if (pickUp.location !== null && deliveryAddress.location !== null && vehicel !== null) {
            return true
        } else {
            return false
        }
    }
)