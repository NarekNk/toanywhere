import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authMe, getRestoreCode } from "../redux/authReducer";

const Auth = ({ ex_tid, authMe, getRestoreCode, emailError }) => {
  const [email, setEmail] = useState("");
  const [emptyEmailError, setEmptyEmailError] = useState("");
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies([]);

  const submitForm = (e) => {
    e.preventDefault();
    getRestoreCode(email, navigate);
  };

  useEffect(() => {
    if (cookies.uid && cookies.sid) {
      authMe(cookies.uid, cookies.sid, ex_tid, navigate);
    }
  }, []);

  return (
    <>
      <h3 className="header__subtitle">
        Что бы присоединиться к путешествию, авторизируйтесь
      </h3>
      {emailError && <p className="error">{emailError}</p>}
      {emptyEmailError && <p className="error">{emptyEmailError}</p>}
      <form className="form" onSubmit={submitForm}>
        <div className="form__inner">
          <label className="form__label">
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmptyEmailError("");
              }}
            />
          </label>
          <button
            className="form__btn form__btn--orange"
            type="submit"
            onClick={() => {
              if (email == "") setEmptyEmailError("Введите Email");
            }}
          >
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

const mapStateToProps = (state) => {
  return {
    emailError: state.auth.emailError,
    ex_tid: state.auth.ex_tid,
  };
};

export default connect(mapStateToProps, { authMe, getRestoreCode })(Auth);
