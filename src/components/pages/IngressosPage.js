import React from 'react';
import ProductCard from "../pages/ProductCard";
import { produtos } from "../data/products";

const IngressosPage = () => {
  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Ingressos para Atrações</h1>
        <p>Acesso às melhores atrações de Gramado</p>
      </div>
      
      <div className="products-grid">
        {produtos.ingressos && produtos.ingressos.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default IngressosPage;