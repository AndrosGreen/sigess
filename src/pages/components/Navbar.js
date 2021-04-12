import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import sigess from '../api/sigess';

class Navbar extends React.Component {
    
    logOut = async () => {
        const response = await sigess.get("/usuarios/logout",
            {}
        );
        console.log(response);
        localStorage.removeItem("token");
        this.props.history.push("/");
    }

    render(){
        
        let isAuth = localStorage.getItem("token");
        
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

                                { (isAuth === "1234")? (
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/gestionar/usuarios"> Gestionar Usuarios </Link>
                                        </li>        
                                    ): (
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/whatup"> 404 NOT FOUND </Link>
                                        </li>
                                    )
                                }

                            </ul>

                            <div className="d-flex">
                                { (isAuth === "1234" )? (
                                        <button className="btn btn-light" onClick={this.logOut}>Log Out</button>
                                    ): (
                                        <Link className="btn btn-light" to="/login">Log in</Link>
                                    )
                                }
                                
                            </div>                           

                        </div>

                    </div>
                </nav>
            </div> 
        );
    }
}

export default withRouter(Navbar);