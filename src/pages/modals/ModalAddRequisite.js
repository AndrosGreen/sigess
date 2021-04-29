import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button} from 'react-bootstrap';

class ModalAddRequisite extends React.Component {
    
    state = {
        idAdmin : 0,
        admin : "Revisor",
        name: "",
        detail: "",

        adminError : "",
        nameError : "",
        detailError : ""
    }

    validate  = () => {
        let adminError = "";
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

        // admin sin seleccionar.
        if(this.state.idAdmin === 0){
            adminError = "Debes seleccionar a un revisor.";
        }

        this.setState({adminError, nameError, detailError});

        if(adminError || nameError || detailError){
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
    handleAddRequisite = () => {
        if( this.validate() ){
            
        }
    }

    render(){

        const admins = this.props.admins.map (
            admin => {
                console.log("hola");
                return(
                    <li><a class="dropdown-item" onClick={() => 
                        this.setState({admin: admin.nombre, idAdmin: admin.idAdmin})}> 
                        {admin.nombre}
                    </a></li>
                );
            }
        );

        return (
            <div>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Requisito</Modal.Title>
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
                                <label>Revisor:</label>
                                <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {this.state.admin}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        {admins}
                                    </ul>
                                </div>
                                <p style={{color: "red"}}>{this.state.adminError}</p>
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
                        <Button variant="primary" onClick={this.handleAddRequisite}>Agregar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModalAddRequisite;
