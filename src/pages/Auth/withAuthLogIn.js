import { Redirect } from "react-router-dom";

const withAuthLogIn = (Component) => {
    const AuthRoute = () => {
        const isAuth = JSON.parse( sessionStorage.getItem("usuario") );
        if(isAuth){
            return <Redirect to="/notFound"/>
        }
        else {
            return <Component />
        }
    };
    return AuthRoute;
};

export default withAuthLogIn;