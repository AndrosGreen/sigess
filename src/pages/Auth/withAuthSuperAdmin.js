import { Redirect } from "react-router-dom";

const withAuthSuperAdmin = (Component) => {
    const AuthRoute = () => {
        const isAuth = JSON.parse( sessionStorage.getItem("usuario") );
        if(isAuth?.nivelDePermisos === 3){
            return <Component />
        }
        else {
            return <Redirect to="/notFound"/>
        }
    };
    return AuthRoute;
};

export default withAuthSuperAdmin;