import React, {useState} from 'react';
import {ExpandLessIcon, ExpandMoreIcon} from "../../assets/images/images";
// import propTypes from 'prop-types'
// import {propTypes} from '@material-ui/core'
// import propTypes from "@material-ui/core";
import './style.scss'
const DownArrow = (props) => (
  <div className='expand-more-btn'>
    {props.children}
  </div>
)

function Index(props) {
  const {topRef, bottomRef} = props;
  const [top, setTop] = useState(true);
  const expandHandler = (key) => {
    if (topRef && bottomRef) {
      if (key) {
        setTop(false)
        bottomRef.current.scrollIntoView({behavior: 'smooth'})
      } else {
        setTop(true)
        topRef.current.scrollIntoView({behavior: 'smooth'})
      }
    }
  }
  return (
    <div className='expand-more-btn cursor-pointer'>
      {top ? <ExpandMoreIcon onClick={() => expandHandler(true)}/> :
        <ExpandLessIcon onClick={() => expandHandler(false)}/>}
    </div>
  );
}

// Index.propTypes = {
//   topRef: propTypes.element.isRequired,
//   bottomRef: propTypes.element.isRequired,
// }
export default Index;
