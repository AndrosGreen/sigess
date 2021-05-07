import React from 'react';
import {Modal,Button} from 'react-bootstrap';

class ModalRejectRequisite extends React.Component {

    render(){
        return(
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rechazar Requisito</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={event => event.preventDefault()}>
                            <div className="form-group">
                                ¿Estas seguro que quieres rechazar a {this.props.nombre} - ({this.props.noControl})?
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleClose}>Cancelar</Button>
                        <Button 
                            variant="primary" 
                            onClick={
                                ()=> this.props.rejectStudent(this.props.noControl) 
                            }
                        >
                            Aceptar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default ModalRejectRequisite;