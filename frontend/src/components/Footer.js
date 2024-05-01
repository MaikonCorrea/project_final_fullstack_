import React from "react";
import { Link, useHistory } from "react-router-dom";
import iconGithub from "../images/icon_github.png";
import iconLinkedin from "../images/icon_linkedin.png";

function Footer() {

  const history = useHistory();

  function scrollToTopAndRedirect(event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    history.push("/");
  }

  return (
    <>
      <footer className="footer">
        <p className="footer__copyrigth">©2024 NewsExplorer</p>
        <section className="footer__container">
          <div className="footer__links">
          <Link className="footer__container_link" onClick={scrollToTopAndRedirect} to="/">Home</Link>
            <a
              className="footer__container_link"
              href="https://tripleten.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TripleTen
            </a>
          </div>
          <div className="footer__icons">
            <a
              href="https://github.com/MaikonCorrea"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="footer__container_button"
                src={iconGithub}
                alt="icone do github"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/maikon-correa-9a5407264/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="footer__container_button"
                src={iconLinkedin}
                alt="icone do linkedin"
              />
            </a>
          </div>
        </section>
      </footer>
    </>
  );
}

export default Footer;
