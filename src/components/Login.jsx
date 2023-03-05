//  компонент страницы авторизации.
import logo from '../images/logo.svg';
import { Link } from "react-router-dom";
/* import React from "react";
import { useState } from "react"; */

export default function Login() {
/*   const [data, setData] = useState({
    email: '',
    password: ''
  });
  const handlChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  const handlSubmit = (e) => {
    e.preventDefault();
    let { password, email } = data;
    onAuthorize({password, email});    
  } */

  return (
    <div className="register">
      <div className="register__box">
        <Link to="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <h1 className="register__title">Рады видеть!</h1>
      </div>
      
      <form
        name="login-form"
        className="register__form"
        /* onSubmit={handlSubmit} */
      >
        <fieldset className="register__fieldset">
          <label for="email" class="register__label">E-mail</label>
          <input
            type="email"
            id="loginEmail"
            name="email"
            className="register__input register__input_form_email"
            minLength="2"
            maxLength="40"
            required
            /* value={data.email}
            onChange={handlChange} */
          />
          <span className="loginEmail-error"></span>
          </fieldset>
          <fieldset className="register__fieldset">
            <label for="password" class="register__label">Пароль</label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              className="register__input register__input_form_pass"
              minLength="2"
              maxLength="200"
              required
              /* value={data.password}
              onChange={handlChange} */
            />
            <span className="loginPass-error"></span>
          </fieldset>

        <button aria-label="submit" className="register__button register__button_singin" type="submit">
          Войти
        </button>
        <div>
            <p className="register__link">
            Ещё не зарегистрированы? <Link to="/singup" className="register__link register__rout-link">
            Регистрация
          </Link>
            </p>          
        </div>
      </form>
    </div>
  );
}
