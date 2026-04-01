import React, { Suspense, useState, useEffect } from "react";
import Header from '../../container/frontend/layout/header';
import Footer from '../../container/frontend/layout/footer';
import { Loader } from "../../components";
import '../../assets/frontend.scss';
const FrontLayout = (props) => {

  const [divBeforeDisplay, setDivBeforeDisplay] = useState('block');
  useEffect(() => {
    setTimeout(() => {
      setDivBeforeDisplay('none');
    }, 500);
  });

  return (
    <div>
      {/* <Header /> */}
      <div>
        {/* <Suspense fallback={<Loader />}> */}
          <div style={{ display: divBeforeDisplay, height: "2000px" }}></div>
          {props.children}
        {/* </Suspense> */}
      </div>
      {/* <Footer/> */}
    </div>
  );
};
export default FrontLayout;
