import { Link } from 'react-router-dom';

export function Notfoundpage(){
  return (
    <div className="notfound">
        <h1 className="notfound__mistake">404</h1>
        <h2 className="notfound__title">Страница не найдена</h2>
        <Link to="/" className="notfound__link">
          Назад
        </Link>
    </div>
  );
}