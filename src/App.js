import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Navbar from './pages/components/Navbar';
import LogIn from './pages/LogIn';
import MainStudent from './pages/MainStudent';
import ManageUsers from './pages/ManageUsers';
import NotFoundPage from './pages/NotFoundPage';
import ValidateRequirements from './pages/ValidateRequirements';

class Main extends React.Component {
    render(){
        const isAuth = sessionStorage.getItem("usuario");
        if(isAuth){
            return <div></div>
        }
        else {
            return <Redirect to="/login/"/>
        }
    }
}

class App extends React.Component {
    render (){
        return ( 
            <div>
                <BrowserRouter>
                    <Navbar/>
                    <div className="container">
                        <Switch>
                            <Route path="/" exact component={Main} />
                            <Route path="/main/alumno" exact component={MainStudent} />
                            <Route path="/gestionar/usuarios" exact component={ManageUsers} />
                            <Route path="/login" exact component={LogIn} />
                            <Route path="/validar/requisitos" exact component={ValidateRequirements} /> 
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div> 
        );
    }
}

export default App;