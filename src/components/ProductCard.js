import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faCartPlus, faUsers, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

const ProductCard = ({ produto }) => {
  const { adicionarAoCarrinho } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const itemCarrinho = {
      ...produto,
      quantidade: 1,
      preco: typeof produto.preco === 'object' 
        ? Object.values(produto.preco)[0] 
        : produto.preco
    };
    
    adicionarAoCarrinho(itemCarrinho);
  };

  // Função para obter o texto do preço (versão simplificada)
  const getTextoPreco = () => {
    if (!produto.preco) return "R$ 0,00";
    
    if (typeof produto.preco === 'object') {
      const valores = Object.values(produto.preco);
      if (valores.length === 0) return "R$ 0,00";
      
      const valoresNumericos = valores.map(v => parseFloat(v) || 0);
      const menorPreco = Math.min(...valoresNumericos);
      return `A partir de R$ ${menorPreco.toFixed(2).replace('.', ',')}`;
    }
    
    const precoNum = parseFloat(produto.preco);
    return `R$ ${isNaN(precoNum) ? "0,00" : precoNum.toFixed(2).replace('.', ',')}`;
  };

  // Função para verificar se tem múltiplos preços
  const temMultiplosPrecos = () => {
    return typeof produto.preco === 'object' && Object.keys(produto.preco).length > 1;
  };

  // Função para obter a categoria formatada
  const getCategoriaFormatada = () => {
    const categorias = {
      'passeios': 'Passeio',
      'vinicolas': 'Vinícola',
      'transfers': 'Transfer',
      'jantares': 'Jantar',
      'ingressos': 'Ingresso',
      'natal-luz': 'Natal Luz',
      'transporte-passeios': 'Transporte'
    };
    
    return categorias[produto.categoria] || produto.categoria;
  };

  const textoPreco = getTextoPreco();
  const categoriaFormatada = getCategoriaFormatada();
  const temMultiplos = temMultiplosPrecos();

  return (
    <Link to={`/produto/${produto.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image">
          <img src={produto.imagem} alt={produto.nome} loading="lazy" />
          <div className="product-badge">{categoriaFormatada}</div>
          
          {/* Mostrar badges apenas se houver informações relevantes */}
          {temMultiplos && (
            <div className="multi-price-badge">Várias opções</div>
          )}
          
          {produto.faixaEtaria && (
            <div className="age-badge">{produto.faixaEtaria.split(' ')[0]}</div>
          )}
        </div>
        
        <div className="product-content">
          <div className="product-header">
            <div className="location-badge">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="xs" />
              <span>Gramado, RS</span>
            </div>
            
            {/* Rating removido da home para simplificar */}
          </div>
          
          <h3 className="product-title">{produto.nome}</h3>
          <p className="product-description">{produto.descricao}</p>
          
          <div className="product-details">
            <div className="product-duration">
              <FontAwesomeIcon icon={faClock} />
              <span>{produto.duracao}</span>
            </div>
            
            {produto.inclui && produto.inclui.length > 0 && (
              <div className="product-includes">
                <FontAwesomeIcon icon={faUsers} />
                <span>{produto.inclui.length} itens</span>
              </div>
            )}
          </div>
          
          {/* NÃO mostrar estas informações na home */}
          {/* age-range e multi-price-notice foram removidas */}
          
          <div className="product-footer">
            <div className="product-price">
              <span className="price">{textoPreco}</span>
              <span className="per-person">
                {produto.categoria === 'transporte-passeios' ? 'por período' : 'por pessoa'}
              </span>
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              title="Adicionar ao carrinho"
            >
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;