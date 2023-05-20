// eslint-disable-next-line no-control-regex
export const emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const errorText = {
  inputSelector: 'Что-то пошло не так...',
  loginError404: "Вы ввели неправильный логин или пароль.",
  loginError400: "При авторизации произошла ошибка. Переданный токен некорректен.",
  loginError500: "При авторизации произошла ошибка. Токен не передан или передан не в том формате.",
  emailError409: "Пользователь с таким email уже существует.",
  registerError500: "При регистрации пользователя произошла ошибка.",
  updateError500: "При обновлении профиля произошла ошибка.",
}
export const massageText = {
  changeDataProfile: 'Вы успешно изменили данные профиля.'
}

export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "https://api.your.movies.nomoredomains.work";
