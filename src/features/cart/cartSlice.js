import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Mediterranean',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const foundItemIndex = state.cart.findIndex(
        (item) => item.pizzaId === action.payload
      );
      state.cart.at(foundItemIndex).quantity++;
      state.cart.at(foundItemIndex).totalPrice =
        state.cart.at(foundItemIndex).quantity *
        state.cart.at(foundItemIndex).unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const foundItemIndex = state.cart.findIndex(
        (item) => item.pizzaId === action.payload
      );
      state.cart.at(foundItemIndex).quantity--;
      state.cart.at(foundItemIndex).totalPrice =
        state.cart.at(foundItemIndex).quantity *
        state.cart.at(foundItemIndex).unitPrice;

      if (state.cart.at(foundItemIndex).quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearItem(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearItem,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getUsername = (state) => state.user.username;

export const getCart = (state) => state.cart.cart;

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((acc, cur) => acc + cur.quantity, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((acc, cur) => acc + cur.quantity * cur.unitPrice, 0);

export const getItemQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity || 0;
