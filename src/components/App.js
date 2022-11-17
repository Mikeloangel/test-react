import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App.css';
import Signup from './Signup';


import UserList from './UserList';
import UserPage from './UserPage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <UserList />
        </Route>

        <Route path='/user/:uId' component={UserPage}/>

        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route path='*'>404</Route>
      </Switch>
    </div>
  );
}

export default App;
