import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import sigess from '../api/sigess';

class Navbar extends React.Component {
    
    logOut = async () => {
        const response = await sigess.get("/usuarios/logout",
            {}
        );
        console.log(response);
        sessionStorage.removeItem("usuario");
        this.props.history.push("/");
    }

    render(){
        
        let isAuth = JSON.parse( sessionStorage.getItem("usuario") );

        if(isAuth){

            if(isAuth.nivelDePermisos === 3) {
                return ( 
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#198b34"}}>
                            <div className="container-fluid">
                                
                                <Link className="navbar-brand" to="/gestionar/usuarios"> SiGeSS</Link>
                                
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
        
        
                                <div className="collapse navbar-collapse" id="navbarScroll">
                                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/gestionar/usuarios"> Gestionar Usuarios </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/gestionar/requisitos"> Gestionar Requisitos </Link>
                                        </li>         
                                    </ul>
        
                                    <div className="d-flex">
                                        <button className="btn btn-light" onClick={this.logOut}>Log Out</button>
                                    </div>                           
        
                                </div>
        
                            </div>
                        </nav>
                    </div> 
                );
            }
            else if(isAuth.nivelDePermisos === 2){
                return ( 
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#198b34"}}>
                            <div className="container-fluid">
                                
                                <Link className="navbar-brand" to="/validar/requisitos"> SiGeSS</Link>
                                
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
        
        
                                <div className="collapse navbar-collapse" id="navbarScroll">
                                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/validar/requisitos"> Validar Requisitos </Link>
                                        </li>         
                                    </ul>
        
                                    <div className="d-flex">
                                        <button className="btn btn-light" onClick={this.logOut}>Log Out</button>
                                    </div>                           
        
                                </div>
        
                            </div>
                        </nav>
                    </div> 
                );
            }
            else if(isAuth.nivelDePermisos === 1){
                return ( 
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#198b34"}}>
                            <div className="container-fluid">
                                
                                <Link className="navbar-brand" to="/alumno/requisitos"> SiGeSS</Link>
                                
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
        
        
                                <div className="collapse navbar-collapse" id="navbarScroll">
                                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/alumno/requisitos"> Requisitos </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/main/alumno"> Actividades </Link>
                                        </li>         
                                    </ul>
        
                                    <div className="d-flex">
                                        <button className="btn btn-light" onClick={this.logOut}>Log Out</button>
                                    </div>                           
        
                                </div>
        
                            </div>
                        </nav>
                    </div> 
                );
            }
            else if (isAuth.nivelDePermisos === 0){
                return ( 
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#198b34"}}>
                            <div className="container-fluid">
                                
                                <Link className="navbar-brand" to="/alumno/registro"> SiGeSS</Link>
                                
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
        
        
                                <div className="collapse navbar-collapse" id="navbarScroll">
                                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/alumno/registro"> Pre regristro </Link>
                                        </li>         
                                    </ul>
        
                                    <div className="d-flex">
                                        <button className="btn btn-light" onClick={this.logOut}>Log Out</button>
                                    </div>                           
        
                                </div>
        
                            </div>
                        </nav>
                    </div> 
                );
            }
            
        }
        else {
            // Navbar sin nada.
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
                                </ul>
    
                                <div className="d-flex">
                                    <Link className="btn btn-light" to="/login">Log in</Link>
                                </div>                           
    
                            </div>
    
                        </div>
                    </nav>
                </div> 
            );
        }
        
    }
}

export default withRouter(Navbar);