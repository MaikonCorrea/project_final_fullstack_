import React from "react";
import Navigation from "./Navigation";
import SearchForm from "./SearchForm";

export default function Header({ openedPopup, textSubmit, isLoggedIn, onLogout, openMenuMobile }) {
  return (
    <>
      <header className="header">
        <Navigation handlePopup={openedPopup} isLoggedIn={isLoggedIn} onLogout={onLogout} openMenuMobile={openMenuMobile} />
        <SearchForm
          textSubmit={(text) => {
            textSubmit(text);
          }}
        />
      </header>
    </>
  );
}
