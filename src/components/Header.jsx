// компонент, который отрисовывает шапку сайта на страницу.
import logo from "../images/logo.svg";
// import { Route, Switch, Link } from "react-router-dom";

export function Header(props) {
  return (
    <header className="header header_color">
      <img src={logo} alt="Логотип" className="header__logo" />
    </header>
  );
}