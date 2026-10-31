import React from 'react';
import { Link } from 'react-router-dom';
import { produtos, todosProdutos } from "../data/products";
import ProductCard from "./ProductCard";
import SiteCarousel from "../SiteCarousel";
import { waLink } from "../utils/gclid";
import { IconWhats } from "../SiteIcons";

const porId = (id) => todosProdutos.find((p) => p.id === id);

// Banner principal
const SLIDES = [
  {
    img: "/images/trem-vale-vinhedos.jpg",
    titulo: <><span className="ft-gold">Expresso Colonial:</span> passeio de trem, vinícolas e a cultura italiana da Serra Gaúcha</>,
    texto: "Saída de Gramado com transporte, almoço em cantina italiana e degustação. Embarque do trem em Bento Gonçalves.",
    bonus: <>E ganhe um <strong>Tour pela Serra Gaúcha</strong> de cortesia</>,
    link: "/produto/4",
    msg: "Olá! Vim pelo site da Francystur e quero saber datas e valores do Expresso Colonial (passeio de trem + vinícolas).",
  },
  {
    img: "/images/transfer.jpg",
    titulo: <>Transfer Aeroporto de Porto Alegre ⇄ Gramado <span className="ft-gold">com conforto e segurança</span></>,
    texto: "Do aeroporto até o seu hotel em Gramado ou Canela, em carro, van ou transfer compartilhado.",
    link: "/produto/30",
    msg: "Olá! Vim pelo site da Francystur e quero um orçamento de transfer Aeroporto ⇄ Gramado.",
  },
];

// Destaques (ids do catálogo)
const DESTAQUES = [4, 8, 42, 30, 61, 13].map(porId).filter(Boolean);

const CATEGORIAS = [
  { to: "/passeios", nome: "Passeios", desc: "Roteiros por Gramado, Canela e região", img: "/images/gramado-tour.jpg" },
  { to: "/viniculas", nome: "Vinícolas", desc: "Vale dos Vinhedos e degustações", img: "/images/vinicolas-tour.jpg" },
  { to: "/jantares", nome: "Jantares", desc: "Noites temáticas e fondue", img: "/images/jantar-gaucho.jpg" },
  { to: "/ingressos", nome: "Ingressos", desc: "Parques e atrações", img: "/images/snowland-4.jpg" },
  { to: "/transfers", nome: "Transfers", desc: "Aeroporto e deslocamentos", img: "/images/transfer-van.jpg" },
  { to: "/natal-luz", nome: "Natal Luz", desc: "Grande Desfile, Nativitaten e mais", img: "/images/natal-luz.jpg" },
];

const MOTIVOS = [
  { titulo: "13 anos em Gramado", texto: "Mais de 50 mil passageiros já conheceram a Serra Gaúcha com a Francystur." },
  { titulo: "Atendimento pelo WhatsApp", texto: "Você fala direto com a nossa equipe, do orçamento até o dia do passeio." },
  { titulo: "Transporte com conforto", texto: "Passeios e transfers em veículos modernos, com saída de Gramado." },
];

const HomePage = () => {
  return (
    <div className="ft-home">
      {/* BANNER */}
      <section className="ft-hero" aria-label="Destaques">
        <SiteCarousel per={[1, 1, 1]} autoplay={6000} className="ft-hero-carousel">
          {SLIDES.map((s, k) => (
            <div className="ft-slide" key={k}>
              <div className="ft-slide-img" style={{ backgroundImage: `url("${s.img}")` }} />
              <div className="ft-slide-text">
                <h1>{s.titulo}</h1>
                <p>{s.texto}</p>
                {s.bonus && <p className="ft-slide-bonus">{s.bonus}</p>}
                <div className="ft-slide-ctas">
                  <Link to={s.link} className="ft-btn ft-btn-wa">Ver datas e reservar</Link>
                  <a href={waLink(s.msg)} target="_blank" rel="noopener noreferrer" className="ft-btn ft-btn-ghost">
                    <IconWhats /> Falar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </SiteCarousel>
      </section>

      {/* DESTAQUES */}
      <section className="ft-section ft-navy">
        <div className="ft-wrap">
          <h2 className="ft-sec-title">Conheça nossos <span className="ft-gold ft-block">passeios em destaque</span></h2>
          <SiteCarousel per={[3, 2, 1]}>
            {DESTAQUES.map((p) => <ProductCard key={p.id} produto={p} />)}
          </SiteCarousel>
        </div>
      </section>

      {/* PASSEIOS */}
      <section className="ft-section ft-sand">
        <div className="ft-wrap">
          <h2 className="ft-sec-title">Conheça nossa seleção <span className="ft-gold">completa de passeios</span></h2>
          <SiteCarousel per={[3, 2, 1]}>
            {(produtos.passeios || []).map((p) => <ProductCard key={p.id} produto={p} />)}
          </SiteCarousel>
          <div className="ft-center"><Link to="/passeios" className="ft-btn ft-btn-gold">Ver todos os passeios</Link></div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="ft-section">
        <div className="ft-wrap">
          <div className="ft-sec-head"><h2>O que você quer fazer em Gramado?</h2><div className="ft-divider" /></div>
          <div className="ft-cats">
            {CATEGORIAS.map((c) => (
              <Link key={c.to} to={c.to} className="ft-cat" style={{ backgroundImage: `url("${c.img}")` }}>
                <span className="ft-cat-text"><strong>{c.nome}</strong><small>{c.desc}</small></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE NOS ESCOLHER */}
      <section className="ft-section ft-sand" id="sobre-nos">
        <div className="ft-wrap">
          <div className="ft-sec-head"><h2>Por que viajar com a Francystur?</h2><div className="ft-divider" /></div>
          <div className="ft-why">
            {MOTIVOS.map((m) => (
              <div className="ft-why-card" key={m.titulo}>
                <span className="ft-why-mark" aria-hidden="true" />
                <h3>{m.titulo}</h3>
                <p>{m.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="ft-cta" style={{ backgroundImage: 'url("/images/trem-valduga.jpg")' }}>
        <div className="ft-wrap">
          <div className="ft-cta-box">
            <h2>Não deixe para depois a oportunidade de conhecer os melhores passeios</h2>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="ft-btn ft-btn-wa"><IconWhats /> Consultar disponibilidade</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
