import React, { useState } from "react";
import NewsCard from "./NewsCard";

export default function NewsCardList({
  keyword,
  news,
  isLoggedIn,
  handleNewsItem,
  savedNews,
}) {
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

  const hasNews = Array.isArray(news) && news.length > 0;
  const filteredArticles = hasNews
    ? news.filter(
        (article) =>
          article.source.name !== null &&
          article.title !== null &&
          article.description !== null &&
          article.url !== null &&
          article.urlToImage !== null
      )
    : [];

  const handleLoadMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 3);
  };

  return (
    <>
      {hasNews && (
        <section className="newsCardList">
          <h3 className="newsCardList__title">Procurar resultados</h3>
          <ul className="gallery">
            {filteredArticles
              .slice(0, visibleNewsCount)
              .map((article, index) => (
                <NewsCard
                  key={index}
                  news={{ ...article, keyword: keyword }}
                  isLoggedIn={isLoggedIn}
                  handleNewsItem={handleNewsItem}
                  savedNews={savedNews}
                />
              ))}
          </ul>
          {filteredArticles.length > visibleNewsCount && (
            <button className="newsCardList__button" onClick={handleLoadMore}>
              Mostrar mais
            </button>
          )}
        </section>
      )}
    </>
  );
}
