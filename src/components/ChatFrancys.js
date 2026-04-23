import React, { useState, useEffect, useRef } from 'react';

const WHATSAPP_NUMBER = "5554981279781";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const SYSTEM_PROMPT = `Você é Francys, assistente virtual da FrancysTur — agência de turismo com 13 anos de experiência em Gramado, Canela e Serra Gaúcha.

PERSONA: Simpática, entusiasmada, profissional. Responda em PT, ES ou EN conforme o idioma do cliente. Seja BREVE (máx 3 linhas por resposta).

PASSEIOS PRINCIPAIS:
- Tour Uva e Vinho com Maria Fumaça: R$ 419 (PIX urgência R$ 389) — DESTAQUE! Ônibus próprio, almoço em cantina italiana mesa servida, 2 vinícolas (Aurora + Chesini)
- Tour Linha Bella: R$ 345
- Tour Gramado e Canela: R$ 69
- Tour Vale dos Vinhedos: R$ 389
- Tour Cânion Itaimbezinho: R$ 429

JANTARES: Noite Italiana R$389 | Noite Gaúcha R$345 | Noite Alemã R$259 | Fondue R$119

INGRESSOS: Snowland R$259 | Terra Mágica R$180 | Alpen Park R$169 | Mini Mundo R$119 | Super Carros R$150 | Combo 7 Museus R$309

TRANSFER: Coletivo In/Out R$119 | Privativo disponível

DIFERENCIAIS: Ônibus próprio | Almoço mesa servida (não buffet) | 2 vinícolas | Melhor preço + Garantia de Satisfação | Crianças 0-5 grátis

REGRAS:
- Seja BREVE (máx 3 linhas)
- Quando detectar interesse em comprar/reservar, ofereça o WhatsApp
- Nunca invente informações
- Foco em converter para venda`;

export default function ChatFrancys() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: '👋 Olá! Sou a <strong>Francys</strong>, sua assistente de viagem!<br/>Como posso te ajudar a descobrir Gramado? 🚂'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const notificationShown = useRef(false);

  // Notificação proativa após 6 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !notificationShown.current) {
        setShowNotification(true);
        notificationShown.current = true;
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowNotification(false);
  };

  const formatMessage = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\n/g, '<br/>');
    // Transforma links WhatsApp em botão verde
    text = text.replace(
      /\[([^\]]+)\]\(https:\/\/wa\.me\/[^)]+\)/g,
      `<a href="${WHATSAPP_LINK}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;background:#25D366;color:white;padding:8px 14px;border-radius:20px;font-size:0.78rem;font-weight:600;text-decoration:none;width:100%;text-align:center;box-sizing:border-box;">💬 $1</a>`
    );
    return text;
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const apiMessages = newMessages
        .filter((m, idx) => !(m.role === 'bot' && idx === 0))
        .map(m => ({
          role: m.role === 'bot' ? 'assistant' : 'user',
          content: m.content.replace(/<[^>]+>/g, '') // remove HTML para a API
        }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages
        })
      });

      const data = await response.json();
      const botText = data.content?.[0]?.text || 'Desculpe, tente novamente em instantes.';

      // Detecta interesse e adiciona botão WhatsApp automaticamente
      const temInteresse = /reserv|valor|preço|quero|comprar|agendar|data|disponível|quanto|pacote|ingresso|passeio|transfer|jantar/i.test(text);
      let finalContent = botText;
      if (temInteresse && !botText.includes('wa.me')) {
        finalContent += `\n\n[Falar com atendente agora](${WHATSAPP_LINK})`;
      }

      setMessages(prev => [...prev, { role: 'bot', content: finalContent }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: `Tive um probleminha técnico 😅<br/>Mas posso te atender direto no WhatsApp!<br/><a href="${WHATSAPP_LINK}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;background:#25D366;color:white;padding:8px 14px;border-radius:20px;font-size:0.78rem;font-weight:600;text-decoration:none;width:100%;text-align:center;box-sizing:border-box;">💬 Falar no WhatsApp</a>`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Botão WhatsApp flutuante */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.wppFloat}
        title="Falar no WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Wrapper do chat (acima do botão WhatsApp) */}
      <div style={styles.chatWrapper}>

        {/* Notificação proativa */}
        {showNotification && !isOpen && (
          <div style={styles.notification} onClick={handleOpen}>
            <strong style={{ color: '#0D1F3C', display: 'block', marginBottom: 3 }}>
              Francys — FrancysTur 🌟
            </strong>
            Posso te ajudar a planejar sua viagem a Gramado? Temos ótimas opções!
          </div>
        )}

        {/* Janela do chat */}
        {isOpen && (
          <div style={styles.chatBox}>
            {/* Header */}
            <div style={styles.chatHeader}>
              <div style={styles.avatar}>🤖</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Francys</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Assistente FrancysTur</div>
              </div>
              <div style={styles.onlineDot} />
              <button
                onClick={() => setIsOpen(false)}
                style={styles.closeBtn}
                title="Fechar"
              >✕</button>
            </div>

            {/* Mensagens */}
            <div style={styles.messages}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.msg,
                    ...(msg.role === 'bot' ? styles.msgBot : styles.msgUser)
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
              ))}
              {loading && (
                <div style={{ ...styles.msg, ...styles.msgBot, fontStyle: 'italic', color: '#999' }}>
                  Francys está digitando...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={styles.inputArea}>
              <input
                style={styles.input}
                type="text"
                placeholder="Digite sua pergunta..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                style={{
                  ...styles.sendBtn,
                  opacity: (loading || !input.trim()) ? 0.5 : 1
                }}
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        )}

        {/* Botão toggle */}
        <button
          style={styles.toggleBtn}
          onClick={() => isOpen ? setIsOpen(false) : handleOpen()}
          title={isOpen ? 'Fechar chat' : 'Falar com Francys'}
        >
          {isOpen ? '✕' : '💬'}
        </button>
      </div>
    </>
  );
}

// Estilos inline para não depender do CSS existente
const styles = {
  wppFloat: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 9998,
    width: 56,
    height: 56,
    background: '#25D366',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
    textDecoration: 'none',
    color: 'white',
    transition: 'transform 0.2s',
  },
  chatWrapper: {
    position: 'fixed',
    bottom: 90,
    right: 20,
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 10,
  },
  notification: {
    background: 'white',
    borderRadius: 12,
    padding: '12px 16px',
    boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
    maxWidth: 240,
    fontSize: '0.82rem',
    color: '#2d3748',
    borderLeft: '3px solid #C9A020',
    cursor: 'pointer',
    lineHeight: 1.4,
    animation: 'none',
  },
  chatBox: {
    width: 340,
    maxHeight: 480,
    background: 'white',
    borderRadius: 16,
    boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  chatHeader: {
    background: 'linear-gradient(135deg, #0D1F3C, #1a3a6b)',
    color: 'white',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #C9A020, #e8c547)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    flexShrink: 0,
  },
  onlineDot: {
    width: 8,
    height: 8,
    background: '#4ade80',
    borderRadius: '50%',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '2px 6px',
    opacity: 0.8,
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    maxHeight: 300,
    background: '#f8f9ff',
  },
  msg: {
    maxWidth: '85%',
    padding: '10px 14px',
    borderRadius: 14,
    fontSize: '0.82rem',
    lineHeight: 1.5,
  },
  msgBot: {
    background: 'white',
    border: '1px solid #e2e8f0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    color: '#2d3748',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  msgUser: {
    background: 'linear-gradient(135deg, #0D1F3C, #1a3a6b)',
    color: 'white',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  inputArea: {
    padding: 12,
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    gap: 8,
    background: 'white',
  },
  input: {
    flex: 1,
    padding: '9px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: 20,
    fontSize: '0.82rem',
    outline: 'none',
    fontFamily: 'inherit',
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0D1F3C, #C9A020)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtn: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0D1F3C, #C9A020)',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: '1.4rem',
    boxShadow: '0 4px 20px rgba(13,31,60,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s',
  },
};
