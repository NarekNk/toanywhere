import React from "react";
import appstore from "../images/icons/appstore.svg";
import awJoin from "../images/icons/aw-join.svg";
import google from "../images/icons/google.svg";

const HeaderLinks = () => {
  const headerItems = [
    { url: "#", ariaLabel: "Ссылка на скачивание приложения", bgImage: awJoin },
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

  const headerLinks = headerItems.map((item, i) => {
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
  });
  return <ul className="header__links">{headerLinks}</ul>;
};

export default HeaderLinks;
