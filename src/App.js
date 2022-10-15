import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { currentSortBurgerContext } from './contexts/currentSortBurgerContext';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

export const searchContext = React.createContext();

function App() {
  const [currentSort, setCurrentSort] = useState({});
  const [searchValue, setSearchValue] = useState();

  return (
    <>
      <currentSortBurgerContext.Provider
        value={{ currentSort, setCurrentSort }}
      >
        <searchContext.Provider value={{ searchValue, setSearchValue }}>
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
        </searchContext.Provider>
      </currentSortBurgerContext.Provider>
    </>
  );
}

export default App;
