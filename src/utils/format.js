export function formatBRL(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year.slice(2)}`;
}

export function currentMonthLabel() {
  const date = new Date();
  const label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function isCurrentMonth(isoDate) {
  const now = new Date();
  const [year, month] = isoDate.split('-').map(Number);
  return year === now.getFullYear() && month === now.getMonth() + 1;
}
