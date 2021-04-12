import React from 'react';
import sigess from './api/sigess';

class LogIn extends React.Component {

    state = {
        user: '',
        password: '',
        student : true,
        admin : false,
        superAdmin : false
    }

    // Handle radios

    // maneja el radio alumnmo
    handleStudent = (student, admin, superAdmin) => {
        this.setState({
            student: student,
            admin: admin,
            superAdmin: superAdmin
        });
    }

    // trata de loguear al usuario.
    logUser = async (e) => {
        e.preventDefault();
        const response = await sigess.post( "/usuarios/login",{
            usuario: this.state.user,
            clave: this.state.password,
            esAdmin: this.state.superAdmin
        });
        console.log(response);
        if(response?.data === "El usuario no existe"){
            this.props.history.push("/");
        }
        else if(response.status === 200){
            localStorage.setItem("token","1234");
            this.props.history.push("/gestionar/usuarios");
        }
        
    }

    render(){
        return ( 
            <div> 
                <form onSubmit={this.logUser}>
                    <div className="form-group" style={{margin: "5% 30% 5% 25%"}}>
                        <label>Usuario: </label>
                        <input 
                            className="form-control"
                            onChange= { e => this.setState({user: e.target.value}) }
                            value= {this.state.user}    
                        />
                        <label>Contraseña: </label>
                        <input 
                            className="form-control" 
                            type="password"
                            onChange= { e => this.setState({password: e.target.value}) }
                            value= {this.state.password}
                        />
                        
                        <div className="container" style={{margin:"5px" }}>

                            <div className="form-checkbox">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    name="flexRadioDefault" 
                                    id="rdoStudent" 
                                    defaultChecked={this.state.student}
                                    onClick= {() => this.handleStudent(true,false,false)}
                               />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Alumno
                                </label>
                            </div>
                            <div className="form-checkbox">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    name="flexRadioDefault" 
                                    id="rdoAdmin" 
                                    defaultChecked={this.state.admin}
                                    onClick={()=> this.handleStudent(false,true,false)}
                                />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Admin Revision
                                </label>
                            </div>
                            <div className="form-checkbox">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    name="flexRadioDefault" 
                                    id="rdoSuperAdmin"
                                    defaultChecked={this.state.superAdmin}
                                    onClick={()=> this.handleStudent(false,false,true)}
                                />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Encargado Servicio Social
                                </label>
                            </div>

                        </div>
                        
                        <button className="btn btn-success" style={{marginTop: "10px"}}>Log in</button>
                    </div>
                </form> 
            </div> 
        );
    }
}

export default LogIn;