import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [], // [{id, name, price, quantity}]
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            const items = action.payload;
            state.cartItems = items;
            state.totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        },

        addLocalItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(i => i.product_id === item.product_id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
            state.totalQuantity += 1;
            state.totalAmount += item.price;
        },
        removeLocalItem: (state, action) => {
            const product_id = action.payload;
            const item = state.cartItems.find(i => i.product_id === product_id);
            if (item) {
                state.totalQuantity -= item.quantity;
                state.totalAmount -= item.price * item.quantity;
                state.cartItems = state.cartItems.filter(i => i.product_id !== product_id);
            }
        },
        decreaseQuantity: (state, action) => {
            const product_id = action.payload;
            const item = state.cartItems.find(i => i.product_id === product_id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalQuantity -= 1;
                state.totalAmount -= item.price;
            }
        },
        clearLocalCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

export const {setCart, addLocalItem, removeLocalItem, decreaseQuantity, clearLocalCart } = cartSlice.actions;
export default cartSlice.reducer;
