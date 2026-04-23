import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const pacotes = [
    {
      id: 1, // ID do "Tour pela Cidade de Gramado" (Casamento dos Sonhos)
      titulo: "Casamento dos Sonhos",
      desc: "Tour Romântico pela Cidade + Jantar Especial",
      precoOriginal: 450,
      precoPromo: 299,
      imagem: "/images/casamento-sonhos.jpg",
      cor: "linear-gradient(135deg, #4e90cdff, #44a08d)"
    },
    {
      id: 12, // ID do "Alpen Park" (Open Park)
      titulo: "Open Park",
      desc: "Parque de Aventuras + Transporte",
      precoOriginal: 280,
      precoPromo: 189,
      imagem: "/images/open-park.jpg",
      cor: "linear-gradient(135deg, #4e90cdff, #44a08d)"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="promo-banner-container">
      <button 
        className="close-promo" 
        onClick={() => setIsVisible(false)}
        aria-label="Fechar banner"
      >
        ×
      </button>
      
      <div className="promo-header">
        <span className="promo-icon">🎁</span>
        <h2>OFERTA ESPECIAL POR TEMPO LIMITADO</h2>
      </div>
      
      <div className="promo-grid">
        {pacotes.map(pacote => (
          <div 
            key={pacote.id} 
            className="promo-card"
            style={{ background: pacote.cor }}
          >
            <div className="promo-card-content">
              <h3>{pacote.titulo}</h3>
              <p>{pacote.desc}</p>
              
              <div className="promo-image-container">
                <img 
                  src={pacote.imagem} 
                  alt={pacote.titulo}
                  className="promo-card-image"
                  onError={(e) => {
                    // Fallback para imagem padrão se a específica não carregar
                    e.target.src = pacote.id === 1 
                      ? "/images/gramado-tour.jpg" 
                      : "/images/alpen-park.jpg";
                  }}
                />
              </div>
              
              <div className="promo-precos">
                <span className="preco-antigo">
                  De R$ {pacote.precoOriginal.toFixed(2)}
                </span>
                <span className="preco-novo">
                  Por R$ {pacote.precoPromo.toFixed(2)}
                </span>
              </div>
              
              <div className="promo-economia">
                Economize R$ {(pacote.precoOriginal - pacote.precoPromo).toFixed(2)}
              </div>
              
              <Link 
                to={`/produto/${pacote.id}`} // Link direto para o ID do produto
                className="promo-btn"
                state={{ 
                  productId: pacote.id,
                  category: pacote.id === 1 ? 'passeios' : 'passeios'
                }}
              >
                Ver Oferta
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="promo-footer">
        <p>⚠️ Oferta válida apenas para reservas realizadas hoje</p>
        <Link to="/pacotes" className="ver-todos">
          Ver todos os pacotes →
        </Link>
      </div>
    </div>
  );
};

export default PromoBanner;