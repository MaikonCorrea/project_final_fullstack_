import React, { useEffect, useState } from "react";
import iconClose from "../images/icon_close.png"


export default function ModalInformation({ isOpen, onClose, handlePopup }) {
  const [shouldRenderPopup, setShouldRenderPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape" && isOpen) {
        setIsClosing(true);
        setTimeout(() => {
          setIsClosing(true);
          onClose();
        }, 200);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
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
  };

  return (
    <div
      className={`popup ${
        shouldRenderPopup ? "popup_opened" : ""
      } ${isClosing ? "popup_closing" : ""}`}
      onClick={handleOverlayClick}>
      <section className="popup__information">
        <button className="popup__information_button-close"><img src={iconClose} alt="botão de fechar popup" onClick={handleOverlayClick}></img></button>
        <p className="popup__information_paragraph">
          Cadastro concluído com sucesso!
        </p>
        <button className="popup__button_enter" onClick={handlePopup}
      >Entrar</button>
      </section>
    </div>
  );
}
