import '../styles/global.css'
import '../styles/mystyle.css'
import '../styles/product.css'

// import Login from './login';
// import AuthRoute from './aurhroute';
// import Profile from './Profile';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
    // <Router>
    //     <Switch>
    //         <Route exact path="/login">
    //             <Login />
    //         </Route>
    //         <AuthRoute path="/profile" component={Profile} />
    //     </Switch>
    // </Router>
}

export default MyApp;