import React from "react";
import appstore from "../images/icons/appstore.svg";
import awJoin from "../images/icons/aw-join.svg";
import google from "../images/icons/google.svg";
import Auth from "../components/Auth";
import Social from "../components/Social";
import Code from "../components/Code";
import { Route, Routes } from "react-router-dom";
import HeaderTop from "../sections/HeaderTop";
import Register from "../components/Register";
import DownloadLinks from "../components/DownloadLinks";

const AuthPage = () => {
  const links = [
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
  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__row">
            <HeaderTop />
            <Routes>
              <Route path="/entercode" element={<Code />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Auth />} />
            </Routes>
            <DownloadLinks links={links} />
          </div>
          <Social />
        </div>
      </header>
    </>
  );
};

export default AuthPage;
