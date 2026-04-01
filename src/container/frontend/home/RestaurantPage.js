import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { useStyles } from "./styles";
import * as actions from "../../../store/actions";
import { Link as RouterLink } from 'react-router-dom';
import { generalStyles } from "../general/general"
import "../scss/general.scss";
import "../scss/home.scss";
import { hotelBanner, hotelBanner1, hotelBanner2 } from '../../../assets/images/img';
import { Meat, Salad, Sandwich, Burgers, Restu1, Restu2, Restu3 } from '../../../assets/images/img/menuItems'
import { Card, Container, CardActionArea, CardContent, Typography, CardMedia, Grid, Box } from "@material-ui/core";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ReusableModal from "../../../components/modal/reuseModal";
// import theme from '../scss/ThemeStyles.scss';
import { ThemeContext } from '../../../ThemeContext';


const bannerImage = [hotelBanner, hotelBanner1, hotelBanner2, hotelBanner1, hotelBanner, hotelBanner2];
const categories = [
    { img: Meat, cateName: "meat" },
    { img: Salad, cateName: "salad" },
    { img: Burgers, cateName: "burgers" },
    { img: Sandwich, cateName: "sandwich" },
    { img: Salad, cateName: "salad" },
    { img: Burgers, cateName: "burgers" },
    { img: Sandwich, cateName: "sandwich" },
    { img: Meat, cateName: "meat" },
    { img: Salad, cateName: "salad" },
    { img: Burgers, cateName: "burgers" },
    { img: Sandwich, cateName: "sandwich" },
    { img: Meat, cateName: "meat" },
    { img: Salad, cateName: "salad" },
    { img: Burgers, cateName: "burgers" },
    { img: Sandwich, cateName: "sandwich" },
    { img: Meat, cateName: "meat" },
    { img: Salad, cateName: "salad" },
    { img: Burgers, cateName: "burgers" },
]
const restaurantDishes = [
    { img: Restu1, title: "Avli By Tashas", type: "continental" },
    { img: Restu2, title: "Avli By Tashas", type: "continental" },
    { img: Restu3, title: "Avli By Tashas", type: "continental" },
    { img: Restu1, title: "Avli By Tashas", type: "continental" },
    { img: Restu2, title: "Avli By Tashas", type: "continental" },
    { img: Restu3, title: "Avli By Tashas", type: "continental" },
]
function Home(props) {
    const classes = useStyles();
    const generalClasses = generalStyles();
    const [openModal, setOpenModal] = useState(false);
    const { themeValue } = useContext(ThemeContext);
    const [banners, setBanners] = useState([]);
  console.log("banner",banners);


    useEffect(() => {
        fetchBanners();
      }, []);


      useEffect(() => {
        if (props.bannersData) {
          setBanners(props.bannersData.data);
        }
      }, [props?.bannersData]);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const fetchBanners = () => {
        props.getBannersStart();
      }

    return (
        <div className="center-item" data-theme={themeValue}>
            <Container fixed className="main-div">
                <section className="owl-pdlf">
                    <div className="show-div">
                        <h2>All Best Deals</h2>
                    </div>
                    <OwlCarousel
                        className="owl-theme owl-stage "
                        dots={false}
                        lazyLoad={true}
                        responsive={{
                            0: {
                                stagePadding: 0,
                                items: 2,
                                margin: 5,
                            },
                            600: {
                                items: 3,
                                margin: 10,
                                stagePadding: 0,
                            },
                            768: {
                                items: 5,
                                margin: 5,
                                stagePadding: 20,
                            },
                            992: {
                                items: 5,
                                margin: 10,
                                stagePadding: 80,
                            },
                            1000: {
                                items: 4,
                                margin: 10,
                                stagePadding: 0,
                            },
                            1200: {
                                items: 5,
                                stagePadding: 20,
                                margin: 10
                            },
                            1366: {
                                items: 3,
                                stagePadding: 0,
                                margin: 5
                            },
                            1600: {
                                items: 2,
                                stagePadding: 20,
                                margin: 27
                            },
                            1920: {
                                items: 3,
                                stagePadding: 0,
                                margin: 12
                            }
                        }}
                    >
                        {bannerImage.map((item) => (
                            <div>
                                <img className="carosul-image-main"
                                    src={item}
                                    key={item.id} onClick={''}
                                />

                                <div>
                                    <h4 style={{ textAlign: "center" }}>{''}</h4>
                                </div>
                            </div>
                        ))
                        }
                    </OwlCarousel>
                </section>

                {/** categories */}
                <section className="owl-pdlf">
                    <div className="show-div">
                        <h2>All Categories</h2>
                    </div>
                    <OwlCarousel
                        className="owl-theme owl-stage "
                        dots={false}
                        lazyLoad={true}
                        responsive={{
                            0: {
                                stagePadding: 10,
                                items: 3,
                                // margin: 5,
                            },
                            600: {
                                items: 4,
                                // margin: 5,
                                stagePadding: 30,
                            },
                            768: {
                                items: 5,
                                margin: 5,
                                stagePadding: 20,
                            },
                            992: {
                                items: 5,
                                margin: 10,
                                stagePadding: 80,
                            },
                            1000: {
                                items: 5,
                                margin: 20,
                                stagePadding: 60,
                            },
                            1200: {
                                items: 5,
                                stagePadding: 20,
                                margin: 10
                            },
                            1366: {
                                items: 10,
                                stagePadding: 20,
                                margin: 10
                            },
                            1600: {
                                items: 8,
                                stagePadding: 20,
                                margin: 27
                            },
                            1920: {
                                items: 8,
                                stagePadding: 0,
                                margin: 27
                            }
                        }}
                    >

                        {categories.map((item, categoryindex) => (
                            <div>
                                <img onClick={handleOpen}
                                    src={item.img}
                                    style={{ borderRadius: "40px" }}
                                // key={item.id} onClick={() => handleCategorySelect(item.id)}
                                />
                                <div className="dish-name">
                                    <h2 >{item.cateName}</h2>
                                </div>
                            </div>
                        ))
                        }
                    </OwlCarousel>
                </section>

                <section>
                    <Container fixed>
                        <div className="show-div">
                            <h2>All Resturants</h2>
                        </div>
                        <Grid container spacing={4} className="card-dish-size">
                            {restaurantDishes.map((item, index) => (
                                <Grid item xm={12} sm={6} md={4} lg={4} >
                                    <Card className="dishes-menu">
                                        <CardMedia className={classes.cover}>
                                        <img src={item?.img} className="menu-img" alt={item?.title} />
                                        </CardMedia>
                                        <CardContent className={classes.cardPad} >
                                            <Typography className="menu-title">
                                                {item?.title}
                                            </Typography>
                                            <Typography className="menu-type" >
                                                {item?.type}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}

                        </Grid>
                    </Container>
                </section>
            </Container>

            {/* <div>
                <ReusableModal
                    open={openModal}
                    onClose={handleClose}
                    className={classes.modal}
                >
                    <div className={classes.paper}  >
                        <p>
                            enter food menu screen
                        </p>
                    </div>
                </ReusableModal>
            </div> */}
        </div>


    );
}

//what is needed at start
const mapStateToProps = ({ authReducer, homeReducer,bannerReducer }) => {
    const { loggedInSuccess, loggedInError } = authReducer;
    const {  bannersLoading, error, success, bannersData}= bannerReducer
    return {  bannersLoading, error, success, bannersData};
  };
  //which actions our function can dispatch
  const mapDispatchToProps = (dispatch) => {
    return {
      getBannersStart: (data) => dispatch(actions.getBannersStart(data)),
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);