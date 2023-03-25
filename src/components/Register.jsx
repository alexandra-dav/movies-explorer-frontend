// компонент страницы регистрации.
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ onRegister }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handlChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handlSubmit = (e) => {
    e.preventDefault();
    let { password, email } = data;
    onRegister({ password, email });
  };

  return (
    <div className="register">
      <div className="register__box">
        <Link to="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
      </div>

      <form name="login-form" className="register__form" onSubmit={handlSubmit}>
        <fieldset className="register__fieldset">
          <label htmlFor="loginName" className="register__label">
            Имя
          </label>
          <input
            type="text"
            id="loginName"
            name="name"
            className="register__input register__input_form_name"
            minLength="2"
            maxLength="40"
            required
            value={data.name}
            onChange={handlChange}
            placeholder="имя"
          />
          <span className="registerEmail-error"></span>
        </fieldset>
        <fieldset className="register__fieldset">
          <label htmlFor="loginEmail" className="register__label">
            E-mail
          </label>
          <input
            type="email"
            id="loginEmail"
            name="email"
            className="register__input register__input_form_email"
            minLength="2"
            maxLength="40"
            required
            value={data.email}
            onChange={handlChange}
            placeholder="почта"
          />
          <span className="registerEmail-error"></span>
        </fieldset>
        <fieldset className="register__fieldset">
          <label htmlFor="loginPassword" className="register__label">
            Пароль
          </label>
          <input
            type="password"
            id="loginPassword"
            name="password"
            className="register__input  register__input_form_pass"
            minLength="2"
            maxLength="200"
            required
            value={data.password}
            onChange={handlChange}
            placeholder="пароль"
          />
          <span className="registerName-error"></span>
        </fieldset>
        <button aria-label="submit" className="register__button" type="submit">
          Зарегистрироваться
        </button>
        <div>
          <p className="register__link">
            Уже зарегистрированы?{" "}
            <Link to="/signin" className="register__link register__rout-link">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Register;
