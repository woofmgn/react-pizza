import React, { useEffect, useState } from 'react';

import { searchContext } from '../App';
import BurgerBlock from '../components/BurgerBlock/BurgerBlock';
import Skeleton from '../components/BurgerBlock/Skeleton';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import Sort from '../components/Sort';

const Home = () => {
  const [itemList, setItemList] = useState([]);
  const [isLoadingSkeleton, setIsloadingSkeleton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [selectedSort, setSelectedSort] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const { searchValue } = React.useContext(searchContext);

  useEffect(() => {
    setIsloadingSkeleton(true);

    const sortBy = selectedSort.sortProperty.replace('-', '');
    const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://631e2e919f946df7dc3f42c6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItemList(data);
      })
      .catch((err) => `Ошибка: ${err}`)
      .finally(() => setIsloadingSkeleton(false));
  }, [categoryId, selectedSort, searchValue, currentPage]);

  const pizzas = itemList.map((burger) => (
    <BurgerBlock key={burger.id} {...burger} />
  ));

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
            : pizzas}
        </div>
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
    </>
  );
};

export default Home;
