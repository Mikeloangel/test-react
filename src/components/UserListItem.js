import React from "react";
import { Link } from "react-router-dom";

export default function UserListItem({ avatar, first_name, last_name, id }) {
  return (
    <li className="users__card">
      <Link to={`user/${id}`}>
        <img src={avatar} alt={`${first_name} ${last_name}`} className="users__pic"/>
      </Link>
      <p className="user__name">{`${first_name} ${last_name}`}</p>
      <div className="user__like"></div>
    </li>
  )
}
