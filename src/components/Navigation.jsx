// kомпонент, который отвечает за меню навигации на сайте.
import { NavLink } from "react-router-dom";
import profile from '../images/icon-acc.svg'

export function Navigation({ isOpen, onClose, loggedIn }) {
  return (
    <div className={`navigation ${(isOpen && "navigation_opened") || ""}`}>
      <div className="navigation__content">
        <button
          aria-label="close"
          className="navigation__close"
          type="button"
          onMouseDown={onClose}
        ></button>
        { loggedIn
            ? (
                <nav className="navigation__block">
                    <ul className="navigation__list">
                        <li className="navigation__element">
                            <NavLink 
                              to="/"
                              className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}
                              onMouseDown={onClose}
                            >Главная</NavLink>
                        </li>
                        <li className="navigation__element">
                          <NavLink
                            to="/movie"
                            className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}
                            onMouseDown={onClose}
                            >Фильмы</NavLink>
                        </li>
                        <li className="navigation__element">
                          <NavLink
                            to="/"
                            className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}
                            onMouseDown={onClose}
                          >Сохранённые фильмы</NavLink>
                        </li>
                    </ul>
                    <div className="navigation__profile">
                      <NavLink
                        to="/me"
                        className={({isActive}) => `navigation__link navigation__link_profile ${isActive ? "navigation__link_active" : ""}`}
                        onMouseDown={onClose}
                      >Аккаунт</NavLink>
                      <img src={profile} alt="Аккаунт" className="navigation__logo" />
                    </div>
                </nav>
            )
            : (
                <nav className="navigation__block">
                    <ul className="navigation__list">
                        <li className="navigation__element">
                            <a href="#promo" className="navigation__link" onMouseDown={onClose}>О проекте</a>
                        </li>
                        <li className="navigation__element">
                        <a href="#techs" className="navigation__link" onMouseDown={onClose}>Технологии</a>
                        </li>
                        <li className="navigation__element">
                        <a href="#student" className="navigation__link" onMouseDown={onClose}>Студент</a>
                        </li>
                    </ul>
                </nav>
            )
        }
        
      </div>
    </div>
  );
}
