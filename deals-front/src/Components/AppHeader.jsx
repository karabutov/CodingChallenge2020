import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {isLoggedIn } from '../utils';
import {AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const AppHeader = () => {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    const logOut = () => {
        localStorage.removeItem('isLogged');
        setLoggedIn(false);
        history.push("/login");
    }

    return (
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Deals
          </Typography>
          {loggedIn ? <Button onClick={logOut}> Log out </Button> : null}
        </Toolbar>
      </AppBar>
    );
}

export default AppHeader;