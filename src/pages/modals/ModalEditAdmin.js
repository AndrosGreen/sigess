import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalEditAdmin extends React.Component{
    state = {
        nameAdmin : '',
        area : '',
        gmail : '',
        password : '',

        nameAdminError : '',
        areaError: '',
        gmailError: '',
        passwordError : '',
    }

    componentDidUpdate (prevProps) {
        if( this.props.nameAdmin !== prevProps.nameAdmin ){
            this.setState( {
                nameAdmin : this.props.nameAdmin,
                area : this.props.area,
                gmail : this.props.gmail,
                password : '',

                nameAdminError : '',
                areaError: '',
                gmailError: '',
                passwordError : '',
            } );
        }
    }

    /*******************************************************
     *              Validaciones de la forma
     ******************************************************/

    validate = () => {
        let nameAdminError = "";
        let areaError = "";
        let gmailError = "";
        let passwordError = "";

        // longitud
        if( this.state.nameAdmin.trim().length < 3 || this.state.nameAdmin.trim().length > 120 ){
            nameAdminError  = "La longitud debe ser entre 3 y 120 caracteres";
        }
        if( this.state.area.trim().length < 5 || this.state.area.trim().length > 30){
            areaError = "La longitud debe ser entre 5 y 30 caracteres";
        }
        if( this.state.gmail.trim().length < 5 || this.state.gmail.trim().length > 60){
            gmailError = "La longitud debe ser entre 5 y 60 caracteres";
        }
        if( (this.state.password.trim().length < 8 || this.state.password.trim().length > 32) && 
             this.state.password.trim().length >= 1){
            passwordError = "La longitud debe ser entre 8 y 32 caracteres";
        }

        // casillas vacias.
        if(!this.state.nameAdmin){
            nameAdminError = "Nombre no puede estar en blanco";
        }
        if(!this.state.area){
            areaError = "Area no puede estar en blanco";
        }
        if(!this.state.gmail){
            gmailError = "Correo no puede estar en blanco";
        }

        // correo
        if( !( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.gmail) ) ){
            gmailError = "Este no es un correo valido";
        }

        // cambiar los errores
        this.setState({nameAdminError, areaError, gmailError, passwordError});

        if(nameAdminError || areaError || gmailError || passwordError){
            return false;
        }
        return true;
    }

    /*******************************************************
    *              handles
    ******************************************************/

    //actualizar el administrador
    handleUpdate = () => {
        console.log("hola");
        if( this.validate() ){
            this.props.edit(
                this.state.area,
                this.state.password,
                this.state.gmail,
                this.state.nameAdmin
            )
        }
    }

    // cierra el modal
    handleClose = () => {
        this.props.handleClose();
    }

    render(){
        return(
            <div>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Administrador</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={event => event.preventDefault()}>
                            <div className="form-group">
                                <label>Nombre :  </label>
                                <input 
                                    className="form-control"
                                    value = {this.state.nameAdmin}
                                    onChange = { e => this.setState({nameAdmin : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.nameAdminError}</p>
                            </div>
                            <div className="form-group">
                                <label> Area : </label>
                                <input 
                                    className="form-control"
                                    value = {this.state.area}
                                    onChange = { e => this.setState({area : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.areaError}</p>
                            </div>
                            <div className="form-group">
                                <label>Correo : </label>
                                <input 
                                    className="form-control"
                                    value = {this.state.gmail}
                                    onChange = { e => this.setState({gmail : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.gmailError}</p>
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
                        
                        <Button variant="primary" onClick={this.handleUpdate}>
                            Actualizar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModalEditAdmin;