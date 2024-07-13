import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "./store";
import { useDispatch } from "react-redux";

// type ContentType = {
//   imageUrl: string;
//   title: string;
//   sizes: number[];
//   price: number;
//   types: number[];
//   id: string;
//   count: number;
// };

type SortArrType = {
  text: "популярности" | "цене" | "алфавиту";
  id: number;
};

type ChangeObjType = {
  changePage: number;
  sortURL: string;
  filterURL: number | string;
};

enum Status {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

interface FilterSliceState {
  isActive: number;
  sortArr: SortArrType[];
  sortTextIndex: number;
  categoryArr: string[];
  changeObj: ChangeObjType;
  status: Status;
  error: null | string | unknown;
  pageCount: number;
}

export const fetchPagination = createAsyncThunk(
  "content/fetchPagination",
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://62f6c299a3bce3eed7c7622d.mockapi.io/items`
      );
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

const initialState: FilterSliceState = {
  isActive: 0,
  sortArr: [
    { text: "популярности", id: 0 },
    { text: "цене", id: 1 },
    { text: "алфавиту", id: 2 },
  ],
  sortTextIndex: 0,
  categoryArr: [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ],
  changeObj: { sortURL: "rating", filterURL: "", changePage: 1 },
  status: Status.PENDING,
  error: null,
  pageCount: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    isActiveReducer(state, action: PayloadAction<number>) {
      state.isActive = action.payload;
    },
    changePageReducer(state, action: PayloadAction<number>) {
      state.changeObj.changePage = action.payload;
    },
    //
    sortTextReducer(state, action: PayloadAction<number>) {
      state.sortTextIndex = action.payload;
    },
    //замена текста с "цене" на "price" и тд. для отправки fetch запроса
    changeSortText(state, action: PayloadAction<string>) {
      if (action.payload === "цене") {
        state.changeObj.sortURL = "price";
      } else if (action.payload === "популярности") {
        state.changeObj.sortURL = "rating";
      } else if (action.payload === "алфавиту") {
        state.changeObj.sortURL = "title";
      }
    },
    //Фильтрация масиива по категориям
    filterReducer(state, action: PayloadAction<string>) {
      if (action.payload === "Мясные") {
        state.changeObj.filterURL = 1;
      } else if (action.payload === "Вегетарианская") {
        state.changeObj.filterURL = 2;
      } else if (action.payload === "Гриль") {
        state.changeObj.filterURL = 3;
      } else if (action.payload === "Острые") {
        state.changeObj.filterURL = 4;
      } else if (action.payload === "Закрытые") {
        state.changeObj.filterURL = 5;
      } else if (action.payload === "Все") {
        state.changeObj.filterURL = "";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPagination.pending, (state) => {
      state.status = Status.PENDING;
      state.error = null;
    });
    builder.addCase(fetchPagination.fulfilled, (state, action) => {
      state.status = Status.FULFILLED;
      state.pageCount = action.payload.length;
    });
    builder.addCase(fetchPagination.rejected, (state, action) => {
      state.status = Status.REJECTED;
      state.error = action.payload;
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const {
  isActiveReducer,
  sortTextReducer,
  changeSortText,
  filterReducer,
  changePageReducer,
} = filterSlice.actions;

export default filterSlice.reducer;
