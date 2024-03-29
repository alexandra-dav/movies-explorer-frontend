/* компонент страницы «О проекте».
Он будет содержать только презентационные компоненты и в будущем,
за исключением шапки навигации.  */

import logo from "../../images/landing-logo.svg";
import { Promo } from "./Promo";
import { Techs } from "./Techs";
import { AboutMe } from "./AboutMe";
import { Header } from "../Header";
import { Footer } from "../Footer";

export function Main({ onNavigationOpen, isLogin, onNavTabOpen }) {
  return (
    <>
      <Header
        router={true}
        isLogin={isLogin}
        onNavigationOpen={onNavigationOpen}
        /* windowWidth={windowWidth} */
      />
      <main>
      <section className="landing header_color" aria-label="Стартовая страница">
        <div className="landing__content">
          <img src={logo} alt="Планета ВЕБ" className="landing__logo" />
          <h1 className="landing__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="landing__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button
            aria-label="navigation"
            className="landing__button"
            onClick={onNavTabOpen}
          >
            Узнать больше
          </button>
        </div>
      </section>
      <Promo />
      <Techs />
      <AboutMe />
      </main>      
      <Footer />
    </>
  );
}
