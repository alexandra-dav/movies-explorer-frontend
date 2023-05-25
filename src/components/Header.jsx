// компонент, который отрисовывает шапку сайта на страницу.
import logo from "../images/logo.svg";
import burger from "../images/icon-main.svg";
import { useState, useLayoutEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import profile from "../images/icon-acc.svg";

export function Header(props) {
  const width = useWindowSize(); // ширина экрана

  // получение значения размера экрана
  /* TODO стоит подумать насчет экспорта функции 
  и использовать с константой, которая создается в 
  Header и Card
  */
  function useWindowSize() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  return (
    <header className={`header ${props.router ? "header_color" : ""}`}>
      <Link to="/">
        <img src={logo} alt="Логотип" className="header__logo" />
      </Link>
      {props.isLogin ? (
        width > 768 ? (
          <div className="header__main">
            <ul className="header__navigate">
              <li className="navigation__list">
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    `header__name header__name_link ${
                      isActive ? "header__name_active" : ""
                    }`
                  }
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__list ">
                <NavLink
                  to="/saved-movies"
                  className={({ isActive }) =>
                    `header__name header__name_link ${
                      isActive ? "header__name_active" : ""
                    }`
                  }
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
            <div className="header__navigate">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `header__name header__name_link ${
                    isActive ? "header__name_active" : ""
                  }`
                }
              >
                Аккаунт
                <img src={profile} alt="Аккаунт" className="navigation__logo" />
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="header__menu">
            <img
              src={burger}
              onMouseDown={props.onNavigationOpen}
              className="header__img"
              alt="Меню"
            />
          </div>
        )
      ) : (
        <div className="header__menu">
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
          <Link to="/signin" className="header__link header__link_button">
            Войти
          </Link>
        </div>
      )}
    </header>
  );
}
