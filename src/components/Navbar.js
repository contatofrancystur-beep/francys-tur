import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faSearch,
  faTicketAlt,
  faBus,
  faUtensils,
  faWineGlassAlt,
  faCartShopping,
  faUmbrellaBeach,
  faTree,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { usePesquisa } from "./PesquisaContext";
import Listacarinho from "./Listacarinho";
import { useCart } from "./CartContext";
import Loading from "./Loading";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { searchTerm, setSearchTerm } = usePesquisa();
  const { produtos } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const cartModalRef = useRef(null);
  const cartButtonRef = useRef(null);

  // Efeito para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Focar no input de busca quando mostrar mobile search
  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMobileSearch]);

  // Fechar carrinho quando clicar fora - CORREÇÃO CRÍTICA
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Se o carrinho está aberto E o clique foi fora do modal E fora do botão do carrinho
      if (showCart && cartModalRef.current) {
        const isClickInsideModal = cartModalRef.current.contains(event.target);
        const isClickOnCartButton = cartButtonRef.current?.contains(event.target);
        
        if (!isClickInsideModal && !isClickOnCartButton) {
          setShowCart(false);
        }
      }
    };

    // Também fecha com ESC
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && showCart) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showCart]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/busca", { state: { searchQuery: searchTerm } });
        setShowMobileSearch(false);
      }, 500);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const quantidadeTotal = produtos.reduce(
    (acc, produto) => acc + produto.quantidade,
    0
  );

  const handleHomeClick = () => {
    setSearchTerm("");
    navigate("/");
    setShowMenu(false);
    setShowCart(false);
    setShowMobileSearch(false);
  };

  // CORREÇÃO CRÍTICA: handleCartClick
  const handleCartClick = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    console.log("Carrinho clicado! Estado atual:", showCart);
    setShowCart(!showCart);
    setShowMenu(false);
    setShowMobileSearch(false);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setShowCart(false);
    setShowMobileSearch(false);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    setShowMenu(false);
    setShowCart(false);
  };

  // Menu simplificado
  const menuItems = [
    { path: "/", label: "Início", icon: faHome, exact: true },
    { path: "/passeios", label: "Passeios", icon: faUmbrellaBeach },
    { path: "/viniculas", label: "Vinícolas", icon: faWineGlassAlt },
    { path: "/transfers", label: "Transfers", icon: faBus },
    { path: "/jantares", label: "Jantares", icon: faUtensils },
    { path: "/ingressos", label: "Ingressos", icon: faTicketAlt },
    { path: "/natal-luz", label: "Natal Luz", icon: faTree },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.includes(path);
  };

  return (
    <>
      <div className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="inner-content">
          {/* Logo */}
          <Link to="/" onClick={handleHomeClick} className="logo-link">
            <div className="logo">
              <div className="logo-text">
                <h1 className="logo-title">FRANCYSTUR</h1>
                <p className="logo-subtitle">Experiências Inesquecíveis</p>
              </div>
            </div>
          </Link>
          
          {/* Menu Principal */}
          <nav className={`nav-menu ${showMenu ? 'show' : ''}`}>
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li className="nav-item" key={item.path}>
                  <Link 
                    to={item.path}
                    onClick={() => setShowMenu(false)}
                    className={`nav-link ${isActive(item.path, item.exact) ? 'active' : ''}`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="fa-icon" /> 
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Ícones e Funcionalidades */}
          <div className="navs-icon-conteiner">
            {/* Barra de Pesquisa Desktop */}
            <div className="search-input-container desktop-search">
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Buscar experiências..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                aria-label="Pesquisar experiências turísticas"
                className="search-input"
              />
              <button 
                className="search-button"
                onClick={handleSearch}
                aria-label="Buscar"
              >
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </button>
            </div>
            
            {/* Ícone de Busca Mobile */}
            <button 
              className="search-icon-mobile"
              onClick={toggleMobileSearch}
              aria-label="Buscar"
            >
              <FontAwesomeIcon icon={showMobileSearch ? faTimes : faSearch} />
            </button>
            
            {/* Carrinho Minimalista - CORREÇÃO CRÍTICA */}
            <button
              ref={cartButtonRef}
              className={`Shopping-Cart ${showCart ? 'active' : ''}`}
              onClick={handleCartClick}
              aria-label={showCart ? "Fechar carrinho" : "Abrir carrinho"}
              aria-expanded={showCart}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {quantidadeTotal > 0 && (
                <div className="produto-Count">{quantidadeTotal}</div>
              )}
            </button>

            {/* Menu Mobile */}
            <button
              className="menu-button"
              onClick={handleMenuClick}
              aria-label={showMenu ? "Fechar menu" : "Abrir menu"}
              aria-expanded={showMenu}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {/* Barra de Pesquisa Mobile */}
        {showMobileSearch && (
          <div className="mobile-search-container">
            <div className="search-input-container mobile-search">
              <input
                ref={searchInputRef}
                type="search"
                placeholder="O que você procura?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                aria-label="Pesquisar experiências turísticas"
                className="search-input"
              />
              <button 
                className="search-button"
                onClick={handleSearch}
                aria-label="Buscar"
              >
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal do Carrinho - FORA DO NAVBAR, NO BODY */}
      {showCart && (
        <div 
          ref={cartModalRef}
          className="cart-modal-overlay"
          onClick={(e) => {
            // Fecha se clicar diretamente no overlay (fora do carrinho)
            if (e.target === e.currentTarget) {
              setShowCart(false);
            }
          }}
        >
          <Listacarinho onClose={() => setShowCart(false)} />
        </div>
      )}

      {/* Loading */}
      {isLoading && <Loading />}

      {/* Overlay para Mobile Menu */}
      {showMenu && (
        <div 
          className="menu-overlay" 
          onClick={() => setShowMenu(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}