// компонент со ссылками на другие проекты.
import arrow from "../../images/portfolio_link.svg";

export function Portfolio() {
  return (
    <section className="portfolio" aria-label="Портфолио">
      <h2 className="portfolio__header">Портфолио</h2>
      <nav>
        <ul className="portfolio__list">
          <li className="portfolio__link">
            <p className="portfolio__title portfolio__title_first">
              Статичный сайт
            </p>
            <a
              className="portfolio__arrow-link"
              href="https://alexandra-dav.github.io/mesto/"
              rel="noreferrer"
              target="_blank"
            >
              <img
                className="portfolio__arrow-img"
                src={arrow}
                alt="Ссылка на проект"
              ></img>
            </a>
          </li>
          <li className="portfolio__link">
            <p className="portfolio__title">Адаптивный сайт</p>
            <a
              className="portfolio__arrow-link"
              href="https://alexandra-dav.github.io/russian-travel/"
              rel="noreferrer"
              target="_blank"
            >
              <img
                className="portfolio__arrow-img"
                src={arrow}
                alt="Ссылка на проект"
              ></img>
            </a>
          </li>
          <li className="portfolio__link">
            <p className="portfolio__title portfolio__title_last">
              Одностраничное приложение
            </p>
            <a
              className="portfolio__arrow-link"
              href="https://alexandra-dav.github.io/mesto-react/"
              rel="noreferrer"
              target="_blank"
            >
              <img
                className="portfolio__arrow-img"
                src={arrow}
                alt="Ссылка на проект"
              ></img>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
