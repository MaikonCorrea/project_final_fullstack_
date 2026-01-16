import React from "react";



export default function Preloader() {

  return (
    <div className="preloader">
     <div className="preloader__search">
        <div className="preloader__circulo">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="preloader__search-paragraph">Procurando notícias...</p>
      </div>
    </div>
  );
}
