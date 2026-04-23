// utils/whatsapp.js
export const enviarPedidoWhatsApp = (produtos, informacoesCliente = {}) => {
  const numeroWhatsApp = "5551999999999"; // Substitua pelo número da empresa
  
  let mensagem = `*NOVO PEDIDO - FRANCYSTUR*\n\n`;
  mensagem += `*Dados do Cliente:*\n`;
  mensagem += `Nome: ${informacoesCliente.nome || 'Não informado'}\n`;
  mensagem += `Email: ${informacoesCliente.email || 'Não informado'}\n`;
  mensagem += `Telefone: ${informacoesCliente.telefone || 'Não informado'}\n\n`;
  
  mensagem += `*Itens do Pedido:*\n\n`;
  
  produtos.forEach((item, index) => {
    mensagem += `*${index + 1}. ${item.nome}*\n`;
    mensagem += `Quantidade: ${item.quantidade}\n`;
    mensagem += `Data: ${item.dataSelecionada || 'A combinar'}\n`;
    mensagem += `Valor unitário: R$ ${item.preco.toFixed(2)}\n`;
    mensagem += `Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
  });
  
  const total = produtos.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  mensagem += `*VALOR TOTAL: R$ ${total.toFixed(2)}*\n\n`;
  mensagem += `---\n`;
  mensagem += `*Este pedido foi gerado automaticamente pelo site.*`;
  
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  return url;
};