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
        }
    }
})

export default productsSlice.reducer;
export const productsSliceActions=productsSlice.actions;
