import React, { Suspense } from "react";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import Menu from "../Menu/Menu";
import style from "./Content.module.css";
import { useSelector } from "react-redux";
import { selectContent } from "../../../cart/selectors";
import { lazy } from 'react';

const Pagination = lazy(() => import('./Pagination/Pagination'));
const Content: React.FC = () => {
  const { pizzas, status } = useSelector(selectContent)
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
          <Suspense fallback={<h1>Pagination button</h1>}>
            <Pagination />
          </Suspense>
        </>}
    </div>
  );
};

export default Content;
