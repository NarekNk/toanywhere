import React, { useEffect, useMemo, useState } from "react";
import logo from "../../images1/logo.svg";
import appstore from "../../images/icons/appstore.svg";
import google from "../../images/icons/google.svg";
import headerImg from "../../images2/header-img.jpg";
import Social from "../../components/Social";
import s from "./StartPage.module.css";
import { connect } from "react-redux";
import { joinMe } from "../../redux/excursionReducer";
import { useCookies } from "react-cookie";
import DownloadLinks from "../../components/DownloadLinks";
import Preloader from "../Preloader/Preloader";

const StartPage = ({
  isJoined,
  isLoading,
  joinMe,
  ex_tid,
  ex_name,
  ex_h_cost,
  ex_time_start,
}) => {
  const downloadLinks = [
    {
      url: "#",
      ariaLabel: "Ссылка на скачивание приложения google-play",
      bgImage: google,
    },
    {
      url: "#",
      ariaLabel: "Ссылка на скачивание приложения app store",
      bgImage: appstore,
    },
  ];

  const [time, setTime] = useState("");
  useEffect(() => {
    if (ex_time_start) {
      let startDate = Date.parse(ex_time_start);
      let newDate = new Date(startDate);
      let year = newDate.getFullYear();
      let month = newDate.getMonth();
      month = month < 10 ? `0${month}` : month;
      let day = newDate.getDate();
      day = day < 10 ? `0${day}` : day;
      let hour = newDate.getHours();
      hour = hour < 10 ? `0${hour}` : hour;
      let minute = newDate.getMinutes();
      minute = minute < 10 ? `0${minute}` : minute;
      setTime(`${day}.${month}.${year} ${hour}:${minute}`);
    }
  }, [ex_time_start]);

  const [cookies, setCookies] = useCookies([]);

  const openExcusrsion = () => {
    let uid = cookies.uid;
    let sid = cookies.sid;
    joinMe(uid, sid, ex_tid);
  };

  if (isLoading) return <Preloader />;

  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <div className={s.header__row}>
          <a className={`${s.logo} ${s.header__logo}`} href="#">
            <img
              src={logo}
              loading="lazy"
              alt="Логотип"
              width="90"
              height="70"
            />
          </a>
          <div className={s.header__img}>
            <img
              src={headerImg}
              loading="lazy"
              alt="Фото места экскурсии"
              width="398"
              height="170"
            />
          </div>
          <h1 className={s.header__title}>{ex_name}</h1>
          <div className={s.header__price}>
            Стоимость: <span id="total">{ex_h_cost} </span>₽
          </div>
          <div className={s.header__timer}>
            Время старта:{" "}
            <time className={s.header__time} dateTime={time}>
              {time}
            </time>
          </div>
          <button className={s.header__app} onClick={openExcusrsion}>
            Подключится
          </button>
          <DownloadLinks links={downloadLinks} />
        </div>
        <Social />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    ex_tid: state.auth.ex_tid,
    isJoined: state.excursion.isJoined,

    ex_name: state.excursion.ex_name,
    ex_description: state.excursion.ex_description,
    ex_time_start: state.excursion.ex_time_start,
    ex_h_cost: state.excursion.ex_h_cost,

    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps, { joinMe })(StartPage);
