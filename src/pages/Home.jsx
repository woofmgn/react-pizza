import React from "react";
import BurgerBlock from "../components/BurgerBlock/BurgerBlock";
import Skeleton from "../components/BurgerBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";

const Home = ({ itemList, isLoadingSkeleton }) => {
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoadingSkeleton
            ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
            : itemList.map((burger) => {
                return <BurgerBlock key={burger.id} {...burger} />;
              })}
        </div>
      </div>
    </>
  );
};

export default Home;
