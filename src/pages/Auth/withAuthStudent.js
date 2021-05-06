import { Redirect } from "react-router-dom";

const withAuthStudent = (Component) => {
    const AuthRoute = () => {
        const isAuth = JSON.parse( sessionStorage.getItem("usuario") );
        if(isAuth?.nivelDePermisos === 0){
            return <Component />
        }
        else {
            return <Redirect to="/notFound"/>
        }
    };
    return AuthRoute;
};

export default withAuthStudent;