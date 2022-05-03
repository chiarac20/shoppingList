import { configureStore } from '@reduxjs/toolkit';
import shopSliceReducer from './shopSlice';
import productsSliceReducer from './productsSlice';

const store = configureStore({reducer: {shops: shopSliceReducer, products: productsSliceReducer}});

export default store;