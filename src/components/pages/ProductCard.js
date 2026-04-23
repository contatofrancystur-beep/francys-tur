import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faCartPlus, faUsers, faMapMarkerAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

const ProductCard = ({ produto }) => {
  const { adicionarAoCarrinho } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Criar um item básico para o carrinho
    const itemCarrinho = {
      ...produto,
      quantidade: 1,
      // Se o preço for objeto, usar o primeiro valor
      preco: typeof produto.preco === 'object' 
        ? Object.values(produto.preco)[0] 
        : produto.preco
    };
    
    adicionarAoCarrinho(itemCarrinho);
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

  // Função para verificar se inclui Maria Fumaça
  const incluiMariaFumaca = () => {
    const produtosComMariaFumaca = [4, 6, 7, 8];
    return produtosComMariaFumaca.includes(produto?.id);
  };

  // Função para obter os dias de disponibilidade
  const getDiasDisponibilidade = () => {
    if (incluiMariaFumaca()) {
      return 'Quarta, Sexta, Sábado, Domingo';
    }
    return 'Todos os dias';
  };

  const categoriaFormatada = getCategoriaFormatada();

  return (
    <Link to={`/produto/${produto.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image">
          <img src={produto.imagem} alt={produto.nome} loading="lazy" />
          <div className="product-badge">{categoriaFormatada}</div>
        </div>
        
        <div className="product-content">
          <div className="product-header">
            <div className="location-badge">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="xs" />
              <span>Gramado, RS</span>
            </div>
            
            <div className="product-rating">
              <FontAwesomeIcon icon={faStar} className="star-icon" />
              <span>{produto.avaliacao || 4.8}</span>
              <span className="review-count">({produto.reviews || 45})</span>
            </div>
          </div>
          
          <h3 className="product-title">{produto.nome}</h3>
          
          <div className="product-details">
            <div className="product-duration">
              <FontAwesomeIcon icon={faClock} />
              <span>{produto.duracao}</span>
            </div>
          </div>
          
          {/* Dias de disponibilidade */}
          <div className="product-days-availability">
            <FontAwesomeIcon icon={faCalendarAlt} size="xs" />
            <span>{getDiasDisponibilidade()}</span>
          </div>
          
          {produto.faixaEtaria && (
            <div className="age-range">
              <span>{produto.faixaEtaria}</span>
            </div>
          )}
          
          {temMultiplosPrecos() && (
            <div className="multi-price-notice">
              <span>Várias opções disponíveis</span>
            </div>
          )}
          
          <div className="product-footer">
            {/* Preço removido e substituído por mensagem de consulta */}
            
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