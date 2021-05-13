import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalDeleteTask extends React.Component {
    render(){
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Eliminar Tarea </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Estas seguro de que quieres la tarea <b>{this.props.nombre}</b>?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleClose}>Cancelar</Button>
                        
                        <Button 
                            variant="primary"
                        >
                            Eliminar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModalDeleteTask;