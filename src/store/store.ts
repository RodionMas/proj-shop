import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";
import filterReducer from "./filterSlice";
import headerReducer from "./headerSlice";
import cartReducer from "./cartSlice";
import PagePizzaReducer from "./PagePizzaSlice";

export const store = configureStore({
  reducer: {
    contentReducer,
    filterReducer,
    headerReducer,
    cartReducer,
    PagePizzaReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch