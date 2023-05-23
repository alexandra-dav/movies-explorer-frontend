// eslint-disable-next-line no-control-regex
export const emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const errorText = {
  INPUTSELECTOR: 'Что-то пошло не так...',
  LOGINERROR404: "Вы ввели неправильный логин или пароль.",
  LOGINERROR400: "При авторизации произошла ошибка. Переданный токен некорректен.",
  LOGINERROR500: "При авторизации произошла ошибка. Токен не передан или передан не в том формате.",
  EMAILERROR409: "Пользователь с таким email уже существует.",
  REGISTERERROR500: "При регистрации пользователя произошла ошибка.",
  UPDATEERROR500: "При обновлении профиля произошла ошибка.",
  ERROR429: "Превышено количество запросов. Попробуйте позже.",
  UNOTHER: 'На сервере произошла ошибка.'
}
export const massageText = {
  CHANGEDATAPROFILE: 'Вы успешно изменили данные профиля.',
  SEARCHFORMVALIDATIONMESSAGE: 'Введите что-нибудь'
}

export const BASE_URL = "http://localhost:3000";
//export const BASE_URL = "https://api.your.movies.nomoredomains.work";
