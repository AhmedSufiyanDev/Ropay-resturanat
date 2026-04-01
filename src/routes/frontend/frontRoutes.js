import React, {useState} from "react";
import {Redirect, Route, useParams} from "react-router-dom";
import FrontLayout from "./FrontLayout";
import {
  C_OTC_STORAGE
} from "../../environment";
 
const FrontLayoutRoute = ({render, ...rest}) => {

  const [user] = useState(JSON.parse(localStorage.getItem(C_OTC_STORAGE)));
  const role = user && user.role; 
  const cartItems = JSON.parse(localStorage.getItem('cart'))
  const { table_id } = useParams();

  if (!cartItems) {
    // Redirect based on the presence of table_id
    return table_id ? <Redirect to={`/home/${table_id}`} /> : <Redirect to="/" />;
  }
  else
    return (
      <Route
        {...rest}
        className={'app-logo-text'}
        render={matchProps => {
          return ( 
            <FrontLayout>{render(matchProps)}</FrontLayout> 
          )

        }}
      />
    );
};

export default FrontLayoutRoute;
