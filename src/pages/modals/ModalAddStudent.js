import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import withAuthSuperAdmin from '../Auth/withAuthSuperAdmin';

class ModalAddStudents extends React.Component{

    state = {
        noControl : '',
        password : '',
        noControlError : '',
        passwordError : ''
    }

    /*******************************************************
     *              Validaciones de la forma
     ******************************************************/

    validate = () => {
        let noControlError = "";
        let passwordError = "";

        // longitud
        if( this.state.noControl.trim().length != 9 ){
            noControlError = "El numero de control debe tener 9 caracteres";
        }
        if( this.state.password.trim().length < 8 || this.state.password.trim().length > 32){
            passwordError = "La longitud debe ser entre 8 y 32 caracteres";
        }

        // casillas vacias
        if(!this.state.noControl){
            noControlError = "No. Control no puede estar vacio";
        }
        if(!this.state.password){
            passwordError = "Password no puede estar vacio";
        }

        this.setState( {noControlError, passwordError} );

        if(noControlError || passwordError){
            return false;
        }

        return true;
    }

    /*******************************************************
     *              handles
     ******************************************************/

    // cierra el modal
    handleClose = () => {
        this.setState( {
                noControl : '',
                password : ''
            } 
        );
        this.props.handleClose();
    }

    // agrega estudiante a la bd, limpia los inputs y cierra el modal
    handleAdd = () => {
        if( this.validate() ){
            this.props.add(
                this.state.noControl,
                this.state.password
            );
            this.setState( {
                noControl : '',
                password : ''
            } );
            this.props.handleClose();
        }
    }

    render(){
        return(
            <div>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Alumno</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={event => event.preventDefault()}>
                            <div className="form-group">
                                <label>Número de Control : </label>
                                <input 
                                    className="form-control"
                                    value = {this.state.noControl}
                                    onChange = { e => this.setState({noControl : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.noControlError}</p>
                            </div>
                            <div className="form-group">
                                <label>Password : </label>
                                <input 
                                    className="form-control"
                                    type = "password"
                                    value = {this.state.password}
                                    onChange = { e => this.setState({password : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.passwordError}</p>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>Cancelar</Button>
                        
                        <Button 
                            variant="primary" 
                            onClick={this.handleAdd}
                        >
                            Agregar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div> 
        );
    }
}

export default ModalAddStudents;