import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from 'axios';
import './App.css';
import {environment} from './utils';
import {AppBar, Toolbar, Typography, Snackbar } from '@material-ui/core';
import AllDeals from './Components/AllDeals';
function App() {

  const [dbConnectionMsgOpen, setDbConnectionMsgOpen] = useState(false);
  useEffect(() => {
    getDBConection();
  }, []);

  const getDBConection = async () => {
    axios.get(environment.url + "/getData").then(res => {
      setDbConnectionMsgOpen(res.isSuccessfull);
    });
  };

  return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Deals
            </Typography>
          </Toolbar>
        </AppBar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right"}}
          open={dbConnectionMsgOpen}
          autoHideDuration={2000}
          message="Success db connection!"
          onClose={() => setDbConnectionMsgOpen(false)}
        />
        <Router>
          <Switch>
              <Route path="/deals">
                <AllDeals />
              </Route>
          </Switch>
        </Router>
      </>
  );
}

export default App;
