import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  authMe,
  checkCode,
  checkRestoreCode,
  setCodeError,
  setIsValidCode,
} from "../redux/authReducer";

const Code = ({
  email,
  checkCode,
  codeError,
  setCodeError,
  uid,
  ex_tid,
  isValidCode,
  authMe,
  isLogging,
  checkRestoreCode,
  setIsValidCode,
}) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const format = /^[0-9]{4}$/;

  const [cookies, setCookie] = useCookies([]);

  const submitForm = (e) => {
    e.preventDefault();
    if (format.test(code)) {
      if (!isLogging) {
        checkCode(email, code);
      } else {
        checkRestoreCode(email, code);
      }
    } else {
      setCodeError("4 цифры из смс");
    }
  };

  useEffect(() => {
    if (isValidCode) {
      setCookie("uid", uid, { path: "/" });
      const sid = String(Math.random().toFixed(19)).slice(2, 21);
      setCookie("sid", sid, { path: "/" });
      authMe(uid, sid, ex_tid, navigate);
      setIsValidCode(false);
    }
  }, [isValidCode]);

  return (
    <>
      <h3 className="header__subtitle">Введите код</h3>
      {codeError && <p className="error">{codeError}</p>}
      <form className="form" onSubmit={submitForm}>
        <div className="form__inner" style={{ width: "45%" }}>
          <label className="form__label">
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
    email: state.auth.email,
    codeError: state.auth.codeError,
    uid: state.auth.uid,
    isValidCode: state.auth.isValidCode,
    isLogging: state.auth.isLogging,
    ex_tid: state.auth.ex_tid,
  };
};

export default connect(mapStateToProps, {
  checkCode,
  setCodeError,
  authMe,
  checkRestoreCode,
  setIsValidCode,
})(Code);
