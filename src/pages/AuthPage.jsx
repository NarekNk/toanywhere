import React from "react";
import Auth from "../components/Auth";
import HeaderLinks from "../components/HeaderLinks";
import Social from "../components/Social";
import Code from "../components/Code";
import { Route, Routes } from "react-router-dom";
import HeaderTop from "../sections/HeaderTop";
import Register from "../components/Register";

const AuthPage = () => {
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
            <HeaderLinks />
          </div>
          <Social />
        </div>
      </header>
    </>
  );
};

export default AuthPage;
