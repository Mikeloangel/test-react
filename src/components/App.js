import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import '../App.css';
import { AppContext } from '../contexts/AppContext';
import Signup from './Signup';
import UserList from './UserList';
import UserPage from './UserPage';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';

function App() {
  const history = useHistory()
  const [isLogged, setIsLogged] = useState(false);

  // checks token on load
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      //api check token
      //if token valid then
      setIsLogged(true);
      history.push('/');
    } else {
      setIsLogged(false);
      history.push('/signup');
    }
  }, [history]);

  function handleSignUp(values) {
    api.postUser({
      email: values.email,
      password: values.password
    })
      .then(res => {
        localStorage.setItem('token', res.token)
        setIsLogged(true);
        history.push('/');
      })
      .catch(err => {
        console.error(err)
      })
  }

  function handleSignOut(){
    localStorage.removeItem('token');
    setIsLogged(false);
    history.push('/');
  }


  return (
    <AppContext.Provider value={{ isLogged }}>
      <div>
        <Switch>

          <ProtectedRoute
            exact path='/'
            isLogged={isLogged}
            component={UserList}
            onSignOut={handleSignOut}
          />

          <ProtectedRoute
            path='/user/:uId'
            isLogged={isLogged}
            component={UserPage}
            onSignOut={handleSignOut}
          />

          <Route
            exact
            path='/signup'
          >
            <Signup onSubmit={handleSignUp} />
          </Route>

          <Route
            path='*'
            component={NotFound}
          />

        </Switch>
      </div>
    </AppContext.Provider>
  );
}

export default App;
