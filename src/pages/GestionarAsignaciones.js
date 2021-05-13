import React from 'react';
import sigess from './api/sigess';
import FileBase64 from 'react-file-base64';
import ListAsignacionCard from './components/ListAsignacionCard';
import ModalAddTask from './modals/ModalAddTask';
import ModalEditTask from './modals/ModalEditTask';
import ModalDeleteTask from './modals/ModalDeleteTask';

class GestionarAsignaciones extends React.Component {
    
    state = {
        selectedFile : "",
        nombre : "",
        porCiento : 0,
        tasks : [
            {
                nombre : "Reporte trimestral",
                archivos : [
                    {nombre: "Plantilla.pdf", ruta: "/algunlugar"}, 
                    {nombre : "Instrucciones.pdf", ruta : "algunlugar"}
                ],
                instrucciones : "En esta tarea tiens que hacer muchas cosas como subir un pdf, subir una imagen, tambien tienes que llenar el formulario.",
                fecha : "2021/12/05"        
            },
            {
                nombre : "Carta compromiso",
                archivos : [
                    {nombre: "carta_compromiso.pdf"}
                ],
                instrucciones : "Hay que subir la carta compromiso lo mas pronto que puedas. y que este firmada",
                fecha : "2021/04/12"        
            }
        ],
        
        // modales

        showAdd : false,
        showUpdate : false,
        showDelete : false,

        // modal update
        updateNombre : "",
        updateFecha : "",
        updateInstrucciones : ""

    }

    onFileChange = (files) => {
        
        //console.log(files);

        let archivo = files.base64.substring(28);         
        let nombre = files.name;

        console.log(nombre);

        this.setState( { selectedFile : archivo, nombre : nombre } );
    }

    onFileUpload = async () => {
        //console.log(this.state.selectedFile);

        const options = {
            onUploadProgress : (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percet = Math.floor( (loaded * 100) / total );
                this.setState({porCiento : percet});
                console.log( `${loaded}kb of ${total}kb | ${percet}%` );
            }
        }

        const response = await sigess.post('/pdfUpload', {
            nombre : "hola.pdf",
            archivo : this.state.selectedFile
        },options
        );
        console.log(response.data);
    }

    // modales
    handleOpenAdd = () => this.setState( {showAdd : true});
    handleCloseAdd = () => this.setState( {showAdd : false});
    
    handleOpenUpdate = (nombre,fecha,instrucciones) => {
        this.setState( {
            showUpdate : true,
            updateNombre : nombre,
            updateFecha : fecha,
            updateInstrucciones : instrucciones
        } )
    };
    handleCloseUpdate = () => this.setState( {showUpdate : false});

    handleOpenDelete = (nombre) => this.setState({showDelete : true, nombre});
    handleCloseDelete = () => this.setState({showDelete : false});

    render(){
        return (
            <div>
                
                <FileBase64
                    multiple = {false}
                    onDone = { this.onFileChange }
                />

                <button onClick={this.onFileUpload} >Upload</button>

                <div class="progress" style={{margin : "1rem"}}>
                    <div className="progress-bar" role="progressbar" style={{width : `${this.state.porCiento}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {this.state.porCiento}% </div>
                </div>

                <button 
                    className="btn btn-success " 
                    style={{marginBottom : "10px"}}
                    onClick={this.handleOpenAdd}
                >
                    Agregar Tarea
                </button>

                <ListAsignacionCard 
                    asignaciones = {this.state.tasks} 
                    handleOpenUpdate = {this.handleOpenUpdate}
                    handleOpenDelete = {this.handleOpenDelete}
                />

                <ModalAddTask
                    show = {this.state.showAdd}
                    handleClose = {this.handleCloseAdd}
                />

                <ModalEditTask
                    show = {this.state.showUpdate}
                    handleClose = {this.handleCloseUpdate}
                    nombre = {this.state.updateNombre}
                    fecha = {this.state.updateFecha}
                    instrucciones = {this.state.updateInstrucciones}
                />

                <ModalDeleteTask
                    show = {this.state.showDelete}
                    handleClose = {this.handleCloseDelete}
                    nombre = {this.state.nombre}
                />
            </div>
        );
    }
}

export default GestionarAsignaciones;