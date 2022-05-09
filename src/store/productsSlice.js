import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products:[
            {productName: 'milk', productQuantity: 1, productId: 12, shopId: '49469486', urgency: 'high'},
            {productName: 'honey', productQuantity: 1, productId: 15, shopId: 49469486, urgency: 'low'},
            {productName: 'flour', productQuantity: 1, productId: 10, shopId: '49469486', urgency: 'medium'}
        ]
    },
    reducers: {
        addProduct(state, action){state.products.push(action.payload)}
    }
})

export default productsSlice.reducer;
export const productsSliceActions=productsSlice.actions;
