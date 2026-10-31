import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { usePesquisa } from "./PesquisaContext";
import { waLink } from "./utils/gclid";
import { IconWhats, IconMenu, IconClose, IconSearch } from "./SiteIcons";

const MENU = [
  { to: "/", label: "Início", end: true },
  { to: "/passeios", label: "Passeios" },
  { to: "/viniculas", label: "Vinícolas" },
  { to: "/jantares", label: "Jantares" },
  { to: "/ingressos", label: "Ingressos" },
  { to: "/transfers", label: "Transfers" },
  { to: "/natal-luz", label: "Natal Luz" },
];

export default function SiteHeader() {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const { setSearchTerm } = usePesquisa();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { setAberto(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [aberto]);

  const buscar = (e) => {
    e.preventDefault();
    if (!busca.trim()) return;
    setSearchTerm(busca.trim());
    navigate("/busca");
  };

  return (
    <>
      <header className="ft-header">
        <div className="ft-wrap ft-header-inner">
          <Link to="/" className="ft-logo" aria-label="Francystur - Início">
            <img src="/images/logo-francystur.png" alt="Francystur Viagens & Turismo" />
          </Link>

          <nav className="ft-nav" aria-label="Menu principal">
            {MENU.map((m) => (
              <NavLink key={m.to} to={m.to} end={m.end} className={({ isActive }) => (isActive ? "active" : "")}>
                {m.label}
              </NavLink>
            ))}
          </nav>

          <form className="ft-search" onSubmit={buscar} role="search">
            <input
              id="ft-busca"
              type="search"
              placeholder="Buscar passeio"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              aria-label="Buscar passeio"
            />
            <button type="submit" aria-label="Buscar"><IconSearch /></button>
          </form>

          <a className="ft-btn ft-btn-outline ft-hdr-cta" href={waLink()} target="_blank" rel="noopener noreferrer">
            <IconWhats /> ORÇAMENTO
          </a>

          <button className="ft-burger" type="button" aria-label="Abrir menu" onClick={() => setAberto(true)}>
            <IconMenu />
          </button>
        </div>
      </header>

      {aberto && (
        <div className="ft-drawer" onClick={(e) => { if (e.target === e.currentTarget) setAberto(false); }}>
          <div className="ft-drawer-panel" role="dialog" aria-label="Menu">
            <button className="ft-drawer-close" type="button" aria-label="Fechar menu" onClick={() => setAberto(false)}>
              <IconClose />
            </button>
            <form className="ft-search ft-search-mobile" onSubmit={buscar} role="search">
              <input
                id="ft-busca-mobile"
                type="search"
                placeholder="Buscar passeio"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                aria-label="Buscar passeio"
              />
              <button type="submit" aria-label="Buscar"><IconSearch /></button>
            </form>
            <ul>
              {MENU.map((m) => (
                <li key={m.to}><Link to={m.to}>{m.label}</Link></li>
              ))}
            </ul>
            <a className="ft-btn ft-btn-wa" href={waLink()} target="_blank" rel="noopener noreferrer">
              <IconWhats /> Pedir orçamento
            </a>
          </div>
        </div>
      )}
    </>
  );
}
