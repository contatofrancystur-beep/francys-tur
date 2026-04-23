import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./CartContext";

export default function Carinhoproduto({ produto, onRemove }) {
  const { atualizarQuantidade } = useCart();
  const [quantidade, setQuantidade] = useState(produto.quantidade || 1);

  const handleQuantityChange = (e) => {
    let novaQuantidade = parseInt(e.target.value, 10) || 1;

    // Se houver estoque, valide
    if (produto.estoque && novaQuantidade > produto.estoque) {
      alert(`Máximo disponível: ${produto.estoque}`);
      novaQuantidade = produto.estoque;
    }

    setQuantidade(novaQuantidade);
    atualizarQuantidade(produto.id, novaQuantidade);
  };

  return (
    <div className="sidebar-produto">
      <div className="left-side">
        <button className="remove-produto-btn" onClick={onRemove}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="details">
        <h4>{produto.nome}</h4>
        <p>R$ {produto.preco.toFixed(2)}</p>
        <input
          type="number"
          min={1}
          max={produto.estoque || 99}
          value={quantidade}
          onChange={handleQuantityChange}
          className="quantidade-input"
        />
        <p className="price-sum">
          <b>Subtotal:</b> R$ {(produto.preco * quantidade).toFixed(2)}
        </p>
      </div>
      <div className="right-side">
        {/* Corrija para usar propriedade consistente */}
        <img 
          src={produto.imagem || produto.image || '/images/placeholder.jpg'} 
          alt={produto.nome} 
        />
      </div>
    </div>
  );
}