import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { currentSortBurgerContext } from './contexts/currentSortBurgerContext';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

function App() {
  const [currentSort, setCurrentSort] = useState({});
  const [searchValue, setSearchValue] = useState();

  return (
    <>
      <currentSortBurgerContext.Provider value={currentSort}>
        <div className="wrapper">
          <Header searchValue={searchValue} setSearchValue={setSearchValue} />
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
