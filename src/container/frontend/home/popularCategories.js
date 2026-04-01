import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
    Card, Container, Paper, Tabs, Tab, Typography, AppBar, Grid, Box,
    CardMedia, CardContent, ButtonGroup, Button,
} from "@material-ui/core";
import { addBtn, cart } from '../../../assets/images/img';
import { useStyles } from './styles';
import AddCartDetail from '../cart/addCartDetail';
import { useTranslation } from 'react-i18next';
import { useCart } from '../layout/cartContext'
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import AddCart from '../../frontend/cart';
import { useMediaQuery, useTheme } from '@mui/material';
import '../../frontend/scss/cart.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { homeReducer } from '../../../store/reducers/homeReducer';
import { VisibilitySharp } from '@material-ui/icons';

function PlusButton(props) {
    const { innerCartItems, product, index, handleOpen, load } = props;

    const cartItem = innerCartItems.find(cartItem => cartItem.product_id === product._id);
    console.log("cartItem1234====>>", cartItem?.quantity);
    return (
        <>
            {
                cartItem?.quantity ? (
                    <div className='item-btn'>
                        <div className='quantity-circle'>
                            {cartItem?.quantity}
                        </div>
                    </div>
                ) : (
                    load ? (
                        <Skeleton variant="circle" width={30} height={20} />
                    ) : (
                        <div className='item-btn'>
                            <img src={addBtn} onClick={() => handleOpen(product, index)} />
                        </div>
                    )

                )
            }
        </>
    );
}


function PopularCategories(props) {

    const { t } = useTranslation();

    const { categoriesFood, selectedCategoryId, filteredProducts, counters, setCounters, restaurantSuccess, currentLanguage, parentCallBack, innerCartItems, productLoading, onCategoryChange, popularProducts } = props;
    console.log("productLoading", productLoading);
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { cartItems, addItemToCart } = useCart(); // Step 3: Consume the context

    console.log("innerCartItems in popular category", innerCartItems);

    const [visibleCategory, setVisibleCategory] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [openModalCart, setOpenModalCart] = useState(false);//,localStorage.setItem('cartModal',true)
    const [isSticky, setIsSticky] = useState(false);
    const [isLoad, setIsLoad] = useState(productLoading);

    useEffect(() => {
        if (productLoading) {
            setIsLoad(true);
            // setTimeout(() => {
            //     setIsLoad(false);
            // }, 2000);  // simulate loading time
        } else {
            setTimeout(() => {
                setIsLoad(false)
                // setSkeleton(prevKey => prevKey + 1);
            }, 1000)
        }
    }, [productLoading]);

    useEffect(() => {
        console.log("isload in popularCategories", isLoad);
    }, [isLoad]);

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const stickyPoint = 400; // Adjust this value as needed
        setIsSticky(scrollTop >= stickyPoint);

        let currentVisibleCategory = null;
        sectionRefs.current.forEach((value, key) => {
            const elementTop = value.getBoundingClientRect().top;
            if (elementTop <= stickyPoint) {
                currentVisibleCategory = key;
            }
        });

        if (currentVisibleCategory && currentVisibleCategory !== visibleCategory) {
            setVisibleCategory(currentVisibleCategory);
            onCategoryChange(currentVisibleCategory);
        }
    }, [visibleCategory, onCategoryChange]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);


    // const handleScroll = () => {
    //     const scrollTop = window.scrollY;
    //     const stickyPoint = 600; // Adjust this value as needed
    //     setIsSticky(scrollTop >= stickyPoint);

    // };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (restaurantSuccess?.data)
            setRestaurant(restaurantSuccess?.data);
        // productCategory();
    }, [restaurantSuccess]);

    // useEffect(() => {
    //     // Get the target element by its id
    //     const element = document.getElementById(selectedCategoryId);

    //     // Check if the element exists
    //     if (element) {
    //         // Get the top position of the element relative to the viewport
    //         const elementTop = element.getBoundingClientRect().top;

    //         // Scroll the window to the top position of the element
    //         window.scrollTo({
    //             top: elementTop - 95,
    //             behavior: 'smooth'
    //         });
    //     }
    // }, [selectedCategoryId])
    const sectionRefs = useRef(new Map());

    const handleIntersection = useCallback((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setVisibleCategory(entry.target.id);
            }
        });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // Adjust based on when you want the category to change
        });
        sectionRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, [handleIntersection]);

    useEffect(() => {
        if (visibleCategory) {
            console.log("visibleCategaory", visibleCategory);
            props.onCategoryChange(visibleCategory); // Notify parent about the category change
        }
    }, [visibleCategory, props]);

    useEffect(() => {
        const element = document.getElementById(selectedCategoryId);

        if (element) {
            //   const stickyNavbarHeight = 134; // Adjust this value as needed (sticky top + sticky height)
            const stickyNavbarHeight = 70 + 64; // Adjust this value as needed (sticky top + sticky height)
            const elementTop = element.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementTop - stickyNavbarHeight,
                behavior: 'smooth',
            });
        }
    }, [selectedCategoryId]);
    // const [productId,setProductId] = useState();
    // const [catId,setCatId] = useState();
    // const [selectedProductId, setSelectedProductId] = useState(null);
    // const [selectedProductIds, setSelectedProductIds] = useState([]);

    //  console.log("selectedProductIds",selectedProductIds);
    const handleOpen = (item, index) => {
        const productId = item._id;
        const categoryId = item.category_id;
        // setSelectedProductId(productId);
        // setSelectedProductIds(prevIds => [...prevIds, productId]); // Add the selected product ID to the array
        // setCatId(setCatId);
        console.log("abc", productId);//,categoryId
        console.log("popularCategories")
        setOpenModal(true);
        console.log("item1", item);
        // setSelectedItem(item);
        parentCallBack(item);
        // setOpenModalCart(true);
        // localStorage.setItem('cartModal',true);
    };
    const handleClose = () => {
        setOpenModal(false);
    }
    // const handleCloseCart = () => {
    //     localStorage.setItem('cartModal',false);
    //     setOpenModalCart(false);
    // };
    const handleOpenCart = () => {
        setOpenModalCart(true);
        /*const isModalOpen = localStorage.getItem('cartModal');
         console.log("isModalOpen in header ",isModalOpen);
         if (isModalOpen === 'true') { 
           console.log("in the if block of header");
        }
        else{
          localStorage.setItem('cartModal',false);
          
         }
         
         localStorage.setItem('cartModal',false);
         */
    };

    /*
    Function to update the counter for a specific item
    const updateCounter = (itemIndex, value,category_id) => {
        console.log("category_id",category_id);

        console.log("itemIndex",itemIndex,value);
        setCounters(prevCounters => ({
            ...prevCounters,
            [itemIndex]: (prevCounters[itemIndex] || 0) + value
        }));
    };
    const updateCounter = (itemIndex, value, productID) => {
        console.log("category_id", productID);
        console.log("itemIndex", itemIndex, value);
        setCounters(prevCounters => ({
            ...prevCounters,
            [itemIndex]: (prevCounters[itemIndex] || 0) + value
        }));
    };
    */
    // const updateCounter = (productID, value) => { // this function to use the product ID as the key.
    //     setCounters(prevCounters => ({
    //         ...prevCounters,
    //         [productID]: (prevCounters[productID] || 0) + value
    //     }));
    // };
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:1279px)'); //960px before
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
    // Function to transform text to capitalize the first letter of each word
    const capitalizeText = (text) => {
        if (!text) return '';
        return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    };
    // Function to transform text to make small the letters of each word
    const lowerizeText = (text) => {
        if (!text) return '';
        return text.toLowerCase().replace(/\b\w/g, char => char.toLowerCase());
    };

    return (
        <div>
            <Container fixed className='popularproducts-spacing' style={{ marginTop: "-20px" }}>
                {currentLanguage?.left_to_right === 1 &&
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {isLoad ? (
                                <>
                                    {popularProducts?.map((item, index) => (
                                        <>
                                            <div>
                                                <Skeleton height={40} width={'30%'} className='cat-products-heading' />
                                            </div>
                                            <Card className={`${classes.rootMenu} menu-card-style`}>
                                                <div className='img-size-menu'>
                                                    <Skeleton width={'100%'} height={'100%'} borderRadius={'20.993px'} />
                                                </div>
                                                <CardContent className='card-content-div'>
                                                    <div className='menu-name-text-detail'>
                                                        <Skeleton width={'90%'} height={'20px'} />
                                                        <Skeleton width={'70%'} height={'20px'} />
                                                    </div>
                                                    <div className='itm-dtl-price1'>
                                                        <div className='card-price'>
                                                            <div className='item-price'>
                                                                <Skeleton width={'50px'} height={'50%'} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </>
                                    ))
                                    }
                                </>
                            ) : (
                                filteredProducts?.map((item, index) => (
                                    <div
                                        key={item.categoryId}
                                        id={item.categoryId}
                                        ref={(el) => sectionRefs.current.set(item.categoryId, el)}
                                    >
                                        {/* {console.log("item.categoryId", item.categoryId)} */}
                                        {isLoad ? (
                                            <Skeleton height={40} width={'50%'} className='cat-products-heading' />
                                        ) : (
                                            <h3 className='cat-products-heading'>{item.categoryTitle}</h3>
                                        )}
                                        <Grid container spacing={3} >
                                            {item.products.map((product, itemIndex) => (
                                                <Grid key={product.id} item xs={12} sm={12} md={12} lg={12}>
                                                    <Card className={`${classes.rootMenu} menu-card-style`}>
                                                        {isLoad ? (
                                                            <div className='img-size-menu'>
                                                                <Skeleton width={'100%'} height={'100%'} borderRadius={'20.993px'} />
                                                            </div>
                                                        ) : (
                                                            product?.image ? (
                                                                <img src={product?.image} className='img-size-menu' alt="Product Image" />
                                                            ) : (
                                                                <>
                                                                    <div className='product-img-outer'></div>
                                                                </>
                                                            )
                                                        )}

                                                        <CardContent className='card-content-div'>
                                                            <div className='menu-name-text-detail'>
                                                                {isLoad ? (
                                                                    <Skeleton width={'90%'} height={'20px'} />
                                                                ) : (
                                                                    <h2>{capitalizeText((product?.product_language && product?.product_language.title !== '') ? product?.product_language.title : product?.title)}</h2>
                                                                )}
                                                                {isLoad ? (
                                                                    <Skeleton width={'70%'} height={'20px'} />
                                                                ) : (
                                                                    <p>{lowerizeText((product?.product_language && product?.product_language.details !== '') ? product?.product_language.details : product?.details)}</p>
                                                                )
                                                                }
                                                            </div>
                                                            <div className='itm-dtl-price1'>
                                                                {isLoad ? (
                                                                    <div className='card-price'>
                                                                        <div className='item-price'>
                                                                            <Skeleton width={'50px'} height={'50%'} />
                                                                        </div>
                                                                    </div>

                                                                ) : (
                                                                    <div className='card-price'>
                                                                        <div className='item-price'>
                                                                            <p>{restaurant?.branches[0]?.currency}<span>{t(product.price)}/-</span></p>

                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <PlusButton innerCartItems={innerCartItems} load={isLoad} product={product} index={index} handleOpen={parentCallBack} />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                )
                                )
                            )
                            }

                            {/* {filteredProducts?.map((item,index) => {
                                    console.log("filterItem",item,"FilterIndex",index);
                                        return(
                                        <>
                                            <div id={item.categoryId}>
                                                <h3 className='cat-products-heading'>{item.categoryTitle}</h3>
                                                <Grid container spacing={3} >
                                                    {item.products.map((product, itemIndex) => (
                                                        <Grid key={item.id} item xs={12} sm={12} md={12} lg={6}>
                                                            <Card className={`${classes.rootMenu} menu-card-style `}>
                                                                {
                                                                    product?.image ?
                                                                    <img src={product?.image} className='img-size-menu' alt="Product Image" />
                                                                    :
                                                                    <div className='product-img-outer'></div>
                                                                }
                                                                <CardContent className='card-content-div'>
                                                                    <div className='menu-name-text-detail'>
                                                                        <h2>{capitalizeText(product?.product_language ? product?.product_language.title : product?.title)}</h2>
                                                                        <p>{product?.product_language ? product?.product_language.details : product?.details}</p>
                                                                    </div>
                                                                    <div className='itm-dtl-price1'>
                                                                        <div className='card-price'>
                                                                            <div className='item-price'>
                                                                                <p>{restaurant?.branches[0]?.currency}<span>{product.price}/-</span></p>
                                                                            </div>
                                                                        </div>
                                                                        <PlusButton innerCartItems={innerCartItems} product={product} index={index} handleOpen={handleOpen} />
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </div>
                                        </>
                                        )
                                    })} */}
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={6} lg={4}> */}
                        {
                            // !isMobile && (
                            //     <div style={{ position: 'static' }} className={`add-Cart ${isSticky ? classes.stickyCart : ''} `}>
                            //         <AddCart
                            //             openModalCart={openModalCart}
                            //             setOpenModalCart={setOpenModalCart}
                            //         />
                            //     </div>

                            // )
                        }
                        {/* </Grid> */}
                    </Grid>
                }

                {currentLanguage?.left_to_right === 0 &&
                    // <Container fixed >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={4} style={{ order: isMediumScreen ? 1 : 1 }}>
                            {!isMobile && (
                                <div style={{ position: 'static' }} className={`add-Cart left-grid-modal ${isSticky ? classes.stickyCart : ''} `}>  {/* <div className='left-grid-modal'></div> */}
                                    <AddCart
                                        openModalCart={openModalCart}
                                        // handleCloseCart={handleCloseCart}
                                        setOpenModalCart={setOpenModalCart}
                                    />
                                </div>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={8} style={{ order: isMediumScreen ? 1 : 2 }}>
                            {filteredProducts?.map((item, index) => {
                                // console.log("filterItem", item, "FilterIndex", index);
                                return (
                                    <>
                                        <div id={item.categoryId} className='items-grid-rtl'>
                                            {isLoad ? (
                                                <Skeleton className='cat-products-heading cat-products-heading-rtl' width={'50%'} height={'30px'} direction='rtl' />
                                            ) : (
                                                <h3 className='cat-products-heading cat-products-heading-rtl'>{item.categoryTitle}</h3>
                                            )
                                            }
                                            <Grid container spacing={3} className='product-rtl'>
                                                {item.products.map((product, itemIndex) => (
                                                    <Grid key={item.id} item xs={12} sm={12} md={12} lg={6} >
                                                        <Card className={`${classes.rootMenu} menu-card-style `}>

                                                            <CardContent className='card-content-div-rtl'>
                                                                <div className='menu-name-text-detail-rtl'>
                                                                    {isLoad ? (
                                                                        <Skeleton width={'90%'} height={'20px'} direction='rtl' />
                                                                    ) : (
                                                                        <h2 className='menu-name-text-detail-rtl-h2'>{(product?.product_language && product?.product_language.title !== '') ? product?.product_language.title : product?.title}</h2>
                                                                    )}
                                                                    {isLoad ? (
                                                                        <Skeleton className='menu-name-text-detail-rtl-p' width={'70%'} height={'20px'} direction={'rtl'} />
                                                                    ) : (
                                                                        <p className='menu-name-text-detail-rtl-p'>{(product?.product_language && product?.product_language.details !== '') ? product?.product_language.details : product?.details}</p>
                                                                    )}
                                                                </div>
                                                                <div className='itm-dtl-price1'>
                                                                    <PlusButton innerCartItems={innerCartItems} load={isLoad} product={product} index={index} handleOpen={handleOpen} />
                                                                    {isLoad ?
                                                                        (<div className='card-price'>
                                                                            <div className='item-price'>
                                                                                <Skeleton width={'80px'} height={'20px'} />
                                                                            </div>
                                                                        </div>) : (
                                                                            <div className='card-price'>
                                                                                <div className='item-price'>
                                                                                    <p>{restaurant?.branches[0]?.currency}<span>{product.price}/-</span></p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }


                                                                </div>
                                                            </CardContent>
                                                            {isLoad ?
                                                                (<div className='img-size-menu'>
                                                                    <Skeleton width={'100%'} height={'100%'} borderRadius={'20.993px'} />
                                                                </div>
                                                                ) : (
                                                                    product?.image ?
                                                                        <img src={product?.image} className='img-size-menu' alt="Product Image" />
                                                                        :
                                                                        <div className='product-img-outer'></div>
                                                                )
                                                            }
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                    </>
                                )
                            })}
                        </Grid>

                    </Grid>
                    // </Container>
                }
                {
                    cartItems.length > 0 &&
                    <div className={`openCartBtn ${((restaurant !== null)) ? 'in' : ''}`}>
                        <div className='open-cart-inner'>
                            <div>
                                <span className='openCartBtnItems'>
                                    {cartItems.length}
                                </span>
                            </div>
                            <div className='openCartBtnText' onClick={handleOpenCart}>
                                <span>View Your Cart</span>
                            </div>
                            <div className='openCartBtnPrice'>
                                <span className='openCartBtnPriceHead'>BGN.  </span>
                                <span className='openCartBtnPriceValue'> {cartItems[0]?.price}</span>
                            </div>
                        </div>
                    </div>
                }
            </Container>

            {
                openModalCart && isMobile &&
                (
                    <AddCart
                        openModalCart={openModalCart}
                        setOpenModalCart={setOpenModalCart}
                    />
                )
            }
            {/* {cartItems.length > 0 &&
                            <div  className={`openCartBtn ${((isMobile && restaurant!==null)) ? 'in' : ''}`}>
                            <div className='open-cart-inner'>
                            <div><span className='openCartBtnItems'>{cartItems.length}</span></div>
                            
                            <div className='openCartBtnText' onClick={handleOpenCart}>
                                    <span>View Your Cart</span>       
                            </div>

                            <div className='openCartBtnPrice'>      
                                <span className='openCartBtnPriceHead'>BGN.  </span>
                                <span className='openCartBtnPriceValue'> {cartItems[0]?.price}</span>  
                            </div>
                            </div>
                            </div>
                        }
                        {openModalCart && isMobile &&
                            (
                                <AddCart
                                    openModalCart={openModalCart}
                                    // handleCloseCart={handleCloseCart}
                                    setOpenModalCart={setOpenModalCart}
                                />
                            )
                        } */}


        </div >
    )
}

const mapStateToProps = ({ restaurantReducer, languageReducer, homeReducer }) => {
    const { restaurantSuccess } = restaurantReducer;
    const { currentLanguage } = languageReducer;
    const { productLoading } = homeReducer;
    return { restaurantSuccess, currentLanguage, productLoading };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PopularCategories) 