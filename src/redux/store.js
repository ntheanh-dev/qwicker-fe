import { configureStore } from "@reduxjs/toolkit";
import orderDetailSlice from "./orderDetailSlice";
import orderSlice from "./orderSlice";
import appSlice from "./appSlice";
import vehicelSilce from "./vehicelSilce";
import addressSlice from "./addressSlice";

export default configureStore({
    reducer: {
        orderDetail: orderDetailSlice,
        order: orderSlice,
        app: appSlice,
        vehicel: vehicelSilce,
        address: addressSlice
    }
})