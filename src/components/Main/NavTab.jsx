// компонент с навигацией по странице «О проекте».

export function NavTab({ isOpen, onClose }) {
  return (
    <div className={`navigation ${(isOpen && "navigation_opened") || ""}`}>
      <div className="navigation__content">
        <button
          aria-label="close"
          className="navigation__close"
          type="button"
          onMouseDown={onClose}
        ></button>
        <nav className="navigation__block">
          <ul className="navigation__list">
            <li className="navigation__element">
              <a
                href="#promo"
                className="navigation__link"
                onMouseDown={onClose}
              >
                О проекте
              </a>
            </li>
            <li className="navigation__element">
              <a
                href="#techs"
                className="navigation__link"
                onMouseDown={onClose}
              >
                Технологии
              </a>
            </li>
            <li className="navigation__element">
              <a
                href="#student"
                className="navigation__link"
                onMouseDown={onClose}
              >
                Студент
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
