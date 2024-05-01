import React, { useEffect, useState } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

export default function SavedNewsHeader({ count, sourceNameCounts }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [keywordsText, setKeywordsText] = useState("");

  useEffect(() => {
    const sourceNames = Object.keys(sourceNameCounts);
    const totalSources = sourceNames.length;
    const maxSources = 3;

    if (totalSources <= maxSources) {
      setKeywordsText(sourceNames.join(", "));
    } else {
      setKeywordsText(sourceNames.slice(0, maxSources - 1).join(", ") + ", e mais " + (totalSources - maxSources + 1) + " outras");
    }
  }, [sourceNameCounts]);

  return (
    <>
      <article className="article">
        <h3 className="article__title">Artigos salvos</h3>
        <p className="article__paragraph">
          {currentUser.name}, você tem {count} artigos salvos
        </p>
        <p className="article__keywords">Por palavras-chave: {keywordsText}</p>
      </article>
    </>
  );
}
