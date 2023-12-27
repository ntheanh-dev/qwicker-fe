import { configureStore } from "@reduxjs/toolkit";
import orderDetailSlice from "./orderDetailSlice";

export default configureStore({
    reducer: {
        orderDetail: orderDetailSlice
    }
})