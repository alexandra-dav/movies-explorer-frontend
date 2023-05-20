// компонент страницы изменения профиля.
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useInput } from "../utils/validation";
import { CurrentUserContext } from "../utils/CurrentUserContext";

export function Profile({
  isLogin,
  onNavigationOpen,
  onLogout,
  onUpdateUser,
  errorMessage,
  setErrorMessage,
  okMessage,
  setOkMessage,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [title, setTitle] = useState(`${currentUser.name}`);

  const [isProfileForm, setIsProfileForm] = useState(true);
  const name = useInput(`${currentUser.name}`, { isEmpty: true, minLenght: 2 });
  const email = useInput(`${currentUser.email}`, {
    isEmpty: true,
    minLenght: 4,
    isEmail: true,
  });
  const resetAllMessage = () => {
    setOkMessage("");
    setErrorMessage("");
  };
  function handleEdit() {
    setIsProfileForm(!isProfileForm);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    handleEdit();
    if (!isProfileForm) {
      setTitle(name.value);
      // Передаём значения управляемых компонентов во внешний обработчик
      onUpdateUser({
        name: name.value,
        email: email.value,
      });
    }
  }
  useEffect(() => {
    if (errorMessage) {
      setIsProfileForm(false);
    }
  }, [errorMessage]);
  useEffect(() => {
    document.addEventListener("mousedown", resetAllMessage);
    return () => document.removeEventListener("mousedown", resetAllMessage);
  });

  return (
    <>
      <Header
        router={false}
        isLogin={isLogin}
        onNavigationOpen={onNavigationOpen}
      />
      <main>
        <section className="profile" aria-label="Страница изменения профиля">
          <h1 className="register__title">{`Привет, ${title}!`}</h1>
          <form
            name="profile-form"
            className="profile__form"
            onSubmit={handleSubmit}
          >
            <fieldset className="profile__fieldset">
              <label htmlFor="name" className="profile__label">
                Имя
              </label>
              <input
                type="text"
                id="profileName"
                name="name"
                className={`${
                  name.isDirty &&
                  (name.isEmpty || name.minLenghtError) &&
                  "validation__text_color"
                } profile__input profile__input_form_name`}
                minLength="2"
                maxLength="40"
                required
                readOnly={isProfileForm}
                value={name.value}
                onChange={name.onChange}
                onBlur={name.onBlur}
              />
            </fieldset>
            <fieldset className="profile__fieldset">
              <label htmlFor="email" className="profile__label">
                E-mail
              </label>
              <input
                type="email"
                id="profileEmail"
                name="email"
                className={`${
                  email.isDirty &&
                  (email.isEmpty ||
                    email.minLenghtError ||
                    email.isEmailError) &&
                  "validation__text_color"
                } profile__input profile__input_form_email`}
                minLength="2"
                maxLength="40"
                required
                readOnly={isProfileForm}
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
              />
            </fieldset>

            <span
              className={`${
                (errorMessage || okMessage) &&
                "validation__buttonError validation__text_color"
              }`}
            >
              {errorMessage || okMessage}
            </span>
            <button
              aria-label="submit"
              className={`profile__button ${
                (!name.inputValid || !email.inputValid || errorMessage) &&
                "validation__disabled"
              }`}
              type="submit"
              disabled={!name.inputValid || !email.inputValid || errorMessage}
            >
              {isProfileForm ? "Редактировать" : "Сохранить"}
            </button>
          </form>
          <div>
            <p className="register__link">
              <Link
                to="/signin"
                className="register__link register__link_pink register__rout-link"
                onClick={onLogout}
              >
                Выйти из аккаунта
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
