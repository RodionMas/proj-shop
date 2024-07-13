import React from "react";
import style from "./Pizza.module.css";

import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addItemsReducer, selectCart } from "../../../../store/cartSlice";
import { Link } from "react-router-dom";
import { ContentType } from "../../../../store/contentSlice";

type PizzaProps = {
  imageUrl: string;
  title: string;
  sizes: number[];
  price: number;
  types: number[];
  id: string;
  count: number;
}

// type ItemForCartType = {
//   typeItem: string;
//   sizePizza: number;
//   imageUrl: string;
//   title: string;
//   sizes: number[];
//   price: number;
//   types: number[];
//   id: string;
//   count: number;
// }

const Pizza: React.FC<ContentType> = ({
  imageUrl,
  title,
  sizes,
  price,
  types,
  id,
  count }) => {
  const [counter, setCounter] = React.useState(0);
  count = counter;
  const { items } = useSelector(selectCart)
  items?.find((el: { id: string; count: number; }) => {
    if (el.id === id) {
      return count = el.count + 1
    }
  })
  const dispatch = useDispatch();
  const addItemFn = (s: number, t: number, c: number) => {
    //можно было не писать imageUrl: imageUrl, а просто imageUrl например, но мне так понятнее
    const item = {
      id: id,
      imageUrl: imageUrl,
      title: title,
      sizes: sizes,
      price: price,
      types: types,
      sizePizza: s,
      typeItem: t,
      count: c,
    };
    return item;
  };

  const typesArr: any[] = ["тонкое", "традиционное"];
  const [activeTypes, setActiveTypes] = React.useState<number>(0);
  const [activeSize, setActiveSize] = React.useState<number>(0);
  const classNameBtn = cn(style.button, style.buttonOutline, style.buttonAdd);
  return (
    <div className={style.pizzaBlock}>
      <Link to={`/pizza/${id}`}>
        <img className={style.pizzaBlock__image} src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className={style.pizzaBlock__title}>{title}</h4>
      <div className={style.pizzaBlock__selector}>
        <ul>
          {types.map((type: number, i: number) => {
            return (
              <li
                key={i}
                onClick={() => {
                  setActiveTypes(i);
                }}
                className={activeTypes === i ? style.active : ""}
              >
                {typesArr[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size: number, i: number) => {
            return (
              <li
                onClick={() => setActiveSize(i)}
                key={i}
                className={activeSize === i ? style.active : ""}
              >
                {size}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style.pizzaBlock__bottom}>
        <div className={style.pizzaBlock__price}>от {price} ₽</div>
        <button
          onClick={() => {
            setCounter(counter + 1);
            const itemForCart = addItemFn(
              sizes[activeSize],
              typesArr[activeTypes],
              count
            );
            dispatch(addItemsReducer(itemForCart));
          }}
          className={classNameBtn}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{count}</i>
        </button>
      </div>
    </div>
  );
};

export default Pizza;
