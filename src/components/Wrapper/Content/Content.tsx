import React from "react";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import Menu from "../Menu/Menu";

import style from "./Content.module.css";
import Pagination from "./Pagination/Pagination";
import { useSelector } from "react-redux";
import { selectContent } from "../../../cart/selectors";

const Content: React.FC = () => {
  const {pizzas, status} = useSelector(selectContent)
  return (
    <div className={style.content}>
      {status === 'rejected' ? 
      <div className={style.error}>Все ошибаются и наш сервер тоже =(</div> 
      : 
      <>
      <div className={style.container}>
        <Menu />
        {pizzas && (
          <PizzaBlock />
        )}
      </div>
      <Pagination />
      </>}
    </div>
  );
};

export default Content;
