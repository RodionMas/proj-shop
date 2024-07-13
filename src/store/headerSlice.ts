import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type FilterArrType = {
  imageUrl: string;
  title: string;
  sizes: number[];
  price: number;
  types: number[];
  id: string;
  count: number;
};

interface HeaderSliceState {
  searchText: string;
  filterArr: FilterArrType[];
}

const initialState: HeaderSliceState = {
  searchText: "",
  filterArr: [],
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    inpSearchReducer(state, action) {
      state.searchText = action.payload;
    },
    filterArrReducer(state, action: PayloadAction<FilterArrType[]>) {
      state.filterArr = action.payload.filter((el: { title: string; }) => {
        return el.title.toLowerCase().includes(state.searchText.toLowerCase());
      });
    },
  },
});

export const { inpSearchReducer, filterArrReducer } = headerSlice.actions;

export default headerSlice.reducer;
