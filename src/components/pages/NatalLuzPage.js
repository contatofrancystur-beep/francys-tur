import React from 'react';
import ProductCard from "../pages/ProductCard";
import { produtos } from "../data/products";

const NatalLuzPage = () => {
  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Natal Luz de Gramado</h1>
        <p>Viva a magia do maior evento natalino do mundo</p>
      </div>
      
      <div className="products-grid">
        {produtos.natalLuz && produtos.natalLuz.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default NatalLuzPage;