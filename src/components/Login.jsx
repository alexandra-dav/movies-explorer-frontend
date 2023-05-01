//  компонент страницы авторизации.
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useInput } from "../utils/validation";
import { errorText } from "../utils/data";

export default function Login({ onAuthorize, errorMessage, setErrorMessage }) {
  const email = useInput("", { isEmpty: true, minLenght: 4, isEmail: true });
  const password = useInput("", { isEmpty: true, minLenght: 3 });

  const resetApiError = () => {
    setErrorMessage("");
  };
  const handlSubmit = (e) => {
    e.preventDefault();
    onAuthorize({ password: password.value, email: email.value });
  };

  return (
    <main>
      <div className="register">
        <div className="register__box">
          <Link to="/" onClick={resetApiError}>
            <img src={logo} alt="Логотип" className="register__logo" />
          </Link>
          <h1 className="register__title">Рады видеть!</h1>
        </div>

        <form
          name="login-form"
          className="register__form"
          onSubmit={handlSubmit}
        >
          <fieldset className="register__fieldset">
            <label htmlFor="loginEmail" className="register__label">
              E-mail
            </label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              className={`${
                email.isDirty &&
                (email.isEmpty || email.minLenghtError || email.isEmailError) &&
                "validation__text_color"
              } register__input`}
              maxLength="40"
              required
              value={email.value}
              onChange={email.onChange}
              onBlur={email.onBlur}
              onClick={resetApiError}
            />
            <span
              className={`${
                email.isDirty &&
                (email.isEmpty || email.minLenghtError || email.isEmailError) &&
                "validation__text validation__text_color"
              }`}
            >
              {email.isDirty &&
              (email.isEmpty || email.minLenghtError || email.isEmailError)
                ? errorText.inputSelector
                : ""}
            </span>
          </fieldset>
          <fieldset className="register__fieldset">
            <label htmlFor="loginPassword" className="register__label">
              Пароль
            </label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              className={`${
                password.isDirty &&
                (password.isEmpty || password.minLenghtError) &&
                "validation__text_color"
              } register__input`}
              maxLength="200"
              required
              value={password.value}
              onChange={password.onChange}
              onBlur={password.onBlur}
              onClick={resetApiError}
            />
            <span
              className={`${
                password.isDirty &&
                (password.isEmpty || password.minLenghtError) &&
                "validation__text validation__text_color"
              }`}
            >
              {password.isDirty && (password.isEmpty || password.minLenghtError)
                ? errorText.inputSelector
                : ""}
            </span>
          </fieldset>

          <span
            className={`${
              errorMessage && "validation__buttonError validation__text_color"
            }`}
          >
            {errorMessage}
          </span>
          <button
            aria-label="submit"
            className={`register__button register__button_singin ${
              (!email.inputValid || !password.inputValid) &&
              "validation__disabled validation__disabled_button"
            }`}
            type="submit"
            disabled={!email.inputValid || !password.inputValid}
          >
            Войти
          </button>
          <div>
            <p className="register__link">
              Ещё не зарегистрированы?{" "}
              <Link
                to="/signup"
                className="register__link register__rout-link"
                onClick={resetApiError}
              >
                Регистрация
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
