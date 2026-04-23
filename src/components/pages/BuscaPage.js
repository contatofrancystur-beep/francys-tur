import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from "../pages/ProductCard";
import { todosProdutos } from "../data/products";

const BuscaPage = () => {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';
  
  const resultados = todosProdutos.filter(produto => 
    produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="search-page">
      <h1>Resultados para: "{searchQuery}"</h1>
      <div className="products-grid">
        {resultados.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default BuscaPage;