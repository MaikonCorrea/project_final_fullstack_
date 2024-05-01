import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import iconLogoutWhite from "../images/icon_logout_white.png";
import iconClose from "../images/icon_close.png";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function MenuPopup({
  isLoggedIn,
  handlePopup,
  onLogout,
  onClose,
  isOpen,
}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [shouldRenderPopup, setShouldRenderPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    function handleResizeOrEscape(event) {
      if ((event.type === "resize" && window.innerWidth > 560 && isOpen) ||
          (event.type === "keydown" && event.key === "Escape" && isOpen)) {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
        }, 150);
      }
    }
  
    window.addEventListener("resize", handleResizeOrEscape);
    document.addEventListener("keydown", handleResizeOrEscape);
  
    return () => {
      window.removeEventListener("resize", handleResizeOrEscape);
      document.removeEventListener("keydown", handleResizeOrEscape);
    };
  }, [isOpen, onClose]);
  

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);

      const timeoutId = setTimeout(() => {
        setShouldRenderPopup(true);
      }, 150);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setIsClosing(true);
      setShouldRenderPopup(false);

      const timeoutId = setTimeout(() => {
        setIsClosing(false);
      }, 150);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      event.preventDefault();
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 150);
    }
  }
  return (
    <div
      className={`menu ${shouldRenderPopup ? "popup_opened" : ""} ${
        isClosing ? "popup_closing" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div className="menu-popup">
        <div className="menu-popup__container">
          <h2 className="menu-popup__title">NewsExplorer</h2>
          <button className="menu-popup__button-close" >
            <img src={iconClose} alt="botão de fechar" onClick={handleOverlayClick}></img>
          </button>
        </div>
        <div className="menu-popup__container-link">
          <Link className="menu-popup__link menu-popup__link--home" to="/" onClick={onClose}>
            Home
          </Link>
          {isLoggedIn && (
            <Link className="menu-popup__link menu-popup__link--article" to="/saved-news" onClick={onClose}>
              Artigos salvos
            </Link>
          )}
          {isLoggedIn ? (
            <button
              className="menu-popup__button_open"
              onClick={onLogout}
              title="Logout"
            >
              {currentUser.name}
              <img
                className="menu-popup__button__image-logout"
                src={iconLogoutWhite}
                alt="imagem de logout"
              />
            </button>
          ) : (
            <button
              className="menu-popup__button_open"
              onClick={handlePopup}
              title="Login"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
