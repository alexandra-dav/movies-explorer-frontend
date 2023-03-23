// kомпонент, который отвечает за меню навигации на сайте.
import { NavLink } from "react-router-dom";
import profile from "../images/icon-acc.svg";

export function Navigation({ isOpen, onClose }) {
  return (
    <div className={`navigation ${(isOpen && "navigation_opened") || ""}`}>
      <div className="navigation__content">
        <button
          aria-label="close"
          className="navigation__close"
          type="button"
          onMouseDown={onClose}
        ></button>
        <nav className="navigation__block">
          <ul className="navigation__list">
            <li className="navigation__element">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `navigation__link ${
                    isActive ? "navigation__link_active" : ""
                  }`
                }
                onMouseDown={onClose}
              >
                Главная
              </NavLink>
            </li>
            <li className="navigation__element">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `navigation__link ${
                    isActive ? "navigation__link_active" : ""
                  }`
                }
                onMouseDown={onClose}
              >
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__element">
              <NavLink
                to="/saved-movies"
                className={({ isActive }) =>
                  `navigation__link ${
                    isActive ? "navigation__link_active" : ""
                  }`
                }
                onMouseDown={onClose}
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <div className="navigation__profile">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `navigation__link navigation__link_profile ${
                  isActive ? "navigation__link_active" : ""
                }`
              }
              onMouseDown={onClose}
            >
              Аккаунт
            </NavLink>
            <img src={profile} alt="Аккаунт" className="navigation__logo" />
          </div>
        </nav>
      </div>
    </div>
  );
}
