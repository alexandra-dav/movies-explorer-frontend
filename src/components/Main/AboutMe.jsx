// компонент с информацией о студенте.
import { Portfolio } from './Portfolio';
import dog from '../../images/dog.jpg';

export function AboutMe() {
  return (
    <>
    <section className="student" aria-label="Про автора">
      <h2 className="promo__header">Студент</h2>
      <img src={dog} className="student__photo" alt="Новогодний пёсик"></img>
      <div className="student__info">
          <h3 className="student__name">Александра</h3>
          <h4 className="student__job">Студент курса "Веб-разработчик"</h4>
          <p className="student__about">Всегда было интересно попробовать себя в роли фронтенд-разработчика. 
          Благодаря курсу "Практикум" у меня появилась такая возможность! Получилось "потрагать" и поработать со стеком фронта и 
          немного затронуть бэкент, что однозначно пригодиться для работы.
          Обожаю своего пса и думаю, что моим следующим проектом будет его веб-Псайт 🙃</p>
          <a href='https://github.com/alexandra-dav' className="student__link">Github</a>
      </div>
    </section>
    <Portfolio />
    </>
  );
}