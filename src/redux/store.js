import { configureStore } from "@reduxjs/toolkit";
import orderDetailSlice from "./orderDetailSlice";
import orderSlice from "./orderSlice";

export default configureStore({
    reducer: {
        orderDetail: orderDetailSlice,
        order: orderSlice
    }
})