import { useState } from 'react';
import { CATEGORIES } from '../utils/categories';

const today = () => new Date().toISOString().slice(0, 10);

const EMPTY_FORM = {
  description: '',
  amount: '',
  category: CATEGORIES[0].id,
  type: 'saida',
  date: today(),
};

export default function EntryForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.description.trim()) {
      setError('Descreva o lançamento.');
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      setError('Informe um valor maior que zero.');
      return;
    }
    onAdd(form);
    setForm({ ...EMPTY_FORM, date: form.date });
    setError('');
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <div className="entry-form__row">
        <label className="field field--grow">
          <span>Descrição</span>
          <input
            type="text"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Ex.: supermercado, salário, aluguel"
          />
        </label>
        <label className="field">
          <span>Valor</span>
          <input
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            value={form.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            placeholder="0,00"
          />
        </label>
      </div>

      <div className="entry-form__row">
        <label className="field">
          <span>Categoria</span>
          <select value={form.category} onChange={(e) => handleChange('category', e.target.value)}>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Data</span>
          <input type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} />
        </label>
        <fieldset className="type-toggle">
          <legend>Tipo</legend>
          <label className={form.type === 'entrada' ? 'is-active' : ''}>
            <input
              type="radio"
              name="type"
              value="entrada"
              checked={form.type === 'entrada'}
              onChange={() => handleChange('type', 'entrada')}
            />
            Entrada
          </label>
          <label className={form.type === 'saida' ? 'is-active' : ''}>
            <input
              type="radio"
              name="type"
              value="saida"
              checked={form.type === 'saida'}
              onChange={() => handleChange('type', 'saida')}
            />
            Saída
          </label>
        </fieldset>
      </div>

      {error && <p className="entry-form__error" role="alert">{error}</p>}

      <button type="submit" className="button">Lançar</button>
    </form>
  );
}
