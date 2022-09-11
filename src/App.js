import { useEffect, useState } from "react";
import BurgerBlock from "./components/BurgerBlock";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Sort from "./components/Sort";
import "./scss/app.scss";
import api from "./utils/api";

function App() {
  const [itemList, setItemList] = useState([]);

  const itemPreload = () => {
    api.getBurgerList().then((data) => {
      setItemList(data);
    });
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
              {itemList.map((burger) => {
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

<BurgerBlock title={"Домашняя"} price={500} />;
