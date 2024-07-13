//PAGEPIZZASLICE
export type ContentType = {
  imageUrl: string;
  title: string;
  sizes: number[];
  price: number;
  types: number[];
  id: string;
  count?: number | undefined;
};

export enum Status {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export interface PagePizzaSliceState {
  status: Status;
  error: null | string | unknown;
  pizza: ContentType;
}

// HEADERSLICE

export type FilterArrType = {
  imageUrl: string;
  title: string;
  sizes: number[];
  price: number;
  types: number[];
  id: string;
  count: number;
};

export interface HeaderSliceState {
  searchText: string;
  filterArr: FilterArrType[];
}

// FILTERSLICE
export type SortArrType = {
  text: "популярности" | "цене" | "алфавиту";
  id: number;
};

export interface FilterSliceState {
  isActive: number;
  sortArr: SortArrType[];
  sortTextIndex: number;
  categoryArr: string[];
  changeObj: ChangeObjType;
  status: Status;
  error: null | string | unknown;
  pageCount: number;
}
//CONTENTSLICE

export type ChangeObjType = {
  changePage: number;
  sortURL: string;
  filterURL: string | number;
};

export interface ContentSliceState {
  pageCount: number[];
  pizzas: ContentType[];
  item: ContentType[];
  status: Status;
  error: null | string | unknown;
  isLoading: boolean;
}

export type PizzaType = {
  imageUrl: string;
  title: string;
  sizes: number[];
  price: number;
  types: number[];
  id: string;
  count: number;
};

//CARTSLICE
export type CartItem = {
    typeItem: string | number;
    sizePizza: number;
    imageUrl: string;
    title: string;
    sizes: number[];
    price: number;
    types: number[];
    id: string;
    count: number;
  };
  // interface типизирует только объект и есть негласное правило
  // обычно state типизируют interface'ом, либо какие-то большие объекты
 export interface CartSliceState {
    items: CartItem[];
    totalPrice: number;
    count: number;
  }

export type ErrorCountContentType = {
  imageUrl: string;
  title: string;
  sizes: number[];
  price: number;
  types: number[];
  id: string;
  count?: any;
};
