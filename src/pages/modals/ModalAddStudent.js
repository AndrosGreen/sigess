import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalAddStudents extends React.Component{

    state = {
        noControl : '',
        password : ''
    }

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

export default ModalAddStudents;