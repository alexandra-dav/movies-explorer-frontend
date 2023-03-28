// компонент с вёрсткой баннера страницы «О проекте».

export function Promo() {
  return (
    <section className="promo" aria-label="О проекте">
      <h2 className="promo__header">
        <span id="promo">О проекте</span>
      </h2>
      <div className="promo__about">
        <div className="promo__list">
          <h3 className="promo__title">Дипломный проект включал 5 этапов</h3>
          <p className="promo__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="promo__list">
          <h3 className="promo__title">На выполнение диплома ушло 5 недель</h3>
          <p className="promo__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="promo__table">
        <div className="promo__block promo__block_green">1 неделя</div>
        <div className="promo__block promo__block_back">Back-end</div>
        <div className="promo__block promo__block_grey">4 недели</div>
        <div className="promo__block promo__block_front">Front-end</div>
      </div>
    </section>
  );
}
