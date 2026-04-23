// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
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
                href="https://wa.me/5554996623736" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon whatsapp"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a 
                href="mailto:contato@francystur.com.br"
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
                  <p className="contact-info">(54) 99662-3736</p>
                </div>
              </li>
              <li className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                <div>
                  <p className="contact-label">E-mail</p>
                  <p className="contact-info">contato@francystur.com.br</p>
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
              CNPJ: 00.000.000/0001-00 • Gramado/RS
            </p>
          </div>
          <div className="footer-disclaimer">
            <p>Este site não é afiliado aos parques e atrações. Vendemos ingressos como revendedores autorizados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;