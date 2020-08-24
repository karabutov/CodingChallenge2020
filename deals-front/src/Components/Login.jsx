import React, { useState }  from 'react';
import axios from 'axios';
import {environment} from '../utils';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={onLoginFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value = {username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value = {password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );

    function onLoginFormSubmit(event){
        event.preventDefault();
        console.log(username);
        console.log(password);
        localStorage.setItem('isLogged', true);
        /*axios.post(environment.url + "/login", { username, password })
        .then((res) => {
            if(res.data.isSuccessfull){
                localStorage.setItem('isLogged', true);
            }
        });*/
       
    }
}
export default Login;