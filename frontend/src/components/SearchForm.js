import React, { useState } from "react";

export default function SearchForm({ textSubmit }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (text !== "") {
    } else {
      alert("digite um tema para pesquisar");
    }
    return textSubmit(text);
  }

  return (
    <div className="searchForm__container">
      <h1 className="searchForm__container_title">
        O que está acontecendo no mundo?
      </h1>
      <p className="searchForm__container_paragraph">
        Encontre as últimas notícias sobre qualquer tema e salve elas em sua
        conta pessoal
      </p>
      <form className="searchForm">
        <input
          className="searchForm__input"
          type="text"
          placeholder="Inserir tema"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          className="searchForm__button"
          type="submit"
          onClick={handleSubmit}
        >
          Procurar
        </button>
      </form>
    </div>
  );
}
