import React, {useState} from "react";
import {Redirect, Route} from "react-router-dom";
// import internal(own) modules
import MainLayout from "./MainLayout";
import {
  C_OTC_STORAGE, 
  sidebarTabsList
} from "../environment";
 
const MainLayoutRoute = ({render, ...rest}) => {

  const [user] = useState(JSON.parse(localStorage.getItem(C_OTC_STORAGE)));
  const role = user && user.role;
  const sidebar =sidebarTabsList;

  return (
    <Route
      {...rest}
      className={'app-logo-text'}
      render={matchProps => {
        return ( 
          <MainLayout sidebar={sidebar}>{render(matchProps)}</MainLayout> 
        )

      }}
    />
  );
};

export default MainLayoutRoute;
