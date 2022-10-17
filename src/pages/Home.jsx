import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchContext } from '../App';
import BurgerBlock from '../components/BurgerBlock/BurgerBlock';
import Skeleton from '../components/BurgerBlock/Skeleton';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import Sort from '../components/Sort';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const {categoryId, sort} = useSelector(state => state.filter);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();

  const [itemList, setItemList] = useState([]);
  const [isLoadingSkeleton, setIsloadingSkeleton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onClickCategory = (i) => {
    dispatch(setCategoryId(i));
  }

  const { searchValue } = React.useContext(searchContext);

  useEffect(() => {
    setIsloadingSkeleton(true);

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
      `https://631e2e919f946df7dc3f42c6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    .then((res) => {
      setItemList(res.data);
    })
    .catch((err) => `Ошибка: ${err}`)
    .finally(() => setIsloadingSkeleton(false));
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = itemList.map((burger) => (
    <BurgerBlock key={burger.id} {...burger} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onClickCategory={onClickCategory}
          />
          <Sort />
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
