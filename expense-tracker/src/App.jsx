import Header from './components/Header';
import Summary from './components/Summary';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import CategoryChart from './components/CategoryChart';
import { useLedger } from './hooks/useLedger';

export default function App() {
  const { entries, addEntry, removeEntry } = useLedger();

  return (
    <div className="page">
      <div className="sheet">
        <Header />
        <Summary entries={entries} />
        <EntryForm onAdd={addEntry} />
        <CategoryChart entries={entries} />
        <section aria-label="Lançamentos">
          <h2>Lançamentos</h2>
          <EntryList entries={entries} onRemove={removeEntry} />
        </section>
      </div>
      <footer className="footer">
        Os dados ficam salvos apenas neste navegador (localStorage).
      </footer>
    </div>
  );
}
