import React, { useEffect,useState,useContext } from "react";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import '../scss/orderPlaced.scss';
import Container from '@mui/material/Container';
import {useStyles} from './styles';
import { formatTime,initialTimeInSeconds } from "../../../environment";
import { contactimage,tickicon } from "../../../assets/images/img";
// import theme from '../scss/ThemeStyles.scss';
import { useCart } from '../layout/cartContext'
import { ThemeContext } from '../../../ThemeContext';
import { useTranslation} from "react-i18next";
import { connect } from "react-redux";
function OrderPlaced(props){
    const { cartItemsList, restaurantSuccess, currentLanguage, payStatus } = props;
    const classes = useStyles();
    const { t } = useTranslation();
    const { themeValue } = useContext(ThemeContext);
    const { clearCart } = useCart();
    const theme = createTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const currentTime = new Date();
    let interval;
    // let servingTimes = localStorage.getItem("servingTime")
    const [timeRemaining, setTimeRemaining] = useState(0);
    const { hours, minutes, seconds } = formatTime(timeRemaining);
    const [restaurant, setRestaurant] = useState(null);
    const [total, setTotal] = useState(0);

    let servingTimes = null;

    useEffect(()=>{
        clearCart();
        localStorage.removeItem("cart");
        localStorage.removeItem('orderId');
    },[]);

    useEffect(() => {
        if(cartItemsList?.data){
            servingTimes = cartItemsList?.data.map(item => item.product.serving_time).filter(time => time !== undefined && time !== null);
            // Find the largest time difference among all arrays

            if(servingTimes)
                setTimeRemaining(Math.max(...servingTimes)*60);

            const sum = cartItemsList.data.reduce((accumulator, item) => accumulator + item.price, 0);
            setTotal(sum);          
        }
    }, [cartItemsList])

    useEffect(() => {
        if(restaurantSuccess?.data)
          setRestaurant(restaurantSuccess.data);
    }, [restaurantSuccess]);

    useEffect(() => {
        if(timeRemaining <= 0){
            localStorage.removeItem('sessionId');
            clearInterval(interval);
        }else{
            interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);  
            return () => clearInterval(interval);
        }
    }, [timeRemaining]);

    // Calculate estimated serving time by adding the remaining time to the current time
    const servingTime = new Date(currentTime.getTime() + timeRemaining * 1000);
    const formattedServingTime = servingTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit',hour12:true });
     
    const orderPrice = `${restaurant?.branches[0]?.currency} ${total}`;
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));

    // console.log("order placee",keywordData);

    return(
        <div className="main-orderPlace-div" data-theme={themeValue}>
            {currentLanguage?.left_to_right === 1 &&
                <Container>
                    <Grid container spacing={matchesMD ? 3 : (matchesLG ? 3 : 5)} className={classes.root}>
                        <Grid item xs={12} sm={12} md={12} lg={6}> {/* left-main-grid */}
                            <div className="main-left-div">
                                <div className="first-div">
                                    <h1 className="estimated-time-heading">{t('estimatedServingTime')} {formattedServingTime}</h1>
                                    <Typography className="paragraph">{t('yourOrderReady')}</Typography>
                                </div>
                                {/* Time counter div */}
                                <div className="second-div">
                                    <h1 className="remaining-time">{t('remainingTime')}</h1>
                                    <div className="time-div">
                                        <div>
                                            <div className="hours-div">
                                                <span className="time">{hours}</span>
                                            </div>
                                            <Typography className="hours-label">{t('hours')}</Typography>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{paddingTop:'20px'}} width="7" height="23" viewBox="0 0 7 23" fill="none">
                                            <path d="M3.22257 22.7028C2.33279 22.7028 1.64523 22.4466 1.15989 21.9343C0.674553 21.3951 0.431885 20.6401 0.431885 19.6694C0.431885 18.7796 0.688035 18.0516 1.20033 17.4854C1.71263 16.9192 2.38671 16.6361 3.22257 16.6361C4.11236 16.6361 4.79992 16.9057 5.28525 17.445C5.77059 17.9573 6.01326 18.6988 6.01326 19.6694C6.01326 20.5592 5.75711 21.2872 5.24481 21.8534C4.73251 22.4197 4.05843 22.7028 3.22257 22.7028ZM3.22257 6.72711C2.33279 6.72711 1.64523 6.47096 1.15989 5.95866C0.674553 5.4194 0.431885 4.66443 0.431885 3.69376C0.431885 2.80397 0.688035 2.07597 1.20033 1.50974C1.71263 0.943514 2.38671 0.6604 3.22257 0.6604C4.11236 0.6604 4.79992 0.930032 5.28525 1.46929C5.77059 1.98159 6.01326 2.72308 6.01326 3.69376C6.01326 4.58354 5.75711 5.31154 5.24481 5.87777C4.73251 6.444 4.05843 6.72711 3.22257 6.72711Z" fill="#1B6BC5"/>
                                        </svg>
                                        <div>
                                            <div className="mins-div">
                                                <span className="time">{minutes}</span>
                                            </div>
                                            <Typography className="mins-label">{t('minutes')}</Typography>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg"style={{paddingTop:'20px'}} width="7" height="23" viewBox="0 0 7 23" fill="none">
                                            <path d="M3.22257 22.7028C2.33279 22.7028 1.64523 22.4466 1.15989 21.9343C0.674553 21.3951 0.431885 20.6401 0.431885 19.6694C0.431885 18.7796 0.688035 18.0516 1.20033 17.4854C1.71263 16.9192 2.38671 16.6361 3.22257 16.6361C4.11236 16.6361 4.79992 16.9057 5.28525 17.445C5.77059 17.9573 6.01326 18.6988 6.01326 19.6694C6.01326 20.5592 5.75711 21.2872 5.24481 21.8534C4.73251 22.4197 4.05843 22.7028 3.22257 22.7028ZM3.22257 6.72711C2.33279 6.72711 1.64523 6.47096 1.15989 5.95866C0.674553 5.4194 0.431885 4.66443 0.431885 3.69376C0.431885 2.80397 0.688035 2.07597 1.20033 1.50974C1.71263 0.943514 2.38671 0.6604 3.22257 0.6604C4.11236 0.6604 4.79992 0.930032 5.28525 1.46929C5.77059 1.98159 6.01326 2.72308 6.01326 3.69376C6.01326 4.58354 5.75711 5.31154 5.24481 5.87777C4.73251 6.444 4.05843 6.72711 3.22257 6.72711Z" fill="#1B6BC5"/>
                                        </svg>
                                        <div>
                                            <div className="sec-div">
                                                <span className="time">{seconds}</span>
                                            </div>
                                            <Typography className="sec-label">{t('seconds')}</Typography>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="support-contact">{t('supportContact')}</h1>
                                <div className="third-div">
                                    <Typography className="contact-detail">
                                        {t('customerSupport')}
                                    </Typography>
                                    <div className="contact-icon">
                                        <img src={contactimage}/>                                    
                                    </div>
                                </div>

                            </div>
                        </Grid>
                    
                        <Grid item xs={12} sm={12} md={12} lg={6}> {/* right-main-grid */}
                            <div className="main-right-div">
                                <div className="image-div">
                                    <img src={tickicon}/>
                                </div>
                                <Typography className="order-placed">{t('yourOrderPlaced')}</Typography>
                                <Typography className="order-placed-para">{t('bePatient')}</Typography>
                                <span className="dotedline">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="406" height="2" viewBox="0 0 406 2" fill="none">
                                        <path d="M0 1H406" stroke="#D9D9D9" stroke-width="0.979019" stroke-dasharray="4.9 4.9"/>
                                    </svg>
                                </span>
                                {payStatus === 1 &&  <Typography className="paid">{t('youHavePaid')}</Typography>}
                                {payStatus === 3 &&  <Typography className="paid">{t('totalBill')}</Typography>}
                                <Typography className="order-price">
                                    {orderPrice}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            }
            {currentLanguage?.left_to_right === 0 &&
                <Container>
                    <Grid container spacing={matchesMD ? 3 : (matchesLG ? 3 : 5)} className={classes.root}>
                        <Grid item xs={12} sm={12} md={12} lg={6} style={{order: isMediumScreen ? 2 : 1}}> {/* right-main-grid */}
                            <div className="main-right-div">
                                <div className="image-div">
                                    <img src={tickicon}/>
                                </div>
                                <Typography className="order-placed order-placed-rtl">{t('yourOrderPlaced')}</Typography>
                                <Typography className="order-placed-para order-placed-para-rtl">{t('bePatient')}</Typography>
                                <span className="dotedline">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="406" height="2" viewBox="0 0 406 2" fill="none">
                                        <path d="M0 1H406" stroke="#D9D9D9" stroke-width="0.979019" stroke-dasharray="4.9 4.9"/>
                                    </svg>
                                </span>
                                {payStatus === 1 &&  <Typography className="paid">{t('youHavePaid')}</Typography>}
                                {payStatus === 3 &&  <Typography className="paid">{t('totalBill')}</Typography>}
                                <Typography className="order-price">
                                    {orderPrice}
                                </Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={6} style={{order: isMediumScreen ? 1 : 2}}> {/* left-main-grid */}
                            <div className="main-left-div">
                                <div className="first-div">
                                    <div className="estimated-time-div">
                                        <span className="estimated-time-heading estimated-time-heading-rtl">{t('estimatedServingTime')}</span>
                                        <span className="estimated-time-heading estimated-time-heading-rtl margin-right">{formattedServingTime}</span>
                                    </div>
                                    <Typography className="paragraph paragraph-rtl">{t('yourOrderReady')}</Typography>
                                </div>
                                {/* Time counter div */}
                                <div className="second-div">
                                    <h1 className="remaining-time remaining-time-rtl">{t('remainingTime')}</h1>
                                    <div className="time-div time-div-rtl">
                                        <div>
                                            <div className="hours-div hours-div-rtl">
                                                <span className="time">{hours}</span>
                                            </div>
                                            <Typography className="hours-label hours-label-rtl">{t('hours')}</Typography>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{paddingTop:'20px'}} width="7" height="23" viewBox="0 0 7 23" fill="none">
                                            <path d="M3.22257 22.7028C2.33279 22.7028 1.64523 22.4466 1.15989 21.9343C0.674553 21.3951 0.431885 20.6401 0.431885 19.6694C0.431885 18.7796 0.688035 18.0516 1.20033 17.4854C1.71263 16.9192 2.38671 16.6361 3.22257 16.6361C4.11236 16.6361 4.79992 16.9057 5.28525 17.445C5.77059 17.9573 6.01326 18.6988 6.01326 19.6694C6.01326 20.5592 5.75711 21.2872 5.24481 21.8534C4.73251 22.4197 4.05843 22.7028 3.22257 22.7028ZM3.22257 6.72711C2.33279 6.72711 1.64523 6.47096 1.15989 5.95866C0.674553 5.4194 0.431885 4.66443 0.431885 3.69376C0.431885 2.80397 0.688035 2.07597 1.20033 1.50974C1.71263 0.943514 2.38671 0.6604 3.22257 0.6604C4.11236 0.6604 4.79992 0.930032 5.28525 1.46929C5.77059 1.98159 6.01326 2.72308 6.01326 3.69376C6.01326 4.58354 5.75711 5.31154 5.24481 5.87777C4.73251 6.444 4.05843 6.72711 3.22257 6.72711Z" fill="#1B6BC5"/>
                                        </svg>
                                        <div>
                                            <div className="mins-div">
                                                <span className="time">{minutes}</span>
                                            </div>
                                            <Typography className="mins-label">{t('minutes')}</Typography>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg"style={{paddingTop:'20px'}} width="7" height="23" viewBox="0 0 7 23" fill="none">
                                            <path d="M3.22257 22.7028C2.33279 22.7028 1.64523 22.4466 1.15989 21.9343C0.674553 21.3951 0.431885 20.6401 0.431885 19.6694C0.431885 18.7796 0.688035 18.0516 1.20033 17.4854C1.71263 16.9192 2.38671 16.6361 3.22257 16.6361C4.11236 16.6361 4.79992 16.9057 5.28525 17.445C5.77059 17.9573 6.01326 18.6988 6.01326 19.6694C6.01326 20.5592 5.75711 21.2872 5.24481 21.8534C4.73251 22.4197 4.05843 22.7028 3.22257 22.7028ZM3.22257 6.72711C2.33279 6.72711 1.64523 6.47096 1.15989 5.95866C0.674553 5.4194 0.431885 4.66443 0.431885 3.69376C0.431885 2.80397 0.688035 2.07597 1.20033 1.50974C1.71263 0.943514 2.38671 0.6604 3.22257 0.6604C4.11236 0.6604 4.79992 0.930032 5.28525 1.46929C5.77059 1.98159 6.01326 2.72308 6.01326 3.69376C6.01326 4.58354 5.75711 5.31154 5.24481 5.87777C4.73251 6.444 4.05843 6.72711 3.22257 6.72711Z" fill="#1B6BC5"/>
                                        </svg>
                                        <div>
                                            <div className="sec-div">
                                                <span className="time">{seconds}</span>
                                            </div>
                                            <Typography className="sec-label">{t('seconds')}</Typography>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="support-contact support-contact-rtl">{t('supportContact')}</h1>
                                <div className="third-div third-div-rtl">
                                    <Typography className="contact-detail contact-detail-rtl">
                                        {t('customerSupport')}
                                    </Typography>
                                    <div className="contact-icon">
                                        <img src={contactimage}/>                                    
                                    </div>
                                </div>

                            </div>
                        </Grid>
                    </Grid>
                </Container>
            }
        </div>
    );
}
// what is needed at start
const mapStateToProps = ({ homeReducer, restaurantReducer, languageReducer, paymentReducer }) => {
    const { cartItemsList } = homeReducer;
    const { restaurantSuccess } = restaurantReducer;
    const { currentLanguage } = languageReducer;
    const { payStatus } = paymentReducer;
    return { cartItemsList, restaurantSuccess, currentLanguage, payStatus };
};
export default connect(mapStateToProps)(OrderPlaced);