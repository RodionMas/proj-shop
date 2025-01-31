import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getLocalStorage } from "../utils/ItemLocalStorage";
import { CartItem, CartSliceState } from "../cart/types";

const initialState: CartSliceState = {
  items: getLocalStorage('item'),
  totalPrice: getLocalStorage('totalPrice'),
  count: getLocalStorage('count'),
};
export const cartReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addItemsReducer(state, action: PayloadAction<CartItem>) {
      const item = state.items?.find((obj) => {
        if (obj.id === action.payload.id) {
          obj.count += 1;
          return obj;
        }

        return null;
      });
      state.count += 1;
      state.totalPrice += action.payload.price;
      
      if (!item) {
        state.items?.push(action.payload);
      }
    },
    incrementItemCount(state, action: PayloadAction<string>) {
      const item = state.items.find((el) => {
        if (el.id === action.payload) {
          return el;
        }
        return null;
      });
      state.count = state.count + 1;
      if (item) {
        state.totalPrice = state.totalPrice + item.price;
        item.count += 1;
      }
    },
    decrementItemCount(state, action: PayloadAction<string>) {
      const item = state.items.find((el) => {
        if (el.id === action.payload) {
          return el;
        }
        return null;
      });
      if (item) {
        state.totalPrice = state.totalPrice - item.price;
        state.count = state.count - 1;
        item.count = item.count - 1;
      }
    },
    removeItems(state, action: PayloadAction<string>) {
      const itemCart = state.items.filter((el) => {
        if (el.id !== action.payload) {
          return el;
        } else if (el.id === action.payload) {
          state.count = state.count - (el.count + 1);
          state.totalPrice = state.totalPrice - el.price * (el.count + 1);
        }
        return null;
      });
      state.items = [...itemCart];
    },
    clearBasket(state) {
      state.items = [];
      state.totalPrice = 0;
      state.count = 0;
    },
  },
});

export const {
  addItemsReducer,
  removeItems,
  clearBasket,
  incrementItemCount,
  decrementItemCount,
} = cartReducer.actions;

export default cartReducer.reducer;
