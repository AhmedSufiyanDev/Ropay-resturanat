// ThemeContext.js
import React, { createContext, useEffect, useState } from 'react';
import * as actions from "./store/actions";
import {connect} from "react-redux";

export const ThemeContext = createContext({
  themeValue: ''
});

const ThemeProvider = ({ children, ...props }) => {
  const {restaurantSuccess} = props.restaurantReducer;
  // console.log("restaurantSuccess",restaurantSuccess);
  const [themeValue, setThemeValue] = useState('');
  // console.log("themeValue",themeValue);


  // Dependency array if empty then this useEffect will only run once on mounting

  useEffect(() => {
    fetchTheme();
  },[]);

  useEffect(() => {
    if(restaurantSuccess?.data){
      setThemeValue(restaurantSuccess?.data?.theme);
      if(restaurantSuccess?.data?.default_lang_id)
        localStorage.setItem('language',restaurantSuccess?.data?.default_lang_id);
    }
  }, [restaurantSuccess]);

  const fetchTheme = () => {
    // console.log("ThemeContext",window.location.protocol+ "//" + window.location.host);
    props.getRestaurantStart(window.location.protocol+ "//" + window.location.host);
    props.getBranchStart();
    // props.getRestaurantStart('localhost:3001');
  };

  return (
    <ThemeContext.Provider value={{ themeValue:themeValue }}>
        {children}
    </ThemeContext.Provider>
  );
};

const mapStateToProps = ({restaurantReducer={}}) => {
  return {restaurantReducer};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantStart: (data) => dispatch(actions.getRestaurantData(data)),
    getBranchStart: () => dispatch(actions.getBranchList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);
