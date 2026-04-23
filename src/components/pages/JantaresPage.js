import React from 'react';
import ProductCard from "../pages/ProductCard";
import { produtos } from "../data/products";

const JantaresPage = () => {
  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Jantares Especiais</h1>
        <p>Experiências gastronômicas únicas</p>
      </div>
      
      <div className="products-grid">
        {produtos.jantares && produtos.jantares.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default JantaresPage;