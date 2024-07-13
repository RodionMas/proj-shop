import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "./store";
import { useDispatch } from "react-redux";
import { ContentType, PagePizzaSliceState, Status } from "../cart/types";

const mainURL = "https://62f6c299a3bce3eed7c7622d.mockapi.io/items/";
export const fetchPizza = createAsyncThunk<ContentType, string | undefined>(
  "content/fetchPizza",
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.get(`${mainURL}${id}`);
      if (!response.statusText) {
        throw new Error("Server Error");
      }
      return response.data;
    } catch (error) {
      throw rejectWithValue({
        error: error,
      });
    }
  }
);

const initialState: PagePizzaSliceState = {
  status: Status.PENDING,
  error: null,
  pizza: {
    imageUrl: "",
    title: "",
    sizes: [],
    price: 0,
    types: [],
    id: "",
  },
};

export const PagePizzaSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.PENDING;
      state.error = null;
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.status = Status.FULFILLED;
      state.pizza = action.payload;
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.status = Status.REJECTED;
      state.error = action.payload;
    });
  },
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// export const {} = PagePizzaSlice.actions;

export default PagePizzaSlice.reducer;
