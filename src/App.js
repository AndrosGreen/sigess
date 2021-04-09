import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './pages/components/Navbar';
import MainAdmin from './pages/MainAdmin';
import ManageUsers from './pages/ManageUsers';
import NotFoundPage from './pages/NotFoundPage';

class App extends React.Component {
    render (){
        return ( 
            <div>
                <BrowserRouter>
                    <Navbar/>
                    <div className="container">
                        <Switch>
                            <Route path="/" exact component={MainAdmin} />
                            <Route path="/gestionar/usuarios" exact component={ManageUsers} />
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div> 
        );
    }
}

export default App;