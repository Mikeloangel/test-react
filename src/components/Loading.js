import React from "react";

import imgSpinner from '../images/spinner.gif';

export default function Loading(){
  return (
    <section className="loading">
      <img src={imgSpinner} alt="Loading" className="loading__img" />
    </section>
  )
}
