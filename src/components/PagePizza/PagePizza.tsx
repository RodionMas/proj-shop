import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPizza, useAppDispatch } from "../../store/PagePizzaSlice";
import { selectPagePizza } from "../../cart/selectors";
import style from './PagePizza.module.css'

const PagePizza = () => {
  const appDispatch = useAppDispatch()
  const { id } = useParams();
  const { pizza } = useSelector(selectPagePizza);
  React.useEffect(() => {
    appDispatch(fetchPizza(id));
  }, []);
  return (
    <div className="container">
      <div className={style.wrapper}>
      <h1 className={style.title}>{pizza.title}</h1>
      <img className={style.img} src={pizza.imageUrl} alt="pizza" />
      <span className={style.price}>Цена: {pizza.price}</span>
      <p className={style.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
        aperiam placeat fugit consequuntur, alias dolorem similique labore
        sapiente ab nam a. Corrupti ipsum nulla tempore numquam itaque,
        praesentium repudiandae debitis?
      </p>
      </div>
    </div>
  );
};

export default PagePizza;
