import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button} from 'react-bootstrap';

class ModalAddRequisite extends React.Component {
    
    state = {
        name: "",
        detail: "",

        nameError : "",
        detailError : ""
    }

    componentDidUpdate(prevProps){
        if(this.props.name !== prevProps.name){
            this.setState({
                name: this.props.name,
                detail: this.props.detail
            });
        }
    }

    /*******************************************************
     *                         Validar Formulario
     ******************************************************/

    validate  = () => {
        let nameError = "";
        let detailError = "";

        // longitud
        if( this.state.name.trim().length < 3 || this.state.name.trim().length > 30 ){
            nameError = "La longitud debe ser entre 3 y 30 caracteres";
        }        
        if( this.state.detail.trim().length < 5 || this.state.detail.trim().length > 100 ){
            detailError = "La longitud debe ser entre 5 y 100 caracteres";
        }

        // casillas en blanco
        if(!this.state.name){
            nameError = "Nombre no puede estar en blanco";
        }
        if(!this.state.detail){
            detailError = "Detalle no puede estar en blanco";
        }

        this.setState({nameError, detailError});

        if(nameError || detailError){
            return false;
        }
        return true;
    }

    /*******************************************************
     *                         handles
     ******************************************************/

    // cierra el modal.
    handleClose = () => {
        this.props.handleClose();
    }

    // si los datos son correctos arrega el requisito.
    handleEditRequisite = () => {
        if( this.validate() ){
            this.props.editRequisite(this.props.idRequisite, this.state.name, this.state.detail);
            this.handleClose();
        }
    }

    render(){

        return (
            <div>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Requisito</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={event => event.preventDefault()}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input 
                                    className="form-control"
                                    onChange = {e => this.setState({ name: e.target.value }) }
                                    value = {this.state.name}
                                />
                                <p style={{color: "red"}}>{this.state.nameError}</p>
                            </div>

                            <div className="form-group">
                                <label>Detalle a revisar:</label>
                                <textarea 
                                    class="form-control" 
                                    aria-label="With textarea"
                                    onChange = {e => this.setState({detail : e.target.value})}
                                    value = {this.state.detail}
                                />
                                <p style={{color: "red"}}>{this.state.detailError}</p>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger">Cancelar</Button>
                        <Button variant="primary" onClick={this.handleEditRequisite}>Actualizar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModalAddRequisite;