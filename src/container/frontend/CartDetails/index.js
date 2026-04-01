import { Box, Grid, GridList, Typography, Button, Card, CardMedia, CardContent, Checkbox, CircularProgress } from "@material-ui/core";
import { Alert } from "../../../components";
import Radio from '@material-ui/core/Radio';
import { blue } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme, useMediaQuery } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React, { useState, useContext, useEffect } from "react";
import { useStyles } from "./styles";
import '../scss/cardDetails.scss';
import '../scss/general.scss';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { masterCard, applepay, googlepay, Beeftarar, pizzaCart } from "../../../assets/images/img";
import { paymentGatewayIconsList } from "../../../environment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import theme from '../scss/ThemeStyles.scss';
import { ThemeContext } from "../../../ThemeContext";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useCart } from '../layout/cartContext'
import RevolutCheckout from "@revolut/checkout"
import Scrollbars from "react-custom-scrollbars";

function CartDetails(props) {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const { addItemToCart, clearCart } = useCart();
    const { cartItems } = props.location?.state;
    const [paymentGatewaysList, setPaymentGatewaysList] = useState([])
    const [restaurant, setRestaurant] = useState(null);
    let orderId = null;
    // const items = [
    //     { img: pizzaCart, title: 'Pizza', description: 'Fried Leg Fillet Fireworks: Set Your Taste', price: 'BGN.15/.' },
    //     { img: Beeftarar, title: 'Beef Tartar', description: 'Fried Leg Fillet Fireworks: Set Your Taste', price: 'BGN.12/.' },
    // ];
    const tip = [
        { bgn: 'BGN-10' }, { bgn: 'BGN-15' }, { bgn: 'BGN-17' }, { bgn: 'BGN-20' }
    ];

    //code for checkbox
    const [checked, setChecked] = useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    //code for radio buttons used for master or credit card
    const [selectedPaymentGateway, setSelectedPaymentGateway] = useState('MasterCard');
    const handleRadioChange = (event) => {
        setSelectedPaymentGateway(event.target.value);
    };
    //code for radio buttons used for google or apple pay
    const [selectedPayValue, setSelectedPayValue] = useState('ApplePay');
    const handlePayRadioChange = (event) => {
        setSelectedPayValue(event.target.value);
    };

    const [branch, setBranch] = useState(null);

    const [checkoutErrorMessage, setCheckoutErrorMessage] = useState(null);

    //code for select menu to select the number of items
    const [noOfItems, setNoOfItems] = useState(cartItems.map((item) => {
        if (item.quantity)
            return item.quantity;
        else
            return 1;
    })); // Initialize state array for each item

    const handleNoOfItem = (index, value) => {
        const newNoOfItems = [...noOfItems]; // Create a copy of the state array
        newNoOfItems[index] = value; // Update the value at the specified index
        setNoOfItems(newNoOfItems); // Update the state
    };

    useEffect(() => {
        if (props.restaurantSuccess?.data) {
            setRestaurant(props.restaurantSuccess.data);
        }
        // productCategory();
    }, [props.restaurantSuccess]);

    useEffect(() => {
        props.getPaymentGateways();
        noOfItems.map((item, index) => {
            cartItems[index].quantity = item;
            const updatedItem = cartItems[index];
            const orderData = {
                sessionId: localStorage.getItem("sessionId"),
                orderId: localStorage.getItem("orderId"),
                cartId: updatedItem._id,
                // user_id: '65fa8d79b94da3c8da28b50f',
                restaurant_branch_id: restaurant?.branches[0]?._id,
                cartDetails: {
                    quantity: updatedItem.quantity,
                    price: updatedItem.product.price * updatedItem.quantity,
                    category_id: updatedItem.product.category_id,
                    product_id: updatedItem.product._id,
                }
            };

            const userData = localStorage.getItem('user');
            const newUserData = JSON.parse(userData);
            if (newUserData) {  
                try{
                    const user_id = newUserData._id;
                    orderData.user_id = user_id; //userData._id;
                    console.log("new order data",orderData);
                } catch{
                    console.log("error in parrsing the userData");
                }
            }
            
            props.updateOrderItem(orderData);
        })
    }, []);

    useEffect(() => {
        if (restaurant && props.paymentGateways?.data?.length)
            setPaymentGatewaysList(props.paymentGateways?.data.filter(paymentGateway => restaurant.branches[0].payment_gateway_ids?.includes(paymentGateway._id)))
    }, [restaurant, props.paymentGateways])

    useEffect(() => {
        if(paymentGatewaysList.length)
            setSelectedPaymentGateway(paymentGatewaysList[0]._id);
    }, [paymentGatewaysList])

    useEffect(() => {
        noOfItems.map((item, index) => {
            if (cartItems[index].quantity !== item) {
                cartItems[index].quantity = item;
                const updatedItem = cartItems[index];
                const orderData = {
                    sessionId: localStorage.getItem("sessionId"),
                    orderId: localStorage.getItem("orderId"),
                    cartId: updatedItem._id,
                    user_id: '65fa8d79b94da3c8da28b50f',
                    restaurant_branch_id: restaurant?.branches[0]?._id,
                    cartDetails: {
                        quantity: updatedItem.quantity,
                        price: updatedItem.product.price * updatedItem.quantity,
                        category_id: updatedItem.product.category_id,
                        product_id: updatedItem.product._id,
                    }
                };
                props.updateOrderItem(orderData);
            }
        })
    }, [noOfItems]);

    const totalPrice = (itemIndex) => {
        return cartItems[itemIndex].product.price * noOfItems[itemIndex];
    };

    const total = cartItems.reduce((acc, currentItem, itemIndex) => {
        return acc + totalPrice(itemIndex);
    }, 0);

    const bill = [
        { billitems: 'subTotal', billvalue: `${restaurant?.branches[0].currency} ${total.toFixed(2).toString()}` },
        { billitems: 'serviceFee', billvalue: `${restaurant?.branches[0].currency} ${restaurant?.branches[0].service_fee?.toFixed(2)}` },
        // { billitems: 'waitersTip', billvalue: `${cartItems[0].currency} 10.00` } // i am going to comment this because right now we are not handling this
    ];

    //code for form values
    const [values, setValues] = useState({
        firstName: '', lastName: '', email: '', mobileNumber: '',
        cardNumber: '', expireDate: '', cvc: '', cardholderName: '',
    });
    const [errors, setErrors] = useState({
        firstName: '', lastName: '', email: '', mobileNumber: '',
        cardNumber: '', expireDate: '', cvc: '', cardholderName: '',
    });
    const handleInputChange = (prop) => (event) => {

        setValues({ ...values, [prop]: event.target.value });
        setErrors({
            ...errors,
            [prop]: ''
        });
        console.log(values);
    };
    const history = useHistory();
    const handlePayNowBtn = (status) => {
        props.setPayStatus(status);
        // cartItems.forEach((item) => {
        //     const orderData = {
        //         sessionId: localStorage.getItem("sessionId"),
        //         orderId: localStorage.getItem("orderId"),
        //         split_type: 1,
        //         type: 1,
        //         user_id: '65fa8d79b94da3c8da28b50f',
        //         restaurant_branch_id: item.restaurant_branch_id,
        //         status: 3,
        //         personalDetails: {
        //             first_name: values.firstName ? values.firstName : "Muhammad",
        //             last_name: values.lastName ? values.lastName : "Fahad",
        //             email: values.email ? values.email : "abc@example.com",
        //             mobile_no: values.mobileNumber ? values.mobileNumber : "+923335976737"
        //         },
        //         cartDetails: {
        //             quantity: item.quantity, 
        //             price: item.price * item.quantity,
        //             category_id: item.category_id,
        //             product_id: item._id,
        //         }
        //     };
        //     props.updateOrder(orderData);
        // });

        let etisilat = paymentGatewaysList.find(item => item.title === 'Etisilat');

        let data = {
            session_id: localStorage.getItem('sessionId'),
            order_id: localStorage.getItem('orderId'),
            payment_gateway_id: selectedPaymentGateway
        };
        if (selectedPaymentGateway === etisilat?._id) {
            data.order_details = {
                ReturnPath: "http://localhost:3000/order-Placed",
                TransactionHint: "CPT:Y;VCC:Y;",
                Channel: "Web",
                Customer: "Demo Merchant",
                OrderName: "payBill"
            }
            props.createEtisilatOrderForPayment(data);
        }
        else {
            props.createRevoultOrderForPayment(data);
        }
    };
    const { themeValue } = useContext(ThemeContext);

    const handleCreateOrder = (status) => {
        props.setPayStatus(status);
        cartItems.forEach((item) => {
            const orderData = {
                sessionId: localStorage.getItem("sessionId"),
                orderId: localStorage.getItem("orderId"),
                cartId: item._id,
                split_type: 1,
                type: 1,
                user_id: '65fa8d79b94da3c8da28b50f',
                restaurant_branch_id: restaurant?.branches[0]?._id,
                status: status,
                personalDetails: {
                    first_name: values.firstName ? values.firstName : "Muhammad",
                    last_name: values.lastName ? values.lastName : "Fahad",
                    email: values.email ? values.email : "abc@example.com",
                    mobile_no: values.mobileNumber ? values.mobileNumber : "+923335976737"
                },
                cartDetails: {
                    quantity: item.quantity,
                    price: item.price,
                    category_id: item.category_id,
                    product_id: item.product_id,
                }
            };
            props.updateOrder(orderData);
        });
    };

    useEffect(() => {
        if (restaurant && props.branchList?.data?.length) {
            setBranch(props.branchList?.data.find(branch => branch._id === restaurant?.branches[0]?._id))
        }
    }, [restaurant, props.branchList])

    useEffect(() => {
        if (props?.createOrder) {
            console.log('createOrder reducer variable was already present');
            // clearCart();
            // localStorage.removeItem("cart");
            setTimeout(() => {
                history.push({ pathname: '/order-Placed', state: { ...props.location.state, payStatus: props.payStatus } });
                props.messageHandler();
            }, 1000)
        }
        else if (props?.error) {
            setTimeout(() => {
                props.messageHandler();
            }, 3000)
        }
    }, [props?.createOrder, props?.error, clearCart, history]);

    useEffect(() => {
        if (props?.updateOrderSuccess) {
            console.log('UpdateOrderSuccess reducer variable was already present');
            // clearCart();
            // localStorage.removeItem("cart");
            setTimeout(() => {
                history.push({ pathname: '/order-Placed', state: { ...props.location.state, payStatus: props.payStatus } });
                props.messageHandler();
            }, 1000)
        }
        else if (props?.error) {
            setTimeout(() => {
                props.messageHandler();
            }, 3000)
        }
    }, [props?.updateOrderSuccess, props?.error, clearCart, history]);

    useEffect(() => {
        if (props?.UpdatePayment) {
            console.log('UpdatePayment reducer variable was already present');
            // clearCart();
            // localStorage.removeItem("cart");
            setTimeout(() => {
                history.push({ pathname: '/order-Placed', state: { ...props.location.state, payStatus: props.payStatus } });
                props.paymentMessageHandler();
            }, 1000)
        }
        else if (props?.UpdatePaymentError) {
            console.log('PAYMENT UPDATE ERROR AT OUR END')
        }
    }, [props?.UpdatePayment, props?.UpdatePaymentError, clearCart, history]);

    useEffect(() => {
        if (props?.createRevoultOrderForPaymentSuccess) {
            const orderToken = props?.createRevoultOrderForPaymentSuccess.data?.token;
            orderId = props?.createRevoultOrderForPaymentSuccess.data?.id;
            paymentFunction(orderToken, orderId);
            props.messageHandler();
        }
        else if (props?.createRevoultOrderForPaymentError) {
            setTimeout(() => {
                props.messageHandler();
            }, 3000)
        }
    }, [props?.createRevoultOrderForPaymentSuccess, props?.createRevoultOrderForPaymentError]);

    useEffect(() => {
        if (props?.createEtisilatOrderForPaymentSuccess) {
            const paymentPortalUrl = props?.createEtisilatOrderForPaymentSuccess.data?.Transaction?.PaymentPortal;
            const transactionId = props?.createEtisilatOrderForPaymentSuccess.data?.Transaction?.TransactionID;

            // Create a form element
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = paymentPortalUrl;

            // Create a hidden input element for the TransactionID
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = 'TransactionID';
            hiddenField.value = transactionId;

            // Append the hidden input to the form
            form.appendChild(hiddenField);

            // Append the form to the body
            document.body.appendChild(form);

            // Submit the form
            form.submit();

            // Optionally, clean up by removing the form from the DOM
            document.body.removeChild(form);

            props.messageHandler();
        }
        else if (props?.createEtisilatOrderForPaymentError) {
            setTimeout(() => {
                props.messageHandler();
            }, 3000)
        }
    }, [props?.createEtisilatOrderForPaymentSuccess, props?.createEtisilatOrderForPaymentError]);

    useEffect(() => {
        if (props?.PaymentDetails && props.PaymentDetails?.data?.data?.length) {
            console.log('Payment Details', props.PaymentDetails?.data?.data)
            const transactionDetails = props.PaymentDetails?.data?.data[0];
            const updateTransactionDetails = {
                sessionId: localStorage.getItem("sessionId"),
                orderId: localStorage.getItem("orderId"),
                transaction_Details: transactionDetails
            }
            console.log('TD', updateTransactionDetails)
            props.updateOrderPayment(updateTransactionDetails);
        }
        else if (props?.PaymentError) {
            console.log('Payment Details error', props?.PaymentError)
            const updateTransactionDetails = {
                sessionId: localStorage.getItem("sessionId"),
                orderId: localStorage.getItem("orderId"),
                transaction_Details: {
                    order_id: orderId,
                    currentDate: new Date(),
                    message: 'Payment was successfull but failure to update transaction details in our system!',
                    payment_gateway: 'Revoult'
                }
            }
            props.updateOrderPayment(updateTransactionDetails);
        }
    }, [props?.PaymentDetails, props?.PaymentError]);

    const paymentFunction = async (orderToken, order_id) => {
        const { payWithPopup } = await RevolutCheckout(orderToken, 'sandbox')
        // Initialisation code will go here

        const popUp = payWithPopup({
            onSuccess() {
                props.retrievePaymentDetails({ order_id })
                // Do something to handle successful payments
            },
            onError(error) {
                // Do something to handle successful payments
                setCheckoutErrorMessage(error.message);
                setTimeout(() => {
                    setCheckoutErrorMessage(null);
                }, 3000)
            }
        })
    }

    return (
        <div className='mainDiv-sub' data-theme={themeValue}>
            {((props.error || props.createRevoultOrderForPaymentError || props.createEtisilatOrderForPaymentError || checkoutErrorMessage) && !props.loading) &&
                <Alert type={'error'} message={props.error?.message || props.createRevoultOrderForPaymentError || props.createEtisilatOrderForPaymentError || checkoutErrorMessage} />
            }

            {props.currentLanguage?.left_to_right === 1 &&
                <Container fixed>
                    <Grid container spacing={5} className={classes.root}>
                        <Grid item xs={12} sm={12} md={12} lg={7} className="mainleftDiv" >
                            <div className="dinIndiv">
                                <h1 className="dinIndiv-heading">{t('dineInAt')}</h1>
                                <div className="dinIn-subdiv">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                            <path d="M5.9168 17.5955C4.08164 15.3326 0 9.84814 0 6.76751C0 3.02987 3.02203 0 6.75 0C10.4766 0 13.5 3.02987 13.5 6.76751C13.5 9.84814 9.38672 15.3326 7.5832 17.5955C7.15078 18.1348 6.34922 18.1348 5.9168 17.5955ZM6.75 9.02335C7.99102 9.02335 9 8.01175 9 6.76751C9 5.52328 7.99102 4.51168 6.75 4.51168C5.50898 4.51168 4.5 5.52328 4.5 6.76751C4.5 8.01175 5.50898 9.02335 6.75 9.02335Z" fill="#010E16" />
                                        </svg>
                                    </span>
                                    <h3 className="subdivheading" >{props.restaurantSuccess?.data?.title}</h3>
                                </div>
                                <p className="address">{branch?.address}</p>
                            </div>

                            <div className="personalDiv">
                                <h2 className="divheading">{t('personalDetails')}</h2>
                                <div className="formdiv">
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <div>
                                                <Typography className="formLabel">{t('firstName')}</Typography>
                                                <div>
                                                    <span className="textfield-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><g clip-path="url(#clip0_1412_6262)"><path d="M7.5 7.49997C8.24168 7.49997 8.9667 7.28004 9.58339 6.86798C10.2001 6.45593 10.6807 5.87026 10.9645 5.18503C11.2484 4.49981 11.3226 3.74581 11.1779 3.01838C11.0333 2.29095 10.6761 1.62277 10.1517 1.09832C9.6272 0.573874 8.95902 0.216721 8.23159 0.0720264C7.50416 -0.0726682 6.75016 0.00159431 6.06494 0.285423C5.37971 0.569252 4.79404 1.0499 4.38199 1.66658C3.96993 2.28327 3.75 3.00829 3.75 3.74997C3.75099 4.74423 4.1464 5.69748 4.84945 6.40053C5.55249 7.10357 6.50574 7.49898 7.5 7.49997ZM7.5 1.24997C7.99445 1.24997 8.4778 1.39659 8.88893 1.6713C9.30005 1.946 9.62048 2.33645 9.8097 2.79326C9.99892 3.25008 10.0484 3.75274 9.95196 4.2377C9.8555 4.72265 9.6174 5.16811 9.26777 5.51774C8.91814 5.86737 8.47268 6.10547 7.98773 6.20193C7.50277 6.2984 7.00011 6.24889 6.54329 6.05967C6.08648 5.87045 5.69603 5.55002 5.42133 5.1389C5.14662 4.72777 5 4.24442 5 3.74997C5 3.08693 5.26339 2.45105 5.73223 1.9822C6.20107 1.51336 6.83696 1.24997 7.5 1.24997Z" fill="#374957" /><path d="M7.5 8.75037C6.00867 8.75202 4.57889 9.34518 3.52435 10.3997C2.46982 11.4543 1.87665 12.884 1.875 14.3754C1.875 14.5411 1.94085 14.7001 2.05806 14.8173C2.17527 14.9345 2.33424 15.0004 2.5 15.0004C2.66576 15.0004 2.82473 14.9345 2.94194 14.8173C3.05915 14.7001 3.125 14.5411 3.125 14.3754C3.125 13.215 3.58594 12.1022 4.40641 11.2818C5.22688 10.4613 6.33968 10.0004 7.5 10.0004C8.66032 10.0004 9.77312 10.4613 10.5936 11.2818C11.4141 12.1022 11.875 13.215 11.875 14.3754C11.875 14.5411 11.9408 14.7001 12.0581 14.8173C12.1753 14.9345 12.3342 15.0004 12.5 15.0004C12.6658 15.0004 12.8247 14.9345 12.9419 14.8173C13.0592 14.7001 13.125 14.5411 13.125 14.3754C13.1233 12.884 12.5302 11.4543 11.4756 10.3997C10.4211 9.34518 8.99133 8.75202 7.5 8.75037Z" fill="#374957" /></g><defs><clipPath id="clip0_1412_6262"><rect width="15" height="15" fill="white" /></clipPath></defs></svg>
                                                    </span>
                                                    <TextField id="firstName" fullWidth value={values.firstName} onChange={handleInputChange('firstName')} variant="outlined"  className='form-control-texfield' />    {/**placeholder={t('firstName')} */}
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div>
                                                <Typography className="formLabel">{t('lastName')}</Typography>
                                                <div>
                                                    <span className="textfield-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5 7.5C7.06812 7.5 8.75 5.81812 8.75 3.75C8.75 1.68187 7.06812 0 5 0C2.93187 0 1.25 1.68187 1.25 3.75C1.25 5.81812 2.93187 7.5 5 7.5ZM5 1.25C6.37875 1.25 7.5 2.37125 7.5 3.75C7.5 5.12875 6.37875 6.25 5 6.25C3.62125 6.25 2.5 5.12875 2.5 3.75C2.5 2.37125 3.62125 1.25 5 1.25ZM10 13.75V14.375C10 14.72 9.72 15 9.375 15C9.03 15 8.75 14.72 8.75 14.375V13.75C8.75 11.6819 7.06812 10 5 10C2.93187 10 1.25 11.6819 1.25 13.75V14.375C1.25 14.72 0.97 15 0.625 15C0.28 15 0 14.72 0 14.375V13.75C0 10.9931 2.24313 8.75 5 8.75C7.75688 8.75 10 10.9931 10 13.75ZM14.8106 6.38562L12.3156 8.8075C11.9525 9.17125 11.4606 9.37437 10.9375 9.37437C10.4144 9.37437 9.9225 9.17062 9.55313 8.80125L8.32125 7.6425C8.07 7.40625 8.05813 7.01062 8.295 6.75875C8.53188 6.5075 8.92688 6.49563 9.17875 6.7325L10.4237 7.90438C10.7181 8.19812 11.1706 8.185 11.4381 7.9175L13.9394 5.48875C14.1869 5.24812 14.5825 5.25438 14.8231 5.50188C15.0637 5.74938 15.0575 6.14563 14.81 6.38562H14.8106Z" fill="#374957" /></svg>
                                                    </span>
                                                    <TextField id="LastName" fullWidth value={values.lastName} onChange={handleInputChange('lastName')}  className='form-control-texfield' />  { /**placeholder={t('lastName')} */}
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className="formLabel">{t('email')}</Typography>
                                            <div>
                                                <span className="textfield-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><g clip-path="url(#clip0_1412_6260)"><path d="M11.875 0.625H3.125C2.2965 0.625992 1.50222 0.955551 0.916387 1.54139C0.330551 2.12722 0.000992411 2.9215 0 3.75L0 11.25C0.000992411 12.0785 0.330551 12.8728 0.916387 13.4586C1.50222 14.0445 2.2965 14.374 3.125 14.375H11.875C12.7035 14.374 13.4978 14.0445 14.0836 13.4586C14.6694 12.8728 14.999 12.0785 15 11.25V3.75C14.999 2.9215 14.6694 2.12722 14.0836 1.54139C13.4978 0.955551 12.7035 0.625992 11.875 0.625ZM3.125 1.875H11.875C12.2492 1.87574 12.6147 1.98845 12.9243 2.19863C13.234 2.40881 13.4737 2.70684 13.6125 3.05438L8.82625 7.84125C8.47402 8.19207 7.99713 8.38904 7.5 8.38904C7.00287 8.38904 6.52598 8.19207 6.17375 7.84125L1.3875 3.05438C1.52634 2.70684 1.76601 2.40881 2.07565 2.19863C2.3853 1.98845 2.75076 1.87574 3.125 1.875ZM11.875 13.125H3.125C2.62772 13.125 2.15081 12.9275 1.79917 12.5758C1.44754 12.2242 1.25 11.7473 1.25 11.25V4.6875L5.29 8.725C5.87664 9.31016 6.67141 9.63877 7.5 9.63877C8.32859 9.63877 9.12336 9.31016 9.71 8.725L13.75 4.6875V11.25C13.75 11.7473 13.5525 12.2242 13.2008 12.5758C12.8492 12.9275 12.3723 13.125 11.875 13.125Z" fill="#374957" /></g><defs><clipPath id="clip0_1412_6260"><rect width="15" height="15" fill="white" /></clipPath></defs></svg>
                                                </span>
                                                <TextField id="email" value={values.email} onChange={handleInputChange('email')}  fullWidth className='form-control-texfield' /> {/**placeholder={t('email')} */}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className="formLabel">{t('mobileno')}</Typography>
                                            <div>
                                                <span className="textfield-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><g clip-path="url(#clip0_1412_6257)"><path d="M9.375 0H5.625C4.7965 0.000992411 4.00222 0.330551 3.41639 0.916387C2.83055 1.50222 2.50099 2.2965 2.5 3.125V11.875C2.50099 12.7035 2.83055 13.4978 3.41639 14.0836C4.00222 14.6694 4.7965 14.999 5.625 15H9.375C10.2035 14.999 10.9978 14.6694 11.5836 14.0836C12.1694 13.4978 12.499 12.7035 12.5 11.875V3.125C12.499 2.2965 12.1694 1.50222 11.5836 0.916387C10.9978 0.330551 10.2035 0.000992411 9.375 0ZM5.625 1.25H9.375C9.87228 1.25 10.3492 1.44754 10.7008 1.79917C11.0525 2.15081 11.25 2.62772 11.25 3.125V10H3.75V3.125C3.75 2.62772 3.94754 2.15081 4.29917 1.79917C4.65081 1.44754 5.12772 1.25 5.625 1.25ZM9.375 13.75H5.625C5.12772 13.75 4.65081 13.5525 4.29917 13.2008C3.94754 12.8492 3.75 12.3723 3.75 11.875V11.25H11.25V11.875C11.25 12.3723 11.0525 12.8492 10.7008 13.2008C10.3492 13.5525 9.87228 13.75 9.375 13.75Z" fill="#374957" /><path d="M7.5 13.125C7.84518 13.125 8.125 12.8452 8.125 12.5C8.125 12.1548 7.84518 11.875 7.5 11.875C7.15482 11.875 6.875 12.1548 6.875 12.5C6.875 12.8452 7.15482 13.125 7.5 13.125Z" fill="#374957" /></g><defs><clipPath id="clip0_1412_6257"><rect width="15" height="15" fill="white" /></clipPath></defs></svg>
                                                </span>
                                                <TextField id="cellnumber" value={values.mobileNumber} onChange={handleInputChange('mobileNumber')} fullWidth  className='form-control-texfield' /> {/**placeholder={t('mobileno')} */}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>

                            <div className="paymentDiv">
                                <h2 className="divheading">{t('selectAPayMethod')}</h2>
                                <div style={{ marginTop: '15px' }}>
                                    <Grid container spacing={3}>
                                        {paymentGatewaysList.map((paymentGateway) => (
                                            <Grid item xs={12}>
                                                <div className="paymentDivone">
                                                    <div className="paymentdiv1stsection">
                                                        <span className="paymentDivicon">
                                                            <Radio
                                                                color="primary"
                                                                checked={selectedPaymentGateway === `${paymentGateway._id}`}
                                                                onChange={handleRadioChange}
                                                                value={`${paymentGateway._id}`}
                                                                name="radio-button-mastercard"
                                                                inputProps={{ 'aria-label': `${paymentGateway.title}` }}
                                                            />
                                                        </span>
                                                        <div className="paymentsubdiv">
                                                            <p className="paymentDivoneHeading">{paymentGateway.title}</p>
                                                        </div>
                                                    </div>
                                                    <div className="paymentimgdiv">
                                                        <img src={paymentGatewayIconsList.find((item) => item.key === paymentGateway.title).icon} className="paymentimg" />
                                                    </div>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </div>
                            {/* <div className="paymentDiv">
                                <h2 className="divheading">Select a Payment Method</h2>
                                <div style={{ marginTop: '15px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}  >
                                            <div className="paymentDivone">
                                                <div className="paymentdiv1stsection">
                                                    <span className="paymentDivicon">
                                                        <Radio
                                                            checked={selectedValue === 'MasterCard'}
                                                            onChange={handleRadioChange}
                                                            value="MasterCard"
                                                            name="radio-button-mastercard"
                                                            inputProps={{ 'aria-label': 'MasterCard' }}
                                                        />
                                                    </span>
                                                    <div className="paymentsubdiv">
                                                        <h4 className="paymentDivoneHeading">MasterCard</h4>
                                                        <p className="paymentDivonePara">1234 **** **** **12</p>
                                                    </div>
                                                </div>
                                                <div className="paymentimgdiv">
                                                    <img src={masterCard} className="paymentimg" />
                                                </div>
                                            </div>
                                        </Grid> */}
                            {/* code for credit card or debit card section */}
                            {/* <Grid item xs={12}>
                                            <div className="paymentDivtwo">
                                                <div>
                                                    <span className="paymentDivtwoicon">
                                                        <Radio
                                                            checked={selectedValue === 'CreditCard'}
                                                            onChange={handleRadioChange}
                                                            value="CreditCard"
                                                            name="radio-button-creditCard"
                                                            inputProps={{ 'aria-label': 'CreditCard' }}
                                                        />
                                                    </span>
                                                    <h2 className="paymentDivtwoheading">Add Credit Or Debit Card</h2>
                                                </div>
                                                <div className="payment-form">
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography className="formLabel">{i18n.t('cardNumber')}</Typography>
                                                            <TextField id="cardNumber" value={values.cardNumber} onChange={handleInputChange('cardNumber')} fullWidth placeholder="1234 1234 1234 1234" className='form-control-texfield' />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography className="formLabel">Expire Date</Typography>
                                                            <TextField id="expiredate" defaultValue={values.expireDate} fullWidth
                                                                onChange={handleInputChange('expiredate')}
                                                                type="date" placeholder="27/02/2024" className='form-control-texfield'
                                                            //defaultValue="26/02/2024"// InputLabelProps={{shrink: true,}}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography className="formLabel">CVC</Typography>
                                                            <TextField id="cvc" value={values.cvc} onChange={handleInputChange('cvc')} fullWidth placeholder="123" className='form-control-texfield' />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography className="formLabel">Card Holder Name</Typography>
                                                            <TextField id="cardHolderName" value={values.cardholderName} onChange={handleInputChange('cardHolderName')} fullWidth placeholder="xyz" className='form-control-texfield' />
                                                        </Grid>

                                                    </Grid>
                                                </div>
                                                <div className="paymenttickdiv">
                                                    <Checkbox
                                                        defaultChecked
                                                        checked={checked}
                                                        onChange={handleChange}
                                                        className="payment-checkbox"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    />
                                                    <p className="savecard"> Save this card for faster checkout next time.</p>
                                                </div>
                                            </div>
                                        </Grid> */}

                            {/* code for apple pay */}
                            {/* <Grid item xs={12}  >
                                            <div className="paymentDivone">
                                                <div className="paymentdiv1stsection">
                                                    <span className="paymentDivicon">
                                                        <Radio
                                                            checked={selectedPayValue === 'ApplePay'}
                                                            onChange={handlePayRadioChange}
                                                            value="ApplePay"
                                                            name="radio-button-applepay"
                                                            inputProps={{ 'aria-label': 'applePay' }}
                                                        /> */}
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                    <path d="M9.08203 0.453003C4.25419 0.453003 0.335938 4.26572 0.335938 8.96354C0.335938 13.6613 4.25419 17.4741 9.08203 17.4741C13.9099 17.4741 17.8281 13.6613 17.8281 8.96354C17.8281 4.26572 13.9099 0.453003 9.08203 0.453003ZM9.08203 15.772C5.21626 15.772 2.08516 12.7252 2.08516 8.96354C2.08516 5.20188 5.21626 2.15511 9.08203 2.15511C12.9478 2.15511 16.0789 5.20188 16.0789 8.96354C16.0789 12.7252 12.9478 15.772 9.08203 15.772Z" fill="#1B6BC5" fill-opacity="0.5"/>
                                                                </svg> */}
                            {/* </span>
                                                    <div className="paymentsubdiv">
                                                        <h4 className="paymentDivoneHeading">Apple Pay</h4>
                                                    </div>
                                                </div>
                                                <div className="paymentimgdiv">
                                                    <img src={applepay} className="paymentimg" />
                                                </div>
                                            </div>
                                        </Grid> */}

                            {/* code for google pay */}
                            {/* <Grid item xs={12}  >
                                            <div className="paymentDivone">
                                                <div className="paymentdiv1stsection">
                                                    <span className="paymentDivicon">
                                                        <Radio
                                                            color="blue"
                                                            checked={selectedPayValue === 'GooglePay'}
                                                            onChange={handlePayRadioChange}
                                                            value="GooglePay"
                                                            name="radio-button-googlepay"
                                                            inputProps={{ 'aria-label': 'googlepay' }}
                                                        />
                                                    </span>
                                                    <div className="paymentsubdiv">
                                                        <h4 className="paymentDivoneHeading">Google Pay</h4>
                                                    </div>
                                                </div>
                                                <div className="paymentimgdiv">
                                                    <img src={googlepay} className="paymentimg" />
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <div className="savebtndiv">
                                <Button onClick={handlePayNowBtn}><span className="savebtntext">Save And Proceed</span></Button>
                            </div> */}
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={5}>
                            <div className="cardDetails">
                                <h2 className="cardDetail-divheading">{t('cartDetails')}</h2>
                                <Container>
                                <Scrollbars className="cartDetail-scrollbar">
                                    <Grid container spacing={3}>
                                        {cartItems.map((item, index) => (
                                            <Grid item xs={12} >
                                                <Card className={`${classes.rootCart} menu-cart-box-style `}>
                                                    {
                                                        item.product?.image ?
                                                            <img src={item.product?.image} alt={item.product?.title} />
                                                            :
                                                            <div className='no-img'></div>
                                                    }
                                                    <CardContent className='card-content-divs'>
                                                        <div className='cart-name-text-detail'>
                                                            <h2>{(item.product?.product_language && item.product?.product_language.title !== '') ? item.product?.product_language.title : item.product?.title}</h2>
                                                            <p>{(item.product?.product_language && item.product?.product_language.details !== '') ? item.product?.product_language.details : item.product?.details}</p>

                                                        </div>
                                                        <div className='itm-dtl-price'>
                                                            <div className='item-price-value'>
                                                                {/* <span>BGN.{item.price}/-</span> */}
                                                                <span className='price-span'><span className='price-tag-span'>{restaurant?.branches[0].currency}.</span>
                                                                    {(totalPrice(index)).toFixed(2)}/-</span> {/* Display total price */}

                                                                <FormControl className="no-of-item">
                                                                    <Select className='slect-no'
                                                                        labelId={`demo-customized-select-label-${index}`}
                                                                        id={`demo-customized-select-${index}`}
                                                                        value={noOfItems[index]} // Use the value from state array
                                                                        onChange={(event) => handleNoOfItem(index, event.target.value)} // Pass index to identify which select menu is being changed
                                                                    >
                                                                        <MenuItem value={1}>1</MenuItem>
                                                                        <MenuItem value={2}>2</MenuItem>
                                                                        <MenuItem value={3}>3</MenuItem>
                                                                        <MenuItem value={4}>4</MenuItem>
                                                                        <MenuItem value={5}>5</MenuItem>
                                                                        <MenuItem value={6}>6</MenuItem>
                                                                        <MenuItem value={7}>7</MenuItem>
                                                                        <MenuItem value={8}>8</MenuItem>
                                                                        <MenuItem value={9}>9</MenuItem>
                                                                        <MenuItem value={10}>10</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                      
                                    </Grid>
                                </Scrollbars>
                                </Container>

                                {/* <div> */}
                                {/* div for add tip */}
                                {/* <Typography className="add-tip">Would You Like to Add a Tip?</Typography>
                                    <div className="tip-price">
                                        <grid container spacing={3}>
                                            {tip.map((tip, index) => (
                                                <grid item xs={12} sm={12} md={12} lg={12} style={{ padding: '10px' }}>
                                                    <span className="tip-price-tags">{tip.bgn}</span>
                                                </grid>
                                            ))}
                                        </grid>
                                    </div> */}
                                {/* </div> */}

                                <div>{/*Parent Div*/}

                                    <div>{/** Billing Summary */}
                                        <h1 className="billing-summary">{t('billingDetail')}</h1>
                                        {bill.map((bill, index) => (
                                            <div className="bill-div">
                                                <Typography>
                                                    <span className="bill-item-name">{t(bill.billitems)}</span>
                                                </Typography>
                                                <Typography>
                                                    <span className="bill-value">{bill.billvalue}</span>
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>

                                    <span className="dotedline">
                                        <p className="doted-line"></p>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="406" height="2" viewBox="0 0 406 2" fill="none"><path d="M0 1H406" stroke="#D9D9D9" stroke-width="0.979019" stroke-dasharray="4.9 4.9"/></svg> */}
                                    </span>

                                    <div className="totalbill">
                                        <h1 className="totalbill-heading">{t('totalBill')}</h1>
                                        <Typography className="totalbill-value">{restaurant?.branches[0].currency} {`${(total + restaurant?.branches[0].service_fee).toFixed(2)}`}</Typography>
                                    </div>

                                    <span className="dotedline">
                                        <p className="doted-line"></p>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="406" height="2" viewBox="0 0 406 2" fill="none"><path d="M0 1H406" stroke="#D9D9D9" stroke-width="0.979019" stroke-dasharray="4.9 4.9"/></svg> */}
                                    </span>

                                    <Typography className="when-you-pay">
                                        {t('selectYouWantToPay')}
                                    </Typography>

                                    <div className="card-details-btn">
                                        {
                                            (restaurant?.branches[0].pay_now === 1 || restaurant?.branches[0].pay_now === 3) &&
                                            <div className="pay-now-btn" onClick={() => handlePayNowBtn(1)}>
                                                <Button className="position-relative"><span className="paynowtext">{t('payNow')}</span>
                                                    {(props.loading && props.payStatus === 1) && <CircularProgress size={16} className='payloading color-white' />}
                                                </Button>
                                            </div>
                                        }
                                        {
                                            (restaurant?.branches[0].pay_now === 2 || restaurant?.branches[0].pay_now === 3) &&
                                            <div className="pay-later-btn" onClick={() => handleCreateOrder(3)}>
                                                <Button className="position-relative"><span className="paylatertext">{t('payLater')}</span>
                                                    {(props.loading && props.payStatus === 3) && <CircularProgress size={16} className='payloading' />}
                                                </Button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            }

            {props.currentLanguage?.left_to_right === 0 &&
                <Container fixed>
                    <Grid container spacing={5} className={classes.root}>
                        <Grid item xs={12} sm={12} md={12} lg={5} style={{ order: isMediumScreen ? 2 : 1 }}>
                            <div className="cardDetails">
                                <h2 className="cardDetail-divheading cardDetail-divheading-rtl">{t('cartDetails')}</h2>
                                <Container>
                                    <Scrollbars className="cartDetail-scrollbar  cartDetail-scrollbar-rtl">
                                    `    <Grid container spacing={3} >
                                            {cartItems.map((item, index) => (
                                                <Grid item xs={12} >
                                                    <Card className={`${classes.rootCart} menu-cart-box-style menu-cart-box-style-rtl `}>
                                                    {
                                                            item.product?.image ?
                                                                <img src={item.product?.image} alt={item.product?.title} />
                                                                :
                                                                <div className='no-img'></div>
                                                        }
                                                        <CardContent className='card-content-divs'>
                                                            <div className='cart-name-text-detail'>
                                                                <h2>{(item.product?.product_language && item.product?.product_language.title !== '') ? item.product?.product_language.title : item.product?.title}</h2>
                                                                <p>{(item.product?.product_language && item.product?.product_language.details !== '') ? item.product?.product_language.details : item.product?.details}</p>

                                                            </div>
                                                            <div className='itm-dtl-price'>
                                                                <div className='item-price-value'>
                                                                    {/* <span>BGN.{item.price}/-</span> */}
                                                                    <span className='price-span'><span className='price-tag-span'>{restaurant?.branches[0].currency}.</span>
                                                                        {(totalPrice(index)).toFixed(2)}/-</span> {/* Display total price */}

                                                                    <FormControl className="no-of-item-rtl">
                                                                        <Select className='slect-no'
                                                                            labelId={`demo-customized-select-label-${index}`}
                                                                            id={`demo-customized-select-${index}`}
                                                                            value={noOfItems[index]} // Use the value from state array
                                                                            onChange={(event) => handleNoOfItem(index, event.target.value)} // Pass index to identify which select menu is being changed
                                                                        >
                                                                            <MenuItem value={1}>1</MenuItem>
                                                                            <MenuItem value={2}>2</MenuItem>
                                                                            <MenuItem value={3}>3</MenuItem>
                                                                            <MenuItem value={4}>4</MenuItem>
                                                                            <MenuItem value={5}>5</MenuItem>
                                                                            <MenuItem value={6}>6</MenuItem>
                                                                            <MenuItem value={7}>7</MenuItem>
                                                                            <MenuItem value={8}>8</MenuItem>
                                                                            <MenuItem value={9}>9</MenuItem>
                                                                            <MenuItem value={10}>10</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                        
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>`
                                    </Scrollbars>
                                </Container>

                                {/* <div> */}
                                {/* div for add tip */}
                                {/* <Typography className="add-tip">Would You Like to Add a Tip?</Typography>
                                    <div className="tip-price">
                                        <grid container spacing={3}>
                                            {tip.map((tip, index) => (
                                                <grid item xs={12} sm={12} md={12} lg={12} style={{ padding: '10px' }}>
                                                    <span className="tip-price-tags">{tip.bgn}</span>
                                                </grid>
                                            ))}
                                        </grid>
                                    </div> */}
                                {/* </div> */}

                                <div>{/*Parent Div*/}

                                    <div>{/** Billing Summary */}
                                        <h1 className="billing-summary billing-summary-rtl">{t('billingDetail')}</h1>
                                        {bill.map((bill, index) => (
                                            <div className="bill-div bill-div-rtl">
                                                <Typography>
                                                    <span className="bill-value bill-value-rtl">{bill.billvalue}</span>
                                                </Typography>
                                                <Typography>
                                                    <span className="bill-item-name">{t(bill.billitems)}</span>
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>

                                    <span className="dotedline">
                                        <p className="doted-line"></p>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="406" height="2" viewBox="0 0 406 2" fill="none"><path d="M0 1H406" stroke="#D9D9D9" stroke-width="0.979019" stroke-dasharray="4.9 4.9"/></svg> */}
                                    </span>

                                    <div className="totalbill">
                                        <Typography className="totalbill-value totalbill-value-rtl">{restaurant?.branches[0].currency} {`${(total + restaurant?.branches[0].service_fee).toFixed(2)}`}</Typography>
                                        <h1 className="totalbill-heading totalbill-heading-rtl">{t('totalBill')}</h1>
                                    </div>

                                    <span className="dotedline">
                                        <p className="doted-line"></p>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="406" height="2" viewBox="0 0 406 2" fill="none"><path d="M0 1H406" stroke="#D9D9D9" stroke-width="0.979019" stroke-dasharray="4.9 4.9"/></svg> */}
                                    </span>

                                    <Typography className="when-you-pay when-you-pay-rtl">
                                        {t('selectYouWantToPay')}
                                    </Typography>

                                    <div className="card-details-btn">
                                        {
                                            (restaurant?.branches[0].pay_now === 1 || restaurant?.branches[0].pay_now === 3) &&
                                            <div className="pay-now-btn" onClick={() => handlePayNowBtn(1)}>
                                                <Button className="position-relative"><span className="paynowtext">{t('payNow')}</span>
                                                    {(props.loading && props.payStatus === 1) && <CircularProgress size={16} className='payloading color-white' />}
                                                </Button>
                                            </div>
                                        }
                                        {
                                            (restaurant?.branches[0].pay_now === 2 || restaurant?.branches[0].pay_now === 3) &&
                                            <div className="pay-later-btn" onClick={() => handleCreateOrder(3)}>
                                                <Button className="position-relative"><span className="paylatertext">{t('payLater')}</span>
                                                    {(props.loading && props.payStatus === 3) && <CircularProgress size={16} className='payloading' />}
                                                </Button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={7} className="mainleftDiv" style={{ order: isMediumScreen ? 1 : 2 }}>
                            <div className="dinIndiv">
                                <h1 className="dinIndiv-heading dinIndiv-heading-rtl">{t('dineInAt')}</h1>
                                <div className="dinIn-subdiv dinIn-subdiv-rtl">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                            <path d="M5.9168 17.5955C4.08164 15.3326 0 9.84814 0 6.76751C0 3.02987 3.02203 0 6.75 0C10.4766 0 13.5 3.02987 13.5 6.76751C13.5 9.84814 9.38672 15.3326 7.5832 17.5955C7.15078 18.1348 6.34922 18.1348 5.9168 17.5955ZM6.75 9.02335C7.99102 9.02335 9 8.01175 9 6.76751C9 5.52328 7.99102 4.51168 6.75 4.51168C5.50898 4.51168 4.5 5.52328 4.5 6.76751C4.5 8.01175 5.50898 9.02335 6.75 9.02335Z" fill="#010E16" />
                                        </svg>
                                    </span>
                                    <h3 className="subdivheading subdivheading-rtl" >{props.restaurantSuccess?.data?.title}</h3>
                                </div>
                                <p className="address address-rtl">{branch?.address}</p>
                            </div>

                            <div className="personalDiv">
                                <h2 className="divheading divheading-rtl">{t('personalDetails')}</h2>
                                <div className="formdiv">
                                    <Grid container spacing={3}>
                                        <Grid item lg={6} md={6} xs={12} style={{ order: isLargeScreen ? 2 : 1 }}>
                                            <div>
                                                <Typography className="formLabel formLabel-rtl">{t('firstName')}</Typography>
                                                <div className="position-relative">
                                                    <span className="textfield-icon-rtl">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><g clip-path="url(#clip0_1412_6262)"><path d="M7.5 7.49997C8.24168 7.49997 8.9667 7.28004 9.58339 6.86798C10.2001 6.45593 10.6807 5.87026 10.9645 5.18503C11.2484 4.49981 11.3226 3.74581 11.1779 3.01838C11.0333 2.29095 10.6761 1.62277 10.1517 1.09832C9.6272 0.573874 8.95902 0.216721 8.23159 0.0720264C7.50416 -0.0726682 6.75016 0.00159431 6.06494 0.285423C5.37971 0.569252 4.79404 1.0499 4.38199 1.66658C3.96993 2.28327 3.75 3.00829 3.75 3.74997C3.75099 4.74423 4.1464 5.69748 4.84945 6.40053C5.55249 7.10357 6.50574 7.49898 7.5 7.49997ZM7.5 1.24997C7.99445 1.24997 8.4778 1.39659 8.88893 1.6713C9.30005 1.946 9.62048 2.33645 9.8097 2.79326C9.99892 3.25008 10.0484 3.75274 9.95196 4.2377C9.8555 4.72265 9.6174 5.16811 9.26777 5.51774C8.91814 5.86737 8.47268 6.10547 7.98773 6.20193C7.50277 6.2984 7.00011 6.24889 6.54329 6.05967C6.08648 5.87045 5.69603 5.55002 5.42133 5.1389C5.14662 4.72777 5 4.24442 5 3.74997C5 3.08693 5.26339 2.45105 5.73223 1.9822C6.20107 1.51336 6.83696 1.24997 7.5 1.24997Z" fill="#374957" /><path d="M7.5 8.75037C6.00867 8.75202 4.57889 9.34518 3.52435 10.3997C2.46982 11.4543 1.87665 12.884 1.875 14.3754C1.875 14.5411 1.94085 14.7001 2.05806 14.8173C2.17527 14.9345 2.33424 15.0004 2.5 15.0004C2.66576 15.0004 2.82473 14.9345 2.94194 14.8173C3.05915 14.7001 3.125 14.5411 3.125 14.3754C3.125 13.215 3.58594 12.1022 4.40641 11.2818C5.22688 10.4613 6.33968 10.0004 7.5 10.0004C8.66032 10.0004 9.77312 10.4613 10.5936 11.2818C11.4141 12.1022 11.875 13.215 11.875 14.3754C11.875 14.5411 11.9408 14.7001 12.0581 14.8173C12.1753 14.9345 12.3342 15.0004 12.5 15.0004C12.6658 15.0004 12.8247 14.9345 12.9419 14.8173C13.0592 14.7001 13.125 14.5411 13.125 14.3754C13.1233 12.884 12.5302 11.4543 11.4756 10.3997C10.4211 9.34518 8.99133 8.75202 7.5 8.75037Z" fill="#374957" /></g><defs><clipPath id="clip0_1412_6262"><rect width="15" height="15" fill="white" /></clipPath></defs></svg>
                                                    </span>
                                                    <TextField id="firstName" fullWidth value={values.firstName} onChange={handleInputChange('firstName')} variant="outlined"  className='form-control-texfield form-control-texfield-rtl' /> { /**placeholder={t('firstName')} */}
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} md={6} xs={12} style={{ order: isLargeScreen ? 1 : 2 }}>
                                            <div>
                                                <Typography className="formLabel formLabel-rtl">{t('lastName')}</Typography>
                                                <div className="position-relative">
                                                    <span className="textfield-icon-rtl">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5 7.5C7.06812 7.5 8.75 5.81812 8.75 3.75C8.75 1.68187 7.06812 0 5 0C2.93187 0 1.25 1.68187 1.25 3.75C1.25 5.81812 2.93187 7.5 5 7.5ZM5 1.25C6.37875 1.25 7.5 2.37125 7.5 3.75C7.5 5.12875 6.37875 6.25 5 6.25C3.62125 6.25 2.5 5.12875 2.5 3.75C2.5 2.37125 3.62125 1.25 5 1.25ZM10 13.75V14.375C10 14.72 9.72 15 9.375 15C9.03 15 8.75 14.72 8.75 14.375V13.75C8.75 11.6819 7.06812 10 5 10C2.93187 10 1.25 11.6819 1.25 13.75V14.375C1.25 14.72 0.97 15 0.625 15C0.28 15 0 14.72 0 14.375V13.75C0 10.9931 2.24313 8.75 5 8.75C7.75688 8.75 10 10.9931 10 13.75ZM14.8106 6.38562L12.3156 8.8075C11.9525 9.17125 11.4606 9.37437 10.9375 9.37437C10.4144 9.37437 9.9225 9.17062 9.55313 8.80125L8.32125 7.6425C8.07 7.40625 8.05813 7.01062 8.295 6.75875C8.53188 6.5075 8.92688 6.49563 9.17875 6.7325L10.4237 7.90438C10.7181 8.19812 11.1706 8.185 11.4381 7.9175L13.9394 5.48875C14.1869 5.24812 14.5825 5.25438 14.8231 5.50188C15.0637 5.74938 15.0575 6.14563 14.81 6.38562H14.8106Z" fill="#374957" /></svg>
                                                    </span>
                                                    <TextField id="LastName" fullWidth value={values.lastName} onChange={handleInputChange('lastName')}  className='form-control-texfield form-control-texfield-rtl' /> {/**placeholder={t('lastName')} */}
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} style={{ order: 3 }}>
                                            <Typography className="formLabel formLabel-rtl">{t('email')}</Typography>
                                            <div className="position-relative">
                                                <span className="textfield-icon-rtl">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><g clip-path="url(#clip0_1412_6260)"><path d="M11.875 0.625H3.125C2.2965 0.625992 1.50222 0.955551 0.916387 1.54139C0.330551 2.12722 0.000992411 2.9215 0 3.75L0 11.25C0.000992411 12.0785 0.330551 12.8728 0.916387 13.4586C1.50222 14.0445 2.2965 14.374 3.125 14.375H11.875C12.7035 14.374 13.4978 14.0445 14.0836 13.4586C14.6694 12.8728 14.999 12.0785 15 11.25V3.75C14.999 2.9215 14.6694 2.12722 14.0836 1.54139C13.4978 0.955551 12.7035 0.625992 11.875 0.625ZM3.125 1.875H11.875C12.2492 1.87574 12.6147 1.98845 12.9243 2.19863C13.234 2.40881 13.4737 2.70684 13.6125 3.05438L8.82625 7.84125C8.47402 8.19207 7.99713 8.38904 7.5 8.38904C7.00287 8.38904 6.52598 8.19207 6.17375 7.84125L1.3875 3.05438C1.52634 2.70684 1.76601 2.40881 2.07565 2.19863C2.3853 1.98845 2.75076 1.87574 3.125 1.875ZM11.875 13.125H3.125C2.62772 13.125 2.15081 12.9275 1.79917 12.5758C1.44754 12.2242 1.25 11.7473 1.25 11.25V4.6875L5.29 8.725C5.87664 9.31016 6.67141 9.63877 7.5 9.63877C8.32859 9.63877 9.12336 9.31016 9.71 8.725L13.75 4.6875V11.25C13.75 11.7473 13.5525 12.2242 13.2008 12.5758C12.8492 12.9275 12.3723 13.125 11.875 13.125Z" fill="#374957" /></g><defs><clipPath id="clip0_1412_6260"><rect width="15" height="15" fill="white" /></clipPath></defs></svg>
                                                </span>
                                                <TextField id="email" value={values.email} onChange={handleInputChange('email')}  fullWidth className='form-control-texfield form-control-texfield-rtl' />  {/**placeholder={t('email')} */}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} style={{ order: 4 }}>
                                            <Typography className="formLabel formLabel-rtl">{t('mobileno')}</Typography>
                                            <div className="position-relative">
                                                <span className="textfield-icon-rtl">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><g clip-path="url(#clip0_1412_6257)"><path d="M9.375 0H5.625C4.7965 0.000992411 4.00222 0.330551 3.41639 0.916387C2.83055 1.50222 2.50099 2.2965 2.5 3.125V11.875C2.50099 12.7035 2.83055 13.4978 3.41639 14.0836C4.00222 14.6694 4.7965 14.999 5.625 15H9.375C10.2035 14.999 10.9978 14.6694 11.5836 14.0836C12.1694 13.4978 12.499 12.7035 12.5 11.875V3.125C12.499 2.2965 12.1694 1.50222 11.5836 0.916387C10.9978 0.330551 10.2035 0.000992411 9.375 0ZM5.625 1.25H9.375C9.87228 1.25 10.3492 1.44754 10.7008 1.79917C11.0525 2.15081 11.25 2.62772 11.25 3.125V10H3.75V3.125C3.75 2.62772 3.94754 2.15081 4.29917 1.79917C4.65081 1.44754 5.12772 1.25 5.625 1.25ZM9.375 13.75H5.625C5.12772 13.75 4.65081 13.5525 4.29917 13.2008C3.94754 12.8492 3.75 12.3723 3.75 11.875V11.25H11.25V11.875C11.25 12.3723 11.0525 12.8492 10.7008 13.2008C10.3492 13.5525 9.87228 13.75 9.375 13.75Z" fill="#374957" /><path d="M7.5 13.125C7.84518 13.125 8.125 12.8452 8.125 12.5C8.125 12.1548 7.84518 11.875 7.5 11.875C7.15482 11.875 6.875 12.1548 6.875 12.5C6.875 12.8452 7.15482 13.125 7.5 13.125Z" fill="#374957" /></g><defs><clipPath id="clip0_1412_6257"><rect width="15" height="15" fill="white" /></clipPath></defs></svg>
                                                </span>
                                                <TextField id="cellnumber" value={values.mobileNumber} onChange={handleInputChange('mobileNumber')} fullWidth className='form-control-texfield form-control-texfield-rtl' /> {/* placeholder={t('mobileno')}*/}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>

                            <div className="paymentDiv">
                                <h2 className="divheading divheading-rtl">{t('selectAPayMethod')}</h2>
                                <div style={{ marginTop: '15px' }}>
                                    <Grid container spacing={3}>
                                        {paymentGatewaysList.map((paymentGateway) => (
                                            <Grid item xs={12}>
                                                <div className="paymentDivone paymentDivone-rtl">
                                                    <div className="paymentdiv1stsection paymentdiv1stsection-rtl">
                                                        <span className="paymentDivicon">
                                                            <Radio
                                                                color="primary"
                                                                checked={selectedPaymentGateway === `${paymentGateway._id}`}
                                                                onChange={handleRadioChange}
                                                                value={`${paymentGateway._id}`}
                                                                name="radio-button-mastercard"
                                                                inputProps={{ 'aria-label': `${paymentGateway.title}` }}
                                                            />
                                                        </span>
                                                        <div className="paymentsubdiv">
                                                            <p className="paymentDivoneHeading">{paymentGateway.title}</p>
                                                        </div>
                                                    </div>
                                                    <div className="paymentimgdiv">
                                                        <img src={paymentGatewayIconsList.find((item) => item.key === paymentGateway.title).icon} className="paymentimg" />
                                                    </div>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </div>
                            {/* <div className="paymentDiv">
                                <h2 className="divheading">Select a Payment Method</h2>
                                <div style={{ marginTop: '15px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}  >
                                            <div className="paymentDivone">
                                                <div className="paymentdiv1stsection">
                                                    <span className="paymentDivicon">
                                                        <Radio
                                                            checked={selectedValue === 'MasterCard'}
                                                            onChange={handleRadioChange}
                                                            value="MasterCard"
                                                            name="radio-button-mastercard"
                                                            inputProps={{ 'aria-label': 'MasterCard' }}
                                                        />
                                                    </span>
                                                    <div className="paymentsubdiv">
                                                        <h4 className="paymentDivoneHeading">MasterCard</h4>
                                                        <p className="paymentDivonePara">1234 **** **** **12</p>
                                                    </div>
                                                </div>
                                                <div className="paymentimgdiv">
                                                    <img src={masterCard} className="paymentimg" />
                                                </div>
                                            </div>
                                        </Grid> */}
                            {/* code for credit card or debit card section */}
                            {/* <Grid item xs={12}>
                                            <div className="paymentDivtwo">
                                                <div>
                                                    <span className="paymentDivtwoicon">
                                                        <Radio
                                                            checked={selectedValue === 'CreditCard'}
                                                            onChange={handleRadioChange}
                                                            value="CreditCard"
                                                            name="radio-button-creditCard"
                                                            inputProps={{ 'aria-label': 'CreditCard' }}
                                                        />
                                                    </span>
                                                    <h2 className="paymentDivtwoheading">Add Credit Or Debit Card</h2>
                                                </div>
                                                <div className="payment-form">
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography className="formLabel">{i18n.t('cardNumber')}</Typography>
                                                            <TextField id="cardNumber" value={values.cardNumber} onChange={handleInputChange('cardNumber')} fullWidth placeholder="1234 1234 1234 1234" className='form-control-texfield' />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography className="formLabel">Expire Date</Typography>
                                                            <TextField id="expiredate" defaultValue={values.expireDate} fullWidth
                                                                onChange={handleInputChange('expiredate')}
                                                                type="date" placeholder="27/02/2024" className='form-control-texfield'
                                                            //defaultValue="26/02/2024"// InputLabelProps={{shrink: true,}}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography className="formLabel">CVC</Typography>
                                                            <TextField id="cvc" value={values.cvc} onChange={handleInputChange('cvc')} fullWidth placeholder="123" className='form-control-texfield' />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography className="formLabel">Card Holder Name</Typography>
                                                            <TextField id="cardHolderName" value={values.cardholderName} onChange={handleInputChange('cardHolderName')} fullWidth placeholder="xyz" className='form-control-texfield' />
                                                        </Grid>

                                                    </Grid>
                                                </div>
                                                <div className="paymenttickdiv">
                                                    <Checkbox
                                                        defaultChecked
                                                        checked={checked}
                                                        onChange={handleChange}
                                                        className="payment-checkbox"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    />
                                                    <p className="savecard"> Save this card for faster checkout next time.</p>
                                                </div>
                                            </div>
                                        </Grid> */}

                            {/* code for apple pay */}
                            {/* <Grid item xs={12}  >
                                            <div className="paymentDivone">
                                                <div className="paymentdiv1stsection">
                                                    <span className="paymentDivicon">
                                                        <Radio
                                                            checked={selectedPayValue === 'ApplePay'}
                                                            onChange={handlePayRadioChange}
                                                            value="ApplePay"
                                                            name="radio-button-applepay"
                                                            inputProps={{ 'aria-label': 'applePay' }}
                                                        /> */}
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                    <path d="M9.08203 0.453003C4.25419 0.453003 0.335938 4.26572 0.335938 8.96354C0.335938 13.6613 4.25419 17.4741 9.08203 17.4741C13.9099 17.4741 17.8281 13.6613 17.8281 8.96354C17.8281 4.26572 13.9099 0.453003 9.08203 0.453003ZM9.08203 15.772C5.21626 15.772 2.08516 12.7252 2.08516 8.96354C2.08516 5.20188 5.21626 2.15511 9.08203 2.15511C12.9478 2.15511 16.0789 5.20188 16.0789 8.96354C16.0789 12.7252 12.9478 15.772 9.08203 15.772Z" fill="#1B6BC5" fill-opacity="0.5"/>
                                                                </svg> */}
                            {/* </span>
                                                    <div className="paymentsubdiv">
                                                        <h4 className="paymentDivoneHeading">Apple Pay</h4>
                                                    </div>
                                                </div>
                                                <div className="paymentimgdiv">
                                                    <img src={applepay} className="paymentimg" />
                                                </div>
                                            </div>
                                        </Grid> */}

                            {/* code for google pay */}
                            {/* <Grid item xs={12}  >
                                            <div className="paymentDivone">
                                                <div className="paymentdiv1stsection">
                                                    <span className="paymentDivicon">
                                                        <Radio
                                                            color="blue"
                                                            checked={selectedPayValue === 'GooglePay'}
                                                            onChange={handlePayRadioChange}
                                                            value="GooglePay"
                                                            name="radio-button-googlepay"
                                                            inputProps={{ 'aria-label': 'googlepay' }}
                                                        />
                                                    </span>
                                                    <div className="paymentsubdiv">
                                                        <h4 className="paymentDivoneHeading">Google Pay</h4>
                                                    </div>
                                                </div>
                                                <div className="paymentimgdiv">
                                                    <img src={googlepay} className="paymentimg" />
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <div className="savebtndiv">
                                <Button onClick={handlePayNowBtn}><span className="savebtntext">Save And Proceed</span></Button>
                            </div> */}
                        </Grid>
                    </Grid>
                </Container>
            }
        </div>
    );
}

// what is needed at start
const mapStateToProps = ({ restaurantReducer, branchReducer, languageReducer, paymentReducer }) => {
    const { loading, error, success, createOrder, updateOrderSuccess, createRevoultOrderForPaymentSuccess, createRevoultOrderForPaymentError, createEtisilatOrderForPaymentSuccess, createEtisilatOrderForPaymentError, restaurantSuccess } = restaurantReducer
    const { branchList } = branchReducer
    const { currentLanguage } = languageReducer
    const { paymentGateways, PaymentDetails, PaymentError, UpdatePayment, UpdatePaymentError, payStatus } = paymentReducer
    return { loading, error, success, createOrder, updateOrderSuccess, createRevoultOrderForPaymentSuccess, createRevoultOrderForPaymentError, createEtisilatOrderForPaymentSuccess, createEtisilatOrderForPaymentError, restaurantSuccess, branchList, currentLanguage, paymentGateways, PaymentDetails, PaymentError, UpdatePayment, UpdatePaymentError, payStatus };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        setPayStatus: (data) => dispatch(actions.setPayStatus(data)),
        getPaymentGateways: () => dispatch(actions.getPaymentGateways()),
        updateOrderItem: (data) => dispatch(actions.updateOrderItemStart(data)),
        updateOrder: (data) => dispatch(actions.updateOrderStart(data)),
        updateOrderPayment: (data) => dispatch(actions.updateOrderPaymentStart(data)),
        createRevoultOrderForPayment: (data) => dispatch(actions.createRevoultOrderForPaymentStart(data)),
        createEtisilatOrderForPayment: (data) => dispatch(actions.createEtisilatOrderForPaymentStart(data)),
        paymentEtisilatError: (data) => dispatch(actions.createEtisilatOrderForPaymentFailure(data)),
        retrievePaymentDetails: (data) => dispatch(actions.getOrderPaymentStart(data)),
        messageHandler: () => dispatch(actions.messageHandler()),
        paymentMessageHandler: () => dispatch(actions.paymentMessageHandler()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);