import { emailPattern } from "./data";
import { useEffect, useState } from "react";

// Кастомная валидация формы
const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLenghtError, setMinLenghtError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isApiError, setIsApiError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLenght":
          value.length < validations[validation]
            ? setMinLenghtError(true)
            : setMinLenghtError(false);
          break;
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case "isEmail":
          emailPattern.test(String(value).toLowerCase())
            ? setIsEmailError(false)
            : setIsEmailError(true);
          break;
        case 'isApiError':
          validations.isApiError
            ? setIsApiError(true)
            : setIsApiError(false);
          break;
        default:
          break;
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (isEmailError || isEmpty || minLenghtError || isApiError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmailError, isEmpty, minLenghtError, isApiError]);

  return {
    isEmpty,
    minLenghtError,
    isEmailError,
    inputValid,
    isApiError
  };
};
// Инициализируем инпуты формы
export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = (e) => {
    setIsDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};
