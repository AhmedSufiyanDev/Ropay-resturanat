import React, { useState,useEffect,useContext } from "react";
import { useMediaQuery } from '@material-ui/core';
import ReusableModal from "../../../components/modal/reuseModal.js";
import { useStyles } from './profileModal-style.js';
import '../scss/profileModal.scss';
import  {usericon}  from "../../../assets/images/img";
import { Typography } from "@material-ui/core";
import Scrollbars from "react-custom-scrollbars";
// import theme from '../scss/ThemeStyles.scss';
import { ThemeContext } from '../../../ThemeContext';
import { useTranslation } from 'react-i18next'
const ProfileModal = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { userProfileModal } = props;
    const { themeValue } = useContext(ThemeContext);
    const name = 'Abdullah';
    const mobileno ='92 312 5516998';
    const email= 'abdullahakh@gmail.com';
    const password = '********';

    const isextraLargeScreen = useMediaQuery('(min-width: 1600px)');
    const isLargeScreen = useMediaQuery('(min-width: 1400px)');
    const isMediumScreen = useMediaQuery('(min-width: 960px)');
    const isSmallScreen = useMediaQuery('(min-width: 480px)');
    const isExtraSmallScreen = useMediaQuery('(min-width: 320px)');
  
    let scrollbarHeight = '500px'; // Default height
  
    if (isextraLargeScreen) {
      scrollbarHeight = '790px'; // Adjust height for large screens
    } 
    else if(isLargeScreen){
        scrollbarHeight = '700px'; // Adjust height for large screens
    }
    else if(isMediumScreen){
        scrollbarHeight = '780px';
    }
    else if (isSmallScreen) {
      scrollbarHeight = '680px'; // Adjust height for small screens
    }
    else if (isExtraSmallScreen){
        scrollbarHeight = '570px';
    }
  
   
    return (
        <ReusableModal
            open={userProfileModal}
            className={classes.modal}
        >
         
            <div className={classes.paper} data-theme={themeValue}>
            <Scrollbars  style={{ height: scrollbarHeight }}>
                <div className="paper-scroller-padd">
                    <h1 className="my-Profile">{t('myProfile')}</h1>
                    <div className="First-div">
                        <span className="thumb-profileuser">
                        <img src={usericon} className="user-image"/>
                        <span className="thumb-profileicon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="57" viewBox="0 0 56 57" fill="none"><g filter="url(#filter0_d_1412_6173)"><circle cx="28" cy="20.5" r="16" fill="white"/></g><path fill-rule="evenodd" clip-rule="evenodd" d="M31.1487 20.9562C31.1487 19.2194 29.7403 17.8109 28.0034 17.8109C26.2666 17.8109 24.8582 19.2194 24.8582 20.9562C24.8582 22.693 26.2666 24.1015 28.0034 24.1015C29.7403 24.1015 31.1487 22.693 31.1487 20.9562Z" stroke="#363853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M28.0032 28.6582C36.0484 28.6582 37.0063 26.2477 37.0063 21.0245C37.0063 17.3635 36.5221 15.4045 33.4726 14.5624C33.1926 14.474 32.8821 14.3056 32.6305 14.0287C32.2242 13.5835 31.9274 12.2161 30.9463 11.8024C29.9653 11.3898 26.0253 11.4087 25.06 11.8024C24.0958 12.1971 23.7821 13.5835 23.3758 14.0287C23.1242 14.3056 22.8147 14.474 22.5337 14.5624C19.4842 15.4045 19 17.3635 19 21.0245C19 26.2477 19.9579 28.6582 28.0032 28.6582Z" stroke="#363853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M32.9152 17.4581H32.9242" stroke="#363853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><filter id="filter0_d_1412_6173" x="0" y="0.5" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="8"/><feGaussianBlur stdDeviation="6"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1412_6173"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1412_6173" result="shape"/></filter></defs></svg> 
                        </span>
                        </span>
                        
                    </div>
                    <div className="profile-form-field">
                        <Typography className="label">{t('name')}</Typography>
                        <Typography className="value">{name}</Typography>
                    </div>
                    <div className="profile-form-field">
                        <Typography className="label">{t('mobileno')}</Typography>
                        <Typography className="value">{mobileno}</Typography>
                        <span className="edit-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none"><path d="M8.24023 2.01553L2.44664 8.14784C2.22788 8.38071 2.01617 8.8394 1.97383 9.15696L1.71273 11.4433C1.621 12.269 2.21376 12.8335 3.03235 12.6924L5.30462 12.3043C5.62217 12.2478 6.06675 12.0149 6.28551 11.775L12.0791 5.64269C13.0812 4.58418 13.5328 3.37748 11.9732 1.90262C10.4208 0.44187 9.24228 0.957013 8.24023 2.01553Z" stroke="#1B6BC5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.27345 3.03882C7.42139 3.98503 7.87935 4.85532 8.57543 5.51309C9.27152 6.17086 10.1663 6.57886 11.1194 6.67304M1 15H13.7021" stroke="#1B6BC5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </span>
                    </div>
                    <div className="profile-form-field">
                        <Typography className="label">{t('email')}</Typography>
                        <Typography className="value">{email}</Typography>
                    </div>
                    <div className="profile-form-field">
                        <Typography className="label">{t('myAccountPassword')}</Typography>
                        <Typography className="value">{password}</Typography>
                        <span className="edit-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none"><path d="M8.24023 2.01553L2.44664 8.14784C2.22788 8.38071 2.01617 8.8394 1.97383 9.15696L1.71273 11.4433C1.621 12.269 2.21376 12.8335 3.03235 12.6924L5.30462 12.3043C5.62217 12.2478 6.06675 12.0149 6.28551 11.775L12.0791 5.64269C13.0812 4.58418 13.5328 3.37748 11.9732 1.90262C10.4208 0.44187 9.24228 0.957013 8.24023 2.01553Z" stroke="#1B6BC5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.27345 3.03882C7.42139 3.98503 7.87935 4.85532 8.57543 5.51309C9.27152 6.17086 10.1663 6.57886 11.1194 6.67304M1 15H13.7021" stroke="#1B6BC5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </span>
                    </div>

                    <div>
                        <h1 className="connected-acc">{t('connectedAccounts')}</h1>
                    </div>

                    <div className="profile-form-field">
                        <div className="social-login">
                            <div className="social-div">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><g clip-path="url(#clip0_1412_6198)"><path d="M2.40365 6.61731C0.881915 9.258 1.84931 13.2654 3.5321 15.6952C4.37209 16.91 5.22252 18.0004 6.38731 18.0004C6.40925 18.0004 6.43129 18 6.45383 17.9991C7.00107 17.9773 7.39654 17.8088 7.77894 17.646C8.20827 17.463 8.65222 17.2739 9.3486 17.2739C10.011 17.2739 10.4338 17.4569 10.8428 17.6338C11.2457 17.8082 11.6608 17.9885 12.2741 17.977C13.5862 17.9526 14.3917 16.7759 15.1025 15.7379C15.8441 14.6541 16.2162 13.6017 16.3417 13.1996L16.3468 13.1836C16.3706 13.1121 16.3368 13.0341 16.2684 13.0027C16.2665 13.0018 16.2595 12.9989 16.2575 12.9981C16.0266 12.9036 13.9998 12.0045 13.9785 9.55388C13.9587 7.56291 15.4989 6.50857 15.8078 6.31746L15.8222 6.3085C15.8557 6.28695 15.879 6.25277 15.8869 6.21371C15.8949 6.17469 15.8865 6.13409 15.8642 6.10129C14.801 4.54548 13.1716 4.31102 12.5156 4.28283C12.4204 4.27334 12.3221 4.26855 12.2234 4.26855C11.4529 4.26855 10.7148 4.55958 10.1218 4.7934C9.71243 4.9548 9.3589 5.0942 9.11498 5.0942C8.84097 5.0942 8.4854 4.95308 8.07365 4.78975C7.52304 4.57122 6.89894 4.32357 6.23825 4.32357C6.2225 4.32357 6.20696 4.32375 6.1917 4.32403C4.65548 4.3466 3.20392 5.22547 2.40365 6.61731Z" fill="#010E16"/><path d="M12.5163 0.000111834C11.586 0.0380103 10.4701 0.610635 9.80303 1.39191C9.23617 2.0486 8.68243 3.14347 8.82836 4.24706C8.8375 4.3161 8.89368 4.3694 8.96315 4.37478C9.02587 4.37967 9.0901 4.38216 9.15384 4.38223C10.0635 4.38223 11.0448 3.87901 11.7149 3.06869C12.4202 2.21306 12.7768 1.11502 12.6689 0.131456C12.6606 0.0543579 12.5926 -0.00287645 12.5163 0.000111834Z" fill="#010E16"/></g><defs><clipPath id="clip0_1412_6198"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>
                                <Typography className="appleId">{t('appleID')}</Typography>
                            </div>
                            <Typography className="connect social-p">{t('connect')}</Typography>
                        </div>
                    </div>

                    <div className="profile-form-field">
                        <div className="social-login">
                            <div className="social-div">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><g clip-path="url(#clip0_1412_6208)"><path d="M17.3204 7.43517L9.97836 7.43481C9.65415 7.43481 9.39136 7.69757 9.39136 8.02178V10.3672C9.39136 10.6914 9.65415 10.9542 9.97833 10.9542H14.1129C13.6602 12.1292 12.8152 13.1131 11.7371 13.7384L13.5 16.7902C16.3281 15.1547 18 12.2849 18 9.07239C18 8.61497 17.9663 8.28799 17.8989 7.91979C17.8476 7.64006 17.6048 7.43517 17.3204 7.43517Z" fill="#167EE6"/><path d="M8.99996 14.4783C6.97657 14.4783 5.21018 13.3727 4.26149 11.7368L1.20972 13.4958C2.76274 16.1875 5.67206 18 8.99996 18C10.6325 18 12.1729 17.5605 13.5 16.7944V16.7902L11.737 13.7383C10.9306 14.2061 9.99737 14.4783 8.99996 14.4783Z" fill="#12B347"/><path d="M13.5 16.7944V16.7903L11.737 13.7383C10.9306 14.206 9.99749 14.4783 9 14.4783V18C10.6326 18 12.1731 17.5605 13.5 16.7944Z" fill="#0F993E"/><path d="M3.52174 9.00003C3.52174 8.00268 3.79392 7.0696 4.26154 6.26322L1.20976 4.50421C0.439523 5.82704 0 7.36329 0 9.00003C0 10.6368 0.439523 12.173 1.20976 13.4958L4.26154 11.7368C3.79392 10.9305 3.52174 9.99738 3.52174 9.00003Z" fill="#FFD500"/><path d="M8.99996 3.52174C10.3194 3.52174 11.5314 3.99059 12.478 4.77046C12.7116 4.96283 13.051 4.94895 13.2649 4.73502L14.9268 3.07318C15.1695 2.83047 15.1522 2.43316 14.8929 2.20823C13.3068 0.832254 11.2432 0 8.99996 0C5.67206 0 2.76274 1.81255 1.20972 4.50418L4.26149 6.26319C5.21018 4.62727 6.97657 3.52174 8.99996 3.52174Z" fill="#FF4B26"/><path d="M12.4781 4.77046C12.7116 4.96283 13.0511 4.94895 13.265 4.73502L14.9268 3.07318C15.1695 2.83046 15.1522 2.43316 14.893 2.20823C13.3069 0.832219 11.2432 0 9 0V3.52174C10.3194 3.52174 11.5314 3.99059 12.4781 4.77046Z" fill="#D93F21"/></g><defs><clipPath id="clip0_1412_6208"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>
                                <Typography className="google">{t('google')}</Typography>
                            </div>
                            <Typography className="connect social-p">{t('connected')}</Typography>
                        </div>
                    </div>
                </div>
            </Scrollbars>      
            </div>
            
        </ReusableModal>
    );
}
export default ProfileModal;