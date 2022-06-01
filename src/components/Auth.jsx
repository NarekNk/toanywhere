import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authMe } from "../redux/reducer";

const Auth = ({ authMe }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies([]);

  const submitForm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (cookies.uid && cookies.sid) {
      authMe(cookies.uid, cookies.sid);
    }
  }, []);

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

export default connect(null, { authMe })(Auth);
