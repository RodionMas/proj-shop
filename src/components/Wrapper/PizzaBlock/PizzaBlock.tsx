import style from "./PizzaBlock.module.css";
import Pizza from "./Pizza/Pizza";
import MyLoader from "./MyLoader/MyLoader";
import { useSelector } from "react-redux";
import { selectContent, selectHeader } from "../../../cart/selectors";
import { ContentType, PizzaType } from "../../../cart/types";



const PizzaBlock: React.FC = () => {
  const { searchText, filterArr } = useSelector(selectHeader);
  const { status, item, pizzas } = useSelector(selectContent);
  return (
    <>
      <h2 className={style.content__title}>Все пиццы</h2>
      <div
        className={
          item.length <= 4 ? style.content__items_less : style.content__items
        }
      >
        {status === 'pending'
          ? [...new Array(8)].map((_, i) => {
            return <MyLoader key={i} />;
          })
          : item.length !== 0 && searchText !== ""
            ? filterArr?.map((el: PizzaType, i: number) => {
              return <Pizza key={i} {...el} />;
            })
            : pizzas?.map((el: ContentType, i: number) => {
              return <Pizza key={i} {...el} />;
            })}
      </div>
    </>
  );
};

export default PizzaBlock;
