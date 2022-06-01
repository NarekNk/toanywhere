import React from "react";
import logo from "../../images1/logo.svg";
import appstore from "../../images/icons/appstore.svg";
import google from "../../images/icons/google.svg";
import headerImg from "../../images2/header-img.jpg";
import Social from "../../components/Social";
import s from "./StartPage.module.css";

const StartPage = () => {
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
          <h1 className={s.header__title}>Экскурсия по Москве</h1>
          <div className={s.header__price}>
            Стоимость: <span id="total">400 </span>₽
          </div>
          <div className={s.header__timer}>
            Время старта:{" "}
            <time className={s.header__time} datetime="2022-11.05 13:40">
              11.05.2022 13:40
            </time>
          </div>
          <a className={s.header__app} href="#" target="_blank">
            Подключится
          </a>
          <ul className={s.header__links}>
            {downloadLinks.map((item, i) => {
              return (
                <li className={s.header__item} key={i}>
                  <a
                    className={s.header__link}
                    href={item.url}
                    target="_blank"
                    aria-label={item.ariaLabel}
                    style={{ backgroundImage: `url(${item.bgImage})` }}
                  ></a>
                </li>
              );
            })}
          </ul>
        </div>
        <Social />
      </div>
    </header>
  );
};

export default StartPage;
