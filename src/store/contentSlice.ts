import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "./store";
import { useDispatch } from "react-redux";
import {
  ChangeObjType,
  ContentSliceState,
  ContentType,
  Status,
} from "../cart/types";

const mainURL = "https://62f6c299a3bce3eed7c7622d.mockapi.io/items";

export const fetchPizzas = createAsyncThunk<ContentType[], ChangeObjType>(
  "content/fetchPizzas",
  async function (changeObg, { rejectWithValue }) {
    try {
      const { changePage, sortURL, filterURL } = changeObg;
      const response = await axios.get(
        `${mainURL}?page=${changePage}&limit=8&sortBy=${sortURL}&order=desc${
          filterURL === "All" ? "" : `&category=${filterURL}`
        }`
      );
      if (!response.statusText) {
        throw new Error("Server Error");
      }
      return response.data;
    } catch (error) {
      throw rejectWithValue({
        error: "Oh no!",
      });
    }
  }
);

const initialState: ContentSliceState = {
  pageCount: [],
  pizzas: [],
  item: [],
  status: Status.PENDING,
  error: null,
  isLoading: false,
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    changeLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    addItemReducer(state) {
      state.item = [...state.pizzas];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.PENDING;
      state.error = null;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.FULFILLED;
      state.pizzas = action.payload;
      state.item = [...state.pizzas];
      state.isLoading = false;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.REJECTED;
      state.error = action.payload;
    });
  },
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const { changeLoading, addItemReducer } = contentSlice.actions;

export default contentSlice.reducer;
