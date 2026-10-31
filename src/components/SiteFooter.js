import React from "react";
import { Link } from "react-router-dom";
import { waLink } from "./utils/gclid";
import { IconWhats, IconInsta } from "./SiteIcons";

export default function SiteFooter() {
  return (
    <footer className="ft-footer">
      <div className="ft-wrap ft-footer-top">
        <div className="ft-footer-brand">
          <div className="ft-footer-logo">
            <img src="/images/logo-francystur.png" alt="Francystur Viagens & Turismo" />
          </div>
          <p>Há mais de 13 anos levando viajantes para conhecer Gramado, Canela e a Serra Gaúcha.</p>
          <div className="ft-social">
            <a href="https://www.instagram.com/francystur/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconInsta /></a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IconWhats /></a>
          </div>
        </div>
        <div className="ft-footer-col">
          <h4>Experiências</h4>
          <Link to="/passeios">Passeios</Link>
          <Link to="/viniculas">Vinícolas</Link>
          <Link to="/jantares">Jantares temáticos</Link>
          <Link to="/ingressos">Ingressos</Link>
          <Link to="/transfers">Transfers</Link>
          <Link to="/natal-luz">Natal Luz</Link>
        </div>
        <div className="ft-footer-col">
          <h4>Atendimento</h4>
          <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp (54) 98127-9781</a>
        </div>
      </div>
      <div className="ft-footer-bottom">
        <div className="ft-wrap">Francystur Viagens & Turismo · Todos os direitos reservados</div>
      </div>
    </footer>
  );
}
