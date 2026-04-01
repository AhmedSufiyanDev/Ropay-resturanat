import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router';
import AddDetailItemModal from '../../../components/modal/reuseModal';
import RadioButtonsGroup from '../../../components/Radio';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';

import '../scss/addDetailItem.scss';
import { cartSection, sevenUp, pepsi, sideOns } from '../../../assets/images/img/Addcart';
import { Scrollbars } from 'react-custom-scrollbars';
import { heartImage } from '../../../assets/images/img';
// import theme from '../scss/ThemeStyles.scss';
import { ThemeContext } from "../../../ThemeContext";
import { useCart } from '../layout/cartContext'
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
const genderOptions = [
    { value: 'Scalloped Potatoes', label: 'Scalloped Potatoes', imgSrc: sideOns, price: '15.00' },
    { value: 'Grilled Corn Salad', label: 'Grilled Corn Salad', imgSrc: sideOns, price: '10.00' },
    { value: 'Sauteed Spinach and Garlic', label: 'Sauteed Spinach and Garlic', imgSrc: sideOns, price: '11.00' },
];
function AddCartDetail(props) {
    const { t } = useTranslation();
    const { table_id } = useParams();

    const { openModal, setOpenModal, handleClose, selectedItem, restaurantSuccess, currentLanguage } = props;
       
    const classes = useStyles();
    const [description, setDescription] = useState('');
    const [restaurant, setRestaurant] = useState(null);
    const [modalSelectedItem, setModalSelectedItem] = useState(selectedItem);
    const [modalQuantity, setModalQuantity] = useState(1);
    const { themeValue } = useContext(ThemeContext);
    const { cartItems, addItemToCart } = useCart();

    useEffect(() => {
        if(restaurantSuccess?.data){
          setRestaurant(restaurantSuccess.data);
        }
        // productCategory();
      }, [restaurantSuccess]);

    useEffect(() => {
        setModalSelectedItem(prevState => ({
            ...prevState,
            quantity: modalQuantity
        }))
    }, [modalQuantity])

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);

    };
    // useEffect(()=>{
    //     console.log("in the props.login USEEffect");
    //     if(props.loggedInSuccess){
    //         const loginData = props.loggedInSuccess;
    //         console.log("loginData",loginData);
    //     }
    // },[props.loggedInSuccess])

    const handleAddToCart = () => {
        console.log("order calling ====>");
        const orderData = {
            sessionId: localStorage.getItem("sessionId") ? localStorage.getItem("sessionId") : '',
            order_id: localStorage.getItem("orderId") ? localStorage.getItem("orderId") : '',
            split_type: 1,
            type: 1,
            // user_id: '65fa8d79b94da3c8da28b50f',
            quantity: modalQuantity, 
            price: modalSelectedItem.price * modalQuantity,
            category_id: modalSelectedItem.category_id,
            restaurant_branch_id: restaurant?.branches[0]?._id,
            product_id: modalSelectedItem._id,
            table_id: table_id,
            personalDetails: {
                first_name: "Muhammad",
                last_name: "Fahad",
                email: "abc@example.com",
                mobile_no: "+923335976737"
            }
        };
        const userData = localStorage.getItem('user');
        const newUserData = JSON.parse(userData);
        if (newUserData) {  
            try{
                const user_id = newUserData._id;
                orderData.user_id = user_id; //userData._id;
                console.log("new Orderata",orderData);
            } catch{
                console.log("error in parrsing the userData");
            }
        }
        props.postOrder(orderData);
    };
    useEffect(() => {
        if (props?.createOrder) {
            // console.log("selectedItem 1",selectedItem); 
            modalSelectedItem['added_time'] = new Date();
            addItemToCart(modalSelectedItem); // Add item to cart
            setOpenModal(false)   
            props.messageHandler();
            setTimeout(() => {
                props.createOrderMessageHandler();
            }, 2000)
        }
        else if (props?.error){
            setOpenModal(false)   
            setTimeout(() => {
                props.messageHandler();
            }, 2000)
        }
    }, [props?.createOrder, props?.error, modalSelectedItem]);

  const handleCloseModal= () =>{
    setOpenModal(false);
  }

    return (
        <div>
            <AddDetailItemModal
                open={openModal}
                onClose={handleClose}
                className={classes.modal}
            >
                <div className={classes.paper} data-theme={themeValue}>
                    {props.currentLanguage?.left_to_right === 1 &&
                        <div>
                            <Scrollbars autoHide className="addCartDetail-Scroll">
                                <div className='model-recep-car'>
                                    {/* <img src={cartSection} className='add-item-detail-img' /> */}
                                    <div className='add-cart-image'>
                                        <img src={modalSelectedItem?.image} className="add-item-detail-img" />
                                        <span className='cross-svg-style-cart-detail'>
                                            <svg onClick={handleCloseModal} width="31" height="31" viewBox="0 0 31 31" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 30.3193C23.5081 30.3193 30 23.8275 30 15.8193C30 7.81121 23.5081 1.31934 15.5 1.31934C7.49187 1.31934 1 7.81121 1 15.8193C1 23.8275 7.49187 30.3193 15.5 30.3193Z" fill="#F6F7FB" stroke="#DDDDDD"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6902 11.6471C11.5427 11.6472 11.4099 11.7366 11.3544 11.8732C11.2989 12.0099 11.3317 12.1666 11.4374 12.2695L14.9874 15.8194L11.4374 19.3694C11.3429 19.4604 11.3049 19.5953 11.3381 19.7222C11.3712 19.8491 11.4703 19.9482 11.5972 19.9813C11.7241 20.0145 11.859 19.9765 11.95 19.882L15.5 16.332L19.0499 19.882C19.1409 19.9765 19.2758 20.0145 19.4027 19.9813C19.5296 19.9482 19.6287 19.8491 19.6619 19.7222C19.695 19.5953 19.657 19.4604 19.5625 19.3694L16.0126 15.8194L19.5625 12.2695C19.6698 12.1653 19.702 12.0059 19.6437 11.8682C19.5855 11.7305 19.4486 11.6427 19.2992 11.6471C19.205 11.6499 19.1156 11.6893 19.05 11.7569L15.5 15.3068L11.95 11.7569C11.8818 11.6867 11.7881 11.6471 11.6902 11.6471H11.6902Z" fill="#0C0D34"></path></svg>
                                        </span>
                                        {/* <img src={heartImage} className='heart-img' /> */}
                                    </div>
                                    <div className='add-item-detail-text'>
                                        <h2 className='text-heading'>{(modalSelectedItem?.product_language && modalSelectedItem?.product_language.title !== '') ? modalSelectedItem?.product_language.title : modalSelectedItem?.title}</h2>
                                        <span className='text-lt'>{(modalSelectedItem?.product_language && modalSelectedItem?.product_language.details !== '') ? modalSelectedItem?.product_language.details : modalSelectedItem?.details}</span>
                                        {/* <div className='item-price'>
                                        </div> */}

                                        {/* <h2 className='text-heading'>Veal carpaccio / 180 g.</h2>
                                        <p className='para-detail'>Black Angus, arugula, parmesan, truffle mayonnaise, olive oil and balsamic reduction</p> */}
                                    </div>
                                    <hr className='hr-style' />

                                    {/**  side'ons section */}
                                    {/* <div>
                                        <div className='side-on-text'>
                                            <h2 className='side-text-font'>Side - On’s <span className='opion-text'>(Optional)</span></h2>
                                        </div>
                                        <div className='radio-style'>
                                            <RadioButtonsGroup options={genderOptions}/>
                                        </div>
                                    </div> */}
                                    {/* <hr className='hr-style' /> */}
                                    {/** drinks section */}
                                    {/* <div>
                                        <div className='side-on-text'>
                                            <h2 className='side-text-font'>Add Drinks<span className='opion-text'>(Optional)</span></h2>
                                        </div>
                                        <div className='radio-style'>
                                            <RadioButtonsGroup options={genderOptions}/>
                                        </div>
                                    </div>
                                    <hr className='hr-style' /> */}

                                    {/** instruction box */}
                                    <div className='instructions-div'>
                                        <h2 className='special-instruct'>{t('specialInstructions')}</h2>
                                        <p className='special-para-instruct'>{t('anySpecific')}</p>
                                        <div>
                                            <textarea
                                                className='text-area'
                                                id="description"
                                                name="description"
                                                placeholder={t('everyThingFresh')}
                                                value={description}
                                                onChange={handleDescriptionChange}
                                            />
                                        </div>
                                    </div>
                                
                                </div>
                            </Scrollbars>
                            
                            <div className='crt-btn-div'>
                                <div className='theme-one-plus-minus'>

                                    {/* <div className='minus' onClick={() => setModalQuantity(modalQuantity-1)}> */}
                                    
                                    <div className={`minus ${modalQuantity <= 1 ? 'disabled' : ''}`}
                                        onClick={() => modalQuantity > 1 && setModalQuantity(modalQuantity - 1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                                            <g id="Group 427320619">
                                            <g id="Rectangle 28" filter="url(#filter0_d_2976_8309)">
                                            <rect x="6" y="6" width="32" height="32" rx="16" fill="white"/>
                                            </g>
                                            <g id="Vector">
                                            <path d="M27.9612 22H17H27.9612Z" fill="#5F5C5C"/>
                                            <path d="M27.9612 22H17" stroke="#5F5C5C" stroke-width="1.23313" stroke-linecap="round"/>
                                            </g>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_2976_8309" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset/>
                                            <feGaussianBlur stdDeviation="3"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2976_8309"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2976_8309" result="shape"/>
                                            </filter>
                                            </defs>
                                        </svg>
                                    </div>
                                    
                                    <span className='number'>{modalQuantity}</span>
                                    
                                    <div className='plus' onClick={() => setModalQuantity(modalQuantity+1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                                            <g id="Group 427320620">
                                            <g id="Rectangle 27" filter="url(#filter0_d_2976_8306)">
                                            <rect x="6" y="6" width="32" height="32" rx="16" fill="white"/>
                                            </g>
                                            <g id="Vector">
                                            <path d="M22.1473 27.6279V22.1473V27.6279ZM22.1473 22.1473V16.6667V22.1473ZM22.1473 22.1473H27.6279H22.1473ZM22.1473 22.1473H16.6667H22.1473Z" fill="#5F5C5C"/>
                                            <path d="M22.1473 27.6279V22.1473M22.1473 22.1473V16.6667M22.1473 22.1473H27.6279M22.1473 22.1473H16.6667" stroke="#5F5C5C" stroke-width="1.23313" stroke-linecap="round"/>
                                            </g>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_2976_8306" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset/>
                                            <feGaussianBlur stdDeviation="3"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2976_8306"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2976_8306" result="shape"/>
                                            </filter>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <button className='add-crt-btn' onClick={handleAddToCart}>{t('addACart')} </button>
                            </div>
                        </div>
                    }

                    {
                        props.currentLanguage?.left_to_right === 0 &&
                        <div>
                            <Scrollbars autoHide className="addCartDetail-Scroll" > {/**style={{ height: 700 }} */}
                                <div className='model-recep-car'>
                                    {/* <img src={cartSection} className='add-item-detail-img' /> */}
                                    <div className='add-cart-image'>
                                        <img src={modalSelectedItem?.image} className="add-item-detail-img" />
                                        <span className='cross-svg-style-cart-detail-rtl'>
                                            <svg onClick={handleCloseModal} width="31" height="31" viewBox="0 0 31 31" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 30.3193C23.5081 30.3193 30 23.8275 30 15.8193C30 7.81121 23.5081 1.31934 15.5 1.31934C7.49187 1.31934 1 7.81121 1 15.8193C1 23.8275 7.49187 30.3193 15.5 30.3193Z" fill="#F6F7FB" stroke="#DDDDDD"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6902 11.6471C11.5427 11.6472 11.4099 11.7366 11.3544 11.8732C11.2989 12.0099 11.3317 12.1666 11.4374 12.2695L14.9874 15.8194L11.4374 19.3694C11.3429 19.4604 11.3049 19.5953 11.3381 19.7222C11.3712 19.8491 11.4703 19.9482 11.5972 19.9813C11.7241 20.0145 11.859 19.9765 11.95 19.882L15.5 16.332L19.0499 19.882C19.1409 19.9765 19.2758 20.0145 19.4027 19.9813C19.5296 19.9482 19.6287 19.8491 19.6619 19.7222C19.695 19.5953 19.657 19.4604 19.5625 19.3694L16.0126 15.8194L19.5625 12.2695C19.6698 12.1653 19.702 12.0059 19.6437 11.8682C19.5855 11.7305 19.4486 11.6427 19.2992 11.6471C19.205 11.6499 19.1156 11.6893 19.05 11.7569L15.5 15.3068L11.95 11.7569C11.8818 11.6867 11.7881 11.6471 11.6902 11.6471H11.6902Z" fill="#0C0D34"></path></svg>
                                        </span>
                                        {/* <img src={heartImage} className='heart-img-rtl' /> */}
                                    </div>
                                    <div className='add-item-detail-text'>
                                        <h2 className='text-heading-rtl'>{(modalSelectedItem?.product_language &&  modalSelectedItem?.product_language.title !== '') ? modalSelectedItem?.product_language.title : modalSelectedItem?.title}</h2>
                                        <span className='text-rtl'>{(modalSelectedItem?.product_language &&  modalSelectedItem?.product_language.details !== '') ? modalSelectedItem?.product_language.details : modalSelectedItem?.details}</span>
                                        {/* <div className='item-price'>
                                        </div> */}

                                        {/* <h2 className='text-heading'>Veal carpaccio / 180 g.</h2>
                                        <p className='para-detail'>Black Angus, arugula, parmesan, truffle mayonnaise, olive oil and balsamic reduction</p> */}
                                    </div>
                                    <hr className='hr-style' />

                                    {/**  side'ons section */}
                                    {/* <div>
                                        <div className='side-on-text'>
                                            <h2 className='side-text-font'>Side - On’s <span className='opion-text'>(Optional)</span></h2>
                                        </div>
                                        <div className='radio-style'>
                                            <RadioButtonsGroup options={genderOptions}/>
                                        </div>
                                    </div> */}
                                    {/* <hr className='hr-style' /> */}
                                    {/** drinks section */}
                                    {/* <div>
                                        <div className='side-on-text'>
                                            <h2 className='side-text-font'>Add Drinks<span className='opion-text'>(Optional)</span></h2>
                                        </div>
                                        <div className='radio-style'>
                                            <RadioButtonsGroup options={genderOptions}/>
                                        </div>
                                    </div>
                                    <hr className='hr-style' /> */}

                                    {/** instruction box */}
                                    <div className='instructions-div'>
                                        <h2 className='special-instruct-rtl'>{t('specialInstructions')}</h2>
                                        <p className='special-para-instruct-rtl'>{t('anySpecific')}</p>
                                        <div>
                                            <textarea
                                                className='text-area'
                                                id="description"
                                                name="description"
                                                placeholder={t('كل شيء طازج')}
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                dir='rtl'
                                                style={{textAlign:'right'}}
                                            />
                                        </div>
                                    </div>
                                
                                </div>
                            </Scrollbars>
                            
                            <div className='crt-btn-div'>
                            <button className='add-crt-btn' onClick={handleAddToCart}>{t('addACart')} </button>
                                <div className='theme-one-plus-minus'>

                                    {/* <div className='minus' onClick={() => setModalQuantity(modalQuantity-1)}> */}
                                    <div className={`minus ${modalQuantity <= 1 ? 'disabled' : ''}`}
                                        onClick={() => modalQuantity > 1 && setModalQuantity(modalQuantity - 1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                                            <g id="Group 427320619">
                                            <g id="Rectangle 28" filter="url(#filter0_d_2976_8309)">
                                            <rect x="6" y="6" width="32" height="32" rx="16" fill="white"/>
                                            </g>
                                            <g id="Vector">
                                            <path d="M27.9612 22H17H27.9612Z" fill="#5F5C5C"/>
                                            <path d="M27.9612 22H17" stroke="#5F5C5C" stroke-width="1.23313" stroke-linecap="round"/>
                                            </g>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_2976_8309" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset/>
                                            <feGaussianBlur stdDeviation="3"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2976_8309"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2976_8309" result="shape"/>
                                            </filter>
                                            </defs>
                                        </svg>
                                    </div>

                                    <span className='number'>{modalQuantity}</span>
                                    
                                    <div className='plus' onClick={() => setModalQuantity(modalQuantity+1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                                            <g id="Group 427320620">
                                            <g id="Rectangle 27" filter="url(#filter0_d_2976_8306)">
                                            <rect x="6" y="6" width="32" height="32" rx="16" fill="white"/>
                                            </g>
                                            <g id="Vector">
                                            <path d="M22.1473 27.6279V22.1473V27.6279ZM22.1473 22.1473V16.6667V22.1473ZM22.1473 22.1473H27.6279H22.1473ZM22.1473 22.1473H16.6667H22.1473Z" fill="#5F5C5C"/>
                                            <path d="M22.1473 27.6279V22.1473M22.1473 22.1473V16.6667M22.1473 22.1473H27.6279M22.1473 22.1473H16.6667" stroke="#5F5C5C" stroke-width="1.23313" stroke-linecap="round"/>
                                            </g>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_2976_8306" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset/>
                                            <feGaussianBlur stdDeviation="3"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2976_8306"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2976_8306" result="shape"/>
                                            </filter>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                             
                            </div>
                        </div>
                    }



                </div>
            </AddDetailItemModal>
            {/* </Scrollbars> */}
        </div>
    )
}

// what is needed at start
const mapStateToProps = ({ restaurantReducer, branchReducer, languageReducer, authReducer }) => {
    const { loading, error, createOrder, restaurantSuccess } = restaurantReducer
    const { currentLanguage } = languageReducer;
    const {loggedInSuccess} = authReducer;
    return { loading, error, createOrder, restaurantSuccess,loggedInSuccess };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        postOrder: (data) => dispatch(actions.getOrderStart(data)),
        messageHandler: () => dispatch(actions.messageHandler()),
        createOrderMessageHandler: () => dispatch(actions.createOrderMessageHandler()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCartDetail)