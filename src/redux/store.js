import { configureStore, createSelector } from "@reduxjs/toolkit";
import orderSlice, { getOrder, getSelectedVehicle } from "./orderSlice";
import appSlice from "./appSlice";
import formRegisterSlice from "./formRegisterSlice";
import basicUserSlice from "./basicUserSlice";
import shipperSlice from "./shipperSlice";
import productSlice, { getProduct } from "./productSlice";
import paymentSlice, { getPayment } from "./paymentSlice";
import shipmentSlice, { getDeliveryAddress, getPickUP, getShipMentForm } from "./shipmentSlice";
import { objectToFormData } from "../features/ultils";
export default configureStore({
    reducer: {
        order: orderSlice,
        shipment: shipmentSlice,
        app: appSlice,
        formRegister: formRegisterSlice,
        basicUserSlice: basicUserSlice,
        shipperSlice: shipperSlice,
        productSlice: productSlice,
        paymentSlice: paymentSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


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