import React from "react";

import imageNotfaund from "../images/image_notfound.png";

export default function NotFound() {
    return(
        <>
         <div className="notfound">
          <img
            className="notfound__image"
            src={imageNotfaund}
            alt="imagem de uma lupa triste"
          ></img>
          <h3 className="notfound__title">Nada encontrado</h3>
          <p className="notfound__paragraph">
            Desculpe, mas nada corresponde aos seus termos de pesquisa.
          </p>
        </div>
        </>
    )
}