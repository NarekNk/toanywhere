import React from "react";
import tg from "../images/icons/tg.svg";
import vk from "../images/icons/vk.svg";

const Social = () => {
  const social = [
    { url: "#", bgImage: vk, ariaLabel: "Ссылка на вконтакте" },
    { url: "#", bgImage: tg, ariaLabel: "Ссылка на телеграмм" },
  ];
  return (
    <div className="social">
      <span className="social__descr">Мы в соц. сетях:</span>
      <ul className="social__list">
        {social.map((item, i) => {
          return (
            <li className="social__item" key={i}>
              <a
                className="social__link"
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
  );
};

export default Social;
