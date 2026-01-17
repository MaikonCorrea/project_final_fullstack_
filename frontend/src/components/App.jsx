import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  withRouter,
  useHistory,
  Redirect,
} from "react-router-dom";
import Header from "./Header";
import Preloader from "./Preloader";
import NotFound from "./NotFound";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ModalInformation from "./ModalInformation";
import clientMainApi from "../utils/MainApi";
import clientNewsApi from "../utils/NewsApi";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentNewsCardContext from "../contexts/CurrentNewsCardContext";
import "../index.css";
import SavedNews from "./SavedNews";
import MenuPopup from "./MenuPopup";

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState(false);
  const [isPopupInformation, setIsPopupInformation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [newsSearch, setNewsSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [menuOpen, setMeuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    if (token !== null) {
      clientMainApi.getUsers().then((users) => {
        setCurrentUser(users);
      });
      clientMainApi.getNewsCard().then((news) => {
        setNewsList(news);
      });
      handleTokenCheck();
    }
  }, []);

  async function handleTokenCheck() {
    try {
      const response = await auth.checkToken(token);
      if (response.status === 201) {
        setIsLoggedIn(true);
        history.push("/");
      } else {
        console.log("O status da resposta não é 201:", response.status);
      }
    } catch (error) {
      console.log("Error no check token jwt:", error);
    }
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  async function handleLogin() {
    const token = localStorage.getItem("jwt");
    closeAllPopups();
    setIsLoggedIn(true);
    await clientMainApi.getNewsCard(token).then((news) => {
      setNewsList(news);
    });
    await clientMainApi.getUsers(token).then((users) => {
      setCurrentUser(users);
    });
  }

  async function registerUser(email, password, name) {
    try {
      const response = await auth.register({ email, password, name });
      if (response.ok) {
        setIsPopupLoginOpen(false);
        setIsPopupInformation(true);
      } else {
        if (response.status === 400) {
          console.log(
            "Um dos campos foi preenchido incorretamente:",
            response.status
          );
        } else if (response.status === 401) {
          alert("Não autorizado: Verifique suas credenciais.", response.status);
        } else if (response.status === 409) { 
          setErrorMessage("E-mail já cadastrado");
        }
      }
    } catch (error) {
      console.error("Ocorreu um erro no servidor", error.message);
    }
  }

  async function loginUser(email, password) {
    try {
      let response = await auth.authorize({ email, password });
      console.log(response);
      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }
      response = await response.json();
      if (response.token) {
        const expirationTimeInHours = 24;
        const expirationTimeInMilliseconds =
          expirationTimeInHours * 60 * 60 * 1000;
        const token = response.token;
        localStorage.setItem("jwt", token);
        handleLogin();
        setTimeout(() => {
          localStorage.removeItem("jwt");
          handleLogout();
          setToken(null);
          history.push("/");
        }, expirationTimeInMilliseconds);
        history.push("/");
      }
    } catch (error) {
      console.error("Erro no login:", error.message);
    }
  }

  function handleAddNewsList(newsItem) {
    clientMainApi
      .createNewsCards(newsItem, localStorage.getItem("jwt"))
      .then((newNews) => {
        setNewsList([newNews, ...newsList]);
      });
  }
  
  async function handleSearchNews(text) {
    setIsLoading(true);
    setKeyword(text);
    try {
      const res = await clientNewsApi.getSearchNews(text);
      if (res.length === 0) {
        setIsNotFound(true);
        setNewsSearch("");
      } else { 
        setNewsSearch(res);
        setIsNotFound(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error);
        console.error("Erro de solicitação inválida:", error.message);
      } else if (error.response && error.response.status === 500) {
        console.log(error);
        console.error("Erro interno do servidor:", error.message);
      } else {
        console.log(error);
        console.error("Ocorreu um erro:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  
  function handleDeletNews(id) {
    clientMainApi.deleteNews(id, localStorage.getItem("jwt")).then(() => {
      const updatedNews = newsList.filter((c) => c._id !== id);
      setNewsList(updatedNews);
    });
  }

  function closeAllPopups() {
    setIsPopupLoginOpen(false);
    setIsPopupInformation(false);
    setMeuOpen(false)
  }

  function toggleSignUpForm(e) {
    e.preventDefault();
    setIsSignUpForm(!isSignUpForm);
  }

  function handlePopup() {
    setIsPopupLoginOpen(true);
    setIsPopupInformation(false);
    setIsSignUpForm(true);
  }

  function handleNewsItem(newsItem) {
    handleAddNewsList(newsItem);
  }

  function openMenuMobile() {
    setMeuOpen(true);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentNewsCardContext.Provider value={newsList}>
          {history.location.pathname !== "/saved-news" && (
            <Header
              openedPopup={handlePopup}
              textSubmit={handleSearchNews}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              openMenuMobile={openMenuMobile}
            />
          )}
          <ModalWithForm
            isOpen={isPopupLoginOpen}
            onClose={closeAllPopups}
            loginUser={loginUser}
            registerUser={registerUser}
            isSignUpForm={isSignUpForm}
            toggleSignUpForm={toggleSignUpForm}
            errorMessage={errorMessage}
            clearError={() => {
              setErrorMessage("")
            }}
          />
          {isPopupInformation && (
            <ModalInformation 
            isOpen={isPopupInformation} 
            onClose={closeAllPopups}
            handlePopup={handlePopup}        
          />
          )}
          {menuOpen &&( 
            <MenuPopup 
            isOpen={menuOpen}
            handlePopup={handlePopup}
              onLogout={handleLogout}
              onClose={closeAllPopups}
              isLoggedIn={isLoggedIn}
            />
          )}
          <Switch>
            <Route exact path="/">
              {isLoading && <Preloader />}
              {isNotFound && <NotFound />}
              <Main
                keyword={keyword}
                newsSearch={newsSearch}
                isLoggedIn={isLoggedIn}
                handleNewsItem={handleNewsItem}
                savedNews={newsList}
              />
            </Route>
            <Route path="/saved-news">
              {isLoggedIn ? (
                <SavedNews
                  news={newsList}
                  openedPopup={handlePopup}
                  isLoggedIn={isLoggedIn}
                  onLogout={handleLogout}
                  handleDeletNews={handleDeletNews}
                  openMenuMobile={openMenuMobile}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Redirect to="/" />
          </Switch>
          <Footer />
        </CurrentNewsCardContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default withRouter(App);
