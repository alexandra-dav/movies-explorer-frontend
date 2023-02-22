//  презентационный компонент, который отрисовывает подвал.
export function Footer() {
    return (
      <footer className="footer">
        <p className="footer__name">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__content">
            <p className="footer__year">&copy; 2023</p>
            <nav>
                <p className="footer__block">Яндекс.Практикум</p>
                <p className="footer__block">Github</p>
            </nav>
        </div>
      </footer>
    );
  }
  