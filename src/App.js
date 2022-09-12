import { useEffect, useState } from "react";
import BurgerBlock from "./components/BurgerBlock/BurgerBlock";
import Skeleton from "./components/BurgerBlock/Skeleton";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Sort from "./components/Sort";
import "./scss/app.scss";
import api from "./utils/api";

function App() {
  const [itemList, setItemList] = useState([]);
  const [isLoadingSkeleton, setIsloadingSkeleton] = useState(false);

  const itemPreload = () => {
    setIsloadingSkeleton(true);
    api
      .getBurgerList()
      .then((data) => {
        setItemList(data);
      })
      .catch((err) => `Ошибка: ${err}`)
      .finally(() => setIsloadingSkeleton(false));
  };

  useEffect(() => {
    itemPreload();
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
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
        </div>
      </div>
    </>
  );
}

export default App;
