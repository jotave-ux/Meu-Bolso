import { formatBRL, formatDate } from '../utils/format';
import { categoryLabel } from '../utils/categories';

export default function EntryList({ entries, onRemove }) {
  if (entries.length === 0) {
    return (
      <p className="empty-state">
        Nenhum lançamento ainda. Registre uma entrada ou saída acima para começar.
      </p>
    );
  }

  return (
    <table className="ledger-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th className="align-right">Valor</th>
          <th aria-label="Remover" />
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id}>
            <td>{formatDate(entry.date)}</td>
            <td>{entry.description}</td>
            <td>{categoryLabel(entry.category)}</td>
            <td className={`align-right ${entry.type === 'entrada' ? 'text-positive' : 'text-negative'}`}>
              {entry.type === 'entrada' ? '+' : '−'} {formatBRL(entry.amount)}
            </td>
            <td>
              <button
                type="button"
                className="icon-button"
                onClick={() => onRemove(entry.id)}
                aria-label={`Remover lançamento ${entry.description}`}
              >
                ×
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
