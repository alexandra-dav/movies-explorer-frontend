// компонент страницы регистрации.
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { errorText } from "../utils/data";
import { useInput } from "../utils/validation";

function Register({ onRegister, errorMessage, setErrorMessage }) {
  const name = useInput("", { isEmpty: true, minLenght: 2 });
  const email = useInput("", { isEmpty: true, minLenght: 4, isEmail: true});
  const password = useInput("", { isEmpty: true, minLenght: 3 });

  const resetApiError = () => {
    setErrorMessage('');
  }
  const handlSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: name.value,
      password: password.value,
      email: email.value,
    });
    setErrorMessage('');
  };

  return (
    <main>
      <div className="register">
        <div className="register__box">
          <Link to="/" onClick={resetApiError}>
            <img src={logo} alt="Логотип" className="register__logo" />
          </Link>
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>

        <form
          name="login-form"
          className="register__form"
          onSubmit={handlSubmit}
        >
          <fieldset className="register__fieldset">
            <label htmlFor="loginName" className="register__label">
              Имя
            </label>
            <input
              type="text"
              id="loginName"
              name="name"
              className={`${
                name.isDirty &&
                (name.isEmpty || name.minLenghtError) &&
                "validation__text_color"
              } register__input`}
              minLength="2"
              maxLength="40"
              required
              value={name.value}
              onChange={name.onChange}
              onBlur={name.onBlur}
            />
            <span
              className={`${
                name.isDirty &&
                (name.isEmpty || name.minLenghtError) &&
                "validation__text validation__text_color"
              }`}
            >
              {name.isDirty && (name.isEmpty || name.minLenghtError)
                ? errorText.inputSelector
                : ""}
            </span>
          </fieldset>
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
                (email.isEmpty || email.minLenghtError || email.isEmailError ) &&
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
              {email.isDirty && (email.isEmpty || email.minLenghtError || email.isEmailError)
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
              minLength="2"
              maxLength="200"
              required
              value={password.value}
              onChange={password.onChange}
              onBlur={password.onBlur}
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
              (errorMessage) && "validation__buttonError validation__text_color"
            }`}
          >
            {errorMessage
                ? errorMessage
                : ""}
          </span>
          <button
            aria-label="submit"
            className={`register__button ${
              (!name.inputValid || !email.inputValid || !password.inputValid) &&
              "validation__disabled validation__disabled_button"
            }`}
            type="submit"
            disabled={
              !name.inputValid || !email.inputValid || !password.inputValid
            }
          >
            Зарегистрироваться
          </button>
          <div>
            <p className="register__link">
              Уже зарегистрированы?{" "}
              <Link to="/signin" className="register__link register__rout-link" onClick={resetApiError}>
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
export default Register;