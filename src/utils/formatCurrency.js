// formatador de moeda, baseado na lingua
// INTL - Internationalization (i18n), biblioteca do JS
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { // lingua
    style: 'currency', // estilo (moeda)
    currency: 'BRL' // moeda em si
  }).format(value)
  // formatando espaços inquebráveis
  .replace(/\u00A0|\u202F/g, ' ')
}
