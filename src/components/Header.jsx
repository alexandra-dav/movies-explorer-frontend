// компонент, который отрисовывает шапку сайта на страницу.
import logo from "../images/logo.svg";
import burger from '../images/icon-main.svg';
import { Link } from "react-router-dom";

export function Header({ onNavigationOpen, isLogin }) {
  return (
    <header className="header header_color">
      <img src={logo} alt="Логотип" className="header__logo" />
      {
        isLogin
          ? (
            <div className="header__menu">
              <img src={burger} onMouseDown={onNavigationOpen} className="header__img" alt="Меню" />
            </div>
          )
          :(
            <div className="header__menu">             
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
              <button className="header__button">
                <Link to="/signin" className="header__link header__link_button">
                  Войти
                </Link>
              </button>
            </div>       
          )
      }
    </header>
  );
}