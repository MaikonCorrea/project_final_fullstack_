import React, { useState, useEffect } from "react";

export default function ModalWithForm({
  registerUser,
  loginUser,
  isOpen,
  onClose,
  isSignUpForm,
  toggleSignUpForm,
  errorMessage,
  clearError
}) {
  const [shouldRenderPopup, setShouldRenderPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isEmailEditing, setIsEmailEditing] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape" && isOpen) {
        setIsClosing(true);
        setTimeout(() => {
          setIsClosing(true);
          onClose();
        }, 200);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  function handleEmailFocus() {
    setIsEmailEditing(true);
  }

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

  async function handleSubmit(e) {
    e.preventDefault();
   setEmailError(errorMessage)
    if (!isSignUpForm) {
      registerUser(email, password, name);
    } else {
      loginUser(email, password);
    }
  }



  function validateEmail(emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  }

  function validatePassword(passwordInput) {
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(passwordInput);
  }

  function validateName(nameInput) {
    const nameRegex = /^.{3,}$/;
    return nameRegex.test(nameInput);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      if (isEmailEditing) {
        clearError("");
      }
      setEmailError(
        value.trim() === "" || validateEmail(value)
          ? ""
          : "Digite um endereço de e-mail válido!"
      );
    } else if (name === "password") {
      setPassword(value);
      setPasswordError(
        value.trim() === "" || validatePassword(value)
          ? ""
          : "A senha deve conter no mínimo 8 caracteres"
      );
    } else if (name === "name") {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setName(capitalizedValue);
      setNameError(
        value.trim() === "" || validateName(value)
          ? ""
          : "Deve ter no mínimo 3 caracteres"
      );
    }
  }
  return (
    <section
      className={`popup ${shouldRenderPopup ? "popup_opened" : ""} ${
        isClosing ? "popup_closing" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <form
        className={`popup__form ${isSignUpForm ? "popup__form--small" : ""}`}
      >
        <button
          className="popup__button_close"
          onClick={handleOverlayClick}
        ></button>
        <h2 className="popup__title">
          {!isSignUpForm ? "Inscrever-se" : "Entrar"}
        </h2>
        <div className="popup__container">
          <label className="popup__label">E-mail</label>
          <span className="span">{emailError}{errorMessage}</span> 
          <input
            className="popup__input"
            placeholder="Insira o e-mail"
            type="email"
            name="email"
            value={email}
            onFocus={handleEmailFocus}
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange(e);
            }}
          />
        </div>
        <div className="popup__container">
          <label className="popup__label">Senha</label>
          <span className="span">{passwordError}</span>
          <input
            className="popup__input"
            placeholder="Insira a senha"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleChange(e);
            }}
          />
        </div>
        {!isSignUpForm && (
          <div className="popup__container">
            <label className="popup__label">Nome do usuário</label>
            <span className="span">{nameError}</span>
            <input
              className="popup__input"
              placeholder="Insira seu nome de usuário"
              type="name"
              name="name"
              value={name}
              maxLength={6}
              onChange={(e) => {
                setName(e.target.value);
                handleChange(e);
              }}
            />
          </div>
        )}
        <div>
          <button
            className={`popup__button-confirm ${
              emailError ||
              passwordError ||
              nameError ||
              email === "" ||
              password === "" ||
              (name === "" && !isSignUpForm)
                ? "popup__button-confim--disabled"
                : ""
            }`}
            onClick={handleSubmit}
          >
            {!isSignUpForm ? "Criar conta" : "Entrar"}
          </button>
          <p className="popup__paragraph_link">
            ou
            <button
              className="popup__link"
              onClick={toggleSignUpForm}
            >
              {!isSignUpForm ? "Entrar" : "Criar conta"}
            </button>
          </p>
        </div>
      </form>
    </section>
  );
}
