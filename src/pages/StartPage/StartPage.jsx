import React, { useEffect, useMemo } from "react";
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

const StartPage = ({
  isJoined,
  joinMe,
  ex_tid,
  ex_name,
  ex_h_cost,
  ex_start_time,
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
  const [cookies, setCookies] = useCookies([]);
  // useEffect(() => {
  // let uid = cookies.uid;
  // let sid = cookies.sid;

  //   if (!isJoined) {
  //     // joinMe(uid, sid, ex_tid);
  //   }
  // }, []);

  const openExcusrsion = () => {
    let uid = cookies.uid;
    let sid = cookies.sid;
    joinMe(uid, sid, ex_tid);
  };

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
          {/* <h1 className={s.header__title}>Экскурсия по Москве</h1> */}
          <h1 className={s.header__title}>{ex_name}</h1>
          <div className={s.header__price}>
            {/* Стоимость: <span id="total">400 </span>₽ */}
            Стоимость: <span id="total">{ex_h_cost} </span>₽
          </div>
          <div className={s.header__timer}>
            Время старта:{" "}
            <time className={s.header__time} dateTime="2022-11.05 13:40">
              {/* 11.05.2022 13:40 */}
              {ex_start_time}
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
    ex_start_time: state.excursion.ex_start_time,
    ex_h_cost: state.excursion.ex_h_cost,
  };
};

export default connect(mapStateToProps, { joinMe })(StartPage);
