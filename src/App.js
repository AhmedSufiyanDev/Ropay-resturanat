

import Routes from "./routes/routes";
import {Provider} from 'react-redux';
import PersistedStore from "./store";
// import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import ThemeProvider from "./ThemeContext";
import './container/frontend/scss/ThemeStyles.scss';
import SplashScreen from "./components/splashScreen";
import { useEffect, useState } from "react";

// const theme = createTheme({
//   typography: {
//     fontFamily: '"Lexend", sans-serif'
//     // fontFamily: 'Flexo'
//   },});
const store = PersistedStore.getDefaultStore().store;

const App: FC = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        {loading ? <SplashScreen /> : <Routes />}
      </ThemeProvider>
    </Provider>
)}

export default App;

// https://www.codementor.io/blog/react-optimization-5wiwjnf9hj#.YbD42UeP0l4.linkedin
