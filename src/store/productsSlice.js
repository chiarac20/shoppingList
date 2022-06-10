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
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        removeProduct(state, action){
            state.products=state.products.filter(product => product.productId!== action.payload);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        editProduct (state, action){
            state.products=state.products.map(product => product.productId === action.payload.productId ? 
                {
                    ...product, 
                    productName: action.payload.productName, 
                    quantity: action.payload.quantity, 
                    unit: action.payload.unit, 
                    urgency: action.payload.urgency
                } 
            : product);
            localStorage.setItem('products', JSON.stringify(state.products));
        }
    }
})

export default productsSlice.reducer;
export const productsSliceActions=productsSlice.actions;
