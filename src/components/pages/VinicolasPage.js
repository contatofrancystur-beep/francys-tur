import React from 'react';
import ProductCard from "../pages/ProductCard";
import { produtos } from "../data/products";

const VinicolasPage = () => {
  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Roteiros de Vinícolas</h1>
        <p>Deguste os melhores vinhos da região</p>
      </div>
      
      <div className="products-grid">
        {produtos.vinicolas && produtos.vinicolas.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default VinicolasPage;