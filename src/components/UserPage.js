import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Loading from "./Loading";

import api from "../utils/api";

import imgBack from '../images/back.png';
import imgExit from '../images/exit.png';
import imgMail from '../images/mail.png';
import imgTel from '../images/tel.png';

export default function UserPage() {
  let history = useHistory();
  let {uId} = useParams();

  const [user, setUser] = useState({});
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    api.getUserById(uId)
      .then(user => {
        setUser(user.data);
        setisLoading(false);
      });
  }, []);

  function handleBackButton(){
    history.push('/');
  }

  return (
    <>
      {isLoading ?
        <Loading /> :
        <>
          <main >
            <section className="header" aria-label="name">
              <div className="header__wrapper">
                <button className="header__button header__button_place_left" onClick={handleBackButton}>
                  <span className="header__button-text">Назад</span>
                  <img src={imgBack} alt="back button" className="header__button-img" />
                </button>
                <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="header__pic" />
                <div className="header__info-wrapper">
                  <h1 className="header__title">{`${user.first_name} ${user.last_name}`}</h1>
                  <h2 className="header__subtitle header__subtitle_profile">Партнер</h2>
                </div>
                <button className="header__button header__button_place_right">
                  <span className="header__button-text">Выход</span>
                  <img src={imgExit} alt="exit button" className="header__button-img" />
                </button>
              </div>
            </section>
            <section className="profile">
              <div className="profile__paragraph-wrapper">
                <p className="profile__paragraph">Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых
                  продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он
                  помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших
                  технологий и увеличивать продажи, используя самые современные аналитические инструменты.</p>
                <p className="profile__paragraph">В работе с клиентами недостаточно просто решить конкретную проблему или помочь
                  справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов —
                  это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том,
                  что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".</p>
                <p className="profile__paragraph">Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную
                  предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии,
                  предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.</p>
              </div>
              <ul className="profile__aside">
                <li className="profile__item"><img src={imgTel} alt="Call me baby" /> +7 (954) 333-44-55</li>
                <li className="profile__item"><img src={imgMail} alt="Write me baby" /> {user.email}</li>
              </ul>
            </section>
          </main>
        </>}
    </>

  )

}
