// components/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setProdutos(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(produtos));
  }, [produtos]);

  const adicionarAoCarrinho = (produto) => {
    setProdutos(prev => {
      // Verificar se já existe um produto com o mesmo ID E mesmo tipoPreco
      const produtoExistenteIndex = prev.findIndex(p => 
        p.id === produto.id && 
        p.tipoPreco === produto.tipoPreco
      );
      
      if (produtoExistenteIndex !== -1) {
        // Se já existe, incrementar quantidade considerando a quantidade do novo produto
        const novosProdutos = [...prev];
        const novaQuantidade = prev[produtoExistenteIndex].quantidade + (produto.quantidade || 1);
        
        novosProdutos[produtoExistenteIndex] = {
          ...prev[produtoExistenteIndex],
          quantidade: novaQuantidade
        };
        return novosProdutos;
      } else {
        // Se não existe, adicionar novo item
        return [...prev, { 
          id: produto.id,
          nome: produto.nome || produto.titulo || 'Produto',
          preco: produto.preco || produto.valor || 0,
          quantidade: produto.quantidade || 1,
          imagem: produto.imagem || produto.image || produto.img || '/images/placeholder.jpg',
          tipoPreco: produto.tipoPreco || produto.duracaoSelecionada || 'default',
          dataSelecionada: produto.dataSelecionada || 'A combinar',
          estoque: produto.estoque || 99,
          produtoIdOriginal: produto.produtoIdOriginal || produto.id,
          duracao: produto.duracao,
          categoria: produto.categoria
        }];
      }
    });
  };

  const removerDoCarrinho = (id) => {
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  const atualizarQuantidade = (id, quantidade) => {
    if (quantidade < 1) {
      removerDoCarrinho(id);
      return;
    }

    setProdutos(prev => 
      prev.map(p => 
        p.id === id ? { ...p, quantidade: Math.max(1, quantidade) } : p
      )
    );
  };

  const limparCarrinho = () => {
    setProdutos([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{
      produtos,
      adicionarAoCarrinho,
      removerDoCarrinho,
      atualizarQuantidade,
      limparCarrinho
    }}>
      {children}
    </CartContext.Provider>
  );
};