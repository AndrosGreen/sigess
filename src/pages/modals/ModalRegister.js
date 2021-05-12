import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import { withRouter } from 'react-router';

class ModalRegister extends React.Component {

    render(){
        return(
            <div>
                <Modal show={this.props.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registro Exitoso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={event => event.preventDefault()}>
                            <div className="form-group">
                                Felicidades has realizado tu solicitud del Servicio Social. Da click en Aceptar para voler a iniciar sesion.
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button 
                            variant="primary" 
                            onClick={
                                this.props.handleLogOut
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

export default  withRouter( ModalRegister );