import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendCode } from "../api/api";

const Code = ({ email }) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    sendCode(email, code);
  };

  return (
    <>
      <h3 className="header__subtitle">Введите код</h3>
      <form className="form" onSubmit={submitForm}>
        <div className="form__inner" style={{ width: "45%" }}>
          <label className="form__label">
            <span className="sr-only">Введите вашу почту</span>
            <input
              className="form__input"
              type="text"
              name="code"
              placeholder="Код"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <button className="form__btn form__btn--orange" type="submit">
            Продолжить
          </button>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
};

export default connect(mapStateToProps, {})(Code);
