import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route path={props.path}>
      {() =>
        props.isLogged ?
          <Component {...props} /> :
          <Redirect to={'./signup'} />
      }
    </Route>
  );
}

export default ProtectedRoute;
