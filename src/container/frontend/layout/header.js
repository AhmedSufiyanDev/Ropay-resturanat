import React, { useEffect, useContext, useTransition } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { useStyles } from "./styles";
import { useState } from 'react';
import { generalStyles } from "../general/general";
import { ropay, cart } from "../../../assets/images/img/index";
import { Box, Button, List, ListItem, ListItemText, Collapse, Drawer, AppBar, Toolbar, Avatar, Container, Badge, TextField, MenuItem } from '@material-ui/core';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import Navbar from './Navbar.js';
import Typography from '@material-ui/core/Typography';
import "../scss/header.scss";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import AddCart from '../../frontend/cart';
import LoginModal from './LoginModal.js';
import ProfileMenu from './profileMenu.js';
import profileModal from './ProfileModal.js';
import { ThemeContext } from '../../../ThemeContext.js';
import { Switch, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Language from './language.js';
import { useCart } from '../layout/cartContext';

import Tooltip from '@material-ui/core/Tooltip';
import { cartArrow } from '../../../assets/images/img/index';
import { useHistory } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { logout, voucher, userPen, foodOrder, helpCenter, LogoutIcon } from '../../../assets/images/img'
import { headerImage, cartIcon, leftArrowIcon, riyaPayIcon } from '../../../assets/images/newImages';

function Header(props) {
  const history = useHistory();
  const { t } = useTranslation();
  const { cartItems, removeItemFromCart } = useCart(); // Step 3: Consume the context

  let userDetail = getUserDataFromLocalStorage();

  const classes = useStyles();
  const generalClasses = generalStyles();
  const location = useLocation().pathname;
  console.log("location", location);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalCart, setOpenModalCart] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { themeValue } = useContext(ThemeContext);
  const [keywords, setKeywords] = React.useState([]);

  const toggleDrawer = () => {
    setDrawerOpen(true);
  };
  const toggleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const loggedInMenuItems = [
    {
      icon: foodOrder,
      title: t('Order & Reordering'), //'Order & Reordering',
      url: '',
    },
    {
      icon: userPen,
      title: t('profile'),//'Profile',
      url: '',
    },
    {
      icon: voucher,
      title: t('vouchers'),//'Vouchers',
      url: '',
    },
    {
      icon: helpCenter,
      title: t('helpCentre'),//'Help Center ',
      url: '',
    },
    {
      icon: LogoutIcon,
      title: t('logout'),//'logout ',
      url: '/logout',
    },
  ];

  const loggedOutMenuItems = [
    {
      icon: foodOrder,
      title: t('orderReordering'), //'Order & Reordering',
      url: '',
    },
    {
      icon: userPen,
      title: t('profile'),//'Profile',
      url: '',
    },
    {
      icon: voucher,
      title: t('vouchers'),//'Vouchers',
      url: '',
    },
    {
      icon: helpCenter,
      title: t('helpCentre'),//'Help Center ',
      url: '',
    },
    // {
    //   title: 'home',
    //   url: '',
    // },
    // {
    //   title: 'Cart Detail',
    //   url: '/cart-Details',
    // },
  ];
  const menuItems = isLoggedIn ? loggedInMenuItems : loggedOutMenuItems;

  // const SingleLevel = ({ item, depthLevel }) => {
  //   return (
  //     <ListItem button>
  //       <RouterLink to={{ pathname: item.url, query: (item.param >= 0) ? item?.param : '' }} style={{ paddingLeft: depthLevel * 10, textDecoration: 'none', cursor: 'pointer' }} className='sidebar-list-text' >
  //         <ListItemText onClick={toggleDrawer} primary={item.title} />
  //       </RouterLink>
  //     </ListItem>
  //   );
  // };

  // const MultiLevel = ({ item, depthLevel }) => {
  //   const { submenu: children } = item;
  //   const [open, setOpen] = useState(false);

  //   const handleClick = () => {
  //     setOpen((prev) => !prev);
  //   };



  //   return (
  //     <Fragment>
  //       <ListItem button onClick={handleClick}>
  //         <ListItemText primary={item.title} style={{ paddingLeft: depthLevel * 10, cursor: 'pointer' }} className='sidebar-list-text' />
  //         {open ? <ExpandLess /> : <ExpandMore />}
  //       </ListItem>
  //       <Collapse in={open} timeout="auto" unmountOnExit className='sidebar-collapse'>
  //         <List component="div" disablePadding>
  //           {children.map((child, key) => (
  //             <MenuItem key={key} item={child} depthLevel={depthLevel + 1} />
  //           ))}
  //         </List>
  //       </Collapse>
  //     </Fragment>
  //   );
  // };

  // const MenuItem = ({ item, depthLevel }) => {
  //   const Component = item.submenu ? MultiLevel : SingleLevel;
  //   return <Component item={item} depthLevel={depthLevel} />;
  // };

  // Change color of header on scrolling

  const listenScrollEvent = e => {
    if (window.scrollY > 0)
      setScrolled(true);
    else
      setScrolled(false);
  }

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)
  });
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setLoggedIn(true);
    }
  }, []);

  const { loggedInSuccess, restaurantSuccess, updateOrderItemSuccess, currentLanguage, cartItemsList } = props;

  const [restaurant, setRestaurant] = useState(null);
  const [cartItemDeleted, setCartItemDeleted] = useState(false);
  const [cartItemDeletedIndex, setCartItemDeletedIndex] = useState(null);
  const [innerCartItems, setInnerCartItems] = useState([]);

  useEffect(() => {
    if (restaurantSuccess?.data)
      setRestaurant(restaurantSuccess.data);
  }, [restaurantSuccess]);

  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId");
    let orderId = localStorage.getItem("orderId");
    if (restaurant && !loggedInSuccess && sessionId && orderId) {
      innerCartItems.map((item, index) => {
        let today = new Date();
        let itemAddedTime = new Date(item.created_at);
        // Calculate the difference in time (milliseconds)
        const timeDifference = today - itemAddedTime;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); //* 60 * 24
        if (daysDifference >= 1) {
          setCartItemDeleted(true);
          setCartItemDeletedIndex(index);
          const updatedItem = innerCartItems[index];
          const orderData = {
            sessionId: sessionId,
            orderId: orderId,
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
          props.updateOrderItem(orderData);
        }
      });
    }
  }, [restaurant])

  useEffect(() => {
    // This useEffect is to remove item from localStorage when quantity is 0 in db cart
    if (updateOrderItemSuccess && cartItemDeleted && cartItemDeletedIndex !== null) {
      removeItemFromCart(cartItemDeletedIndex);
      setCartItemDeleted(false);
      setCartItemDeletedIndex(null);
    }
  }, [updateOrderItemSuccess, cartItemDeleted, cartItemDeletedIndex]);

  useEffect(() => {
    let cart = localStorage.getItem('cart');
    if (cart)
      cart = JSON.parse(cart);
    if (cart?.length > 0 && currentLanguage)
      fetchCartItems();
    else if (cart?.length === 0) {
      localStorage.removeItem('orderId');
      localStorage.removeItem('sessionId');
      localStorage.removeItem('cart');
    }
  }, [currentLanguage, cartItems])

  useEffect(() => {
    if (cartItemsList?.data) {
      setInnerCartItems(cartItemsList.data)
    }
  }, [cartItemsList])

  const fetchCartItems = () => {
    console.log("header apiiiiiii");
    const orderId = localStorage.getItem('orderId');
    if (orderId)
      props.getCartItems({ order_id: orderId, language_id: currentLanguage._id })
  };

  const handleOpen = () => {
    setOpenModal(true);
    setDrawerOpen(false);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpenCart = () => {
    const isModalOpen = localStorage.getItem('cartModal');
    // console.log("isModalOpen in header ",isModalOpen);
    if (isModalOpen === 'true') {
      console.log("in the if block of header");
    }
    else {
      localStorage.setItem('cartModal', false);
      setOpenModalCart(true);
    }

    //localStorage.setItem('cartModal',false);
  };

  const handleCloseCart = () => {
    localStorage.setItem('cartModal', false);
    setOpenModalCart(false);
  };

  const handleOpenProfile = () => {
    setOpenModalProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenModalProfile(false);
  };
  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setOpenModal(false);
    localStorage.setItem('isLoggedIn', 'true');
  };
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');

  };
  const goToPage = (item) => {
    if (item.url === '/cart-Details') {
      history.push({ pathname: './cart-Details', state: { currency: restaurant?.branches[0].currency, cartItems: innerCartItems } });
    }
    else if (item.url === '/logout') {
      handleLogout()
    }
    else
      history.push({ pathname: './' });
    setDrawerOpen(false);
  }
  const isMobile = useMediaQuery('(max-width:960px)'); //960 before

  // const { toggleTheme } = useThemeContext();
  return (
    <div className='wrapper-center'>
      <div className={generalClasses.root} data-theme={themeValue}>

        {
          (location === location) ?
            // Home Page Header
            // <AppBar position="fixed" className={scrolled ? `navbar-white-fixed` : `navbar-transparent-fixed`}>
            <>

              {/* <div class="header-height"></div> */}

              {
                <AppBar position="relative" className='navbar-white  navbar-wahite-fixed' >
                  <Container full className='header-container' fixed>



                    {location === '/' ? (
                      <div className='restaurant-image-div-2 header-height-max2' >
                        <img src={headerImage} alt="Restaurant Image" className='restaurant-image-banner' />
                      </div>
                    ) : (
                      <div className='restaurant-image-div-1 header-height-max' >
                        <img src={headerImage} alt="Restaurant Image" className='restaurant-image-banner' />
                      </div>
                    )
                    }

                    <div className='profile-header'>
                      {
                        location === '/' ? (
                          <div className='riyaPay-logo riyaPay-logo1'>
                            <img src={riyaPayIcon} />
                          </div>
                        ) : (

                          <div className='riyaPay-logo'>
                            <img src={riyaPayIcon} />
                          </div>
                        )
                      }
                    </div>

                    <Toolbar className="header-bar">
                      <div className='navbar-inner'>
                        <div className='navbar-center'>
                          <div className={classes.logo}>
                            <RouterLink to="/">
                              <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'none' } }}>
                                <span>
                                  <img src={ropay} alt="logo" />
                                </span>
                              </Box>
                            </RouterLink>
                          </div>
                          <Box className="nav-menu" ml={4} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }} >
                            <Navbar />
                          </Box>
                          {
                            (location === '/home') ?(
                                <div className="profile-nav">
                                {/* <div className={`display-emp ${currentLanguage?.left_to_right === 0 && 'display-emp-rtl'}`}> */}

                                <Box sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' } }}>
                                  <img src={leftArrowIcon} className='headerLeftArrow' onClick={() => history.push('/')} />
                                </Box>
                                <Box sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' } }}>
                                  <h2 className='main-restu-text-menu'>{t(restaurant?.title)}</h2>
                                </Box>
                                {/* <div>
                                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'none' } }}>
                                      <Language />
                                    </Box>
                                  </div> */}
                                <Badge badgeContent={cartItems.length} color="primary" className="cart-res">
                                  <img className='cart-size' src={cartIcon} onClick={handleOpenCart} />
                                </Badge>
                                {/* <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
                                    {isLoggedIn ? (
                                      <Avatar alt="Profile" src={ropay} style={{ cursor: 'pointer' }} onClick={handleOpenProfile} />
                                    ) : (
                                      <button onClick={handleOpen}>{t('loginSignup')}</button>
                                    )}
                                  </Box> */}

                                {/* </div> */}
                                </div>
                            ):
                            (
                              <Language />
                            )
                          }
                        </div>
                      </div>
                      {/* <div>
                  <FormControlLabel control={<Switch onChange={toggleTheme} />}label="Toggle Theme"/> 
                  </div> */}
                    </Toolbar>
                  </Container>
                </AppBar>
              }
            </>
            : ''

        }

        {openModal &&
          <>
            <LoginModal
              openModal={openModal}
              handleClose={handleClose}
              onLoginSuccess={handleLoginSuccess}
            // setOpenModal={setOpenModal}
            />
          </>
        }
        {openModalProfile &&
          <ProfileMenu
            openModalProfile={openModalProfile}
            setOpenModalProfile={setOpenModalProfile}
            handleCloseProfile={handleCloseProfile}
            handleLogout={handleLogout}
          />
        }
        {openModalCart && isMobile &&
          (
            <AddCart
              openModalCart={openModalCart}
              setOpenModalCart={setOpenModalCart}
            />
          )
        }
        {/* {openModalCart &&
        <>
          <div className={`open-cart-icon ${openModalCart ? 'in' : ''}`}>
            <Tooltip title="Open Cart">
              <img src={cartArrow} onClick={handleCloseCart} />
            </Tooltip>
          </div> 
          <AddCart
            openModalCart={openModalCart}
            handleCloseCart={handleCloseCart}
            setOpenModalCart={setOpenModalCart}
         />
        </>
        
      }  */}
      </div>
    </div>

  );
}

// what is needed at start
const mapStateToProps = ({ authReducer, homeReducer, restaurantReducer, languageReducer }) => {
  const { loggedInSuccess } = authReducer
  const { restaurantSuccess, updateOrderItemSuccess } = restaurantReducer
  const { currentLanguage } = languageReducer
  const { cartItemsList } = homeReducer;
  return { loggedInSuccess, restaurantSuccess, updateOrderItemSuccess, currentLanguage, cartItemsList };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    getCartItems: (data) => dispatch(actions.getCartItemsStart(data)),
    updateOrderItem: (data) => dispatch(actions.updateOrderItemStart(data)),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);