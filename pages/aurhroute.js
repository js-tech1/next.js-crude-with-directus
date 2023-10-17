import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {
    const accessToken = localStorage.getItem('accessToken');

    return (
        <Route
            {...rest}
            render={(props) =>
                accessToken ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default AuthRoute;