import React from "react";
import { useStyles } from "../container/sidebar/styles";
import SideBar from '../container/sidebar/MySidebar';
import { Switch, Route } from 'react-router-dom'
import Dashboard from "./dashboard";
const MainLayout = (props) => {
  const classes = useStyles();
  return (
    <div className={[classes.root, " sidebar-container"]}>
      <SideBar />
      <div className={classes.content}>
        <div className={classes.content}>
          {props.children}
        </div>
        <Switch>
          <Route path="/" key='wallets'><Dashboard /></Route>
          {/*<Route path="/dashboard/settings" key='setting' render={props => <Setting {...props} />}/>*/}
        </Switch>
      </div>
    </div>
  );
};
export default MainLayout;
