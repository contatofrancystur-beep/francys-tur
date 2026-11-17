// Rastreamento de GCLID para links de WhatsApp.
// Usa as mesmas chaves do ChatFrancys.js ("gclid" e "gclid_time" no localStorage).

const NOVENTA_DIAS = 90 * 24 * 60 * 60 * 1000;
export const WHATSAPP_FRANCYSTUR = '5554981279781';

export function obterGclid() {
  try {
    // Se o cliente acabou de chegar pelo anúncio, o GCLID ainda está na URL
    const daUrl = new URLSearchParams(window.location.search).get('gclid');
    if (daUrl) {
      localStorage.setItem('gclid', daUrl);
      localStorage.setItem('gclid_time', Date.now().toString());
      return daUrl;
    }
    const gclid = localStorage.getItem('gclid');
    const quando = parseInt(localStorage.getItem('gclid_time') || '0', 10);
    if (!gclid || !quando) return null;
    if (Date.now() - quando > NOVENTA_DIAS) return null;
    return gclid;
  } catch (e) {
    return null;
  }
}

export function adicionarRefGclid(mensagem) {
  const gclid = obterGclid();
  return gclid ? `${mensagem}\n[ref:${gclid}]` : mensagem;
}

export function linkWhatsAppComGclid(mensagem = 'Olá! Tenho interesse nos passeios da FrancysTur.') {
  return `https://wa.me/${WHATSAPP_FRANCYSTUR}?text=${encodeURIComponent(adicionarRefGclid(mensagem))}`;
}
