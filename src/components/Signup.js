import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import imgEye from '../images/eye.png'

export default function Signup({ onSubmit }) {
  // formik logics
  const formik = useFormik({
    initialValues: {
      name: 'mike',
      email: 'mike@ya.ru',
      password: '123',
      password_confirm: '123',
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, 'Имя должно быть длиной до 20 символов').required('Введите ваше имя'),
      email: Yup.string().email('Введите правильный адрес почты').required('Введите вашу почту'),
      password: Yup.string().min(3, 'Пароль должен быть минимум 3 символа').required('Введите ваш пароль'),
      password_confirm: Yup.string().min(3, 'Пароль должен быть минимум 3 символа').required('Введите ваш пароль').oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
    }),
    onSubmit: (values) => {
      if (typeof onSubmit === 'function') onSubmit(values);
    }
  })

  const refPassword = useRef();
  const refPasswordRepeat = useRef();

  const [isPasswordShown, setIsPasswordShown] = useState(false);

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

  return (
    <main className="login">
      <form className="login__form" onSubmit={formik.handleSubmit} noValidate>
        <h1 className="login__header">Регистрация</h1>

        <label className="login__label" htmlFor="name">Имя</label>
        <input
          className={`login__input ${formik.touched.name && formik.errors.name && 'login__input_error'}`}
          type="text"
          name="name"
          required
          placeholder="Артур"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="login__error">{formik.touched.name && formik.errors.name}</p>

        <label className="login__label" htmlFor="email">Электронная почта</label>
        <input
          className={`login__input ${formik.touched.email && formik.errors.email && 'login__input_error'}`}
          type="email"
          name="email"
          required
          placeholder="example@mail.ru"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="login__error">{formik.touched.email && formik.errors.email}</p>

        <label className="login__label" htmlFor="password">Пароль</label>
        <div className="login__pasword-wrapper">
          <input
            className={`login__input ${formik.touched.password && formik.errors.password && 'login__input_error'}`}
            type="password"
            name="password"
            required
            placeholder="***"
            ref={refPassword}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <img src={imgEye} alt="Show" className="login__psw-img" onClick={handleEye} />
        </div>
        <p className="login__error">{formik.touched.password && formik.errors.password}</p>

        <label className="login__label" htmlFor="password_confirm">Подтвердите пароль</label>
        <div className="login__pasword-wrapper">
          <input
            className={`login__input ${formik.touched.password_confirm && formik.errors.password_confirm && 'login__input_error'}`}
            type="password"
            name="password_confirm"
            required
            placeholder="***"
            ref={refPasswordRepeat}
            value={formik.values.password_confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <img src={imgEye} alt="Show" className="login__psw-img" onClick={handleEye} />
        </div>
        <p className="login__error">{formik.touched.password_confirm && formik.errors.password_confirm}</p>

        <button type="submit" className="login__button" disabled={!(formik.isValid)}>Зарегистрироваться</button>
      </form>
    </main>
  );
}
