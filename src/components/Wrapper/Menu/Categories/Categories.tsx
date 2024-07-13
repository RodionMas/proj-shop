import React from "react";
import style from "./Categories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterReducer, isActiveReducer } from "../../../../store/filterSlice";
// @ts-ignore
import debounce from "lodash.debounce";
import { selectFilter } from "../../../../cart/selectors";

export default React.memo(function Categories(){
  // useWhyDidYouUpdate('Categories', )
  //достаем из initialstate значение isActive чтобы прокинуть
  //в него состояние активной категории
  const debounceFilter = React.useCallback(debounce((el: string, i: number) => {
    dispatch(isActiveReducer(i));
    dispatch(filterReducer(el));
  }, 150), []);
  const dispatch = useDispatch();
  const {categoryArr, isActive}= useSelector(selectFilter);
  return (
    <div className={style.categories}>
      <ul>
        {categoryArr.map((el: string, i: number) => {
          return (
            <li
              onClick={() => {
                debounceFilter(el, i);
              }}
              className={isActive === i ? style.active : ""}
              key={i}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
})
