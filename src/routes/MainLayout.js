import React, { Suspense} from "react";
import {useStyles} from "../container/sidebar/styles";
import MySideBar from '../container/sidebar/MySidebar';
import {Loader} from "../components";
// import '../assets/index.scss'
// import '../App.css';
// import '../index.css';
const MainLayout = (props) => {

  const classes = useStyles();
  return (
    <div className={[classes.root, " sidebar-container "]}>
      <MySideBar sidebar={props.sidebar}/>
      <div className={classes.content}>
        <Suspense fallback={<Loader/>}>
          {props.children}
        </Suspense>
      </div>
    </div>
  );
};
export default MainLayout;
