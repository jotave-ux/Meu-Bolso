import { formatBRL, isCurrentMonth } from '../utils/format';

export default function Summary({ entries }) {
  const monthEntries = entries.filter((e) => isCurrentMonth(e.date));
  const income = monthEntries
    .filter((e) => e.type === 'entrada')
    .reduce((sum, e) => sum + e.amount, 0);
  const expenses = monthEntries
    .filter((e) => e.type === 'saida')
    .reduce((sum, e) => sum + e.amount, 0);
  const balance = income - expenses;

  return (
    <section className="summary" aria-label="Resumo do mês">
      <div className="summary__item">
        <span className="summary__label">Entradas</span>
        <span className="summary__value summary__value--positive">{formatBRL(income)}</span>
      </div>
      <div className="summary__item">
        <span className="summary__label">Saídas</span>
        <span className="summary__value summary__value--negative">{formatBRL(expenses)}</span>
      </div>
      <div className="summary__item summary__item--balance">
        <span className="summary__label">Saldo</span>
        <span className={`summary__value ${balance >= 0 ? 'summary__value--positive' : 'summary__value--negative'}`}>
          {formatBRL(balance)}
        </span>
      </div>
    </section>
  );
}
