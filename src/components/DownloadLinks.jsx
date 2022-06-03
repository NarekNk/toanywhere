import React from "react";

const DownloadLinks = ({ links }) => {
  const downloadLinks = links.map((item, i) => {
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
  return <ul className="header__links">{downloadLinks}</ul>;
};

export default DownloadLinks;
