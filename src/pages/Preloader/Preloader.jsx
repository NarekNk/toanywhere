import React from "react";
import s from "./Preloader.module.css";
import biplan from "../../images/biplan.svg";
import Message from "../../components/Message";

const Preloader = () => {
  return (
    <div className={s.preloder}>
      <Message messageText={"У вас нет доступа к этому путешествию"} />
      <div className={s.preloder__airplane}>
        <div className={s.preloder__line + " " + s.line}></div>
        <div className={s.preloder__img}>
          <img
            src={biplan}
            lazy="loading"
            alt="biplan"
            width="86"
            height="135"
          />
        </div>
      </div>
      <p className={s.preloder__text}>
        Связь с гидом прервалась, ждем подключения.
      </p>
    </div>
  );
};

export default Preloader;
