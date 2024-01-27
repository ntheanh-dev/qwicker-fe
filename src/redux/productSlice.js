import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const INIT_PRODUCT = {
    category: null,
    quantity: 0,
    image: null,
}

const productSlice = createSlice({
    name: 'orderdetail',
    initialState: {
        product: INIT_PRODUCT,
        isFulFill: false,
        status: 'idle'
    },
    reducers: {
        addCategory: (state, action) => {
            state.product.category = action.payload
            state.isFulFill = isFulFill(state.isFulFill)
        },
        addQuantity: (state, action) => {
            state.product.quantity = action.payload
            state.isFulFill = isFulFill(state.isFulFill)
        },
        addImage: (state, action) => {
            state.product.image = action.payload
            state.isFulFill = isFulFill(state.isFulFill)
        },
        removeProduct: (state, action) => {
            state.product = INIT_PRODUCT
            state.isFulFill = false
        },
    }
})
const isFulFill = (obj) => {
    Object.entries(obj).forEach(([key, value]) => {
        if (value === null || value <= 0) {
            return false
        }
    })
    return true
}
export const getIsFulFill = state => state.productSlice.isFulFill
export const getProduct = state => state.productSlice.product
export const { addCategory, addQuantity, addImage, removeProduct } = productSlice.actions
export default productSlice.reducer