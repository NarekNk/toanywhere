import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCode } from "../api/api";

const Auth = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    getCode(email, navigate);
  };

  return (
    <>
      <h3 className="header__subtitle">
        Что бы присоединиться к путешествию, авторизируйтесь
      </h3>
      <form className="form" onSubmit={submitForm}>
        <div className="form__inner">
          <label className="form__label">
            <span className="sr-only">Введите вашу почту</span>
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button className="form__btn form__btn--orange" type="submit">
            Войти
          </button>
          <button
            className="form__btn form__btn--white"
            type="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Зарегистрироваться
          </button>
        </div>

        <div className="form__descr">
          Регистрируясь, вы подтверждаете, что ознакомились и принимаете
          <a className="form__link" href="#">
            Договор о конфиденциальности
          </a>
          <span>, </span>
          <a className="form__link" href="#">
            Пользовательское соглашение
          </a>
        </div>
      </form>
    </>
  );
};

export default Auth;
