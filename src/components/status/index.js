import React from 'react';
import './style.scss';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


function Index(props) {
  const {statusColor,textColor,statusText}=props;
  return (
    <div className='display-flex align-items-center text-capitalize ' style={{border:'none'}}>
      {/*<span className={`circle ${statusColor} `} style={{fontSize:10}}>.</span>*/}
      <FiberManualRecordIcon  className={textColor}  style={{fontSize:'18px'}}/>
      <span className={textColor}> {statusText}</span>
    </div>
  );
}

export default Index;
