import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authMe, checkCode, setCodeError } from "../redux/reducer";

const Code = ({
  email,
  checkCode,
  codeError,
  setCodeError,
  uid,
  isValidCode,
  authMe,
}) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const format = /^[0-9]{4}$/;

  const [cookies, setCookie] = useCookies([]);

  const submitForm = (e) => {
    e.preventDefault();
    if (format.test(code)) {
      checkCode(email, code);
    } else {
      setCodeError("4 цифры из смс");
    }
  };

  useEffect(() => {
    if (isValidCode) {
      setCookie("uid", uid, { path: "/" });
      const sid = String(Math.random().toFixed(19)).slice(2, 21);
      setCookie("sid", sid, { path: "/" });
      authMe(uid, sid);
    }
  }, [isValidCode]);

  return (
    <>
      <h3 className="header__subtitle">Введите код</h3>
      {codeError && <p className="error">{codeError}</p>}
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
    codeError: state.codeError,
    uid: state.uid,
    isValidCode: state.isValidCode,
  };
};

export default connect(mapStateToProps, { checkCode, setCodeError, authMe })(
  Code
);
