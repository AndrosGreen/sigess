import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalAddAmins extends React.Component{

    state = {
        nameAdmin : '',
        area : '',
        gmail : '',
        password : ''
    }

    // cierra el modal
    handleClose = () => {
        this.setState( {
                nameAdmin : '',
                area : '',
                gmail : '',
                password : ''
            } 
        );
        this.props.handleClose();
    }
    
    // agrega el admin a la bd, limpia los inputs y cierra el modal
    handleAdd = () => {
        this.props.add(
            this.state.nameAdmin,
            this.state.area,
            this.state.gmail,
            this.state.password
        );
        this.setState( {
            nameAdmin : '',
            area : '',
            gmail : '',
            password : ''
        } );
        this.props.handleClose();
    }

    render(){
        return(
            <div>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Administrador</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={event => event.preventDefault()}>
                            <div className="form-group">
                                <label>Nombre : </label>
                                <input 
                                    className="form-control"
                                    value = {this.state.nameAdmin}
                                    onChange = { e => this.setState({nameAdmin: e.target.value}) }
                                />
                                
                                <label>Area : </label>
                                <input 
                                    className="form-control"
                                    value = {this.state.area}
                                    onChange = { e => this.setState({area: e.target.value}) }
                                />

                                <label>Correo : </label>
                                <input 
                                    className="form-control"
                                    value = {this.state.gmail}
                                    onChange = { e => this.setState({gmail: e.target.value}) }
                                />

                                <label>Password : </label>
                                <input 
                                    className="form-control"
                                    type = "password"
                                    value = {this.state.password}
                                    onChange = { e => this.setState({password : e.target.value}) }
                                />
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

export default ModalAddAmins;