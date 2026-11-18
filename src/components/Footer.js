h// components/Footer.jsx 
import React from 'react';
import { Link } from 'react-router-dom';
import { linkWhatsAppComGclid } from './utils/gclidWhatsApp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faGoogle,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faMapMarkerAlt,
  faClock,
  faShieldAlt,
  faCreditCard,
  faCheckCircle,
  faTruck,
  faTicketAlt,
  faWineGlassAlt,
  faStar,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="francystur-footer">
      <div className="footer-container">
        
        {/* Seção Principal */}
        <div className="footer-main-section">
          
          {/* Coluna 1: Sobre a Empresa */}
          <div className="footer-about">
            <h3 className="footer-title">
              <span className="footer-brand">FrancyStur</span>
              <span className="footer-subtitle">Gramado</span>
            </h3>
            <p className="footer-description">
              Sua experiência completa em Gramado. Oferecemos os melhores passeios, ingressos e jantares temáticos para tornar sua viagem inesquecível.
            </p>
            
            {/* Redes Sociais */}
            <div className="footer-social">
              <a 
                href="https://www.facebook.com/francystur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a 
                href="https://www.instagram.com/francystur/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a 
                href="https://wa.me/5554981279781"
                onClick={(e) => { e.currentTarget.href = linkWhatsAppComGclid(); }}
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon whatsapp"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a 
                                href="mailto:contatofrancystur@gmail.com"
                className="social-icon email"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="footer-links">
            <h4 className="footer-section-title">Nossos Serviços</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/passeios" className="footer-link">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="link-icon" />
                  Passeios Turísticos
                </Link>
              </li>
              <li>
                <Link to="/jantares" className="footer-link">
                  <FontAwesomeIcon icon={faClock} className="link-icon" />
                  Jantares Temáticos
                </Link>
              </li>
              <li>
                <Link to="/ingressos" className="footer-link">
                  <FontAwesomeIcon icon={faTicketAlt} className="link-icon" />
                  Ingressos
                </Link>
              </li>
              <li>
                <Link to="/viniculas" className="footer-link">
                  <FontAwesomeIcon icon={faWineGlassAlt} className="link-icon" />
                  Rota das Vinícolas
                </Link>
              </li>
              <li>
                <Link to="/transfers" className="footer-link">
                  <FontAwesomeIcon icon={faTruck} className="link-icon" />
                  Transfer & Transporte
                </Link>
              </li>
              <li>
                <Link to="/natal-luz" className="footer-link">
                  <FontAwesomeIcon icon={faStar} className="link-icon" />
                  Natal Luz
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="footer-contact">
            <h4 className="footer-section-title">Fale Conosco</h4>
            <ul className="contact-list">
              <li className="contact-item">
                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                <div>
                  <p className="contact-label">Telefone/WhatsApp</p>
                            <p className="contact-info">(54) 98127-9781</p>
                </div>
              </li>
              <li className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                <div>
                  <p className="contact-label">E-mail</p>
                            <p className="contact-info">contatofrancystur@gmail.com</p>
                </div>
              </li>
              <li className="contact-item">
                <FontAwesomeIcon icon={faClock} className="contact-icon" />
                <div>
                  <p className="contact-label">Horário de Atendimento</p>
                  <p className="contact-info">Seg-Sex: 9h às 18:30</p>
                  <p className="contact-info">Sáb-Dom: Fechado</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Segurança */}
          <div className="footer-security">
            <h4 className="footer-section-title">Segurança</h4>
            <div className="security-features">
              <div className="security-item">
                <FontAwesomeIcon icon={faShieldAlt} className="security-icon shield" />
                <div>
                  <p className="security-title">Compra 100% Segura</p>
                  <p className="security-desc">Seus dados protegidos</p>
                </div>
              </div>
              <div className="security-item">
                <FontAwesomeIcon icon={faCreditCard} className="security-icon card" />
                <div>
                  <p className="security-title">Pagamento Facilitado</p>
                  <p className="security-desc">Várias formas de pagamento</p>
                </div>
              </div>
              <div className="security-item">
                <FontAwesomeIcon icon={faCheckCircle} className="security-icon check" />
                <div>
                  <p className="security-title">Ingresso Imediato</p>
                  <p className="security-desc">Receba na hora por e-mail</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links Institucionais */}
        <div className="footer-institutional">
          <div className="institutional-links">
            <Link to="/politica-privacidade" className="institutional-link">
              Política de Privacidade
            </Link>
            <Link to="/termos-uso" className="institutional-link">
              Termos de Uso
            </Link>
            <Link to="/trocas-cancelamentos" className="institutional-link">
              Trocas e Cancelamentos
            </Link>
            <Link to="/faq" className="institutional-link">
              Dúvidas Frequentes
            </Link>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} FrancyStur Gramado. Todos os direitos reservados.
            </p>
            <p className="company-info">
              CNPJ: 55.680.192/0001-16 • Gramado/RS
            </p>
          </div>
{/* Cadastur */}
            <div className="footer-seals">
                        <a href="https://www.cadastur.turismo.gov.br" target="_blank" rel="noopener noreferrer" className="cadastur-seal" title="Certificado Cadastur - Agência de Turismo Regularizada">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160" aria-label="Cadastur">
                            <rect width="280" height="160" rx="10" fill="#1565C0"/>
                            <rect x="1" y="1" width="278" height="158" rx="9" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3"/>
                            <g transform="translate(18, 18)">
                              <path d="M 8,22 C 8,22 2,14 10,10 C 18,6 24,14 30,14 C 36,14 42,8 48,10 C 54,12 50,22 44,22 C 38,22 32,16 26,16 C 20,16 14,22 8,22 Z" fill="#F9C423" opacity="0.95"/>
                              <path d="M 8,16 C 8,16 14,10 20,10 C 26,10 32,16 38,16 C 44,16 50,10 56,12 C 62,14 58,24 50,22 C 42,20 36,14 30,14 C 24,14 18,20 12,20 C 6,20 4,16 8,16 Z" fill="#5BB65A" opacity="0.95"/>
                            </g>
                            <text x="82" y="40" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="22" fill="#ffffff" letterSpacing="1">Cadastur</text>
                            <text x="82" y="54" fontFamily="Arial,sans-serif" fontSize="9" fill="#ffffff" opacity="0.85" letterSpacing="0.3">Fazendo o turismo legal.</text>
                            <line x1="14" y1="72" x2="266" y2="72" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.4"/>
                            <text x="140" y="90" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="11" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">AGÊNCIA DE TURISMO</text>
                            <text x="140" y="108" fontFamily="Arial,sans-serif" fontSize="9" fill="#ffffff" textAnchor="middle" opacity="0.9">THAIS RAFAELA WIERZYNSKI ARRUE</text>
                            <text x="140" y="124" fontFamily="Arial,sans-serif" fontSize="9" fill="#F9C423" textAnchor="middle">CNPJ: 55.680.192/0001-16</text>
                            <text x="140" y="140" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#ffffff" textAnchor="middle" opacity="0.85">Válido: 15/07/2026 a 15/07/2028</text>
                            <text x="140" y="155" fontFamily="Arial,sans-serif" fontSize="7" fill="#ffffff" textAnchor="middle" opacity="0.6">Ministério do Turismo • Governo Federal</text>
                          </svg>
                        </a>
                      </div>
                        <p>Este site nao e afiliado aos parques e atracoes. Vendemos ingressos como revendedores autorizados.</p>
            </div>
            </div>
            </div>
            </footer>
  );
};

export default Footer;
