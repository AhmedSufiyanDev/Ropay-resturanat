import React, { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import '../scss/tryAgain.scss';
import Container from '@mui/material/Container';
import {useStyles} from './styles';
import { tickicon } from "../../../assets/images/img";
import { ThemeContext } from '../../../ThemeContext';
import { useTranslation} from "react-i18next";
import { connect } from "react-redux";
function TryAgain(){
    const classes = useStyles();
    const { t } = useTranslation();
    const { themeValue } = useContext(ThemeContext);

    return(
        <div className="main-orderPlace-div" data-theme={themeValue}>
            <Container>
                <Grid container className={`${classes.root} ${classes.centralize}`}>                    
                    <Grid item xs={12} sm={12} md={12} lg={8}>
                        <div className="try-again-div">
                            <div>
                                <div className="image-div">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" fill="none">
                                        <g id="Group 427320604">
                                            <circle id="Ellipse 130" cx="90" cy="90" r="90" fill="#FDE4E4"/>
                                            <circle id="Ellipse 128" cx="90.0007" cy="89.9999" r="73.1868" fill="#F7A8A8"/>
                                            <g id="Ellipse 129" filter="url(#filter0_d_1341_2508)">
                                            <circle cx="90.0003" cy="89.9998" r="55.3846" fill="#C51B1B"/>
                                            </g>
                                            <path id="Vector" d="M70 70L110 110M110 70L70 110" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_1341_2508" x="30.6157" y="34.6152" width="118.769" height="118.769" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="4"/>
                                            <feGaussianBlur stdDeviation="2"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.772549 0 0 0 0 0.105882 0 0 0 0 0.105882 0 0 0 0.3 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1341_2508"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1341_2508" result="shape"/>
                                            </filter>
                                        </defs>
                                    </svg>
                                </div>
                                <Typography className="order-placed">{t('tryAgain')}</Typography>
                                <Typography className="order-placed-para">{t('paymentError')}</Typography>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
// what is needed at start
const mapStateToProps = ({ languageReducer }) => {
    const { currentLanguage } = languageReducer
    return { currentLanguage };
};
export default connect(mapStateToProps)(TryAgain);