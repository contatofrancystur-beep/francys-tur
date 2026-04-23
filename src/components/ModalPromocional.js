import React, { useState, useEffect } from 'react';


const ModalPromocional = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Abre o modal após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenModal = localStorage.getItem('saw_promo_modal');
      if (!hasSeenModal) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('saw_promo_modal', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-promocional">
        <button className="modal-close" onClick={handleClose}>×</button>
        
        <div className="modal-header">
          <span className="modal-badge">LIMITADO!</span>
          <h2>🎉 Pacotes Exclusivos com 30% OFF</h2>
          <p>Só hoje! Monte seu pacote ideal</p>
        </div>

        <div className="modal-content">
          <div className="pacote-destaque">
            <div className="pacote-info">
              <h3>Pacote Completo</h3>
              <ul>
                <li>✓ Passeio em 3 vinícolas</li>
                <li>✓ Transfer executivo</li>
                <li>✓ Jantar premium</li>
                <li>✓ Fotografias inclusas</li>
              </ul>
              
              <div className="preco-container">
                <span className="preco-original">R$ 1.200</span>
                <span className="preco-promo">R$ 840</span>
                <span className="economia">Economize R$ 360</span>
              </div>
            </div>
            
            <div className="contador-promo">
              <p>A oferta termina em:</p>
              <div className="countdown">
                <span>02</span>:<span>30</span>:<span>45</span>
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="btn-quero" onClick={() => window.location.href = '/pacotes'}>
              QUERO MEU PACOTE
            </button>
            <button className="btn-depois" onClick={handleClose}>
              Ver depois
            </button>
          </div>
          
          <div className="modal-footer">
            <small>Promoção válida apenas para as primeiras 10 reservas</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPromocional;