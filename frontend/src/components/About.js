import React from "react";

import imageAbout from "../images/image_about.png";

export default function About() {
  return (
    <>
      <section className="about">
        <img
          src={imageAbout}
          alt="imagem do desenvolvedor da página"
          className="about__image"
        ></img>
        <article className="about__description">
          <h3 className="about__title">Sobre o autor</h3>
          <p className="about__paragraph">
           Meu nome é Maikon Corrêa, e sou um desenvolvedor web apaixonado por criar soluções inovadoras. Tenho experiência em HTML, CSS, JavaScript, React, Node.js e MongoDB. Tenho me dedicado em aprimorar minhas habilidades e utilizar as melhores metodologias.
          </p>
          <p className="about__paragraph">
            Minha experiência no BootCamp TripleTen, foi muito satisfatória e me ajudou no meu desenvolvimento profissional, me direcionando nas melhores práticas e na importância da usabilidade e da experiência do usuário no desenvolvimento dos projetos. 
          </p>
        </article>
      </section>
    </>
  );
}
