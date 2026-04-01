import React, { useState, useContext, useEffect } from 'react'
import ReusableModal from '../../../components/modal/reuseModal.js'
import { useStyles } from './styles.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { validateInputs } from "../../../services/utils";
import Loader from '../../../components/loading/index.js';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';
import '../scss/loginmodal.scss';
import OtpInput from 'react-otp-input';
// import theme from '../scss/ThemeStyles.scss';
import { ThemeContext } from '../../../ThemeContext';
import { useTranslation } from 'react-i18next';
import {connect} from "react-redux";
// import { loginStart } from '../../../store/actions/auth.js';
import * as actions from "../../../store/actions";

function LoginModal(props) {
    const history = useHistory();
    const { t } = useTranslation();
    const classes = useStyles();
    const { handleClose, openModal, authReducer } = props;
    const { themeValue } = useContext(ThemeContext);
    const [ signupEmail, setSignupEmail] = useState('');
    const [ verification_code, setVerification_code] = useState('');
    const [ error, setError] = useState('');
    const [ loading, setLoading] = useState(false);
    const [isLoginComplete, setIsLoginComplete] = useState(false);
    const [ isSignUpFormComplete, setIsSignUpFormComplete] = useState(false);
    const [ isVerificationComplete, setIsVerificationComplete] = useState(false);
    const [ values, setValues] = useState({
        email: '', //ahmed@gmail.com
        password: '', //12345
        name: '',
        password: '',
        mobile_no: '',
        // email: '',
        // otp: '',
    });
    const [errors, setErrors] = React.useState({
        email: '',
        password: '',
        // email:'',
        password:'',
        name:'',
        mobile_no:'',
    });
    const [loginMode, setLoginMode] = useState(true);
    const [signUpComplete, setSignUpComplete] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    // const {verifyOtpData} = authReducer;
    // console.log("authReducer",props.verifyOtpData);

    useEffect(()=>{
        if(props.verifyOtpData){
            console.log("authreducer data in useEffect",props.verifyOtpData);
            console.log("message of email verification",props?.verifyOtpData?.data?.message);
            setVerificationSuccess(true);
            setTimeout(() => {
                props.verifyMessageHandler();
                // setVerificationSuccess(true);
                // setVerificationMessage(t('verification Success'));
                handleClose(false);
            }, 5000);
        }
    },[props.verifyOtpData]);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setErrors({
            ...errors,
            [prop]: ''
        });
        checkSignUpFormComplete();
    };
    const checkSignUpFormComplete = () => {
        const { name, email, password, mobile_no } = values;
        if (name && email && password && mobile_no) {
            setIsSignUpFormComplete(true);
        } else {
            setIsSignUpFormComplete(false);
        }
    };


    const handleChangeLogin = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setErrors({
            ...errors,
            [prop]: ''
        });
        checkLoginFormComplete();
    };
    
    const checkLoginFormComplete = () => {
        const {email, password} = values;
        if(email && password) { 
            setIsLoginComplete(true);
        }
        else{
            setIsLoginComplete(false);
        }
    }
    

   
    
    const handleSignUpSubmit = () => {
        const {email, password,name,mobile_no} = values;
        const domain = "https://perfetto.ropay.bg";   
         //window.location.href;
        console.log("domain",domain);
        console.log("signup data coming from form",email, password,name,mobile_no);
        const data = {email, password,name,mobile_no,domain};
        props.onSignUpStart(data);
        setSignupEmail(email);
        setTimeout(()=>{
            setSignUpComplete(true);
        });
        // setSignUpComplete(true);
    }

    const handleLogin = () => {
        setLoading(true);
        // const hardcodedEmail = 'ahmed@gmail.com';
        // const hardcodedPassword = '12345';
        const {email,password} = values;
        const data = {email,password};
        console.log("data",data);
        console.log("email",email);
        console.log("password",password);
        props.onLoginStart(data);
        setTimeout(() => {
            setIsLoginComplete(false);
            props.onLoginSuccess();
            setLoading(false);
        }, 2000);

        // if (values.email === hardcodedEmail && values.password === hardcodedPassword) {
        //     setTimeout(() => {
        //         props.onLoginSuccess();
        //         setLoading(false);
        //     }, 2000);
        // } else {
        //     setError('Invalid email or password');
        //     setLoading(false);

        // }
    }
    const handleOtpChange = (verification_code) =>{
        setVerification_code(verification_code);
    };
   
    const [verificationMessage, setVerificationMessage] = useState('');

    const handleVerifyOtpChange = () =>{
        // console.log("otp on btn click",verification_code);
        const email = signupEmail;//signupEmail
        // console.log("signup email ",signupEmail);
        const data ={email,verification_code};
        // console.log("Data to verify email",data);
        setIsVerificationComplete(true);// disable Next btn onClick on otp verification
        // true);
        props.onVerifyOtp(data); 
        // if(props.verifyOtpData){ //?.data?.access_token
           
        // }
      
    }
    const handleLoginMode = () => {
        setLoginMode(!loginMode);
    }
    const closeModal = () =>{
        handleClose(false);
    }
    return (
        <div>
            <ReusableModal open={openModal} onClose={handleClose} className={classes.modal}>
                <div className={classes.paper} data-theme={themeValue}>
                    <span style={{position:'relative'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none" onClick={closeModal} className='crosssvg' >
                           <ellipse cx="16.2051" cy="16" rx="16.2051" ry="16" fill="#D9D9D9" fill-opacity="0.5" />
                            <path d="M22.6863 22.2513L9.87297 9.6001M22.5356 9.74894L9.72223 22.4001" stroke="white" stroke-width="1.48101" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <div style={{ textAlign: 'center' }}>
                        {signUpComplete ? (
                            <div>
                                  {verificationSuccess && (
                                        <Typography className='verification-message'> {/**verification-message */}
                                            {props?.verifyOtpData?.data?.message}
                                            {/* {} //verificationMessage */}    
                                        </Typography>
                                    )} 
                                    <h3 className='verifyemail-heading'>{t('verifyEmail')}</h3>
                                    <Typography className='verifyemail-paragraph'>{t('pleaseEnterCodeSent')}</Typography>
                                    <div style={{ alignItems: 'center', margin: 'auto' }}>
                                        <OtpInput value={verification_code} onChange={handleOtpChange} 
                                            numInputs={4} 
                                            renderInput={(props) => <input {...props} className='otpInput'/>}
                                            renderSeparator={() => <span style={{ margin: '0px 5px 0px 25px', borderRadius: '10px' }}></span>}
                                        />
                                        
                                        {/* <Typography className='emailverify-resend'>{t('resendCodeIn')}  00:48 </Typography> */}
                                        <Button className='verifyemail-button' disabled={isVerificationComplete} onClick={handleVerifyOtpChange}>
                                            <Typography className='verifyemail-buttonText' >{t('next')}</Typography>
                                        </Button>
                                    
                                    </div>
                            </div>
                            ) : (
                            <>
                                <h2>{loginMode ? `${t('login')}` : `${t('signup')}`}</h2>
                                {loginMode ? (
                                    <>
                                        <TextField
                                            label={t('email')}
                                            margin='normal'
                                            name="email"
                                            fullWidth
                                            value={values.email}
                                            onChange={handleChangeLogin('email')}
                                        />
                                        <TextField
                                            label={t('password')}
                                            margin='normal'
                                            type="password"
                                            name='password'
                                            fullWidth
                                            value={values.password}
                                            onChange={handleChangeLogin('password')}
                                        />
                                    </>
                                ) : (
                                    <div>
                                        <TextField label={t('name')} margin='normal' name="name" fullWidth value={values.name}
                                            onChange={handleChange('name')} className='textfield-css' />

                                        <TextField label={t('email')} margin='normal' name="email"
                                            fullWidth value={values.email} onChange={handleChange('email')}
                                            className='textfield-css' />

                                        <TextField label={t('password')} type="password" margin='normal'
                                            name='password' fullWidth value={values.password}
                                            onChange={handleChange('password')} className='textfield-css'
                                        />

                                        <TextField label={t('mobile_no')} margin='normal' type="text"
                                            name='mobile_no' fullWidth value={values.mobile_no}
                                            onChange={handleChange('mobile_no')} className='textfield-css'
                                        />
                                    </div>
                                )}
                                {errors && <p style={{ color: 'red' }}>{error}</p>}
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        {loginMode ? (
                                            <Button variant="contained" color="primary" onClick={handleLogin} disabled={!isLoginComplete} style={{cursor:'pointer'}}>
                                                {t('login')}
                                            </Button>) : (
                                            <Button variant="contained" color="primary" onClick={handleSignUpSubmit} disabled={!isSignUpFormComplete}   style={{cursor:'pointer'}} >
                                                {t('signup')} {/** */} 
                                            </Button>
                                        )}
                                        <Typography>
                                            {loginMode ? t('dontHaveAccount') : t('alreadyHaveAccount')}
                                            <Link onClick={handleLoginMode} style={{cursor:'pointer'}}> {loginMode ? t('signup') : t('login')}</Link>
                                        </Typography>
                                    </>
                                )}
                            </>
                        )}

                    </div>
                </div>
            </ReusableModal>
        </div>
    )
}
const mapStateToProps = ({authReducer}) => {
    const {loading, error, loggedInSuccess, signUpSuccess,verifyOtpData} = authReducer;
    return{loading, error, loggedInSuccess, signUpSuccess,verifyOtpData};
};
const mapDispatchToProps = (dispatch) =>{
    return{
        onLoginStart:(data) =>dispatch(actions.loginStart(data)),
        verifyMessageHandler:() =>dispatch(actions.verifyOtpHandlerSuccess()),
        onSignUpStart:(data)=>dispatch(actions.signupStart(data)),
        onVerifyOtp:(data) =>dispatch(actions.verifyOtp(data)),
        
    };
}
export default connect(mapStateToProps,mapDispatchToProps) (LoginModal);