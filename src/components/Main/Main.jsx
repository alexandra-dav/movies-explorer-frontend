/* компонент страницы «О проекте».
Он будет содержать только презентационные компоненты и в будущем,
за исключением шапки навигации.  */

import logo from '../../images/landing-logo.svg'
export function Main() {
  return (
    <section className="landing">
      <div className="landing__content" aria-label="Стартовая страницв">
          <img src={logo} alt="Планета ВЕБ" className="landing__logo" />
          <h1 className="landing__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="landing__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button aria-label="navigation" className="landing__button">Узнать больше</button>
      </div>
    </section>
  );
}
  