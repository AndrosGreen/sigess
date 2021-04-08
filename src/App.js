import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import MainAdmin from './pages/MainAdmin';
import ManageUsers from './pages/ManageUsers';

class App extends React.Component {
    render (){
        return ( 
            <div>
                <BrowserRouter>
                    <div className="container">
                        <Route path="/" exact component={MainAdmin} />
                        <Route path="/gestionar/usuarios" exact component={ManageUsers} />
                    </div>
                </BrowserRouter>
            </div> 
        );
    }
}

export default App;