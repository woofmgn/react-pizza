import qs from 'qs';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { searchContext } from '../App';
import BurgerBlock from '../components/BurgerBlock/BurgerBlock';
import Skeleton from '../components/BurgerBlock/Skeleton';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import Sort, { list } from '../components/Sort';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzasList } from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearchRef = useRef(false);
  const isMountedRef = useRef(false);

  const { items, status } = useSelector((state) => state.pizza);
  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(searchContext);

  const onClickCategory = (i) => {
    dispatch(setCategoryId(i));
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  // const fetchPizzas = async () => {
  //   setIsloadingSkeleton(true);

  //   const sortBy = sortType.replace('-', '');
  //   const order = sortType.includes('-') ? 'asc' : 'desc';
  //   const category = categoryId > 0 ? `category=${categoryId}` : '';
  //   const search = searchValue ? `&search=${searchValue}` : '';

  //   try {
  //     const res = await axios
  //     .get(
  //     `https://631e2e919f946df7dc3f42c6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  //   );
  //    dispatch(setItems(res.data)); 
  //   } catch (err) {
  //     console.log(`Ошибка ${err}`);
  //   } finally {
  //     setIsloadingSkeleton(false);
  //   }

  //   window.scrollTo(0, 0);
  // };

  const getPizzas = () => {

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

     dispatch(fetchPizzasList({
      sortBy,
      order,
      category,
      search,
      currentPage
     })); 

    window.scrollTo(0, 0);
  };

// Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearchRef.current = true;
    }
  }, [])

// Если был первый рендер, тогда запрашиваем пиццы с сервера
  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   if(!isSearchRef.current) {
  //     getPizzas()
  //   }

  //   isSearchRef.current = false;
  // }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    getPizzas();
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
  }, [categoryId, sortType, currentPage]);

  const pizzas = items.map((burger) => (
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
        {
          status === 'error' ? (
          <div className='content__error-info'>
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
