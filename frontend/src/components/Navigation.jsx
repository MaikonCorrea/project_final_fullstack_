import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import iconLogoutBlack from "../images/icon_logout_black.png";
import iconLogoutWhite from "../images/icon_logout_white.png";
import iconMenuMobileWhite from "../images/icon_menu_mobile_white.png";
import iconMenuMobileBlack from "../images/icon_menu_mobile_black.png";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Navigation({ handlePopup, isLoggedIn, onLogout, openMenuMobile }) {
  const location = useLocation();

  const currentUser = React.useContext(CurrentUserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stateScreen, setStateScreen] = useState(window.innerWidth <= 560);
  const isSavedNewsRoute = location.pathname === "/saved-news";

  useEffect(() => {
    function handleResize() {
      setStateScreen(window.innerWidth <= 560);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
    openMenuMobile()
  }

  return (
    <>
      <nav
        className={`nav ${isSavedNewsRoute ? "nav--article" : ""}`}
        id="navigation"
      >
        <h2
          className={`nav__title ${
            isSavedNewsRoute ? "nav__title--article" : ""
          }`}
        >
          NewsExplorer
        </h2>
        {stateScreen && (
          <button className="nav__button_toggle" onClick={toggleMenu}>
            <img
              src={
              isSavedNewsRoute
                    ? iconMenuMobileBlack
                    : iconMenuMobileWhite
              }
              alt="botão de menu sanduiche"
            />
          </button>
        )}
        <div
          className={`nav__container ${
            stateScreen ? "nav__container--mobile" : ""
          }`}
        >
          <Link
            className={`nav__link nav__link--home ${
              isSavedNewsRoute
                ? "nav__link--article"
                : "nav__link--active-white"
            }`}
            to="/"
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              className={`nav__link ${
                isSavedNewsRoute
                  ? "nav__link--article nav__link--active-black"
                  : ""
              }`}
              to="/saved-news"
            >
              Artigos salvos
            </Link>
          )}
          {isLoggedIn ? (
            <button
              className={`nav__button_open ${
                isSavedNewsRoute ? "nav__button_open--article" : ""
              }`}
              onClick={onLogout}
              title="Logout"
            >
              {currentUser.name}
              <img
                className="nav__button__image-logout"
                src={
                  location.pathname === "/saved-news"
                    ? iconLogoutBlack
                    : iconLogoutWhite
                }
                alt="imagem de logout"
              />
            </button>
          ) : (
            <button
              className="nav__button_open"
              onClick={handlePopup}
              title="Login"
            >
              Entrar
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
