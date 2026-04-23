import React from 'react';
import { useCart } from './CartContext';

const DebugCart = () => {
  const { produtos } = useCart();
  
  console.log('Produtos no carrinho:', produtos);
  
  return (
    <div style={{display: 'none'}}>
      <h3>Debug Carrinho</h3>
      <pre>{JSON.stringify(produtos, null, 2)}</pre>
    </div>
  );
};

export default DebugCart;