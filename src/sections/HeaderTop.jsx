import React from "react";
import logo from "../images/logo.svg";
import headerImg from "../images/header-img.jpg";

const HeaderTop = () => {
  return (
    <>
      <div className="header__top">
        <a className="logo header__logo" href="/">
          <img src={logo} loading="lazy" alt="Логотип" width="70" height="50" />
        </a>
        <h2 className="header__title">Бухара. Прогулка по Ляб-и Хауз</h2>
      </div>
      <div className="header__inner">
        <div className="header__img">
          <img
            src={headerImg}
            loading="lazy"
            alt="Бухара. Прогулка по Ляб-и Хауз"
            width="665"
            height="315"
          />
        </div>
        <div className="header__right">
          <div className="header__box">
            <span className="header__descr">
              Время начала (местное время гида):
            </span>
            <time className="header__time" dateTime="2022-04-16 14:00">
              2022-04-16 14:00
            </time>
          </div>
          <div className="header__box">
            <span className="header__price">
              <span>Стоимость:</span> 220.00 RUB
            </span>
            <p className="header__text">
              На этом стриме мы с вами прогуляемся по Котельнической набережной,
              поговорим об истории высотки на Котельнической, узнаем, что думали
              и писали современники.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
