import React, {useEffect, useState} from 'react';
import {Dashboard, Loader} from "../../components";
import * as actions from "../../store/actions";
import {connect} from "react-redux";


function Index(props) { 

  let {dashboardReducer: {dashboard, loading, error}} = props;

  useEffect(() => {

    props.getDashboardStart({});

  }, []);

  // fetch services list
  useEffect(() => { 
  }, []);
  useEffect(() => {
    if (props.servicesReducer?.error) {
    } else {
      
    }
  }, [  props.servicesReducer?.error]);


  return (
    <div className='mb-20'>
      { <Dashboard   dashboard={dashboard} loading={loading} {...props}/>  }
    </div>
  );
}


const mapStateToProps = ({dashboardReducer = {}, servicesReducer = {}}) => {
  return {dashboardReducer, servicesReducer};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDashboardStart: (data) => dispatch(actions.dashboardStart(data)), 
    confirmationHandler: (data) => dispatch(actions.confirmationHandler(data)), 
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
