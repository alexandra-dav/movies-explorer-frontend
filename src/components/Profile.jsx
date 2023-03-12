// компонент страницы изменения профиля.
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Profile({isLogin, onNavigationOpen}) {
  const [canEdit, setCanEdit] =  useState(false);
  function handleEdit() {
    setCanEdit(!canEdit);
  };

  return(
    <>
    <Header
      router={false}
      isLogin={isLogin}
      onNavigationOpen={onNavigationOpen}
    />
    <section className="profile" aria-label="Страница изменения профиля">
      <h1 className="register__title">Привет, Виталий!</h1> 
      <form
        name="profile-form"
        className="profile__form"
        /* onSubmit={handlSubmit} */
      >
        <fieldset className="profile__fieldset">
            <label htmlFor="name" className="profile__label">Имя</label>
            <input
            type="text"
            id="profileName"
            name="name"
            className="profile__input profile__input_form_name"
            minLength="2"
            maxLength="40"
            required
            defaultValue={"Василий"}
            readOnly={!canEdit}
            /* value={data.email}
            onChange={handlChange} */
            />
            <span className="profileEmail-error"></span>
        </fieldset>
        <fieldset className="profile__fieldset">
            <label htmlFor="email" className="profile__label">E-mail</label>
            <input
            type="email"
            id="profileEmail"
            name="email"
            className={`profile__input profile__input_form_email ${canEdit ? "profile__input_edit" : ""}`}
            minLength="2"
            maxLength="40"
            required
            defaultValue={"pochta@yandex.ru"}
            readOnly={!canEdit}
            /* value={data.email}
            onChange={handlChange} */
            />
            <span className="profileEmail-error"></span>
        </fieldset>
      </form>
      {
        canEdit
        ?(
          <button aria-label="submit" className="profile__button" onClick={handleEdit} type="submit">
            Сохранить
          </button>
        )
        :(
          <button aria-label="submit" className="profile__button" onClick={handleEdit} type="button">
            Редактировать
          </button>
        )
      }      
      <div>
        <p className="register__link">
          <Link to="/signin" className="register__link register__link_pink register__rout-link">
            Выйти из аккаунта
          </Link>
        </p>          
      </div>
    </section>
    </>
  );
}