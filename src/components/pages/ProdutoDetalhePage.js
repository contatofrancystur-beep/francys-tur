import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faStar, 
  faCheck, 
  faShoppingCart,
  faMapMarkerAlt,
  faClock,
  faChild,
  faCar,
  faChevronDown,
  faChevronUp,
  faImages,
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faTicketAlt,
  faUser,
  faInfoCircle,
  faFileContract,
  faRoute,
  faExclamationTriangle,
  faTrain,
  faUsers,
  faCalendarDay,
  faMoneyBillWave,
  faCommentDots,
  faBaby,
  faArrowLeft,
  faArrowRight,
  faUserTie
} from "@fortawesome/free-solid-svg-icons";
import { todosProdutos } from "../data/products";
import { useCart } from "../CartContext";

const ProdutoDetalhePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCart();
  const [quantidadeAdultos, setQuantidadeAdultos] = useState(1);
  const [quantidadeCriancas, setQuantidadeCriancas] = useState(0);
  const [quantidadeCortesias, setQuantidadeCortesias] = useState(0);
  const [quantidadeIdosos, setQuantidadeIdosos] = useState(0);
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [tipoPrecoSelecionado, setTipoPrecoSelecionado] = useState('');
  const [duracaoSelecionada, setDuracaoSelecionada] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  
  const produto = todosProdutos.find(p => p.id === parseInt(id));
  
  const produtoImages = produto?.imagens || [
    produto?.imagem,
    "/images/logo.jpg",
    "/images/logo.jpg",
    "/images/logo.jpg"
  ].filter(Boolean);

  const incluiMariaFumaca = () => {
    const produtosComMariaFumaca = [4, 6, 7, 8];
    return produtosComMariaFumaca.includes(produto?.id);
  };

  const getFaixaEtariaProduto = () => {
    if (!produto) return { criancaMin: 5, criancaMax: 11, cortesiaMax: 4 };
    
    const faixaEtaria = produto.faixaEtaria || '';
    
    if (produto.id === 4) {
      return { criancaMin: 6, criancaMax: 11, cortesiaMax: 5 };
    }
    
    if (produto.id === 6) {
      return { criancaMin: 6, criancaMax: 10, cortesiaMax: 5 };
    }
    
    if (produto.id === 7) {
      return { criancaMin: 6, criancaMax: 11, cortesiaMax: 5 };
    }
    
    if (produto.id === 8) {
      return { criancaMin: 6, criancaMax: 10, cortesiaMax: 5 };
    }
    
    return { criancaMin: 5, criancaMax: 11, cortesiaMax: 4 };
  };

  const faixaEtaria = getFaixaEtariaProduto();

  const isDataValidaParaMariaFumaca = (dataString) => {
    if (!incluiMariaFumaca()) return true;
    
    if (!dataString) return false;
    
    const data = new Date(dataString + 'T00:00:00');
    const diaDaSemana = data.getDay();
    
    return diaDaSemana === 0 || diaDaSemana === 3 || diaDaSemana === 5 || diaDaSemana === 6;
  };

  const getProximaDataValida = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    if (!incluiMariaFumaca()) {
      const amanha = new Date(hoje);
      amanha.setDate(amanha.getDate() + 1);
      return amanha.toISOString().split('T')[0];
    }
    
    for (let i = 1; i <= 14; i++) {
      const dataBusca = new Date(hoje);
      dataBusca.setDate(dataBusca.getDate() + i);
      const diaDaSemana = dataBusca.getDay();
      
      if (diaDaSemana === 0 || diaDaSemana === 3 || diaDaSemana === 5 || diaDaSemana === 6) {
        return dataBusca.toISOString().split('T')[0];
      }
    }
    
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);
    return amanha.toISOString().split('T')[0];
  };

  const getDataAmanha = () => {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    return amanha.toISOString().split('T')[0];
  };

  useEffect(() => {
    let dataInicial;
    
    if (incluiMariaFumaca()) {
      dataInicial = getProximaDataValida();
    } else {
      dataInicial = getDataAmanha();
    }
    
    setDataSelecionada(dataInicial);
    
    if (produto) {
      if (typeof produto.preco === 'object') {
        const primeiroTipo = Object.keys(produto.preco)[0];
        if (produto.categoria === 'transporte-passeios') {
          setDuracaoSelecionada(primeiroTipo);
        } else {
          setTipoPrecoSelecionado(primeiroTipo);
        }
      }
    }
  }, [produto]);
  
  const validarData = (dataString) => {
    if (!dataString) return { valida: false, mensagem: 'Selecione uma data' };
    
    const data = new Date(dataString + 'T00:00:00');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    if (data < hoje) {
      return { valida: false, mensagem: 'Não é possível selecionar datas passadas' };
    }
    
    if (data.getTime() === hoje.getTime()) {
      return { 
        valida: false, 
        mensagem: 'A reserva deve ser feita com pelo menos 1 dia de antecedência' 
      };
    }
    
    if (incluiMariaFumaca()) {
      const diaDaSemana = data.getDay();
      const nomeDia = getNomeDiaSemana(dataString);
      
      if (!isDataValidaParaMariaFumaca(dataString)) {
        const diasPermitidos = ['Domingo', 'Quarta-feira', 'Sexta-feira', 'Sábado'];
        return { 
          valida: false, 
          mensagem: `O Trem Maria Fumaça opera apenas aos seguintes dias: ${diasPermitidos.join(', ')}. 
          Você selecionou ${nomeDia}.` 
        };
      }
    }
    
    return { 
      valida: true, 
      mensagem: `${getNomeDiaSemana(dataString)} - Data válida ✓` 
    };
  };

  const getNomeDiaSemana = (dataString) => {
    if (!dataString) return '';
    
    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const data = new Date(dataString + 'T00:00:00');
    return dias[data.getDay()];
  };

  const getNomeMes = (mesNumero, ano) => {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return meses[mesNumero] + ' ' + ano;
  };

  const getDiasDoMes = (mes, ano) => {
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const dias = [];
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    // Primeiro dia do mês
    const primeiroDia = new Date(ano, mes, 1);
    const primeiroDiaSemana = primeiroDia.getDay(); // 0=Domingo, 1=Segunda...
    
    // Adicionar dias vazios para alinhar o primeiro dia do mês
    for (let i = 0; i < primeiroDiaSemana; i++) {
      dias.push(null); // Dia vazio
    }
    
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(ano, mes, dia);
      const dataString = data.toISOString().split('T')[0];
      const passada = data < hoje;
      let disponivel = true;
      
      if (passada) {
        disponivel = false;
      } else if (incluiMariaFumaca()) {
        const diaDaSemana = data.getDay();
        disponivel = diaDaSemana === 0 || diaDaSemana === 3 || diaDaSemana === 5 || diaDaSemana === 6;
      }
      
      dias.push({
        data: dataString,
        diaNumero: dia,
        nomeDia: getNomeDiaSemana(dataString),
        diaSemanaNumero: data.getDay(),
        passada: passada,
        disponivel: disponivel,
        hoje: data.getTime() === hoje.getTime()
      });
    }
    
    return dias;
  };

  const organizarDiasPorSemana = (diasArray) => {
    const semanas = [];
    let semanaAtual = [];
    
    diasArray.forEach((dia, index) => {
      semanaAtual.push(dia);
      
      if (semanaAtual.length === 7 || index === diasArray.length - 1) {
        while (semanaAtual.length < 7) {
          semanaAtual.push(null);
        }
        semanas.push(semanaAtual);
        semanaAtual = [];
      }
    });
    
    return semanas;
  };

  const proximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  };

  const mesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  };

  const irParaMesAtual = () => {
    const hoje = new Date();
    setMesAtual(hoje.getMonth());
    setAnoAtual(hoje.getFullYear());
  };

  if (!produto) {
    return (
      <div className="product-not-found">
        <h1>Produto não encontrado</h1>
        <button 
          onClick={() => navigate('/')}
          className="btn-back-home"
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }
  
  const getNomeCategoria = (categoria) => {
    const nomes = {
      'passeios': 'Passeio Turístico',
      'vinicolas': 'Rota das Vinícolas',
      'jantares': 'Jantar Temático',
      'ingressos': 'Ingresso',
      'natal-luz': 'Natal Luz Gramado',
      'transfers': 'Transfer',
      'transporte-passeios': 'Transporte Personalizado'
    };
    return nomes[categoria] || categoria;
  };
  
  const handleWhatsApp = () => {
    const validacao = validarData(dataSelecionada);
    if (!validacao.valida) {
      alert(validacao.mensagem);
      return;
    }
    
    const diaDaSemana = getNomeDiaSemana(dataSelecionada);
    const dataObj = new Date(dataSelecionada + 'T00:00:00');
    const mes = getNomeMes(dataObj.getMonth(), dataObj.getFullYear()).split(' ')[0];
    
    let mensagem = `Olá! Tenho interesse no produto:\n*${produto.nome}*\n\n`;
    
    mensagem += `• Adultos: ${quantidadeAdultos}\n`;
    mensagem += `• Idosos (60+ anos): ${quantidadeIdosos}\n`;
    mensagem += `• Crianças (${faixaEtaria.criancaMin}-${faixaEtaria.criancaMax} anos): ${quantidadeCriancas}\n`;
    mensagem += `• Cortesias (0-${faixaEtaria.cortesiaMax} anos): ${quantidadeCortesias}\n`;
    mensagem += `• Data: ${dataSelecionada} (${diaDaSemana} - ${mes})\n\n`;
    
    const totalPessoas = quantidadeAdultos + quantidadeIdosos + quantidadeCriancas + quantidadeCortesias;
    mensagem += `*TOTAL DE PESSOAS:* ${totalPessoas}\n\n`;
    
    if (produto.notas) {
      mensagem += `*Observações:* ${produto.notas}\n\n`;
    }
    
    if (incluiMariaFumaca()) {
      mensagem += `*Inclui Trem Maria Fumaça* (opera às Quartas, Sextas, Sábados e Domingos)\n\n`;
    }
    
    mensagem += `Poderia me fornecer mais informações sobre preços e disponibilidade?`;
    
    const numeroWhatsApp = "5554996623736";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };
  
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const validacaoData = validarData(dataSelecionada);
  const diasDoMes = getDiasDoMes(mesAtual, anoAtual);
  const semanasDoMes = organizarDiasPorSemana(diasDoMes);
  const hoje = new Date();
  const hojeString = hoje.toISOString().split('T')[0];
  const totalPessoas = quantidadeAdultos + quantidadeIdosos + quantidadeCriancas + quantidadeCortesias;

  return (
    <div className="product-detail-page">
      <div className="product-gallery-container">
        <h1 className="product-title">{produto.nome}</h1>
        
        <div className="product-images-row">
          <div className="gallery-large gallery-main">
            <img 
              src={produtoImages[0] || "/images/default-product.jpg"} 
              alt={`${produto.nome}`}
              className="main-gallery-image"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/default-product.jpg";
              }}
            />
          </div>
          
          <div className="gallery-secondary-column">
            <div className="gallery-large gallery-secondary">
              {produtoImages[1] && (
                <img 
                  src={produtoImages[1]} 
                  alt={`${produto.nome} - Foto 2`}
                  className="secondary-gallery-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default-product.jpg";
                  }}
                />
              )}
            </div>
            
            <div className="gallery-small gallery-small-1">
              {produtoImages[2] && (
                <img 
                  src={produtoImages[2]} 
                  alt={`${produto.nome} - Foto 3`}
                  className="small-gallery-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default-product.jpg";
                  }}
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="image-info-card">
          <div className="info-card-row">
            <div className="activity-badge">
              {incluiMariaFumaca() ? 'Inclui Trem Maria Fumaça' : 'Passeio Turístico'}
            </div>
            
            <div className="days-highlight">
              <FontAwesomeIcon icon={faCalendarAlt} />
              Dias: 
              {incluiMariaFumaca() 
                ? ' Dom Qua Sex Sáb' 
                : ' Dom Seg Ter Qua Qui Sex Sáb'
              }
            </div>
          </div>
        </div>
      </div>
      
      <div className="product-layout-container">
        <div className="product-content-column">
          <div className="expandable-sections-vertical">
            <div className="section-list">
              <button 
                className={`section-list-item ${activeSection === 'roteiro' ? 'active' : ''}`}
                onClick={() => toggleSection('roteiro')}
              >
                <div className="section-list-icon">
                  <FontAwesomeIcon icon={faRoute} />
                </div>
                <div className="section-list-content">
                  <h3>Roteiro Completo</h3>
                  <p>Veja todos os detalhes do passeio</p>
                </div>
                <div className="section-list-arrow">
                  <FontAwesomeIcon icon={activeSection === 'roteiro' ? faChevronUp : faChevronDown} />
                </div>
              </button>
              
              {activeSection === 'roteiro' && (
                <div className="section-list-content-panel">
                  {produto.roteiro ? (
                    <div className="section-content" 
                      dangerouslySetInnerHTML={{ __html: produto.roteiro }} 
                    />
                  ) : (
                    <div className="section-content">
                      <h4>Roteiro Detalhado</h4>
                      <p>Informações de roteiro específicas para este produto serão fornecidas na confirmação da reserva.</p>
                      <p>Para mais detalhes sobre o roteiro, entre em contato conosco.</p>
                    </div>
                  )}
                </div>
              )}
              
              <button 
                className={`section-list-item ${activeSection === 'horarios' ? 'active' : ''}`}
                onClick={() => toggleSection('horarios')}
              >
                <div className="section-list-icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="section-list-content">
                  <h3>Horários</h3>
                  <p>Disponibilidade e horários de partida</p>
                </div>
                <div className="section-list-arrow">
                  <FontAwesomeIcon icon={activeSection === 'horarios' ? faChevronUp : faChevronDown} />
                </div>
              </button>
              
              {activeSection === 'horarios' && (
                <div className="section-list-content-panel">
                  {produto.horarios ? (
                    <div className="section-content">
                      <h4>Horários Disponíveis:</h4>
                      <div className="horarios-grid">
                        {produto.horarios.map((horario, index) => (
                          <div key={index} className="horario-item">
                            <FontAwesomeIcon icon={faClock} />
                            <span>{horario}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="section-content">
                      <h4>Horários</h4>
                      <p>Horários flexíveis conforme disponibilidade. Entre em contato para agendar o melhor horário para você.</p>
                    </div>
                  )}
                </div>
              )}
              
              <button 
                className={`section-list-item ${activeSection === 'cancelamento' ? 'active' : ''}`}
                onClick={() => toggleSection('cancelamento')}
              >
                <div className="section-list-icon">
                  <FontAwesomeIcon icon={faFileContract} />
                </div>
                <div className="section-list-content">
                  <h3>Políticas de Cancelamento</h3>
                  <p>Condições para cancelamento e reembolso</p>
                </div>
                <div className="section-list-arrow">
                  <FontAwesomeIcon icon={activeSection === 'cancelamento' ? faChevronUp : faChevronDown} />
                </div>
              </button>
              
              {activeSection === 'cancelamento' && (
                <div className="section-list-content-panel">
                  {produto.politicasCancelamento ? (
                    <div className="section-content" 
                      dangerouslySetInnerHTML={{ __html: produto.politicasCancelamento }} 
                    />
                  ) : (
                    <div className="section-content">
                      <h4>Políticas de Cancelamento</h4>
                      <div className="cancelamento-info">
                        <div className="cancelamento-line">
                          <strong>Cancelamento padrão:</strong>
                          <span>Consulte as políticas específicas para este produto</span>
                        </div>
                        <div className="cancelamento-line">
                          <strong>Contato para cancelamentos:</strong>
                          <span>WhatsApp: (54) 99662-3736</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <section className="content-section">
            <h2 className="section-title">Informações Importantes</h2>
            <div className="details-grid">
              <div className="detail-item">
                <FontAwesomeIcon icon={faClock} />
                <div>
                  <span className="detail-label">Duração</span>
                  <span className="detail-value">{produto.duracao}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <FontAwesomeIcon icon={faCalendarDay} />
                <div>
                  <span className="detail-label">Disponibilidade</span>
                  <span className="detail-value">
                    {incluiMariaFumaca() ? 'Quarta, Sexta, Sábado e Domingo' : 'Todos os dias'}
                  </span>
                </div>
              </div>
              
              <div className="detail-item">
                <FontAwesomeIcon icon={faUsers} />
                <div>
                  <span className="detail-label">Tipo</span>
                  <span className="detail-value">{getNomeCategoria(produto.categoria)}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <FontAwesomeIcon icon={faMoneyBillWave} />
                <div>
                  <span className="detail-label">Pagamento</span>
                  <span className="detail-value">Cartão, PIX, Dinheiro</span>
                </div>
              </div>
            </div>
          </section>
          
          <div className="product-note">
            <p>
              <strong>Importante:</strong> {produto.categoria === 'transporte-passeios' 
                ? 'O transporte deve ser agendado com antecedência. Alterações com 24h de antecedência.' 
                : 'Reservas válidas para a data selecionada. Em caso de dúvidas, entre em contato.'}
            </p>
          </div>
        </div>
        
        <div className="booking-column">
          <div className="booking-card">
            <div className="booking-card-header">
              <h3 className="booking-card-title">Solicitar Reserva</h3>
              <div className="price-info">
                <span className="price-info-text">Preços negociáveis via WhatsApp</span>
              </div>
            </div>
            
            <div className="booking-card-body">
              <div className="booking-field">
                <label className="booking-label">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  Selecione a data:
                </label>
                
                <div className="calendar-table-container">
                  <div className="month-controls">
                    <button className="month-nav-btn" onClick={mesAnterior}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    
                    <div className="current-month-display">
                      <strong>{getNomeMes(mesAtual, anoAtual)}</strong>
                      <button className="today-btn" onClick={irParaMesAtual}>
                        Hoje
                      </button>
                    </div>
                    
                    <button className="month-nav-btn" onClick={proximoMes}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                  
                  <div className="calendar-weekdays">
                    <div className="weekday-header">Dom</div>
                    <div className="weekday-header">Seg</div>
                    <div className="weekday-header">Ter</div>
                    <div className="weekday-header">Qua</div>
                    <div className="weekday-header">Qui</div>
                    <div className="weekday-header">Sex</div>
                    <div className="weekday-header">Sáb</div>
                  </div>
                  
                  <div className="calendar-weeks">
                    {semanasDoMes.map((semana, semanaIndex) => (
                      <div key={semanaIndex} className="calendar-week">
                        {semana.map((dia, diaIndex) => (
                          <div key={diaIndex} className="calendar-day-cell">
                            {dia ? (
                              <button
                                type="button"
                                onClick={() => dia.disponivel && setDataSelecionada(dia.data)}
                                className={`calendar-day ${dia.data === dataSelecionada ? 'selected' : ''} 
                                           ${dia.passada ? 'past-date' : ''} 
                                           ${!dia.disponivel && !dia.passada ? 'unavailable-date' : ''}
                                           ${dia.hoje ? 'today-date' : ''}`}
                                title={`${dia.data} - ${dia.nomeDia}${!dia.disponivel && !dia.passada ? ' (Não disponível)' : ''}`}
                                disabled={!dia.disponivel || dia.passada}
                              >
                                <span className="day-number">{dia.diaNumero}</span>
                              </button>
                            ) : (
                              <div className="calendar-day empty-day"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  
                  {dataSelecionada && (
                    <div className="selected-date-info">
                      <div className={`date-validation ${validacaoData.valida ? 'valid' : 'invalid'}`}>
                        {validacaoData.valida ? 
                          `✅ ${getNomeDiaSemana(dataSelecionada)}, ${dataSelecionada}` : 
                          `❌ ${validacaoData.mensagem}`
                        }
                      </div>
                    </div>
                  )}
                  
                  <div className="calendar-legend">
                    <div className="legend-item">
                      <div className="legend-color available"></div>
                      <span>Disponível</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color selected"></div>
                      <span>Selecionado</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color unavailable"></div>
                      <span>Indisponível</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color past"></div>
                      <span>Passado</span>
                    </div>
                  </div>
                </div>
                
                {incluiMariaFumaca() && (
                  <div className="maria-fumaca-notice">
                    <FontAwesomeIcon icon={faTrain} />
                    <span>Inclui Trem Maria Fumaça (opera às Quartas, Sextas, Sábados e Domingos)</span>
                  </div>
                )}
              </div>
              
              {produto.categoria !== 'transporte-passeios' && (
                <div className="booking-field">
                  <label className="booking-label">
                    <FontAwesomeIcon icon={faUsers} />
                    Quantidade de pessoas:
                  </label>
                  
                  <div className="quantity-groups">
                    <div className="quantity-group">
                      <div className="quantity-group-label">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Adultos</span>
                      </div>
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => setQuantidadeAdultos(prev => Math.max(0, prev - 1))}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={quantidadeAdultos}
                          onChange={(e) => setQuantidadeAdultos(parseInt(e.target.value) || 0)}
                          min="0"
                          className="quantity-input"
                        />
                        <button 
                          className="qty-btn"
                          onClick={() => setQuantidadeAdultos(prev => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="quantity-group">
                      <div className="quantity-group-label">
                        <FontAwesomeIcon icon={faUserTie} />
                        <span>Idosos (60+ anos)</span>
                      </div>
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => setQuantidadeIdosos(prev => Math.max(0, prev - 1))}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={quantidadeIdosos}
                          onChange={(e) => setQuantidadeIdosos(parseInt(e.target.value) || 0)}
                          min="0"
                          className="quantity-input"
                        />
                        <button 
                          className="qty-btn"
                          onClick={() => setQuantidadeIdosos(prev => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="quantity-group">
                      <div className="quantity-group-label">
                        <FontAwesomeIcon icon={faChild} />
                        <span>Crianças ({faixaEtaria.criancaMin}-{faixaEtaria.criancaMax} anos)</span>
                      </div>
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => setQuantidadeCriancas(prev => Math.max(0, prev - 1))}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={quantidadeCriancas}
                          onChange={(e) => setQuantidadeCriancas(parseInt(e.target.value) || 0)}
                          min="0"
                          className="quantity-input"
                        />
                        <button 
                          className="qty-btn"
                          onClick={() => setQuantidadeCriancas(prev => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="quantity-group">
                      <div className="quantity-group-label">
                        <FontAwesomeIcon icon={faBaby} />
                        <span>Cortesias (0-{faixaEtaria.cortesiaMax} anos)</span>
                      </div>
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => setQuantidadeCortesias(prev => Math.max(0, prev - 1))}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={quantidadeCortesias}
                          onChange={(e) => setQuantidadeCortesias(parseInt(e.target.value) || 0)}
                          min="0"
                          className="quantity-input"
                        />
                        <button 
                          className="qty-btn"
                          onClick={() => setQuantidadeCortesias(prev => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="quantity-total">
                      <span>Total de pessoas:</span>
                      <strong>{totalPessoas}</strong>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="booking-summary">
                <div className="summary-line">
                  <span>Passeio:</span>
                  <span className="summary-value">{produto.nome}</span>
                </div>
                
                {produto.categoria !== 'transporte-passeios' && (
                  <>
                    <div className="summary-line">
                      <span>Adultos:</span>
                      <span className="summary-value">{quantidadeAdultos}</span>
                    </div>
                    <div className="summary-line">
                      <span>Idosos (60+):</span>
                      <span className="summary-value">{quantidadeIdosos}</span>
                    </div>
                    <div className="summary-line">
                      <span>Crianças ({faixaEtaria.criancaMin}-{faixaEtaria.criancaMax}):</span>
                      <span className="summary-value">{quantidadeCriancas}</span>
                    </div>
                    <div className="summary-line">
                      <span>Cortesias (0-{faixaEtaria.cortesiaMax}):</span>
                      <span className="summary-value">{quantidadeCortesias}</span>
                    </div>
                    <div className="summary-line total-line">
                      <span>Total pessoas:</span>
                      <span className="summary-value total-value">{totalPessoas}</span>
                    </div>
                  </>
                )}
                
                <div className="summary-line">
                  <span>Data selecionada:</span>
                  <span className="summary-value">
                    {dataSelecionada} ({getNomeDiaSemana(dataSelecionada)})
                  </span>
                </div>
              </div>
              
              <div className="booking-actions">
                <button 
                  onClick={handleWhatsApp} 
                  className="btn-whatsapp-primary"
                  disabled={!validacaoData.valida || totalPessoas === 0}
                >
                  <FontAwesomeIcon icon={faCommentDots} />
                  Consultar Preços no WhatsApp
                </button>
                
                <div className="action-note">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>Entre em contato para consultar preços e disponibilidade</span>
                </div>
              </div>
              
              <div className="security-guarantee">
                <div className="guarantee-item">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Reserva segura</span>
                </div>
                <div className="guarantee-item">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Cancelamento facilitado*</span>
                </div>
                <div className="guarantee-item">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Suporte personalizado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoDetalhePage;