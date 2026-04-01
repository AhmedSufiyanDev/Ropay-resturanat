import {
    AppBar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Tab,
    Tabs,
    Toolbar,
    Typography
} from "@material-ui/core";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import OwlCarousel from "react-owl-carousel";
import { addBtn, ArrowSvg2 } from '../../../assets/images/img';
import NoData from "../../../components/noData";
import Loader from "../../../components/loading";
import { categoriesFood } from '../../../environment';
import AddCartDetail from '../cart/addCartDetail';
import theme from '../scss/ThemeStyles.scss';
import { useTranslation } from "react-i18next";
import { useStyles } from "./styles";
import PopularCategories from "./popularCategories";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import InputIcon from '@material-ui/icons/Input';
import Input from "@material-ui/icons/Input";
import { ArrowBackIos } from "@material-ui/icons";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// import StickyBox from "react-sticky-box";


// const categories = ['Popular', 'Pizza', 'Cold Appetizers', 'Beverages', 'Menu'];

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function PlusButton(props) {

    const { innerCartItems, product, index, handleOpen } = props;

    const cartItem = innerCartItems.find(cartItem => cartItem.product_id === product._id);

    return (
        <>
            {cartItem ?
                <div className='item-btn'>
                    <div className='quantity-circle'>
                        {cartItem.quantity}
                    </div>
                </div>
                :
                <div className='item-btn'>
                    <img src={addBtn} onClick={() => handleOpen(product, index)} />
                </div>
            }
        </>
    );
}

function FoodCategories(props) {
    const { category, productLoading, products, currentLanguage, loading, popularProducts, restaurantSuccess, innerCartItems, foodLoader, restaurantLoading } = props;
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    console.log("category", category);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [value, setValue] = React.useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [counters, setCounters] = useState({});//0
    const [language, setLanguage] = useState(i18n.language);
    const [restaurant, setRestaurant] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [isLoad, setIsLoad] = useState(restaurantLoading);
    const [skeleton, setSkeleton] = useState(0);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const stickyPoint = 200;//450 // Adjust this value as needed
        setIsSticky(scrollTop >= stickyPoint);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [carouselKey, setCarouselKey] = useState(0);

    useEffect(() => {
        // To force owl carousel to be re-rendered when innerCartItems change specially the case when
        // a popular product whose quantity is 1 removed from the cart then again the plus sign should appear
        // in place of quantity circle
        setCarouselKey(prevKey => prevKey + 1);
    }, [innerCartItems]);

    // console.log("products",products)
    useEffect(() => {
        setLanguage(i18n.language);
    }, [i18n.language]);

    useEffect(() => {
        if (restaurantSuccess?.data)
            setRestaurant(restaurantSuccess?.data);
        // productCategory();
    }, [restaurantSuccess]);

    const handleChange = (event, newValue) => {
        if (newValue > 0) {
            const selectedCategoryId = props.category?.categoriesWithLanguage[newValue - 1]?._id; // Get selected category ID
            console.log("selectedCategoryId in handleChange", selectedCategoryId);
            setSelectedCategoryId(selectedCategoryId);
        }
        else {
            setSelectedCategoryId(t('popular'));
        }
        setValue(newValue);
        // props.getProducts({selectedCategoryId}); // Dispatch action with categoryId
    };

    useEffect(() => {
        if (category?.categoriesWithLanguage?.length)
            setValue(0);
    }, [category])

    // useEffect(() => {
    // Fetch products only if products are not already available and there is a valid category selected
    //     if (selectedCategoryId) {
    //         props.getProducts({ selectedCategoryId, language_id: currentLanguage._id });
    //     }
    // }, [selectedCategoryId]); 

    useEffect(() => {
        // Fetch products only if products are not already available and whwn all categories are available
        if (category?.categoriesWithLanguage) {
            // props.getProducts({ selectedCategoryId, language_id: currentLanguage._id });
            let category_ids = category?.categoriesWithLanguage.map(catWithLanguage => catWithLanguage._id);
            props.getProducts({ category_ids: category_ids, language_id: currentLanguage._id })
        }
    }, [category]) //currentLanguage,props

    const handleOpen = (item) => {
        console.log("handleOpen in parentcomponent", item);
        setOpenModal(true);
        setSelectedItem(item);
        localStorage.setItem('cartModal', false);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    }
    const CategoryId = "";//65f946d3cf06b826ddfe767f
    const filteredPopular = products && products.filter(product => product.category_id === CategoryId);

    const handleCategoryChange = (categoryId) => {
        console.log("selected Category", categoryId);

        const index = categoryId === 'popular' ? 0 : props.category.categoriesWithLanguage.findIndex(cat => cat._id === categoryId) + 1;
        console.log("index", index);
        setValue(index);
    };

    useEffect(() => {
        console.log('foodLoader', restaurantLoading)
        if (restaurantLoading) {

            // setTimeout(() => {
            setIsLoad(true)
            setSkeleton(prevKey => prevKey + 1);
            // }, 5000)
        }
        else {
            setTimeout(() => {
                setIsLoad(false)
                setSkeleton(prevKey => prevKey + 1);
            }, 1000)
        }

    }, [restaurantLoading])

    useEffect(() => {
        console.log("isload change", isLoad);
    }, [isLoad])

    // const handleClick = () => {
    //     setSticky(true);
    // };

    // Function to transform text to capitalize the first letter of each word
    const capitalizeText = (text) => {
        if (!text) return '';
        return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    };
    const lowerizeText = (text) => {
        if (!text) return '';
        return text.toLowerCase().replace(/\b\w/g, char => char.toLowerCase());
    };
    // console.log("filteredPopular",filteredPopular);
    // Filter products based on the selected category_id
    // const filteredProducts = products && products.filter(product => product.category_id === selectedCategoryId);
    // const options = {
    //     navText: [
    //         `<img src=${ArrowSvg} class='custom-nav-btn custom-prev-btn' alt='Previous' />`,
    //         `<img src=${ArrowSvg} class='custom-nav-btn custom-next-btn' alt='Next' />`
    //       ],
    // };
    return (

        <div>
            <div className={classes.rootTab}>
                {/* <Grid container spacing={3}>
                            <Grid item lg={12} xs={12}> */}
                {isSticky && <div className={classes.placeholder} />}
                <AppBar position="static" className={`appbar-line ${classes.colorBar} ${isSticky ? classes.sticky : ''}`} elevation={0}>
                    <Container fixed>
                        <Tabs
                            className={`rest-tabs-sticky ${classes.tabSlider} ${currentLanguage?.left_to_right === 0 && classes.tabsReverse}`}
                            value={value} 
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            aria-label="scrollable force tabs example"
                        >
                            <Tab className='tabs-btn tab-gap' label={t('popular')} key={0} {...a11yProps(0)} />
                            {props.category?.categoriesWithLanguage?.map((item, index) => (
                                <Tab
                                    className={`${currentLanguage?.left_to_right === 1 ? 'tabs-btn tab-gap' : 'tabs-btn-rtl tab-gap'}`}
                                    label={(item?.category_language && item?.category_language.title) ? item?.category_language.title : item?.title}
                                    key={index + 1}
                                    {...a11yProps(index + 1)}
                                />
                            )
                            )
                        }
                        </Tabs>
                    </Container>
                </AppBar>

                {
                    /* 
                       <AppBar className={`${classes.colorBar} ${isSticky ? classes.sticky : ''}`} elevation={0} position="static" >
                                            <Tabs
                                                className={classes.tabSlider}
                                                value={value}
                                                onChange={handleChange}
                                                variant="scrollable"
                                                scrollButtons="on"
                                                aria-label="scrollable force tabs example"
                                            >
                                                <Tab className='tabs-btn tab-gap' label={t('popular')} key={0} {...a11yProps(0)} />
                                                {category?.categoriesWithLanguage?.map((item, index) => (
                                                    <Tab
                                                        className='tabs-btn tab-gap'
                                                        label={t(item?.category_language ? item?.category_language.title : item?.title)}
                                                        key={index + 1}
                                                        {...a11yProps(index + 1)}
                                                    />
                                                ))}
                                            </Tabs>
                                    </AppBar> 
                    */
                }
                {/* </Grid>
                        </Grid> */}
            </div>
            <Container fixed className={`popularCategoriesContainer owl-category-poplur  ${currentLanguage?.left_to_right === 0 && 'owl-category-poplur-lang'}`}>
                {!loading ? (
                    (popularProducts && popularProducts.length > 0) ? (
                        <OwlCarousel id={t('popular')}
                            key={carouselKey}
                            className={`owl-theme owl-stage  mainslider-owl owl-flex owl-Carousel-popular ${currentLanguage?.left_to_right === 0 && 'owl-flex-rtl'}`}
                            dots={false}
                            nav={false}
                            navText={[
                                `<img src=${ArrowSvg2} className="custom-prev-btn" alt="Previous Arrow" />`,
                                `<img src=${ArrowSvg2} className="custom-next-btn" alt="Next Arrow" />`
                            ]}
                            responsive={{
                                0: {
                                    stagePadding: 5,
                                    items: 2,
                                    margin: 120,
                                    nav: false,
                                },
                                600: {
                                    items: 2,
                                    margin: 15,
                                    stagePadding: 20,
                                    nav: false,
                                },
                                768: {
                                    // items: 2,
                                    // margin: 20,
                                    // stagePadding: 0,
                                    items: 2,
                                    margin: 15,
                                    stagePadding: 20,
                                    nav: false,
                                },
                                992: {
                                    // items: 2,
                                    // margin: 20,
                                    // stagePadding: 0,
                                    items: 2,
                                    margin: 15,
                                    stagePadding: 20,
                                    nav: false,
                                },
                                1000: {
                                    items: 2,
                                    margin: 15,
                                    stagePadding: 20,
                                    nav: false,
                                    // items: 2,
                                    // margin: 20,
                                    // stagePadding: 0,
                                },
                                1200: {
                                    items: 2,
                                    margin: 15,
                                    stagePadding: 20,
                                    nav: false,
                                    // items: 3,
                                    // stagePadding: 0,
                                    // margin: 20
                                },
                                1366: {
                                    items: 2,
                                    margin: 15,
                                    stagePadding: 20,
                                    nav: false,
                                    // items: 4,
                                    // stagePadding: 10,
                                    // margin: 20
                                },
                                1600: {
                                    items: 2,
                                    margin: 15,
                                    stagePadding: 20,
                                    nav: false,
                                    // items: 4,
                                    // stagePadding: 10,
                                    // margin: 38
                                },
                                1920: {
                                    items: 2,
                                    margin: 15,
                                    stagePadding: 20,
                                    nav: false,
                                    // items: 4,
                                    // stagePadding: 10,
                                    // margin: 38
                                }
                            }}
                        >
                            {popularProducts.map((item, index) => {
                                // console.log("item",item);
                                return (
                                    <div key={skeleton}>
                                        <Card className="dishes-menu-restu">
                                            <CardMedia className={classes.cover}>
                                                {isLoad ?
                                                    <Skeleton height={100} />
                                                    :
                                                    <img src={item.image} className="menu-img-restu" loading="lazy" />
                                                }
                                            </CardMedia>

                                            {currentLanguage?.left_to_right === 1 &&
                                                <CardContent className={classes.cardPad}>
                                                    {isLoad ? (
                                                        <skeleton height={10} />
                                                    ) : (
                                                        <h2 className="menu-title-restu">
                                                            {capitalizeText((item.product_language && item.product_language.title !== '') ? item.product_language.title : item.title)}
                                                        </h2>
                                                    )
                                                    }
                                                    {isLoad ? (
                                                        <Skeleton height={10} />
                                                    ) : (
                                                        <Typography className="menu-type-restu">
                                                            {lowerizeText((item.product_language && item.product_language.details !== '') ? item.product_language.details : item.details)}
                                                        </Typography>
                                                    )
                                                    }

                                                    {isLoad ? (
                                                        <Skeleton height={10} />
                                                    ) : (
                                                        <div className='itm-dtl-price1'>
                                                            <div className='item-price justify-content-between'>
                                                                <p>{restaurant?.branches[0]?.currency}<span>{item.price}/-</span></p>
                                                            </div>
                                                            <PlusButton innerCartItems={innerCartItems} product={item} index={index} handleOpen={handleOpen} />
                                                        </div>
                                                    )}

                                                </CardContent>
                                            }

                                            {currentLanguage?.left_to_right === 0 &&
                                                <CardContent className={classes.cardPad} >
                                                    {isLoad ? (
                                                        <Skeleton height={10} />
                                                    ) : (
                                                        <h2 className="menu-title-restu menu-title-restu-rtl" >
                                                            {capitalizeText((item.product_language && item.product_language.title !== '') ? item.product_language.title : item.title)}
                                                        </h2>
                                                    )}

                                                    {isLoad ? (
                                                        <Skeleton height={10} />
                                                    ) : (
                                                        <Typography className="menu-type-restu menu-type-restu-rtl">
                                                            {(item.product_language && item.product_language.details !== '') ? item.product_language.details : item.details}
                                                        </Typography>
                                                    )}

                                                    {isLoad ? (
                                                        <Skeleton height={10} />
                                                    ) : (
                                                        <div className='itm-dtl-price1'>
                                                            <PlusButton innerCartItems={innerCartItems} product={item} index={index} handleOpen={handleOpen} />
                                                            <div className='item-price justify-content-between'>
                                                                <p>{restaurant?.branches[0]?.currency}<span>{item.price}/-</span></p>
                                                            </div>
                                                        </div>
                                                    )}

                                                </CardContent>
                                            }

                                            {/* <div className='itm-dtl-price1'>
                                                                    <PlusButton innerCartItems={innerCartItems} product={item.product} index={index} handleOpen={handleOpen} />
                                                                    <div className='item-price justify-content-between'>
                                                                        <p>{restaurant?.branches[0]?.currency}<span>{item.product.price}/-</span></p>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        } */}

                                        </Card>

                                    </div>
                                )
                            })}
                        </OwlCarousel>
                    ) : (
                        <div id={t('popular')}>
                            {/* <NoData text={"No popular products"} /> */}
                        </div>
                    )
                )
                    :
                    <Loader />
                }
            </Container>
            <section>
                {/* {productLoading  ?
                        // <Loader />
                        <></>
                         : */}
                <PopularCategories
                    selectedCategoryId={selectedCategoryId}
                    filteredProducts={products}
                    popularProducts = {popularProducts}
                    innerCartItems={innerCartItems}
                    categoriesFood={categoriesFood}
                    parentCallBack={handleOpen}//{handleCallBack}
                    counters={counters}
                    setCounters={setCounters}
                    onCategoryChange={handleCategoryChange} // Pass the handler
                />
                {/* } */}
            </section>
            {openModal &&
                <AddCartDetail
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    selectedItem={selectedItem}
                    handleClose={handleCloseModal}
                    currentLanguage={currentLanguage}
                />
            }
        </div>
    )
}

//what is needed at start
const mapStateToProps = ({ homeReducer, restaurantReducer, languageReducer }) => {
    const { productLoading, error, success, productsList, category } = homeReducer;
    const { currentLanguage } = languageReducer;
    const { loading, restaurantSuccess, restaurantLoading } = restaurantReducer;
    return { productLoading, error, success, productsList, currentLanguage, loading, restaurantSuccess, restaurantLoading, category };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: (data) => dispatch(actions.getProductStart(data)),

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FoodCategories);
// export default FoodCategories;


