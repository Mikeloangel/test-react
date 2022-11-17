import React, { useRef, useState } from "react";

import imgEye from '../images/eye.png'

export default function Signup() {
  const refPassword = useRef();
  const refPasswordRepeat = useRef();

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [inputName, setInputName] = useState('');

  function handleEye(e) {
    setIsPasswordShown(!isPasswordShown);
    if (isPasswordShown) {
      refPassword.current.setAttribute('type', 'password');
      refPasswordRepeat.current.setAttribute('type', 'password');
    } else {
      refPassword.current.setAttribute('type', 'text');
      refPasswordRepeat.current.setAttribute('type', 'text');
    }
  }

  function handleChange(e){
    console.log(e.target)
  }

  return (
    <main className="login">
      <form className="login__form" noValidate>
        <h1 className="login__header">Регистрация</h1>

        <label className="login__label" htmlFor="name">Имя</label>
        <input className="login__input login__input_error" type="text" name="name" required placeholder="Артур" value={inputName} onChange={handleChange} />
        <p className="login__error error_name">Имя обязательно</p>

        <label className="login__label" htmlFor="email">Электронная почта</label>
        <input className="login__input" type="email" name="email" required placeholder="example@mail.ru" />
        <p className="login__error error_email">Почта!</p>

        <label className="login__label" htmlFor="password">Пароль</label>
        <div className="login__pasword-wrapper">
          <input className="login__input" type="password" name="password" required placeholder="***" ref={refPassword} />
          <img src={imgEye} alt="Show" className="login__psw-img" onClick={handleEye} />
        </div>
        <p className="login__error error_password">Пароль</p>

        <label className="login__label" htmlFor="password_confirm">Подтвердите пароль</label>
        <div className="login__pasword-wrapper">
          <input className="login__input" type="password" name="password_confirm" required placeholder="***" ref={refPasswordRepeat} />
          <img src={imgEye} alt="Show" className="login__psw-img" onClick={handleEye} />
        </div>
        <p className="login__error error_password">Пароль</p>

        <button type="submit" className="login__button">Зарегестрироваться</button>
      </form>
    </main>
  );
}
