import { createSlice } from "@reduxjs/toolkit";

const storedProducts = JSON.parse(localStorage.getItem('products'));

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: storedProducts || []
    },
    reducers: {
        addProduct(state, action){
            state.products.push(action.payload);
            localStorage.setItem('products', JSON.stringify(state.products))
        },
        removeProduct(state, action) {
            state.products=state.products.filter(product => product.productId!== action.payload);
        }
    }
})

export default productsSlice.reducer;
export const productsSliceActions=productsSlice.actions;
