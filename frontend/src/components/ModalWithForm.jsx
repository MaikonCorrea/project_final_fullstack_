import { useState, useEffect } from "react";

export default function ModalWithForm({
  registerUser,
  loginUser,
  isOpen,
  onClose,
  isSignUpForm,
  toggleSignUpForm,
  errorMessage,
  clearError,
}) {
  // --- Estados de UI ---
  const [shouldRenderPopup, setShouldRenderPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);

  // --- Estados do Formulário ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- Estados de Erro ---
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // --- Checklist Visual ---
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
    match: false,
  });

  // Fecha o modal com ESC
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape" && isOpen) {
        closePopup();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Lógica de abertura e fechamento
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      const timeoutId = setTimeout(() => setShouldRenderPopup(true), 150);
      return () => clearTimeout(timeoutId);
    } else {
      setIsClosing(true);
      setShouldRenderPopup(false);
      const timeoutId = setTimeout(() => setIsClosing(false), 150);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  function closePopup() {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closePopup();
    }
  }

  function handleEmailFocus() {
    setIsEmailEditing(true);
  }

  // --- FUNÇÕES DE VALIDAÇÃO ---
  function validateEmail(emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  }

  function validateName(nameInput) {
    const nameRegex = /^.{3,}$/;
    return nameRegex.test(nameInput);
  }

  // Validação completa para o checklist
  function checkPasswordStrength(passwordInput, confirmInput) {
    return {
      length: passwordInput.length >= 8,
      upper: /[A-Z]/.test(passwordInput),
      lower: /[a-z]/.test(passwordInput),
      number: /\d/.test(passwordInput),
      special: /[\W_]/.test(passwordInput),
      match: passwordInput === confirmInput && passwordInput !== "",
    };
  }

  // --- HANDLER PRINCIPAL ---
  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      if (isEmailEditing) clearError("");
      setEmailError(
        value.trim() === "" || validateEmail(value)
          ? ""
          : "Digite um endereço de e-mail válido!"
      );
    } 
    else if (name === "password") {
      setPassword(value);
            const criteria = checkPasswordStrength(value, confirmPassword);
      setPasswordCriteria(criteria);
      setPasswordError(
         criteria.length && criteria.upper && criteria.lower && criteria.number && criteria.special 
         ? "" 
         : "A senha não atende aos requisitos."
      );
      if (confirmPassword && value !== confirmPassword) {
        setConfirmPasswordError("As senhas devem ser iguais");
        setPasswordCriteria(prev => ({...prev, match: false}));
      } else if (confirmPassword && value === confirmPassword) {
        setConfirmPasswordError("");
        setPasswordCriteria(prev => ({...prev, match: true}));
      }

    } 
    else if (name === "confirmPassword") {
      setConfirmPassword(value);
      const match = value === password;
      setPasswordCriteria((prev) => ({ ...prev, match: match && value !== "" }));
      setConfirmPasswordError(match ? "" : "As senhas devem ser iguais");
    } 
    else if (name === "name") {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setName(capitalizedValue);
      setNameError(
        value.trim() === "" || validateName(value)
          ? ""
          : "Deve ter no mínimo 3 caracteres"
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isSignUpForm) { 
       const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
       if(!allCriteriaMet) return; 
       registerUser(email, password, name);
    } else {
       loginUser(email, password);
    }
  }
  const isFormValid = !isSignUpForm 
    ? ( 
        !emailError && email !== "" &&
        !nameError && name !== "" &&
        Object.values(passwordCriteria).every(Boolean)
      )
    : ( 
        !emailError && email !== "" &&
        password !== ""
      );

  return (
    <section
      className={`popup ${shouldRenderPopup ? "popup_opened" : ""} ${
        isClosing ? "popup_closing" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <form className={`popup__form ${isSignUpForm ? "popup__form--small" : ""}`}>
        <button
          className="popup__button_close"
          type="button"
          onClick={closePopup}
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
            onChange={handleChange}
            required
          />
        </div>
        {!isSignUpForm && (
          <div className="popup__container">
            <label className="popup__label">Nome do usuário</label>
            <span className="span">{nameError}</span>
            <input
              className="popup__input"
              placeholder="Insira seu nome de usuário"
              type="text"
              name="name"
              value={name}
              maxLength={20}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="popup__container">
          <label className="popup__label">Senha</label>
          <input
            className="popup__input"
            placeholder="Insira a senha"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        {!isSignUpForm && (
          <>
            <div className="popup__container">
              <label className="popup__label">Confirmar Senha</label>
              <span className="span">{confirmPasswordError}</span>
              <input
                className="popup__input"
                placeholder="Confirme a senha"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <ul className="popup__checklist">
                <li className="popup__checklist-item" style={{ color: passwordCriteria.length ? "green" : "#b0b0b0" }}>
                  {passwordCriteria.length ? "✔" : "○"} Mínimo 8 caracteres
                </li>
                <li className="popup__checklist-item" style={{ color: passwordCriteria.upper ? "green" : "#b0b0b0" }}>
                  {passwordCriteria.upper ? "✔" : "○"} Letra Maiúscula
                </li>
                <li className="popup__checklist-item" style={{ color: passwordCriteria.lower ? "green" : "#b0b0b0" }}>
                  {passwordCriteria.lower ? "✔" : "○"} Letra Minúscula
                </li>
                <li className="popup__checklist-item" style={{ color: passwordCriteria.number ? "green" : "#b0b0b0" }}>
                  {passwordCriteria.number ? "✔" : "○"} Número
                </li>
                <li className="popup__checklist-item" style={{ color: passwordCriteria.special ? "green" : "#b0b0b0" }}>
                  {passwordCriteria.special ? "✔" : "○"} Símbolo (!@#)
                </li>
                <li className="popup__checklist-item" style={{ color: passwordCriteria.match ? "green" : "#b0b0b0" }}>
                  {passwordCriteria.match ? "✔" : "○"} Senhas iguais
                </li>
            </ul>
          </>
        )}

        <div>
          <button
            type="submit"
            className={`popup__button-confirm ${
              !isFormValid ? "popup__button-confim--disabled" : ""
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            {!isSignUpForm ? "Criar conta" : "Entrar"}
          </button>
          
          <p className="popup__paragraph_link">
            ou
           <button
  type="button"
  className="popup__link"
  onClick={(e) => {
      setEmail(""); 
      setPassword(""); 
      setName(""); 
      setConfirmPassword("");
      setPasswordCriteria({
        length:false, upper:false, lower:false, number:false, special:false, match:false
      });
      toggleSignUpForm(e);
  }}
>
  {!isSignUpForm ? "Entrar" : "Criar conta"}
</button>
          </p>
        </div>
      </form>
    </section>
  );
}