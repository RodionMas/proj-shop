import React from "react";

import qs from "qs";
import style from "./Wrapper.module.css";
import Header from "../Header/Header";
import Content from "./Content/Content";
import { Route, Routes, useNavigate } from "react-router-dom";
// import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { changeLoading, fetchPizzas, useAppDispatch } from "../../store/contentSlice";
// import PagePizza from "../PagePizza/PagePizza";
import { selectFilter } from "../../cart/selectors";

import { lazy } from 'react';

const PagePizza = lazy(() => import(/* webpackChunkName: "PagePizza" */'../PagePizza/PagePizza'));
const Cart = lazy(() => import(/* webpackChunkName: "Cart" */'../Cart/Cart'));
const Wrapper = () => {

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch()
  const { changeObj } = useSelector(selectFilter);
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(changeLoading(true));
    appDispatch(fetchPizzas(changeObj));
    window.scrollTo(0, 0);
  }, [changeObj.sortURL, changeObj.filterURL, changeObj.changePage]);
  React.useEffect(() => {
    const queryStr = qs.stringify({
      sortBy: changeObj.sortURL,
      category: changeObj.filterURL,
      page: changeObj.changePage,
    });
    navigate(`?${queryStr}`);
  }, [changeObj.sortURL, changeObj.filterURL, changeObj.changePage]);
  return (
    <div className={style.wrapper}>
      <Header />
      <Routes>
        <Route index element={<Content />} />
        <Route path="/pizza/:id" element={(
          <React.Suspense fallback={<div>Зарузка...</div>}>
            <PagePizza />
          </React.Suspense>
        )} />
        <Route path="/cart" element={(
          <React.Suspense fallback={<div>Зарузка...</div>}>
            <Cart />
          </React.Suspense>
        )} />
      </Routes>
    </div>
  );
};

export default Wrapper;
