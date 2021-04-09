import React from 'react';
import {Link,withRouter} from 'react-router-dom';

class Navbar extends React.Component {
    render(){
        return ( 
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#198b34"}}>
                    <div className="container-fluid">
                        
                        <Link className="navbar-brand" to="/"> SiGeSS</Link>
                        
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>


                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/whatup"> 404 NOT FOUND </Link>
                                </li>
                            </ul>

                            <div className="d-flex">
                                <button className="btn btn-light"> Log in </button>
                            </div>                           

                        </div>

                    </div>
                </nav>
            </div> 
        );
    }
}

export default withRouter(Navbar);