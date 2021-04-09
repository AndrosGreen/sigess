import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalEditAdmin extends React.Component{
    state = {
        nameAdmin : '',
        area : '',
        gmail : '',
        password : ''
    }

    componentDidUpdate (prevProps) {
        if( this.props.nameAdmin !== prevProps.nameAdmin ){
            this.setState( {
                nameAdmin : this.props.nameAdmin,
                area : this.props.area,
                gmail : this.props.gmail,
                password : this.props.password

            } );
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
                                <label> Area : </label>
                                <input 
                                    className="form-control"
                                    value = {this.state.area}
                                    onChange = { e => this.setState({area : e.target.value}) }
                                />

                                <label>Correo : </label>
                                <input 
                                    className="form-control"
                                    value = {this.state.gmail}
                                    onChange = { e => this.setState({gmail : e.target.value}) }
                                />

                                <label>Password : </label>
                                <input 
                                    className="form-control"
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
                            onClick={() => {
                                this.props.edit(
                                    this.state.nameAdmin,
                                    this.state.area,
                                    this.state.gmail,
                                    this.state.password
                                )
                            }}
                        >
                            Actualizar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModalEditAdmin;