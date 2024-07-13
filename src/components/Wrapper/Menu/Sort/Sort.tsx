import React from "react";
import style from "./Sort.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeSortText, sortTextReducer } from "../../../../store/filterSlice";
import { selectFilter } from "../../../../cart/selectors";

const Sort: React.FC = React.memo(() => {

  const { sortArr, sortTextIndex } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const hideRef = React.useRef<HTMLDivElement>(null);
  const [hideContent, setHideContent] = React.useState(false);

  const hideContentFn = () => {
    setHideContent(!hideContent);
  };

  const useClickOutside = (ref: React.RefObject<HTMLDivElement>, callback: { (): void; (): void; }) => {
    const handleClick = (e: MouseEvent ) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    React.useEffect(() => {
      document.body.addEventListener("mousedown", handleClick);
      return () => {
        document.body.removeEventListener("mousedown", handleClick);
      };
    }, [handleClick]);
  };
  useClickOutside(hideRef, () => {
    if (hideContent) {
      setHideContent(false);
    }
  });
  return (
    <div ref={hideRef} className={style.sort}>
      <div onClick={() => hideContentFn()} className={style.sort__label}>
        <svg
          className={hideContent ? style.rotate : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{sortArr[sortTextIndex].text}</span>
      </div>
      {hideContent && (
        <div className={style.sort__popup}>
          <ul>
            {sortArr.map((sort: { text: string; id: number }, i: number) => {
              return (
                <li
                  onClick={() => {
                    return (
                      dispatch(sortTextReducer(i)),
                      setHideContent(false),
                      dispatch(changeSortText(sort.text))
                    );
                  }}
                  key={sort.id}
                  className={sortTextIndex === i ? style.active : ""}
                >
                  {sort.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
