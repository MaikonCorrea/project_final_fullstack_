import React, { useEffect, useState } from "react";
import SavedNewsHeader from "./SavedNewsHeader";
import NewsCard from "./NewsCard";
import Navigation from "./Navigation";

export default function SavedNews({ news, isLoggedIn, onLogout, handleDeletNews, openedPopup, openMenuMobile }) {

  const hasNews = Boolean(news && news.length);
  const [renderedNewsCount, setRenderedNewsCount] = useState(0);
  const [sourceNameCounts, setSourceNameCounts] = useState({});
  const [differentSourceCount, setDifferentSourceCount] = useState(0);
  

  useEffect(() => {
      setRenderedNewsCount(news.length);
      const counts = {};
      
      let differentCount = 0;
      news.forEach((item) => {
        counts[item.keyword] = (counts[item.keyword] || 0) + 1;
      });
      
      differentCount = Object.keys(counts).length;
      setSourceNameCounts(counts);
      setDifferentSourceCount(differentCount);
  }, [news]);
 

  return (
    <>
      <Navigation handlePopup={openedPopup} isLoggedIn={isLoggedIn} onLogout={onLogout} openMenuMobile={openMenuMobile}/>
      <SavedNewsHeader
        count={renderedNewsCount}
        sourceNameCounts={sourceNameCounts}
        differentSourceCount={differentSourceCount}
      />
      {hasNews && (
        <ul className="gallery">
          {news.map((article, index) => (
            <NewsCard key={index} news={article} handleDeletNews={handleDeletNews} />
          ))}
        </ul>
      )}
    </>
  );
}
