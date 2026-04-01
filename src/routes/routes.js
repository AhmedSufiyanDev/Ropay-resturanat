import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FrontLayoutRoutes from "./frontend/frontRoutes";
import { Confirmation } from "../components";
import Header from '../container/frontend/layout/header';
import { Loader } from "../components";
import '../assets/frontend.scss';


const Home = React.lazy(() => import('../container/frontend/home'));
const RestaurantPage = React.lazy(() => import('../container/frontend/home/RestaurantPage'));
const CartDetails = React.lazy(()=>import('../container/frontend/CartDetails'));
const OrderPlaced = React.lazy(()=>import('../container/frontend/OrderPlaced'));
const TryAgain = React.lazy(()=>import('../container/frontend/TryAgain'));
const MainMenu = React.lazy(()=>import('../container/frontend/mainMenu'));
function Routes() {

  return (
    <Router>
     
          <Header />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact component={MainMenu}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/home/:table_id?" exact component={Home}/>
        {/* <FrontLayoutRoutes exact path="/" routeName={'home'} render={matchprops => (<Home {...matchprops} />)} /> */}
        {/* <FrontLayoutRoutes exact path="/" routeName={'restaurants'} render={matchprops => (<RestaurantPage {...matchprops} />)} /> */}
          <FrontLayoutRoutes exact path="/" routeName={'Home'} render={matchprops => (<Home {...matchprops} />)} />
          <FrontLayoutRoutes exact path="/cart-Details" routeName={'cartDetails'} render={matchprops=> (<CartDetails{...matchprops}/>)}/>
          <FrontLayoutRoutes exact path="/order-Placed" routeName={'orderplaced'} render={matchprops=> (<OrderPlaced{...matchprops}/>)}/>
          <FrontLayoutRoutes exact path="/try-again" routeName={'tryagain'} render={matchprops=> (<TryAgain{...matchprops}/>)}/>
          <FrontLayoutRoutes exact path="/home/:table_id?" routeName={'Home'} render={matchprops => (<Home {...matchprops} />)} />
        </Switch>
      </Suspense>
      <Confirmation />
    </Router>
  )
    ;
}

export default Routes;