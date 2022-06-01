import React from "react";
import logo from "../images1/logo.svg";
import gulp from "../images1/guid-img.jpg";
import rating from "../images1/icons/rating.svg";
import appstore from "../images/icons/appstore.svg";
import google from "../images/icons/google.svg";
import Social from "../components/Social";

const RatePage = () => {
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
    <header className="header">
      <div className="rateContainer">
        <div className="layout">
          <div className="ratingTop">
            <a className="logo header__logo" href="#">
              <img
                src={logo}
                loading="lazy"
                alt="Логотип"
                width="90"
                height="70"
              />
            </a>
            <h1 className="header__title">Завершение путешествия!</h1>
          </div>
          <div className="guideImg">
            <img src={gulp} loading="lazy" alt="Фото гида" />
          </div>
          <div className="guideName">Ник гида</div>
          <h2 className="ratingSubtitle">Оцените вашего гида</h2>
          <div className="header__raiting rating">
            <img src={rating} alt="Рейтинг" />
          </div>
          <button className="saveTour">Сохранить путешествие</button>
          <ul className="header__links">
            {downloadLinks.map((item, i) => {
              return (
                <li className="header__item" key={i}>
                  <a
                    className="header__link"
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

export default RatePage;
