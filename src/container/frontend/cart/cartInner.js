import React, { useState, useEffect } from 'react';
import {Card, Container, Paper, Tabs, Tab, Typography, AppBar, Grid, Box, CardMedia, CardContent, ButtonGroup, Button
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useStyles } from './styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Scrollbars } from 'react-custom-scrollbars';
import { addBtn, cart } from '../../../assets/images/img';
import { useCart } from '../layout/cartContext'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import theme from '../scss/ThemeStyles.scss';
import { Alert } from '@material-ui/lab';
import '../../frontend/scss/cart.scss';
const responsive = {
    0: {
        stagePadding: 2,
        items: 1,
        margin: 2,
    },
    600: {
        items: 1,
        margin: 5,
        stagePadding: 10,
    },
    768: {
        items: 3,
        margin: 5,
        stagePadding: 20,
    },
    992: {
        items: 3,
        margin: 10,
        stagePadding: 10,
    },
    1000: {
        items: 3,
        margin: 20,
        stagePadding: 10,
    },
    1200: {
        items: 3,
        stagePadding: 20,
        margin: 10
    },
    1366: {
        items: 3,
        stagePadding: 0,
        margin: 10
    },
    1600: {
        items: 3,
        stagePadding: 10,
        margin: 7
    },
    1920: {
        items: 3,
        stagePadding: 5,
        margin: 5
    }
}

function CartInner(props) {
    const history = useHistory();
    const { t } = useTranslation();
    const { setOpenModalCart, restaurantSuccess, cartItemsList, currentLanguage, updateOrderItemSuccess, updateOrderItemLoading } = props; //
    const classes = useStyles();
    const { cartItems, removeItemFromCart } = useCart();
    const [ innerCartItems, setInnerCartItems ] = useState([]);
    const [ cartItemDeleted, setCartItemDeleted ] = useState(false);
    const [ cartItemDeletedIndex, setCartItemDeletedIndex ] = useState(null);
    const [noOfItems, setNoOfItems] = useState([]);
    const [restaurant, setRestaurant] = useState(null);
    console.log("innerCartItems",innerCartItems)


    const handleNoOfItem = (type, index, value) => {
        console.log("index",index,"type",type,"value",value);
        const newNoOfItems = [...noOfItems]; // Create a copy of the state array
        console.log("newNoOfItems",newNoOfItems);
        if(type === 1 && value > 1){
            newNoOfItems[index] = value - 1; // Decrease by 1 the value at the specified index
        }
        else if(type === 1 && value === 1){
            console.log("in else if of delete item");
            // Delete the item from cart
            setCartItemDeleted(true);
            setCartItemDeletedIndex(index);
            const updatedItem = innerCartItems[index];
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
                    status: 0
                }
            };
            // localStorage.setItem("itemDeleted", JSON.stringify(orderData));
            props.updateOrderItem(orderData);
        }
        else if(type === 2)
            newNoOfItems[index] = value + 1; // Increase by 1 the value at the specified index
        setNoOfItems(newNoOfItems); // Update the state
    };

    useEffect(() => {
        if(restaurantSuccess?.data)
            setRestaurant(restaurantSuccess?.data);
        // productCategory();
    }, [restaurantSuccess]);

    // useEffect(() => {
    //     setNoOfItems(innerCartItems.map((cartItem) => cartItem.quantity));
    //     if(cartItems && currentLanguage)
    //         fetchCartItems();
    // }, [currentLanguage, cartItems])
    
    // const fetchCartItems = () => {
    //     const orderId = localStorage.getItem('orderId');
    //     if(orderId)
    //         props.getCartItems({order_id: orderId, language_id: currentLanguage._id})
    // }

    useEffect(() => {
        if(cartItemsList?.data){
            setInnerCartItems(cartItemsList.data)
        }
    }, [cartItemsList])

    useEffect(() => {
        // This useEffect is to remove item from localStorage when quantity is 0 in db cart
        if(updateOrderItemSuccess && cartItemDeleted && cartItemDeletedIndex !== null){
            removeItemFromCart(cartItemDeletedIndex);
            setCartItemDeleted(false);
            setCartItemDeletedIndex(null);
        }
    }, [updateOrderItemSuccess, cartItemDeleted, cartItemDeletedIndex])

    useEffect(() => {
        if(innerCartItems){
            noOfItems.map((item, index) => {
                if(innerCartItems[index].quantity !== item){
                    innerCartItems[index].quantity = item;
                    const updatedItem = innerCartItems[index];
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
        }
    }, [noOfItems]);

    useEffect(() => {
        console.log("hellooooooooooo");
        const orderId = localStorage.getItem('orderId');
        if(orderId && updateOrderItemSuccess)
            props.getCartItems({order_id: orderId, language_id: currentLanguage._id});
    }, [updateOrderItemSuccess])

    useEffect(() => {
        setNoOfItems(innerCartItems.map((cartItem) => cartItem.quantity));
    }, [innerCartItems])

    const totalPrice = (itemIndex) => {
        console.log("item=====>>",itemIndex);
        return innerCartItems[itemIndex].product.price * noOfItems[itemIndex];
    };

    const total = innerCartItems.reduce((acc, currentItem, itemIndex) => {
        return (acc + totalPrice(itemIndex));
    }, 0);

    // const handleCreateOrder = () => {
    //     const orderData = {
    //         sessionId: '',
    //         split_type: 1,
    //         type: 1,
    //         user_id: '65fa8d79b94da3c8da28b50f',
    //         quantity: parseInt(noOfItems),
    //         price: total.toString(),
    //         category_id: innerCartItems[0].category_id,
    //         product_id: innerCartItems[0]._id,
    //         restaurant_branch_id:"660d01683160b95fd00283c7",
    //         personalDetails: {
    //             first_name: "Ahmed",
    //             last_name: "ali",
    //             email: "demo@gmail.com",
    //             mobile_no: "+923335976737",
    //         },

    //     };
    //     props.postOrder(orderData);

    // };

    const handleCreateOrder = () => {
        setOpenModalCart(false);
        history.push({pathname: './cart-Details', state: {currency: restaurant?.branches[0].currency, cartItems: innerCartItems}});
        // innerCartItems.forEach((item) => {
        //     const orderData = {
        //         sessionId: '',
        //         split_type: 1,
        //         type: 1,
        //         user_id: '65fa8d79b94da3c8da28b50f',
        //         quantity: parseInt(noOfItems), 
        //         price: total.toString(),
        //         category_id: item.category_id,
        //         restaurant_branch_id: "660d01683160b95fd00283c7",
        //         product_id: item._id,
        //         personalDetails: {
        //             first_name: "Muhammad",
        //             last_name: "Fahad",
        //             email: "abc@example.com",
        //             mobile_no: "+923335976737"
        //         }
        //     };
        //     props.postOrder(orderData);
        // });
    };
  
    //     const orderDataArray = innerCartItems.map((item) => {
    //         console.log("item",item);
    //         return {
    //             sessionId: 'sessionId123',
    //             split_type: 1,
    //             type: 1,
    //             user_id: '65fa8d79b94da3c8da28b50f',
    //             quantity: noOfItems.toString(), // Assuming each item has a 'quantity' property
    //             price:  total.toString(), // Assuming each item has a 'price' property
    //             category_id: item.category_id,
    //             restaurant_branch_id:"660d01683160b95fd00283c7",
    //             product_id: item._id,
    //             personalDetails: {
    //                 first_name: "Ahmed",
    //                 last_name: "ali",
    //                 email: "demo@gmail.com",
    //                 mobile_no: "+923335976737",
    //             },
    //         };
    //     });

    //     // Assuming props.postOrder can handle an array of order data
    //     props.postOrder(orderDataArray);
    // };

    // useEffect(() => {
    //     if (props?.success) {
    //         clearCart();
    //         localStorage.removeItem("cart");
    //         setOpenModalCart(false);
    //         setTimeout(() => {
    //             history.push('/order-Placed');
    //             props.messageHandler();
    //         }, 1000)
    //     }
    // }, [props?.success, clearCart, setOpenModalCart, history]);


    // const servingTime = innerCartItems[0].serving_time;
    // const [hours, minutes] = servingTime.split(':');
    // const servingTimeString = `${hours}:${minutes}`;
    // localStorage.setItem('servingTime', servingTimeString);
    // console.log("Serving time:", servingTimeString);

    return (
        <div>
            {props.currentLanguage?.left_to_right === 1 &&
                <div className='cart-main-div-head'>
                    <div className='cart-outer-btn'>
                        <span className='cart-text-btn'>
                            <button style={{ cursor: 'pointer' }}>{t('dineIn')}</button>
                        </span>
                    </div>
                    <Scrollbars  className='cartScrollbar'> {/**style={{ height: 500 }} */}
                        <h2 className='innerCart-heading'>{t('yourSelectedItems')}</h2>
                            {innerCartItems.map((item, index) => {
                                console.log("innerCartItems::::11122",item);
                                return (
                                    <div key={item.id}>
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
                                                        <span className='price-span price-span-rtl'><span className='price-tag-span'>{restaurant?.branches[0].currency}.</span>
                                                        {(totalPrice(index)).toFixed(2)}/-</span> {/* Display total price */}

                                                        <div className='strapper'>
                                                            <div onClick={() => !props.updateOrderItemLoading && handleNoOfItem(1,index,noOfItems[index])} className={`minusbtnwrapper`}>
                                                                {/* <button className='minusbtn' ></button> */}
                                                                {
                                                                    noOfItems[index] === 1 ?
                                                                    <DeleteIcon fontSize='small'/>
                                                                    :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none"><line x1="1.64612" y1="1.01782" x2="9.58567" y2="1.01782" stroke="url(#paint0_linear_2973_3991)" stroke-width="1.80444" stroke-linecap="round"/><defs><linearGradient id="paint0_linear_2973_3991" x1="10.4879" y1="2.42005" x2="0.743896" y2="2.42004" gradientUnits="userSpaceOnUse"><stop stop-color="#1A73E9"/><stop offset="1" stop-color="#6C92F4"/></linearGradient></defs></svg>
                                                                }
                                                            </div>
                                                                                    
                                                            <span>{noOfItems[index]}</span>

                                                            <div onClick={() => !props.updateOrderItemLoading && handleNoOfItem(2,index,noOfItems[index])} className={`minusbtnwrapper`}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='plusBtn' width="11" height="11" viewBox="0 0 11 11" fill="none"><line x1="1.6969" y1="5.06165" x2="9.63646" y2="5.06165" stroke="url(#paint0_linear_2973_3992)" stroke-width="1.80444" stroke-linecap="round"/><line x1="5.75745" y1="1.18213" x2="5.75745" y2="9.12169" stroke="url(#paint1_linear_2973_3992)" stroke-width="1.80444" stroke-linecap="round"/><defs><linearGradient id="paint0_linear_2973_3992" x1="10.5387" y1="6.46387" x2="0.794678" y2="6.46387" gradientUnits="userSpaceOnUse"><stop stop-color="#1A73E9"/><stop offset="1" stop-color="#6C92F4"/></linearGradient><linearGradient id="paint1_linear_2973_3992" x1="4.35522" y1="10.0239" x2="4.35522" y2="0.279907" gradientUnits="userSpaceOnUse"><stop stop-color="#1A73E9"/><stop offset="1" stop-color="#6C92F4"/></linearGradient></defs></svg>
                                                            </div>
                                                                {/* <button >+</button>
                                                                */}
                                                                {/* <button onClick={() => updateCounter(itemIndex, -1, product._id)}>-</button>
                                                                <span>{counters[itemIndex] || cartItems.length}</span>
                                                                <button onClick={() => updateCounter(itemIndex, 0, product._id)}>+</button> */}
                                                        </div>

                                                        {/* <FormControl className="no-of-item">
                                                            <Select className='slect-no'
                                                                labelId={`demo-customized-select-label-${index}`}
                                                                id={`demo-customized-select-${index}`}
                                                                value={noOfItems[index] || ''} // Use the value from state array
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
                                                        </FormControl> */}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )
                            })}
                        
                        {/* <h2>Related Items</h2> */}

                        {/**realted item code paste here  */}
                        {/* </div> */}

                    <div>
                        <div className='bill-sum-style'>
                            <h2>{t('billingSummary')}</h2>
                        </div>

                        <div className='summary-div-main'>
                            <span className='left-span'>{t('subTotal')}</span>
                            <span className='right-span'>{restaurant?.branches[0].currency} {total.toFixed(2).toString()}</span>
                        </div>
                        
                        <div className='summary-div-main'>
                            <span className='left-span'>{t('serviceFee')}</span>
                            <span className='right-span'>{restaurant?.branches[0].currency} {restaurant?.branches[0].service_fee.toFixed(2)}</span> 
                        </div>
                    </div>
                    </Scrollbars>   
                    <div>     
                        <div className='cart-sticky'>
                        <div className='cart-dashed-total'>
                            
                        </div>

                        <div className='summary-div-main'>
                            <span className='left-span'>{t('totalFee')}</span>
                            <span className='right-span'>{restaurant?.branches[0].currency} {(total + restaurant?.branches[0].service_fee).toFixed(2)}</span>
                            {/* <span className='right-span'>{innerCartItems[0].currency} 15.00</span>  */}
                        </div>

                        <div className='btn-payment'>
                            <span>
                                <button onClick={handleCreateOrder} style={{ cursor: 'pointer' }}>{t('proceedToPayment')}</button>
                            </span>
                        </div>
                        </div>
                    </div>
                </div>
            }

            {props.currentLanguage?.left_to_right === 0 &&
                <div className='cart-main-div-head-rtl'> {/**cart-main-div-head  */}
                    <div className='cart-outer-btn'>
                        <span className='cart-text-btn'>
                            <button style={{ cursor: 'pointer' }}>{t('dineIn')}</button>
                        </span>
                    </div>
                    <Scrollbars  className='cartScrollbar'> {/**style={{ height: 500 }} */}
                        <h2 className=''>{t('yourSelectedItems')}</h2>
                            {innerCartItems.map((item, index) => {
                                console.log("innerCartItems::::11122",item);
                                return (
                                    <div key={item.id}>
                                        <Card className={`${classes.rootCart} menu-cart-box-style `}>
                                            <CardContent className='card-content-divs'>
                                                <div className='cart-name-text-detail-rtl'>
                                                    <h2>{(item.product?.product_language && item.product?.product_language.title !== '') ? item.product?.product_language.title : item.product?.title}</h2>
                                                    <p>{(item.product?.product_language && item.product?.product_language.details !== '') ? item.product?.product_language.details : item.product?.details}</p>

                                                </div>
                                                <div className='itm-dtl-price'>
                                                    <div className='item-price-value'>
                                                        <div className='strapper'>
                                                            <div onClick={() => !props.updateOrderItemLoading && handleNoOfItem(1,index,noOfItems[index])} className='minusbtnwrapper'>
                                                                {/* <button className='minusbtn' ></button> */}
                                                                {
                                                                    noOfItems[index] === 1 ?
                                                                    <DeleteIcon fontSize='small' />
                                                                    :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none"><line x1="1.64612" y1="1.01782" x2="9.58567" y2="1.01782" stroke="url(#paint0_linear_2973_3991)" stroke-width="1.80444" stroke-linecap="round"/><defs><linearGradient id="paint0_linear_2973_3991" x1="10.4879" y1="2.42005" x2="0.743896" y2="2.42004" gradientUnits="userSpaceOnUse"><stop stop-color="#1A73E9"/><stop offset="1" stop-color="#6C92F4"/></linearGradient></defs></svg>
                                                                }
                                                            </div>
                                                                                    
                                                            <span>{noOfItems[index]}</span>

                                                            <div onClick={() =>!props.updateOrderItemLoading && handleNoOfItem(2,index,noOfItems[index])} className='minusbtnwrapper'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='plusBtn' width="11" height="11" viewBox="0 0 11 11" fill="none"><line x1="1.6969" y1="5.06165" x2="9.63646" y2="5.06165" stroke="url(#paint0_linear_2973_3992)" stroke-width="1.80444" stroke-linecap="round"/><line x1="5.75745" y1="1.18213" x2="5.75745" y2="9.12169" stroke="url(#paint1_linear_2973_3992)" stroke-width="1.80444" stroke-linecap="round"/><defs><linearGradient id="paint0_linear_2973_3992" x1="10.5387" y1="6.46387" x2="0.794678" y2="6.46387" gradientUnits="userSpaceOnUse"><stop stop-color="#1A73E9"/><stop offset="1" stop-color="#6C92F4"/></linearGradient><linearGradient id="paint1_linear_2973_3992" x1="4.35522" y1="10.0239" x2="4.35522" y2="0.279907" gradientUnits="userSpaceOnUse"><stop stop-color="#1A73E9"/><stop offset="1" stop-color="#6C92F4"/></linearGradient></defs></svg>
                                                            </div>
                                                                {/* <button >+</button>
                                                                */}
                                                                {/* <button onClick={() => updateCounter(itemIndex, -1, product._id)}>-</button>
                                                                <span>{counters[itemIndex] || cartItems.length}</span>
                                                                <button onClick={() => updateCounter(itemIndex, 0, product._id)}>+</button> */}
                                                        </div>
                                                        {/* <span>BGN.{item.price}/-</span> */}
                                                        <span className='price-span'><span className='price-tag-span'>{restaurant?.branches[0].currency}.</span>
                                                        {(totalPrice(index)).toFixed(2)}/-</span> {/* Display total price */}


                                                        {/* <FormControl className="no-of-item">
                                                            <Select className='slect-no'
                                                                labelId={`demo-customized-select-label-${index}`}
                                                                id={`demo-customized-select-${index}`}
                                                                value={noOfItems[index] || ''} // Use the value from state array
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
                                                        </FormControl> */}
                                                    </div>
                                                </div>
                                            </CardContent>
                                            {
                                                item.product?.image ?
                                                <img src={item.product?.image} alt={item.product?.title} />
                                                :
                                                <div className='no-img'></div>
                                            }
                                        </Card>
                                    </div>
                                )
                            })}
                        
                        {/* <h2>Related Items</h2> */}

                        {/**realted item code paste here  */}
                        {/* </div> */}
                        <div>
                            <div className='bill-sum-style-rtl'>
                                <h2>{t('billingSummary')}</h2>
                            </div>

                            <div className='summary-div-main'>
                            <span className='left-span'>{restaurant?.branches[0].currency} {total.toFixed(2).toString()}</span>
                                <span className='right-span-rtl'>{t('subTotal')}</span>
                            
                            </div>
                            
                            <div className='summary-div-main'>
                                <span className='left-span'>{t('serviceFee')}</span>
                                <span className='right-span'>{restaurant?.branches[0].currency} {restaurant?.branches[0].service_fee.toFixed(2)}</span> 
                            </div>
                        </div>
                    </Scrollbars>   
                    <div>     
                        <div className='cart-sticky'>
                            <div className='cart-dashed-total'>
                                
                            </div>

                            <div className='summary-div-main'>
                                <span className='left-span'>{t('totalFee')}</span>
                                <span className='right-span'>{restaurant?.branches[0].currency} {(total + restaurant?.branches[0].service_fee).toFixed(2)}</span>
                                {/* <span className='right-span'>{innerCartItems[0].currency} 15.00</span>  */}
                            </div>

                            <div className='btn-payment'>
                                <span>
                                    <button onClick={handleCreateOrder} style={{ cursor: 'pointer' }}>{t('proceedToPayment')}</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


// what is needed at start
const mapStateToProps = ({ restaurantReducer, languageReducer, homeReducer }) => {
    const { cartItemsList } = homeReducer;
    const { currentLanguage } = languageReducer;
    const { loading, error, success, createOrder, restaurantSuccess, updateOrderItemSuccess, updateOrderItemLoading } = restaurantReducer
    return { loading, error, success, createOrder, restaurantSuccess, updateOrderItemSuccess, cartItemsList, currentLanguage };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getCartItems: (data) => dispatch(actions.getCartItemsStart(data)),
        updateOrderItem: (data) => dispatch(actions.updateOrderItemStart(data)),
        // postOrder: (data) => dispatch(actions.getOrderStart(data)),
        messageHandler: () => dispatch(actions.messageHandler()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartInner);

// export default CartInner









// sessionId: "sessionId123",
// split_type: 1,
// type: 1,
// user_id: "65fa8d79b94da3c8da28b50f",
// restraunt_id: "65fa8d79b94da3c8da28b50f",
// quantity: 1,
// price: 1000,
// category_id: "65fa8d79b94da3c8da28b50f",
// product_id: "6603ea982027bd0bdf627ae5",
// personalDetails: {
//   first_name: "Muhammad",
//   last_name: "Fahad",
//   email: "abc@example.com",
//   mobile_no: "+923335976737"
// }




//     < OwlCarousel responsive = { responsive }
// className = "owl-theme owl-stage mainslider-owl"
// dots = { false} >
// {
//     relatedItems.map((Ritems, index) => (
//         <Card className="dishes-menu-related">
//             <CardMedia className='div-menu-related-img'>
//                 <img src={Ritems.img} className="menu-img-related" /> {/**alt={Ritems.title} */}
//                 <div className='Related-item-addBtn'>
//                     <img src={addBtn} />
//                 </div>
//             </CardMedia>
{/* <CardContent className="card-content">
                <Typography className="menu-title-related">
                    {Ritems.title}
                </Typography>
                <div className='itm-dtl-price1'>
                    <div className='item-price'>
                        <p>BGN<span>{Ritems.price}/-</span></p>
                    </div></div>
            </CardContent>
        </Card> */}
//     ))
// }
//     </OwlCarousel > 