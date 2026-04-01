import React, { useState, useEffect, useImperativeHandle, useContext } from 'react';
import { useStyles } from './styles';
import { cart, foodCart } from '../../../assets/images/img'
import { Slide } from 'react-reveal';
import { selectedDishes, RelatedItems, selectedDishesArray, relatedItems } from '../../../environment';
import '../../frontend/scss/cart.scss';
import CartInner from './cartInner';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import theme from '../scss/ThemeStyles.scss';
import { ThemeContext } from "../../../ThemeContext";
import { useCart } from '../layout/cartContext'
import { cross } from '../../../assets/images/images';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
function Cart(props) {
    const { setOpenModalCart, currentLanguage } = props;
    const { t } = useTranslation();
    const classes = useStyles();
    const { cartItems, addItemToCart } = useCart(); // Step 3: Consume the context
    
    useEffect(() => {
        const isModalOpen = localStorage.getItem('cartModal');
        console.log("isModalOpen",isModalOpen);
        // if (isModalOpen === true) {
            function handleClickOutside(event) {
                const clickedInside = event.target.closest('.cart-div');
                if (clickedInside) {
                    setOpenModalCart(true);
                    // localStorage.setItem('cartModal',false);
                }
            // }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };     
        }
    }, []);

    useEffect(() => {
        if(cartItems && currentLanguage)
            fetchCartItems();
    }, [currentLanguage, cartItems])
    
    const fetchCartItems = () => {
        const orderId = localStorage.getItem('orderId');
        if(orderId)
            props.getCartItems({order_id: orderId, language_id: currentLanguage._id})
    }

    const history = useHistory();
    const handleProceedToPaymentBtn = () => {
        history.push('./cart-Details')
    };
    //code for toggle button
    const [alignment, setAlignment] = React.useState('web');
    const { themeValue } = useContext(ThemeContext);
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const handleCloseModal = () => {
        setOpenModalCart(false)
      //  localStorage.setItem('cartModal',false);
    }
    const isMobile = useMediaQuery('(max-width:960px)');
    return (
            <Slide up> {/* Slide right */}
            <div className='cart-div' data-theme={themeValue}>
                {isMobile &&
                    <span className='cross-svg-style'>
                        <svg onClick={handleCloseModal} width="31" height="31" viewBox="0 0 31 31" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 30.3193C23.5081 30.3193 30 23.8275 30 15.8193C30 7.81121 23.5081 1.31934 15.5 1.31934C7.49187 1.31934 1 7.81121 1 15.8193C1 23.8275 7.49187 30.3193 15.5 30.3193Z" fill="#F6F7FB" stroke="#DDDDDD"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6902 11.6471C11.5427 11.6472 11.4099 11.7366 11.3544 11.8732C11.2989 12.0099 11.3317 12.1666 11.4374 12.2695L14.9874 15.8194L11.4374 19.3694C11.3429 19.4604 11.3049 19.5953 11.3381 19.7222C11.3712 19.8491 11.4703 19.9482 11.5972 19.9813C11.7241 20.0145 11.859 19.9765 11.95 19.882L15.5 16.332L19.0499 19.882C19.1409 19.9765 19.2758 20.0145 19.4027 19.9813C19.5296 19.9482 19.6287 19.8491 19.6619 19.7222C19.695 19.5953 19.657 19.4604 19.5625 19.3694L16.0126 15.8194L19.5625 12.2695C19.6698 12.1653 19.702 12.0059 19.6437 11.8682C19.5855 11.7305 19.4486 11.6427 19.2992 11.6471C19.205 11.6499 19.1156 11.6893 19.05 11.7569L15.5 15.3068L11.95 11.7569C11.8818 11.6867 11.7881 11.6471 11.6902 11.6471H11.6902Z" fill="#0C0D34"></path></svg>
                    </span>
                }
                {/* <Scrollbars  style={{ height: 490 }}> */}
                {cartItems.length > 0 ? (
                    <CartInner
                        cartItems={cartItems}
                        setOpenModalCart={setOpenModalCart}
                        // relatedItems={relatedItems}
                    />
                ) : (
                    <>
                        <div className='cart-outer-btn'>
                            <span className='cart-text-btn'>
                                <button style={{ cursor: 'pointer' }}>{t('dineIn')}</button>
                            </span>
                        </div>
                        <div className='cart-item-mdd'>
                            <div className='cartScrollbar cartimage'>
                                <img src={foodCart} alt="Food Cart" />
                                <h2 className='hungry-heading'>{t('areYouHungry')}</h2>
                                <span className='hungry-para'>{t('youHaveNotAdded')}<br /> {t('toYourCart')}</span>
                            </div>
                            <div className='btn-payment button-payment-disable'>
                                <span>
                                    <button>{t('proceedToPayment')}</button>
                                </span>
                            </div>
                        </div>
                        
                    </>
                )}
                {/* </Scrollbars> */}
                {cartItems.length < 0 && (
                    <>
                        <hr className='dashes-style' />
                        <div className='summary-div-main'>
                            {/* <span className='left-span-total'>Total Bill</span>
                            <span className='right-span-total'>{'BNG 15.00'}</span> */}
                        </div>
                        <div className='cart-outer btn-payment'>
                    <span>
                        <button  style={{ cursor: 'pointer' }}>{('Proceed to Payment')}</button>
                    </span>
                </div>
                        <div className='btn-payment'>
                            <button onClick={''} >Proceed to Payment</button>
                        </div>
                    </>
                )}
            </div>
            </Slide>// Slide    
    )
}
// what is needed at start
const mapStateToProps = ({ languageReducer }) => {
    const { currentLanguage } = languageReducer;
    return { currentLanguage };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getCartItems: (data) => dispatch(actions.getCartItemsStart(data)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);