import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {isLoggedIn} from '../utils';

const SecuredRoute = ({ component: Component, ...rest }) => (
    
    <Route
      {...rest}
      render={props =>
      
        isLoggedIn() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
);

export default SecuredRoute;