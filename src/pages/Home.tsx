import qs from 'qs';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import BurgerBlock from '../components/BurgerBlock/BurgerBlock';
import Skeleton from '../components/BurgerBlock/Skeleton';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import Sort, { list } from '../components/Sort';
import {
  setCategoryId,
  setCurrentPage,
  setFilters
} from '../redux/slices/filterSlice';
import { fetchPizzasList } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearchRef = useRef(false);
  const isMountedRef = useRef(false);

  const { items, status } = useSelector((state: RootState) => state.pizza);
  const { searchValue, categoryId, sort, currentPage } = useSelector(
    (state: RootState) => state.filter
  );
  const sortType = sort.sortProperty;

  // const onClickCategory = (i: number) => {
  //   dispatch(setCategoryId(i));
  // };

  const onClickCategory = React.useCallback((i: number) => {
    dispatch(setCategoryId(i));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzasList({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      if (sort) {
        dispatch(setFilters({
          ...params,
          sort,
          searchValue,
          categoryId,
          currentPage,
        })
        );
      }
      isSearchRef.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPizzas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sortType, searchValue, currentPage]);

  // Если изменились параметры и был первый рендер
  useEffect(() => {
    if (isMountedRef.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMountedRef.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sortType, currentPage]);

  const pizzas = items.map((burger: any) => (
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
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
          </div>
        ) : (
          <div className="content__items">
            {status === 'loading'
              ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
              : pizzas}
          </div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
