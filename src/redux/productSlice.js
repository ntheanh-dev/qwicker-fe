import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

const INIT_PRODUCT = {
    category_id: null,
    quantity: 1,
    mass: null,
    image: null,
}

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        product: INIT_PRODUCT,
        status: 'idle'
    },
    reducers: {
        resetProductSlice: (state, action) => {
            Object.assign(state, INIT_PRODUCT);
        },
        removeProductData: (state, action) => {
            state.product = INIT_PRODUCT
        },
        setProduct: (state, action) => {
            state.product = action.payload
        }
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
export const getProduct = state => state.productSlice.product
export const isProductFulFill = createSelector(
    getProduct,
    (product) => {
        const { category_id, mass, quantity, image } = product
        return category_id && mass && quantity && image
    }
)
export const { removeProductData, setProduct, resetProductSlice } = productSlice.actions
export default productSlice.reducer