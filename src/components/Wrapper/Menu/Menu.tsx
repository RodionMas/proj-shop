import React from "react";
import style from "./Menu.module.css";
import Categories from "./Categories/Categories";
import Sort from "./Sort/Sort";

const Menu: React.FC = React.memo(() => {
  return (
    <div className={style.content__top}>
      <Categories />
      <Sort />
    </div>
  );
})

export default Menu;
