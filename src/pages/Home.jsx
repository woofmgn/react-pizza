import { useEffect, useState } from "react";

import BurgerBlock from "../components/BurgerBlock/BurgerBlock";
import Skeleton from "../components/BurgerBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";

const Home = () => {
  const [itemList, setItemList] = useState([]);
  const [isLoadingSkeleton, setIsloadingSkeleton] = useState(false);

  const [categoryId, setCategoryId] = useState(0);
  // const [isVisible, setIsVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  // const itemPreload = () => {
  //   setIsloadingSkeleton(true);
  //   api
  //     .getBurgerList()
  //     .then((data) => {
  //       setItemList(data);
  //     })
  //     .catch((err) => `Ошибка: ${err}`)
  //     .finally(() => setIsloadingSkeleton(false));
  // };

  // useEffect(() => {
  //   itemPreload();
  // }, []);

  useEffect(() => {
    setIsloadingSkeleton(true);
    fetch(
      `https://631e2e919f946df7dc3f42c6.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${selectedSort.sortProperty}&order=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItemList(data);
      })
      .catch((err) => `Ошибка: ${err}`)
      .finally(() => setIsloadingSkeleton(false));
  }, [categoryId, selectedSort]);

  // const onClickCategory = (id) => {
  //   setCategoryId(id);
  // };

  // const onClickSortList = (i) => {
  //   setSelectedSort(i);
  //   setIsVisible(false);
  // };

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onClickCategory={(i) => setCategoryId(i)}
          />
          <Sort
            selectedSort={selectedSort}
            onChangeSortList={(i) => setSelectedSort(i)}
          />
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
