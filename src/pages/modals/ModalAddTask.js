import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileBase64 from 'react-file-base64';

class ModalAddTask extends React.Component {

    state = {
        nombre : "",
        fecha : "",
        instrucciones : "",
        archivos : [],

        // errores
        errorNombre : "",
        errorFecha : "",
        errorInstrucciones : "",
        errorArchivos : ""
    }

    clearState = () => {
        this.setState({
            nombre : "",
            fecha : "",
            instrucciones : "",
            archivos : [],

            // errores
            errorNombre : "",
            errorFecha : "",
            errorInstrucciones : "",
            errorArchivos : ""
        });
    }

    handleAdd = () =>{
        if( this.validate() ){  
            console.log("todo al 100");
        }
        //this.props.handleClose();
    }
    
    handleClose = () => {
        this.clearState();
        this.props.handleClose();
    }

    onFileChange = (files) => {
        
        let archivos = [];
        files.forEach(file => {
            let base = file.base64.substring(28);
            let nombre = file.name;
            let tipo = file.type;
            let size = ( file.size.split(" ")[0] ) / 1024;
            archivos.push( {base,nombre,tipo,size} );
        });
        
        this.setState( {archivos} );
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

        // archivos
        this.state.archivos.forEach(file => {
            if(file.size > 1.0){
                errorArchivos = "Uno o mas archivos pesan mas de 10 MB";
            }
        });

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
                        <Modal.Title>Agregar Tarea</Modal.Title>
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
                            <div className="form-group">
                                <p>Archivos:</p>
                                <FileBase64
                                    multiple = {true}
                                    className = "btn btn-primary"
                                    type="files"
                                    onDone = { this.onFileChange }
                                />
                                <p style={{color: "red"}}>{this.state.errorArchivos}</p>    
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

export default ModalAddTask;