import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const STORAGE_KEY = 'livro-caixa:lancamentos';

function loadFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Não foi possível ler os lançamentos salvos:', err);
    return [];
  }
}

export function useLedger() {
  const [entries, setEntries] = useState(loadFromStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (err) {
      console.error('Não foi possível salvar os lançamentos:', err);
    }
  }, [entries]);

  function addEntry({ description, amount, category, type, date }) {
    setEntries((prev) => [
      { id: uuid(), description, amount: Number(amount), category, type, date },
      ...prev,
    ]);
  }

  function removeEntry(id) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }

  return { entries, addEntry, removeEntry };
}
