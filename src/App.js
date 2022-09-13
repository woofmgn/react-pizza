import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { currentSortBurgerContext } from "./contexts/currentSortBurgerContext";

import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./scss/app.scss";

function App() {
  // const [itemList, setItemList] = useState([]);
  // const [isLoadingSkeleton, setIsloadingSkeleton] = useState(false);

  const [currentSort, setCurrentSort] = useState({});

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

  // const handleSortBurger = (data) => {
  //   api.getSortList(data).then()
  // }

  return (
    <>
      <currentSortBurgerContext.Provider value={currentSort}>
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </currentSortBurgerContext.Provider>
    </>
  );
}

export default App;
