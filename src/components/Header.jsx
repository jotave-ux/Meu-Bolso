import { currentMonthLabel } from '../utils/format';

export default function Header() {
  return (
    <header className="header">
      <div className="header__mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div>
        <h1>Livro-Caixa</h1>
        <p className="header__subtitle">Registro de {currentMonthLabel()}</p>
      </div>
    </header>
  );
}
