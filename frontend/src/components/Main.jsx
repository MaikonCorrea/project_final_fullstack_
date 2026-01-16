import React, { useEffect, useState } from "react";
import About from "./About";
import NewsCardList from "./NewsCardList";

export default function Main({ keyword, newsSearch, isLoggedIn, handleNewsItem, savedNews }) {
  const [isNewsSearch, setIsNewsSearch] = useState(false);

  useEffect(() => {
    setIsNewsSearch(newsSearch.length > 0);
  }, [newsSearch]);

  return (
    <>
      {isNewsSearch && (
        <NewsCardList keyword={keyword} 
        news={newsSearch}
        isLoggedIn={isLoggedIn}
        handleNewsItem={handleNewsItem}
        savedNews={savedNews}
        />
      )}
      <About />
    </>
  );
}
