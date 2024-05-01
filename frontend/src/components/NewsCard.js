import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import iconDelete from "../images/icon_delete.png";
import iconSave from "../images/icon_save.png";
import iconSaved from "../images/icon_saved.png";

export default function NewsCard({
  handleNewsItem,
  isLoggedIn,
  savedNews,
  handleDeletNews,
  ...props
}) {
  const [showactionConfirm, setShowactionConfirm] = useState(false);
  const [buttonImage, setButtonImage] = useState(null);
  const [buttonText, setButtonText] = useState("");
  const location = useLocation();

  const formatarData = (originalDate) => {
    const date = new Date(originalDate);
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return `${date.getUTCDate()} de ${
      months[date.getUTCMonth()]
    } de ${date.getUTCFullYear()}`;
  };

  useEffect(() => {
    if (location.pathname === "/saved-news") {
      setButtonImage(iconDelete);
    } else if (!isLoggedIn) {
      setButtonImage(iconSave);
      setButtonText("Faça login para salvar");
    } else if (isLoggedIn) {
      if (isSaved()) {
        setButtonImage(iconSaved);
      } else {
        setButtonImage(iconSave);
      }
    }
  }, [location.pathname, isLoggedIn, props.news.url, savedNews]);

  const isSaved = () => {
    return savedNews.some((item) => item.url === props.news.url);
  };

  const handleButtonClick = (newsItem) => {
    if (location.pathname === "/saved-news") {
      handleDeletNews(newsItem._id);
    } else if (isLoggedIn) {
      const {
        source: { name: sourceName },
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        keyword,
      } = newsItem;
      const filteredNewsItem = {
        fonte: sourceName,
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        keyword,
      };
      handleNewsItem(filteredNewsItem);
    }
  };

  return (
    <>
      <li className="news" key={props.news._id}>
        <img
          src={props.news.urlToImage}
          alt="imagem de notícia"
          className="news__container-image"
        />
        {location.pathname === "/saved-news" && (
          <p className="news__article-classification">
            {props.news.keyword}
          </p>
        )}
        {showactionConfirm && (
          <span className="news__action_confirm">{buttonText}</span>
        )}

        <button
          className="news__button_action"
          onMouseEnter={() => {
            if (!isLoggedIn && location.pathname !== "/saved-news") {
              setShowactionConfirm(true);
            }
          }}
          onMouseLeave={() => {
            if (!isLoggedIn && location.pathname !== "/saved-news") {
              setShowactionConfirm(false);
            }
          }}
          onClick={() => {
            if (buttonImage !== iconSaved) {
              handleButtonClick(props.news, props.keyword);
            }
          }}
        >
          <img src={buttonImage} alt="icone de salvar ou deletar" />
        </button>
        <a href={props.news.url} target="_blank" rel="noopener noreferrer">
          <div className="news__container">
            <p className="news__container-description_date">
              {formatarData(props.news.publishedAt)}
            </p>

            <h3 className="news__container-description_title">
              {props.news.title}
            </h3>
            <p className="news__container-description_paragraph">
              {props.news.description}
            </p>
            <p className="news__container-description_news-source">
              {props.news.fonte || props.news.source.name}
            </p>
          </div>
        </a>
      </li>
    </>
  );
}
