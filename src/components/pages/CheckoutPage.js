import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart, faTag, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useCart } from '../CartContext';

const CheckoutPage = () => {
  const { produtos, limparCarrinho } = useCart();
  const navigate = useNavigate();
  
  if (produtos.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Seu carrinho está vazio</h1>
        <button onClick={() => navigate('/passeios')}>Ver Passeios</button>
      </div>
    );
  }
  
  // Calcular total
  const total = produtos.reduce((acc, produto) => {
    return acc + (produto.preco * produto.quantidade);
  }, 0);
  
  // Formatar número para WhatsApp (exemplo com DDD 54)
  const telefone = '5554981279781'; // Número com DDI e DDD
  
  const enviarWhatsApp = () => {
    // Montar lista de produtos
    let listaProdutos = '';
    produtos.forEach((produto, index) => {
      listaProdutos += `\n${index + 1}. *${produto.nome}*`;
      listaProdutos += `\n   Quantidade: ${produto.quantidade}`;
      listaProdutos += `\n   Valor unitário: R$ ${produto.preco.toFixed(2)}`;
      listaProdutos += `\n   Subtotal: R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;
      listaProdutos += `\n   ──────────────────────`;
    });
    
    // Montar mensagem completa
    const mensagem = `🎟️ *PEDIDO - PASSEIOS TURÍSTICOS* 🎟️\n\n` +
                     `*Itens do pedido:*${listaProdutos}\n\n` +
                     `📋 *Resumo do Pedido:*\n` +
                     `Total de itens: ${produtos.length}\n` +
                     `Valor total: *R$ ${total.toFixed(2)}*\n\n` +
                     `📍 *Dados do Cliente:*\n` +
                     `(Aguardando informações...)\n\n` +
                     `🕒 *Previsão de Retirada:*\n` +
                     `(A definir)\n\n` +
                     `💳 *Forma de Pagamento:*\n` +
                     `(A combinar)\n\n` +
                     `_Este pedido foi gerado automaticamente pelo site._`;
    
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    // Limpar carrinho após alguns segundos (opcional)
    setTimeout(() => {
      limparCarrinho();
    }, 2000);
  };
  
  // Função para visualizar pedido antes de enviar
  const visualizarPedido = () => {
    let detalhes = `*Resumo do seu pedido:*\n\n`;
    
    produtos.forEach((produto, index) => {
      detalhes += `*${index + 1}. ${produto.nome}*\n`;
      detalhes += `   Qtd: ${produto.quantidade} x R$ ${produto.preco.toFixed(2)}\n`;
      detalhes += `   Subtotal: R$ ${(produto.preco * produto.quantidade).toFixed(2)}\n\n`;
    });
    
    detalhes += `*TOTAL: R$ ${total.toFixed(2)}*`;
    
    alert(detalhes);
  };
  
  return (
    <div className="checkout-page">
      <h1><FontAwesomeIcon icon={faShoppingCart} /> Finalizar Pedido</h1>
      
      <div className="checkout-summary">
        <h2><FontAwesomeIcon icon={faTag} /> Resumo do Pedido</h2>
        
        <div className="order-items">
          {produtos.map((produto, index) => (
            <div key={index} className="order-item">
              <div className="item-info">
                <h3>{produto.nome}</h3>
                <p>Quantidade: {produto.quantidade}</p>
                <p>Valor unitário: R$ {produto.preco.toFixed(2)}</p>
              </div>
              <div className="item-subtotal">
                <strong>R$ {(produto.preco * produto.quantidade).toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
        
        <div className="order-total">
          <div className="total-label">
            <FontAwesomeIcon icon={faDollarSign} />
            <span>Total do Pedido:</span>
          </div>
          <div className="total-value">
            <strong>R$ {total.toFixed(2)}</strong>
          </div>
        </div>
        
        <div className="checkout-actions">
          <button onClick={visualizarPedido} className="btn-preview">
            Visualizar Pedido
          </button>
          
          <button onClick={enviarWhatsApp} className="btn-whatsapp">
            <FontAwesomeIcon icon={faWhatsapp} /> Finalizar via WhatsApp
          </button>
          
          <button onClick={() => navigate('/passeios')} className="btn-continue">
            Adicionar Mais Itens
          </button>
          
          <button onClick={limparCarrinho} className="btn-clear">
            Limpar Carrinho
          </button>
        </div>
        
        <div className="checkout-info">
          <p>
            <strong>Instruções:</strong> Ao clicar em "Finalizar via WhatsApp", 
            você será redirecionado para conversar conosco no WhatsApp. 
            Por favor, confirme todos os dados do pedido e informe sua forma de pagamento preferida.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;