import { configureStore, createSelector } from "@reduxjs/toolkit";
import orderDetailSlice from "./orderDetailSlice";
import orderSlice from "./orderSlice";
import appSlice from "./appSlice";
import vehicleSilce, { getPickedVehicle } from "./vehicleSilce";
import addressSlice from "./addressSlice";
import { getPickUP, getDeliveryAddress } from "./addressSlice";
import dateTimeSlice from "./dateTimeSlice";
export default configureStore({
    reducer: {
        orderDetail: orderDetailSlice,
        address: addressSlice,
        order: orderSlice,
        app: appSlice,
        vehicle: vehicleSilce,
        datetime: dateTimeSlice
    }
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