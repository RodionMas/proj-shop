import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPizza, useAppDispatch } from "../../store/PagePizzaSlice";
import { selectPagePizza } from "../../cart/selectors";

const PagePizza = () => {
  const appDispatch = useAppDispatch()
  const { id } = useParams();
  const { pizza } = useSelector(selectPagePizza);
  React.useEffect(() => {
    appDispatch(fetchPizza(id));
  }, []);
  return (
    <div className="container">
      <h1>{pizza.title}</h1>
      <img src={pizza.imageUrl} alt="pizza" />
      <span>Цена: {pizza.price}</span>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
        aperiam placeat fugit consequuntur, alias dolorem similique labore
        sapiente ab nam a. Corrupti ipsum nulla tempore numquam itaque,
        praesentium repudiandae debitis?
      </p>
    </div>
  );
};

export default PagePizza;
