import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
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
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    itemList={itemList}
                    isLoadingSkeleton={isLoadingSkeleton}
                  />
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
