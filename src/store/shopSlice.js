import { createSlice } from '@reduxjs/toolkit';

const storedState=localStorage.getItem('shops');
const initialState=storedState ? JSON.parse(storedState) : [];

const shopSlice = createSlice({
    name: 'shops',
    initialState,
    reducers: {
        addShop(state, action){
            state.push(action.payload);
            localStorage.setItem('shops', JSON.stringify(state));
        },
        removeShop(state, action){
            const updatedState=state.filter(shop => shop.shopId!==action.payload);
            localStorage.setItem('shops', JSON.stringify(updatedState));
            return updatedState;
        },
        changeSelection(state, action){
            const updatedShopsSelection = state.map(shop => shop.shopId === action.payload ? {...shop, isSelected:!shop.isSelected} : {...shop});
            localStorage.setItem("shops", JSON.stringify(updatedShopsSelection));
            return updatedShopsSelection;
        }, 
        unselectAll(state){
            const updatedState = state.map(shop => ({...shop, isSelected: false}));
            localStorage.setItem('shops', JSON.stringify(updatedState));
            return updatedState;
        }
    }
})

export const shopSliceActions=shopSlice.actions;
export default shopSlice.reducer;