import React, {useContext} from 'react';
import { useStyles } from "./styles";
import { generalStyles } from "../general/general";
import Container from '@material-ui/core/Container';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import { footerLogo } from "../../../assets/images/img/index";
import "../scss/footer.scss";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import Modal from '@material-ui/core/Modal';
import { Link as RouterLink } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { CMS_DOMAIN_PREFIX } from '../../../environment/index.js';
import { Link } from "react-router-dom";
// import theme from '../scss/ThemeStyles.scss';
import { ThemeContext } from '../../../ThemeContext';
export default function Header() {
  const classes = useStyles();
  const generalClasses = generalStyles();

  //////////Login model////////////
  const [openModal, setOpenModal] = React.useState(false);
  const { themeValue } = useContext(ThemeContext);

  const handleOpen = () => {
    let userDetail = getUserDataFromLocalStorage();
    let tokenData = localStorage.getItem('token');
    if (userDetail && tokenData) {
      let domLink = CMS_DOMAIN_PREFIX + "/" + tokenData + "/" + JSON.stringify(userDetail);
      console.log('domLink ', domLink);
      window.location.replace(domLink);
    }
    else
      setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  function empCornerLink() {

    let userDetail = getUserDataFromLocalStorage();
    return { __html: (userDetail) ? "<span style='margin-right: 6px;'><svg width='13' height='16' viewBox='0 0 13 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.021 8C8.23013 8 10.021 6.20914 10.021 4C10.021 1.79086 8.23013 0 6.021 0C3.81186 0 2.021 1.79086 2.021 4C2.021 6.20914 3.81186 8 6.021 8Z' fill='#0E97FF'></path><path d='M6.021 9.33337C2.70881 9.33706 0.0246836 12.0212 0.0209961 15.3334C0.0209961 15.7016 0.319465 16 0.687652 16H11.3543C11.7225 16 12.021 15.7016 12.021 15.3334C12.0173 12.0212 9.33318 9.33703 6.021 9.33337Z' fill='#0E97FF'></path></svg></span> Dashboard" : "Employee Corner" };

  };

  return (
    <div className={generalClasses.root} data-theme={themeValue}>
      <section className='footer_section'>
        <Container className='footer-container'>
          <Grid container spacing={4}>
            <Grid className='footer-topnv-item-first' item xs={12} sm={12} md={12} lg={3}>
              <div>
                <h4 className="quick-linkft-heading">CandidWorks</h4>
              </div>
              <div className="quick-linkft">
                <ul>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Home</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Mission</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>About Us</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>About Us</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Start</span>
                    </RouterLink>
                  </li>

                </ul>
              </div>

            </Grid>
            <Grid className='footer-item-padleft' item xs={12} sm={12} md={12} lg={3}>
              <h4 className="quick-linkft-heading">Need Help?</h4>
              <div className="quick-linkft">
                <ul>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Contact Us</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>How It Works</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>FAQ</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Terms</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Terms</span>
                    </RouterLink>
                  </li>

                </ul>
              </div>
              {/* <div>
                <h3 className="footerfrom-head">Want To Stay Updated?</h3>
              </div> */}
              {/* <div className='positionRelative'>
                <Box>
                  <TextField
                    className="inputfooter-sty"
                    hiddenLabel
                    id="filled-hidden-label-small"
                    placeholder="Your Email Address"
                    variant="filled"
                    size="small"
                  />
                  <span className='cursor-pointer go-to-email-button'>
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" y="0.5" width="33" height="33" rx="9.5" fill="#0E97FF" fillOpacity="0.7" stroke="#0E97FF"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M16.3124 27.9856C16.0516 27.9722 15.7425 27.9463 15.6255 27.9279C14.767 27.7927 14.7295 27.7851 14.0719 27.614C13.892 27.5672 13.708 27.5153 13.663 27.4986C13.6181 27.482 13.3899 27.399 13.1561 27.3142C12.6738 27.1393 11.8553 26.7563 11.4986 26.5386C11.3668 26.4582 11.156 26.3294 11.03 26.2525C9.81542 25.5112 8.43874 24.102 7.60926 22.751C7.11463 21.9452 6.59474 20.7761 6.41828 20.0727C6.3935 19.9737 6.34264 19.775 6.30543 19.6311C6.22064 19.3038 6.15735 18.9872 6.10935 18.65C6.08882 18.5061 6.05579 18.3074 6.036 18.2085C5.988 17.9685 5.988 16.0283 6.036 15.7883C6.05579 15.6894 6.08882 15.4907 6.10935 15.3468C6.18474 14.8175 6.40486 13.8802 6.53169 13.548C6.56595 13.4581 6.6474 13.2373 6.71248 13.0574C6.77766 12.8775 6.86932 12.6494 6.91626 12.5505C7.10964 12.1428 7.35405 11.6534 7.38047 11.6207C7.39608 11.6014 7.43803 11.5342 7.47368 11.4712C7.78965 10.9134 8.30144 10.2045 8.72501 9.73787C8.88013 9.56698 9.03541 9.39258 9.07 9.35039C9.21294 9.17607 10.1164 8.39262 10.4937 8.11586C11.3538 7.4849 12.2576 7.00127 13.2378 6.64732C13.9396 6.39394 14.696 6.2031 15.3802 6.10687C15.5241 6.08667 15.712 6.05495 15.7979 6.03639C16.0256 5.98717 17.8001 5.98815 18.1768 6.0377C19.0638 6.15437 19.6697 6.2825 20.3191 6.49058C21.3013 6.80529 22.5913 7.42235 22.888 7.71939C23.4697 8.30154 23.0409 9.32725 22.2153 9.32864C21.9697 9.32905 21.8801 9.29316 21.1696 8.9101C19.0788 7.78284 16.1925 7.59037 13.9574 8.42925C13.8045 8.48665 13.6424 8.54503 13.5971 8.55893C13.2161 8.6761 12.1576 9.27582 11.5874 9.69756C9.71582 11.082 8.39254 13.2425 8.03708 15.494C8.01574 15.6289 7.98295 15.8202 7.96414 15.9191C7.90772 16.2161 7.92358 17.8077 7.98679 18.1921C8.01631 18.372 8.05352 18.6001 8.06946 18.699C8.11337 18.9719 8.32164 19.7516 8.4169 19.9997C8.46343 20.1208 8.53204 20.3008 8.56949 20.3997C8.64259 20.5929 8.96288 21.2583 9.07336 21.4463C10.2217 23.4006 11.7812 24.7382 13.8087 25.5076C15.7641 26.2497 18.153 26.2717 20.0425 25.5652C20.2321 25.4943 20.3974 25.4363 20.4097 25.4363C20.4729 25.4363 21.4131 24.9572 21.7256 24.7658C26.0299 22.1292 27.3839 16.5393 24.7558 12.2562C24.4579 11.7707 24.4182 11.6702 24.4182 11.4008C24.4182 10.5649 25.46 10.1413 26.0327 10.7444C26.4764 11.2119 27.3033 12.9202 27.5831 13.948C27.6992 14.3742 27.7642 14.6365 27.7941 14.799C27.8114 14.8934 27.8417 15.0553 27.8612 15.1587C28.0144 15.9687 28.0475 17.6014 27.9267 18.3883C27.8077 19.1644 27.7839 19.2819 27.6153 19.9255C27.3961 20.7621 26.8742 21.9712 26.4244 22.6842C26.2957 22.8883 26.1902 23.0616 26.1902 23.0692C26.1902 23.1652 25.1239 24.4538 24.7356 24.827C24.2426 25.3006 23.1566 26.1885 23.07 26.1885C23.0627 26.1885 22.8898 26.2939 22.6856 26.4227C22.2667 26.6868 21.4065 27.1123 20.9893 27.2617C20.8366 27.3164 20.6086 27.3987 20.4827 27.4445C20.2904 27.5145 19.9004 27.6254 19.5505 27.7095C19.5055 27.7204 19.4172 27.7422 19.3543 27.7582C19.1803 27.8022 18.7415 27.8743 18.1768 27.9515C17.8414 27.9975 16.8873 28.0149 16.3124 27.9856ZM17.8799 22.4452C17.4212 22.3537 17.1322 21.9943 17.1308 21.5138C17.1296 21.1069 17.1052 21.1375 18.7456 19.4917C19.557 18.6776 20.2259 17.997 20.2319 17.9791C20.2391 17.9579 18.7424 17.9468 15.8911 17.9468C10.8961 17.9468 11.3368 17.9746 11.0197 17.6395C10.5674 17.1612 10.7173 16.4094 11.3211 16.1283L11.488 16.0506L15.8273 16.0503C18.2139 16.0501 20.188 16.0418 20.2141 16.0317C20.2461 16.0194 19.7762 15.5287 18.7654 14.5191C17.0685 12.8241 17.1154 12.8839 17.1362 12.438C17.1725 11.6576 18.011 11.2501 18.6347 11.7097C18.751 11.7953 22.0083 15.0451 22.2147 15.2814C22.892 16.0567 23.0611 17.5042 22.5571 18.212C22.5225 18.2606 22.4942 18.3101 22.4942 18.3221C22.4942 18.4489 18.9416 22.0739 18.5856 22.3103C18.3801 22.4468 18.1286 22.4949 17.8799 22.4452Z" fill="#FBFBFC"/>
                    </svg>
                  </span>
                </Box>
              </div> */}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              <h4 className="quick-linkft-heading">Explore</h4>
              <div className="quick-linkft">
                <ul>
                  <li>
                    <RouterLink to='/'>
                      <span className=''></span>
                      <span className='quick-link-link'>All Categories</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to='/about-us'>
                      <span className=''></span>
                      <span className='quick-link-link'>Animal Care</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Civil Support</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to='/news'>
                      <span className=''></span>
                      <span className='quick-link-link'>Civil Support</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to='/tenders'>
                      <span className=''></span>
                      <span className='quick-link-link'>Disabilities</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              {/* <h4 className="quick-linkft-heading"></h4> */}
              <div className="quick-linkft" style={{marginTop:'76px'}}>
                <ul>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Disaster Relief</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Education</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Elderly Care</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Environmental</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Food & Hunger</span>
                    </RouterLink>
                  </li>

                </ul>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              {/* <h4 className="quick-linkft-heading"></h4> */}
              <div className="quick-linkft" style={{marginTop:'76px'}}>
                <ul>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Healthcare</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Homelessness</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Legal & Professional</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Religion</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=''>
                      <span className=''></span>
                      <span className='quick-link-link'>Tech & Research</span>
                    </RouterLink>
                  </li>

                </ul>
              </div>
            </Grid>
          </Grid>
        </Container>

        <div className='footer-copyrights'>
          <Container fixed>
            <hr style={{ background: '#B5B5B5' }}></hr>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <p className='copyright-footer'>{new Date().getFullYear()} CandidWorks. All Rights Reserved.</p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </section>
    </div>
  );
}
