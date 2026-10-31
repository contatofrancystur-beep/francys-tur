import React from 'react';
import { Link } from 'react-router-dom';
import { IconClock, IconCal } from '../SiteIcons';

const CATEGORIAS = {
  passeios: 'Passeio',
  vinicolas: 'Vinícola',
  transfers: 'Transfer',
  jantares: 'Jantar',
  ingressos: 'Ingresso',
  'natal-luz': 'Natal Luz',
  'transporte-passeios': 'Transporte',
};

// Produtos com o trem (opera só Qua, Sex, Sáb e Dom)
const PRODUTOS_TREM = [4, 6, 7, 8];

const ProductCard = ({ produto }) => {
  const dias = PRODUTOS_TREM.includes(produto?.id) ? 'Quarta, Sexta, Sábado e Domingo' : 'Todos os dias';
  const variasOpcoes = typeof produto.preco === 'object' && Object.keys(produto.preco).length > 1;

  return (
    <Link to={`/produto/${produto.id}`} className="ft-card">
      <div className="ft-card-img" style={{ backgroundImage: `url("${produto.imagem}")` }}>
        <span className="ft-card-tag">{CATEGORIAS[produto.categoria] || produto.categoria}</span>
      </div>
      <div className="ft-card-body">
        <h3>{produto.nome}</h3>
        <ul className="ft-card-meta">
          <li><IconCal /> {dias}</li>
          {produto.duracao && <li><IconClock /> {produto.duracao}</li>}
          {variasOpcoes && <li className="ft-card-opcoes">Várias opções disponíveis</li>}
        </ul>
      </div>
      <div className="ft-card-foot">
        <span className="ft-card-consulte">Valores sob consulta</span>
        <span className="ft-btn ft-btn-gold ft-btn-sm">Ver datas e reservar</span>
      </div>
    </Link>
  );
};

export default ProductCard;
