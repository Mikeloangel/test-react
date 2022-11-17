import React, { useEffect, useState } from "react";

import api from '../utils/api';

import imgExit from '../images/exit.png';
import imgMore from '../images/more.png'
import Loading from "./Loading";
import UserListItem from "./UserListItem";

export default function UserList({onSignOut}) {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreDisabled, setIsMoreDisabled] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsMoreLoading(true);
    api.getUserList(currentPage)
      .then(list => {
        setUserList((prevList) => [...prevList, ...list.data]);
        setIsLoading(false);
        if (currentPage === list.total_pages) {
          setIsMoreDisabled(prev => true);
        }
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        setIsMoreLoading(false);
      });
  }, [currentPage])

  function handleShowMore() {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  }

  return (
    <main>
      <section className="header">
        <button className="header__button header__button_right" onClick={onSignOut}>
          <span className="header__button-text">Выход</span>
          <img src={imgExit} alt="exit button" className="header__button-img" />
        </button>
        <h1 className="header__title">Наша команда</h1>
        <h2 className="header__subtitle">
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и
          умеющие находить выход из любых, даже самых сложных ситуаций.
        </h2>
      </section>
      {isLoading ?
        <Loading /> :
        <section className="users">
          <ul className="users__list">
            {userList.map(user => (
              <UserListItem
                id={user.id}
                key={user.id}
                avatar={user.avatar}
                last_name={user.last_name}
                first_name={user.first_name}
              />
            ))
            }
          </ul>
          <button className="users__more" onClick={handleShowMore} disabled={isMoreDisabled || isMoreLoading}>
            {isMoreDisabled ? 'Все загружено' : 'Показать еще'} <img src={imgMore} alt="load more" className="users__more-pic" />
          </button>
        </section>
      }
    </main>
  )
}
