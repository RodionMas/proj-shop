import React from "react";

import iconPng from "../../../assets/img/search.png";
import close from "../../../assets/img/close.png";

import style from "./Search.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterArrReducer,
  inpSearchReducer,
} from "../../../store/headerSlice";
// @ts-ignore
import debounce from "lodash.debounce";
import { selectContent, selectHeader } from "../../../cart/selectors";


const Search: React.FC = () => {
  
  let { searchText } = useSelector(selectHeader);
  const { item }: any = useSelector(selectContent);
  const dispatch = useDispatch();
  const inpRef = React.useRef<HTMLInputElement>(null);
  const debounceFilterArr = debounce((item: any) => {
    dispatch(filterArrReducer(item));
  }, 350);
  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    dispatch(inpSearchReducer(e.target.value));
    debounceFilterArr(i);
  };
  React.useEffect(() => {
    document.addEventListener("keydown", () => inpRef.current?.focus());
    return () => {
      document.addEventListener("keydown", () => inpRef.current?.focus());
    };
  }, []);

  return (
    <div className={style.root}>
      <img src={iconPng} className={style.searchIcon} alt="search" />
      <input
        ref={inpRef}
        className={style.searchInp}
        placeholder="Поиск пицц..."
        value={searchText}
        onChange={(e) => {
          onChangeEvent(e, item);
        }}
      />
      {searchText !== "" && (
        <img
          src={close}
          onClick={() => {
            dispatch(inpSearchReducer((searchText = "")));
          }}
          className={style.closeIcon}
          alt="close"
        />
      )}
    </div>
  );
};

export default Search;
