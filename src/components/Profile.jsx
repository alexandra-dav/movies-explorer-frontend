// компонент страницы изменения профиля.
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../utils/CurrentUserContext";

export function Profile({ isLogin, onNavigationOpen, onLogout, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  function handleEdit() {
    setCanEdit(!canEdit);
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    handleEdit();
    if (canEdit) {
      setTitle(name);
      // Передаём значения управляемых компонентов во внешний обработчик
      onUpdateUser({
        name,
        email,
      });
    }
  }
  useEffect(() => {
    setName(currentUser.name || "Иван");
    setTitle(currentUser.name || "Иван");
    setEmail(currentUser.email);
  }, [currentUser]);

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
                className="profile__input profile__input_form_name"
                minLength="2"
                maxLength="40"
                required
                readOnly={!canEdit}
                value={name}
                onChange={handleChangeName}
                placeholder="имя"
              />
              <span className="profileEmail-error"></span>
            </fieldset>
            <fieldset className="profile__fieldset">
              <label htmlFor="email" className="profile__label">
                E-mail
              </label>
              <input
                type="email"
                id="profileEmail"
                name="email"
                className={`profile__input profile__input_form_email ${
                  canEdit ? "profile__input_edit" : ""
                }`}
                minLength="2"
                maxLength="40"
                required
                readOnly={!canEdit}
                value={email}
                onChange={handleChangeEmail}
                placeholder="почта"
              />
              <span className="profileEmail-error"></span>
            </fieldset>
            <button
              aria-label="submit"
              className="profile__button"
              type="submit"
              disabled={!(name && email)}
            >
              {canEdit ? "Сохранить" : "Редактировать"}
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
