import React from 'react';
import ProductCard from "../pages/ProductCard";
import { produtos } from "../data/products";

const PasseiosPage = () => {
  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Passeios em Gramado</h1>
        <p>Descubra as melhores experiências turísticas da Serra Gaúcha</p>
      </div>
      
      <div className="products-grid">
        {produtos.passeios && produtos.passeios.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default PasseiosPage;