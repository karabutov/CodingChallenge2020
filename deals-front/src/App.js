import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import './App.css';
import { environment } from './utils';
import {Snackbar } from '@material-ui/core';
import AllDeals from './Components/AllDeals';
import Login from './Components/Login';
import SecuredRoute from './Components/SecuredRoute';
import AppHeader from './Components/AppHeader';

const App = () => {

  const [dbConnectionMsgOpen, setDbConnectionMsgOpen] = useState(false);
  useEffect(() => {
    getDBConection();
  }, []);

  const getDBConection = async () => {
    axios.get(environment.url + "/getData").then(res => {
      setDbConnectionMsgOpen(res.data.isSuccessfull);
    });
  };

  return (
    <Router>
      <AppHeader isLoggedIn/>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={dbConnectionMsgOpen}
        autoHideDuration={2000}
        message="Success db connection!"
        onClose={() => setDbConnectionMsgOpen(false)}
      />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <SecuredRoute path="/deals" component={AllDeals} />
        <SecuredRoute path="/" component={AllDeals} />
      </Switch>
    </Router>
  );
}

export default App;
