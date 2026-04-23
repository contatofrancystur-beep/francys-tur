import React from 'react';
import { useCart } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Adicione esta importação

const Listacarinho = ({ onClose }) => {
  const { produtos, removerDoCarrinho, limparCarrinho } = useCart();

  const calcularTotal = () => {
    return produtos.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  if (produtos.length === 0) {
    return (
      <div className="lista-carrinho">
        <div className="carrinho-header">
          <h3>
            <FontAwesomeIcon icon={faShoppingCart} />
            Carrinho
          </h3>
          <button onClick={onClose} className="btn-fechar">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="carrinho-vazio">
          <p>Seu carrinho está vazio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-carrinho">
      <div className="carrinho-header">
        <h3>
          <FontAwesomeIcon icon={faShoppingCart} />
          Carrinho ({produtos.length})
        </h3>
        <button onClick={onClose} className="btn-fechar">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="carrinho-itens">
        {produtos.map((item) => (
          <div key={item.id} className="carrinho-item"> {/* Use item.id como key */}
            <div className="item-imagem">
              {/* Corrija para usar propriedade consistente */}
              <img 
                src={item.imagem || item.image || '/images/placeholder.jpg'} 
                alt={item.nome} 
              />
            </div>
            <div className="item-info">
              <h4>{item.nome}</h4>
              <p>R$ {item.preco.toFixed(2)}</p>
              <p>Quantidade: {item.quantidade}</p>
            </div>
            <button 
              onClick={() => removerDoCarrinho(item.id)}
              className="btn-remover"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ))}
      </div>

      <div className="carrinho-total">
        <span>Total:</span>
        <span>R$ {calcularTotal().toFixed(2)}</span>
      </div>

      <div className="carrinho-acoes">
        <button onClick={limparCarrinho} className="btn-limpar">
          Limpar Carrinho
        </button>
        {/* Adicione link para checkout */}
        <Link to="/checkout" onClick={onClose} className="btn-finalizar">
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
};

export default Listacarinho;