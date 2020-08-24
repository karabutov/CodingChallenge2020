import React from 'react';
import {Redirect, Route} from "react-router-dom";

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

const isLoggedIn = () => {
    var isLogged = localStorage.getItem("isLogged");
    return  isLogged != null && isLogged === 'true';
};

export default SecuredRoute;