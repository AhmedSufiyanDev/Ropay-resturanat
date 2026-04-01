import {
  revoultIcon,
  etisilatIcon
} from '../assets/images/img';

import { BeefTartar, MarinatedGavros, SetPerfetto, VealCarpaccio }
  from '../assets/images/img/ColdApittizers/coldApittizersImages';
import { OrzoPasta, seaBassFillet, NeapolitanPizza } from '../assets/images/img/Popular/popularImages';
import { margartia, caprice, childernPizzaLarge, pepperone, perfetto, marcoPolo, RelatedItem, bugerMenu } from '../assets/images/img/PizzaImages/pizzaImages';
import { FlashAutoRounded, FlashOffRounded } from '@material-ui/icons';
import { TryRounded } from '@mui/icons-material';

let isLocal = false; 
let frontendUrl = "";
let restaurantService = false;
let orderService = "";
let localization = "";
let backendUrl = "";
let payments = "";

if(isLocal){
  frontendUrl = `http://localhost:3000`; 
  restaurantService = `http://localhost:8080`;
  orderService= `http://localhost:8082`;
  localization = ` http://localhost:8083`;
  payments = `http://localhost:8084`;
}
else{
  frontendUrl = `https://restaurant.rockvillegroup.com`;
  restaurantService = `https://restaurant-api.rockvillegroup.com`;
  orderService = `https://restaurant-order.rockvillegroup.com`;
  localization = ` https://restaurant-localization.rockvillegroup.com`;
  payments = `https://restaurant-payments.rockvillegroup.com`;
}

export const FRONTEND_DOMAIN_PREFIX =frontendUrl;
export const APP_DOMAIN_PREFIX_RESTAURANT = restaurantService;
export const APP_DOMAIN_PREFIX_ORDER = orderService;
export const APP_DOMAIN_PREFIX_LOCALS = localization;
export const APP_DOMAIN_PREFIX_PAYMENTS = payments;

export const CMS_DOMAIN_PREFIX = frontendUrl;
export const APP_DOMAIN_PREFIX = backendUrl;
export const API_URL_RESTAURANT = `${APP_DOMAIN_PREFIX_RESTAURANT}/api/v1`;
export const API_URL_ORDER = `${APP_DOMAIN_PREFIX_ORDER}/api/v1`;
export const API_URL_LOCALS = `${APP_DOMAIN_PREFIX_LOCALS}/api/v1`;
export const API_URL_PAYMENTS = `${APP_DOMAIN_PREFIX_PAYMENTS}/api/v1`;

export const FILE_BASE_URL = 'http=//localhost=9000/';

export const LABELS = {
  GO_BACK: '← Back',
  LOGOUT: '↶ Logout',
  LOGIN: 'Login',
  SIGNUP: 'Sign Up',
  REGISTER: 'Create User',
  EMAIL: 'Email Address',
  NAME: 'Username',
  FULL_NAME: 'Full Name',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Confirm Password',
  INVALID_MOBILE: 'Invalid mobile number'
};
export const PASSWORD = {
  passwordLength: 6,
  passwordLengthError: 'password is to short'
}
export const REGISTER = {
  SUCCESS_HEADER: "Success",
  SUCCESS_MESSAGE: "User Created Successfully!",
  FAILURE_HEADER: "Failure",
  FAILURE_MESSAGE: "Cannot Create User! User may already have been created with the given email!"
};
export const REGEXP_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2;3})+$/;
export const C_OTC_STORAGE = 'c_d_storage';
export const user = 'user';
export const paymentGatewayIconsList = [
  { key: 'Revoult', icon: revoultIcon },//65e95d88def02c6eb9f4836b','65e95d88def02c6eb9f4836c','65e95d88def02c6eb9f4836d','65e95d88def02c6eb9f4836e','65e95d88def02c6eb9f4836f'
  { key: 'Etisilat', icon: etisilatIcon}, 
];

export const CategoriesData = [
  {
    category: "Popular Dishes",
    items: [
      { image: OrzoPasta, title: 'Orzo Pasta', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
      { image: seaBassFillet, title: 'Orzo Pasta', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
      { image: NeapolitanPizza, title: 'Orzo Pasta', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
      { image: OrzoPasta, title: 'Orzo Pasta', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
      { image: seaBassFillet, title: 'Orzo Pasta', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
      { image: NeapolitanPizza, title: 'Orzo Pasta', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
      { image: OrzoPasta, title: 'Orzo Pasta', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
      { image: seaBassFillet, title: 'Orzo Pasta', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
    ],
  },
  {
    category: "Pizza",
    items: [
      { id: 0, image: margartia, name: 'Margarita', des: 'Classic tomato and mozzarella cheese ', price: 10.99 },
      { id: 1, image: caprice, name: 'caprice', des: 'Assorted fresh vegetables', price: 12.99 },
      { id: 2, image: childernPizzaLarge, name: 'childernPizzaLarge', des: 'Spinach, feta cheese, and olives', price: 11.99 },
      { id: 3, image: pepperone, name: 'pepperone', des: 'Spinach, feta cheese, and olives', price: 11.99 },
      { id: 4, image: perfetto, name: 'perfetto', des: 'Spinach, feta cheese, and olives', price: 11.99 },
      { id: 5, image: marcoPolo, name: 'marcoPolo', des: 'Spinach, feta cheese, and olives', price: 11.99 },
    ],
  },
  {
    category: "Cold Appetizers",
    items: [
      { id: 6, image: BeefTartar, name: 'BeefTartar', des: 'Pepperoni and mozzarella cheese', price: 13.99 },
      { id: 7, image: MarinatedGavros, name: 'MarinatedGavros', des: 'BBQ chicken, red onions, and cilantro', price: 14.99 },
      { id: 8, image: SetPerfetto, name: 'SetPerfetto', des: 'Pepperoni, sausage, mushrooms, and bell peppers', price: 15.99 },
      { id: 9, image: VealCarpaccio, name: 'VealCarpaccio', des: 'Pepperoni, sausage, mushrooms, and bell peppers', price: 15.99 },
      { id: 10, image: BeefTartar, name: 'BeefTartar', des: 'Pepperoni, sausage, mushrooms, and bell peppers', price: 15.99 },
      { id: 11, image: MarinatedGavros, name: 'MarinatedGavros', des: 'Pepperoni, sausage, mushrooms, and bell peppers', price: 15.99 },
    ],
  },

  // Add more categories as needed
];


// export const selectedDishes = [
//   { id: 0, img: bugerMenu, title: 'Chicken Burger', desc: 'Fried Leg Fillet Fireworks: Set Your Taste', price: "15" },
//   { id: 1, img: bugerMenu, title: 'Chicken Burger', desc: 'Fried Leg Fillet Fireworks: Set Your Taste', price: "15" },
// ]
// export const RelatedItems = [
//   { id: 0, img: RelatedItem, title: 'Chicken Burger', price: "15" },
//   { id: 1, img: RelatedItem, title: 'Chicken Burger', price: "15" },
//   { id: 2, img: RelatedItem, title: 'Chicken Burger', price: "15" },
//   { id: 3, img: RelatedItem, title: 'Chicken Burger', price: "15" },
// ]

export const selectedDishesArray = [
  {
    id: 0, img: bugerMenu, title: 'Chicken Burger', desc: 'Fried Leg Fillet Fireworks: Set Your Taste', price: "15",
  },
  {
    id: 0, img: bugerMenu, title: 'Chicken Burger', desc: 'Fried Leg Fillet Fireworks: Set Your Taste', price: "15",
  }
];
export const relatedItems = [
  { img: RelatedItem, title: 'Related Item 1', price: "15" },
  { img: RelatedItem, title: 'Related Item 2', price: "15" },
  { img: RelatedItem, title: 'Related Item 1', price: "15" },
  { img: RelatedItem, title: 'Related Item 2', price: "15" },
];

export const dishes = [
  { image: OrzoPasta, title: 'Orzo Pasta', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
  { image: seaBassFillet, title: 'Sea Bass Fillet', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
  { image: NeapolitanPizza, title: 'Neapolitan pizza', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
  { image: OrzoPasta, title: 'Orzo Pasta', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
  { image: seaBassFillet, title: 'Neapolitan pizza', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },
  { image: NeapolitanPizza, title: 'Sea Bass Fillet', des: 'With chorizo, zucchini, cherry tomatoes and baby spinach', price: 10.99 },

]

export const categoriesFood = [
  {
    type: "Pizza",
    data: [
      { id: 0, img: margartia, title: 'Margarita', des: 'Classic tomato and mozzarella cheese ', price: 10.99 },
      { id: 1, img: caprice, title: 'caprice', des: 'Assorted fresh vegetables', price: 12.99 },
      { id: 2, img: childernPizzaLarge, title: 'childernPizzaLarge', des: 'Spinach, feta cheese, and olives', price: 11.99 },
      { id: 3, img: pepperone, title: 'pepperone', des: 'Spinach, feta cheese, and olives', price: 11.99 },
      { id: 4, img: perfetto, title: 'perfetto', des: 'Spinach, feta cheese, and olives', price: 11.99 },
      { id: 5, img: marcoPolo, title: 'marcoPolo', des: 'Spinach, feta cheese, and olives', price: 11.99 },
    ],
  },
  {
    type: "Cold Appetizers",
    data: [
      { id: 6, img: BeefTartar, title: 'BeefTartar', des: 'Pepperoni and mozzarella cheese', price: 13.99 },
      { id: 7, img: MarinatedGavros, title: 'MarinatedGavros', des: 'BBQ chicken, red onions, and cilantro', price: 14.99 },
      { id: 8, img: SetPerfetto, title: 'SetPerfetto', des: 'Pepperoni, sausage, mushrooms, and bell peppers', price: 15.99 },
      { id: 9, img: VealCarpaccio, title: 'VealCarpaccio', des: 'Pepperoni, sausage, mushrooms, and bell peppers', price: 15.99 },
      { id: 10, img: BeefTartar, title: 'BeefTartar', des: 'Pepperoni, sausage, mushrooms, and bell peppers', price: 15.99 },
      { id: 11, img: MarinatedGavros, title: 'MarinatedGavros', des: 'Pepperoni, sausage, mushrooms, and bell peppers', price: 15.99 },
    ],
  },
]

// export const sidebarTabsList = [
//   { text: 'dashboard', key: 'dashboard', icon: dashboardIcon },
//   { text: 'user management', key: 'users', icon: userIcon }, 
// ];

export const jobStatus = [
  'pending', 'assigned', 'in route', 'delivered', 'completed',
];

export const userRoles = [
  { text: 'Admin', value: '1' }
]

export const YesNoOption = [
  { text: 'Yes', value: '1' },
  { text: 'No', value: '0' },
]

export function getFormattedDate(date) {
  const date1 = new Date(date);                 // {object Date}
  const monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  let year = date1.getFullYear();
  let month = monthNames[date1.getMonth()];
  let day = date1.getDate().toString().padStart(2, '0');
  return year + '-' + month + '-' + day;
}
// let servingTimes = localStorage.getItem("servingTime")
// console.log("servingTimes",servingTimes);
// const time = "00:04:00";
// const minutes = parseInt(time.split(":")[  1]); //time= servingTimes
// console.log(minutes); // Output will be 4

export const initialTimeInSeconds = 2 * 60; //min's * seconds in 1 min 
export const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return { hours, minutes, seconds };
};


export const statusFailureCase = [3, 6, 8, 9, 11]
export const statusFailureCase1 = [5, 6, 7, 8, 9, 10, 11]

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const mobileNumberRegex = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,}$/im

