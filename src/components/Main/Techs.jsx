// компонент с использованными технологиями.
export function Techs() {
    return (
      <section className="techs" aria-label="Технологии">
        <h2 className="promo__header techs_header-top">Технологии</h2>
        <div className="techs__info">
            <h3 className="techs__title">7 технологий</h3>
            <p className="techs__text">На курсе веб-разработки мы освоили технологии, 
            которые применили в дипломном проекте.</p>
        </div>
        <nav>
            <ul className="techs__list">
                <li className="techs__icon">HTML</li>
                <li className="techs__icon">CSS</li>
                <li className="techs__icon">JS</li>
                <li className="techs__icon">React</li>
                <li className="techs__icon">Git</li>
                <li className="techs__icon">Express</li>
                <li className="techs__icon">mongoDB</li>
            </ul>
        </nav>
      </section>
    );
  }