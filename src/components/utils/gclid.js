// Captura e guarda o GCLID do Google Ads (90 dias) e monta links de WhatsApp com [ref:GCLID]
export const WHATSAPP_NUMBER = "5554981279781";

const NOVENTA_DIAS = 90 * 24 * 60 * 60 * 1000;

export function captureGclid() {
  try {
    const params = new URLSearchParams(window.location.search);
    const gclid = params.get("gclid");
    if (gclid) {
      localStorage.setItem("gclid", gclid);
      localStorage.setItem("gclid_time", Date.now().toString());
    }
  } catch (e) {}
}

export function getGclid() {
  try {
    const gclid = localStorage.getItem("gclid");
    const t = localStorage.getItem("gclid_time");
    if (!gclid) return "";
    if (t && Date.now() - parseInt(t, 10) > NOVENTA_DIAS) {
      localStorage.removeItem("gclid");
      localStorage.removeItem("gclid_time");
      return "";
    }
    return gclid;
  } catch (e) {
    return "";
  }
}

export function waLink(mensagem = "Olá! Vim através do site da Francystur e gostaria de um orçamento.") {
  const gclid = getGclid();
  const texto = gclid ? `${mensagem}\n[ref:${gclid}]` : mensagem;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

// Guarda o GCLID assim que o site carrega, antes de qualquer link ser montado
if (typeof window !== "undefined") captureGclid();
