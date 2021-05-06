import React from "react";
import { Redirect } from "react-router-dom";

/**
 * 
 * @param {React.Component} Component - Componente a mostrar 
 * @returns Componente depende si esta logueado y en caso contrario, notFound.
 */
const withAuthStudentRegistered = (Component) => {
    const AuthRoute = () => {
        const isAuth = JSON.parse( sessionStorage.getItem("usuario") );
        if(isAuth?.nivelDePermisos === 1){
            return <Component />
        }
        else {
            return <Redirect to="/notFound"/>
        }
    };
    return AuthRoute;
};

export default withAuthStudentRegistered;