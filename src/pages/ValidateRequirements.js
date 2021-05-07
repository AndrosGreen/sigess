import React from 'react';
import withAuthAdmin from './Auth/withAuthAdmin';
import ListRequisitoAlumnos from './components/ListRequisitoAlumnos';
import ModalAceptRequisite from './modals/ModalAceptRequisite';
import ModalRejectRequisite from './modals/ModalRejectRequisite';

class ValidateRequirements extends React.Component {

    state = {
        alumnos : [
            {
                nombre : "Luis Andres Gutierrez Calderon",
                noControl : "18120184",
                estatus : "P"
            },
            {
                nombre : "Jocelyn Alexia Aguilera Martinez",
                noControl : "18120207",
                estatus : "P"
            },
            {
                nombre : "Bruce Wayne",
                noControl : "18120100",
                estatus : "P"
            }
        ],
        showAcept : false,
        showReject : false,
        noControl : "",
        nombre : ""
    }

    /**
     * Obtiene los alumnos que ya fueron revisados
     */
    getReviwed = () => {
        
    }

    /**
     * Obtiene los alumnos que no han sido revisados
     */
    getNonReviewed = () => {

    }

    /**
     * Muesta el modal
     * @param {*} name - nombre alumno 
     * @param {*} noControl - noControl alumno
     */
    handleOpenAcept = (name, noControl) => {
        this.setState(  {showAcept : true, nombre : name, noControl : noControl} );
    }
    /**
     * Cierra el modal
     */
    handleCloseAcept = () => {this.setState( { showAcept : false} );}

    /**
     * Muestra el modal
     * @param {*} name - nombre alumno
     * @param {*} noControl - noControl alumno
     */
    handleOpenReject = (name, noControl) => {
        this.setState(  { showReject : true , nombre : name, noControl : noControl} );
    }
    handleCloseReject = () => {this.setState( { showReject : false} );}

    /**
     * Acepta el requisito para el estudiante
     * @param {*} noControl 
     */
    aceptStudent = async (noControl) => {
        console.log("validar");
    }

    /**
     * Rechaza el requisito para el estudiante.
     * @param {*} noControl 
     */
    rejectStudent = async (noControl) => {
        console.log("rechazar");
    }

    render(){
        return ( 
            <div>

                <ListRequisitoAlumnos 
                    alumnos={this.state.alumnos} 
                    handleOpenAcept={this.handleOpenAcept}
                    handleOpenReject={this.handleOpenReject}
                />

                <ModalAceptRequisite
                    show = {this.state.showAcept}
                    handleClose = {this.handleCloseAcept}
                    nombre = {this.state.nombre}
                    noControl = {this.state.noControl}
                    aceptStudent = {this.aceptStudent}
                />

                <ModalRejectRequisite
                    show = {this.state.showReject}
                    handleClose = {this.handleCloseReject}
                    nombre = {this.state.nombre}
                    noControl = {this.state.noControl}
                    rejectStudent = {this.rejectStudent}
                />

            </div> 
        );
    }
}

export default withAuthAdmin( ValidateRequirements );