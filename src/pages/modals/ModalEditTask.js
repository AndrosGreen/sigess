import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalEditTask extends React.Component {

    state = {
        nombre : "",
        fecha : "",
        instrucciones : "",

        // errores
        errorNombre : "",
        errorFecha : "",
        errorInstrucciones : ""
    }

    componentDidUpdate(prevProps){
        if(this.props.nombre !== prevProps.nombre){
            this.setState({
                nombre : this.props.nombre,
                fecha : this.props.fecha,
                instrucciones : this.props.instrucciones,
                
                errorNombre : "",
                errorFecha : "",
                errorInstrucciones : ""
            });
        }
    }

    clearState = () => {
        this.setState({
            nombre : "",
            fecha : "",
            instrucciones : "",

            // errores
            errorNombre : "",
            errorFecha : "",
            errorInstrucciones : ""
        });
    }

    handleAdd = () =>{
        if( this.validate() ){  
            console.log("todo al 100");
        }
        //this.props.handleClose();
    }
    
    handleClose = () => {
        this.props.handleClose();
    }

    validate = () => {
        let errorNombre = "";
        let errorFecha = "";
        let errorInstrucciones = "";
        let errorArchivos = "";

        // longitud
        if(this.state.nombre.trim().length < 4 || this.state.nombre.trim().length > 50){
            errorNombre = "La longitud debe ser entre 4 y 50";
        }
        if(this.state.instrucciones.trim().length < 4 || this.state.instrucciones.trim().length > 255){
            errorInstrucciones = "La longitud debe ser entre 4 y 255";
        }

        // casillas en blanco
        if( !this.state.nombre ){
            errorNombre = "Nombre no puede estar en blanco";
        }
        if( !this.state.instrucciones){
            errorInstrucciones = "Instrucciones no puede estar en blanco";
        }

        // fecha 
        if( !/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(this.state.fecha) ){
            errorFecha = "Fecha invalida";
        }

        // cambiar estado
        this.setState( {errorNombre,errorFecha,errorInstrucciones,errorArchivos} );

        if( errorNombre || errorFecha || errorInstrucciones || errorArchivos ){
            return false;
        }

        return true;

    }

    render (){  
        return (
            <div>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Tarea</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={event => event.preventDefault()}>
                            <div className="form-group">
                                <label>Nombre Actividad: </label>
                                <input 
                                    className="form-control"
                                    onChange={event => this.setState( { nombre : event.target.value } )}
                                    value={this.state.nombre}
                                />
                                <p style={{color: "red"}}>{this.state.errorNombre}</p>
                            </div>
                            <div className="form-group">
                                <label>Fecha Entrega: <lablel> <b>(aaaa-mm-dd)</b></lablel> </label>
                                <input 
                                    className="form-control"
                                    onChange={event => this.setState( { fecha : event.target.value } )}
                                    value={this.state.fecha}
                                />
                                <p style={{color: "red"}}>{this.state.errorFecha}</p>
                            </div>
                            <div className="form-group">
                                <label>Instrucciones: </label>
                                <textarea 
                                    className="form-control"
                                    onChange={event => this.setState( { instrucciones : event.target.value } )}
                                    value={this.state.instrucciones}
                                />
                                <p style={{color: "red"}}>{this.state.errorInstrucciones}</p>
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

export default ModalEditTask;