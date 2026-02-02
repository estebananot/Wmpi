import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductPage } from '../features/products/pages/ProductPage';
import { CheckoutPage } from '../features/checkout/pages/CheckoutPage';
import { StatusPage } from '../features/transaction/pages/StatusPage';
import '../styles/index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/transaction/:id/status" element={<StatusPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
