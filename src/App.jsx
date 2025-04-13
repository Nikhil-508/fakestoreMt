import React from 'react';
import Header from './Components/Header';
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>

    <Header />
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      
    </Routes>
  </>
  );
};

export default App;
