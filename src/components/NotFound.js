import React, { useContext } from "react";

import { AppContext } from "../contexts/AppContext";
import imgExit from "../images/exit.png";
import imgBack from "../images/back.png"
import { useHistory } from "react-router-dom";

export default function NotFound() {
  const { isLogged } = useContext(AppContext);
  const history = useHistory();

  function handleBackButton() {
    history.push('/');
  }

  return (
    <main>
      <section className="header" aria-label="name">
        <div className="header__wrapper">

          <button className="header__button header__button_place_left" onClick={handleBackButton}>
            <span className="header__button-text">Назад</span>
            <img src={imgBack} alt="back button" className="header__button-img" />
          </button>

          <div></div>
          <div className="header__info-wrapper">
            <h1 className="header__title">404 Error</h1>
            <h2 className="header__subtitle header__subtitle_profile">Когда нибудь найдется всё!</h2>
          </div>
          {isLogged &&
            <button className="header__button header__button_place_right">
              <span className="header__button-text">Выход</span>
              <img src={imgExit} alt="exit button" className="header__button-img" />
            </button>
          }
        </div>
      </section>
    </main>
  )
}
