import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getCode } from "../redux/reducer";

const Register = ({ getCode, emailError }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    getCode(email, navigate);
  };

  return (
    <>
      <h3 className="header__subtitle">Введите электронную почту</h3>
      {emailError && <p className="error">{emailError}</p>}
      <form className="form" onSubmit={submitForm}>
        <div className="form__inner">
          <label className="form__label">
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
            Получить код
          </button>
          <NavLink to={"/"} className="haveAcc">
            Есть аккаунт? Авторизируйтесь
          </NavLink>
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
    emailError: state.emailError,
  };
};

export default connect(mapStateToProps, { getCode })(Register);
