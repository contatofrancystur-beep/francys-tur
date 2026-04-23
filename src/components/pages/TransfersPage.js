import React from 'react';
import ProductCard from "../pages/ProductCard";
import { produtos } from "../data/products";

const TransfersPage = () => {
  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Transfer e Transporte</h1>
        <p>Deslocamento seguro e confortável</p>
      </div>
      
      <div className="products-grid">
        {produtos.transfers && produtos.transfers.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default TransfersPage;