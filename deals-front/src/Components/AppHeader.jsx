import React from 'react';
import {useHistory} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';

const AppHeader = props => {
    const history = useHistory();
    
    const logOut = () => {
        localStorage.removeItem('isLogged');
        history.push("/login");
        history.go(0);
    }

    return (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">
                Deals
              </Typography>
            </Grid>

            { 
              props.loggedIn 
              ? <Grid item>
                  <Button style={{color: "white"}} onClick={logOut}> Log out </Button> 
                </Grid>
              : null
            }
          </Grid>
        </Toolbar>
      </AppBar>
    );
}

export default AppHeader;