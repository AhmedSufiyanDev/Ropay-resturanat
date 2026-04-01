import React, { useState, useEffect, useContext } from 'react';
import { Card, Container, CardActionArea, CardContent, Typography, CardMedia, Grid, Box, IconButton } from "@material-ui/core";
import { Alert, Loader, NoData } from "../../../components";
import "../scss/restaurantpage.scss";
import { heartIcon, prefretto, ropay } from '../../../assets/images/img';
import FoodCategories from './FoodCategories';
import { useTranslation } from 'react-i18next'
import Rating from '@material-ui/lab/Rating';
// import theme from '../scss/ThemeStyles.scss';
import { ThemeContext } from "../../../ThemeContext";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
// import InputIcon from '@material-ui/icons/Input';
import { cartArrow } from '../../../assets/images/img';
import Tooltip from '@material-ui/core/Tooltip';
import AddCart from '../../frontend/cart';
import { locationIcon, infoIcon, } from '../../../assets/images/img';
import { useCart } from '../layout/cartContext'
import { headerImage,riyaPayIcon } from '../../../assets/images/newImages';

function RestaurantPage(props) {
  console.log("index jsssss");
  const { t } = useTranslation();
  const { themeValue } = useContext(ThemeContext);
  const { productLoading, error, success, productsList, restaurantLoading, restaurantData, restaurantSuccess, keywords, currentLanguage, getPopularProductsSuccess, createOrderMessage, cartItemsList, homeLoading, loading } = props;
  // const { restaurantSuccess } = restaurantReducer;
  const [valueRating, setValueRating] = React.useState(2);
  const [category, setCategory] = React.useState([]);
  const [products, setProductsList] = React.useState([]);
  const [popularProducts, setPopularProducts] = React.useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [openModalCart, setOpenModalCart] = useState(false);
  const [render, setRender] = useState(false);
  const [innerCartItems, setInnerCartItems] = useState([]);
  const { cartItems } = useCart(); // Step 3: Consume the context

  useEffect(() => {
    if (restaurantSuccess?.data)
      setRestaurant(restaurantSuccess.data);
    // productCategory();
  }, [restaurantSuccess]);

  useEffect(() => {
    if (restaurant && currentLanguage) {
      fetchRestaurantCategories();
      fetchPopularProducts(restaurant.branches[0]._id);
    }
  }, [restaurant, currentLanguage])

  useEffect(() => {
    if (props.category) {
      setProductsList([]);
      setCategory(props.category);
    }
  }, [props?.category]);

  useEffect(() => {
    const orderId = localStorage.getItem('orderId');
    if (orderId && cartItemsList?.data)
      setInnerCartItems(cartItemsList.data)
  }, [cartItemsList])

  useEffect(() => {
    if (!cartItems || cartItems.length < 1)
      setInnerCartItems([]);
  }, [cartItems])

  useEffect(() => {
    if (restaurant && props.category && props.productsList?.data.length) {
      console.log("props.productsList", props.productsList)

      let allCategoriesProducts = [];

      props.productsList.data.map(item => {
        item.products = item.products.map(product => {
          product.currency = item.currency;
          return product;
        });

        let catItem = props.category.categoriesWithLanguage.find(category => category._id === item.category_id);
        let newProductsList = {
          categoryId: catItem?._id,
          categoryTitle: catItem?.category_language ? catItem.category_language.title : catItem?.title,
          products: item.products
        };
        if (newProductsList.products.length)
          allCategoriesProducts.push(newProductsList);
      });

      // setProductsList(newProductsList);
      setProductsList(allCategoriesProducts);
    }
  }, [props?.productsList]);

  useEffect(() => {
    if (restaurant && getPopularProductsSuccess) {
      if (getPopularProductsSuccess?.data) {
        if (getPopularProductsSuccess?.data.status === 2) {
          let newPopularProductsList = getPopularProductsSuccess.data.randomProducts.map(item => {
            item.currency = restaurant?.branches[0].currency;
            return item;
          });
          setPopularProducts(newPopularProductsList);
        }
        else if (getPopularProductsSuccess?.data.status === 1) {
          let newPopularProductsList = getPopularProductsSuccess.data.mostOrderedProducts.map(item => {
            item.product.currency = restaurant?.branches[0].currency;
            return item.product;
          });
          setPopularProducts(newPopularProductsList);
        }
      }
    }
  }, [getPopularProductsSuccess])

  const fetchRestaurantCategories = () => {
    props.getRestaurantCategories({ restaurant_id: restaurant?._id, language_id: currentLanguage._id });
  }

  const fetchPopularProducts = (restaurantBranchId) => {
    props.getPopularProducts({ restaurant_branch_id: restaurantBranchId, language_id: currentLanguage._id })
  }

  function convertToAMPM(time) {
    // Split the time string into hours and minutes
    var splitTime = time.split(":");
    var hours = parseInt(splitTime[0], 10);
    var minutes = parseInt(splitTime[1], 10);

    // Determine whether it's AM or PM
    var period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Construct the new time string
    return hours + ":" + ((minutes < 10) ? '0' + minutes : minutes) + " " + period;
  }

  const handleOpenCart = () => {
    // setOpenModalCart(true);
    var cartModal = true;
    localStorage.setItem('cartModal', cartModal);
    setOpenModalCart(prevState => !prevState);
  };

  const handleCloseCart = () => {
    setOpenModalCart(false);
    localStorage.setItem('cartModal', false);
  };


  // useEffect(() => {
  //   console.log("===============", restaurantLoading)
  //   if (!restaurantLoading) {
  //     setRender(true)
  //   }
  // }, [restaurantLoading]);

  const tooltipContent = (
    <Box>
      <Typography>{restaurant?.title}</Typography>
      <Typography>{restaurant?.detail}</Typography>
      {/* <Typography>{restaurant?.branches?.address}</Typography> */}
      {/* <Typography>{restaurant?.timing}</Typography>*/}
    </Box>
  );
  return (
    <div className="center-item" data-theme={themeValue}>
      {homeLoading ?
        (
          <Loader />
        ) : (
          <>
            {restaurant === null ? (
              <Loader />
            ) : restaurant ? (
              <div>
                {((error || success || createOrderMessage) && !loading) &&
                  <Alert type={error ? 'error' : 'success'} message={error?.message || success?.message || createOrderMessage?.message} />
                }
                
               
                <section className='line-hr-section'>
                  {/* {
                    render && */}
                  <FoodCategories
                    category={category}
                    products={products}
                    popularProducts={popularProducts}
                    innerCartItems={innerCartItems}
                  // foodLoader={restaurantLoading}
                  />
                  {/* } */}
                  {/* </Container> */}
                </section>
              </div>
            ) : (
              <div className='no-restaurant-wrapper'>
                <NoData text={"No Restaurant Found!"} />
              </div>
            )
            }
          </>
        )
      }
    </div>

  )
}


//what is needed at start
const mapStateToProps = ({ homeReducer, restaurantReducer, languageReducer }) => {
  const { productLoading, category, productsList, cartItemsList, homeLoading } = homeReducer;
  const { keywords, currentLanguage } = languageReducer
  const { restaurantData, restaurantSuccess, error, success, loading, getPopularProductsSuccess, createOrderMessage } = restaurantReducer; //restaurantLoading
  return { productLoading, error, success, category, productsList, restaurantData, restaurantSuccess, keywords, currentLanguage, getPopularProductsSuccess, createOrderMessage, cartItemsList, homeLoading, loading }; //restaurantLoading

};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantCategories: (data) => dispatch(actions.getRestaurantCategoriesStart(data)),
    getPopularProducts: (data) => dispatch(actions.getPopularProductsStart(data)),
    // getRestaurants: (data) => dispatch(actions.getRestaurantStart(data)),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);