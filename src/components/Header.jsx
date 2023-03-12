// компонент, который отрисовывает шапку сайта на страницу.
import logo from "../images/logo.svg";
import burger from '../images/icon-main.svg';
import { Link, NavLink } from "react-router-dom";
import profile from '../images/icon-acc.svg'

export function Header(props) {
  return (
    <header className={`header ${props.router ? "header_color" : ""}`}>
      <Link to="/">
        <img src={logo} alt="Логотип" className="header__logo" />
      </Link>
      { 
        props.isLogin
        ? (
          window.innerWidth>768
          ? (
            <div className="header__main">
              <ul className="header__navigate">
                <NavLink 
                  to="/movies"
                  className={({isActive}) => `header__name header__link ${isActive ? "header__name_active" : ""}`}
                >Фильмы</NavLink>
                <NavLink 
                  to="/saved-movies"
                  className={({isActive}) => `header__name header__link ${isActive ? "header__name_active" : ""}`}
                >Сохранённые фильмы</NavLink>
              </ul>
              <div className="header__navigate">
              <NavLink
                to="/profile"
                className={({isActive}) => `header__name header__link ${isActive ? "header__name_active" : ""}`}
                >
                Аккаунт
                <img src={profile} alt="Аккаунт" className="navigation__logo" />
                </NavLink>
                
              </div>
            </div>
          )
          : (
            <div className="header__menu">
              <img src={burger} onMouseDown={props.onNavigationOpen} className="header__img" alt="Меню" />
            </div>          
          )
        )
        : (
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

/* return (
  <Routes>
    <header className="header header_color">
        <Link to="/">
          <img src={logo} alt="Логотип" className="header__logo" />
        </Link> 
    <Route
      path="/"
      element={
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
    />
    <Route
      path="/saved-movies"
        element={
          <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <div className="header__menu">
              <img src={burger} onMouseDown={onNavigationOpen} className="header__img" alt="Меню" />
            </div>
          </header>
        }
      />
      <Route
        path="/movies"
        element={
          <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <div className="header__menu">
              <img src={burger} onMouseDown={onNavigationOpen} className="header__img" alt="Меню" />
            </div>
          </header>
        }
      />
    
  </Routes>
); */