import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalDeleteStudent extends React.Component{

    // cierra el modal
    handleClose = () => {
        this.props.handleClose();
    }

    render(){
        return(
            <div>
                    <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Eliminar Alumno </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Estas seguro de que quieres eliminar a {this.props.noControl}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>Cancelar</Button>
                        
                        <Button 
                            variant="primary" 
                            onClick= { () => this.props.deleteStudent(this.props.noControl) }
                        >
                            Eliminar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>

        );
    }

}

export default ModalDeleteStudent;