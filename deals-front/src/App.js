import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import './App.css';
import { environment, isLoggedIn } from './utils';
import {Snackbar } from '@material-ui/core';
import AllDeals from './Components/AllDeals';
import Login from './Components/Login';
import SecuredRoute from './Components/SecuredRoute';
import AppHeader from './Components/AppHeader';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [dbConnectionMsgOpen, setDbConnectionMsgOpen] = useState(false);
  
  useEffect(() => {
    getDBConection();
    setLoggedIn(isLoggedIn());
  }, []);

  const getDBConection = async () => {
    axios.get(environment.url + "/getData").then(res => {
      setDbConnectionMsgOpen(res.data.isSuccessfull);
    });
  };

  return (
    <Router>
      <AppHeader loggedIn={loggedIn}/>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={dbConnectionMsgOpen}
        autoHideDuration={2000}
        message="Success db connection!"
        onClose={() => setDbConnectionMsgOpen(false)}
      />
      <Switch>
        <Redirect from="/" to="/deals" exact />
        <Route path="/login" component={Login} />
        <SecuredRoute path="/deals" component={AllDeals} />
      </Switch>
    </Router>
  );
}

export default App;
