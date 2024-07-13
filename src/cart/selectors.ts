import { RootState } from "../store/store";

export const selectPagePizza = (state: RootState) => state.PagePizzaReducer;

export const selectHeader = (state: RootState) => state.headerReducer;

export const selectFilter = (state: RootState) => state.filterReducer;

export const selectContent = (state: RootState) => state.contentReducer;

export const selectCart = (state: RootState) => state.cartReducer;