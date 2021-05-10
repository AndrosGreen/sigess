import React from 'react';
import withAuthAdmin from './Auth/withAuthAdmin';
import ListValidate from './components/ListValidate';
import ModalAceptRequisite from './modals/ModalAceptRequisite';
import ModalRejectRequisite from './modals/ModalRejectRequisite';
import sigess from './api/sigess';

class ValidateRequirements extends React.Component {

    state = {
        alumnosPendientes : [
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

        alumnosRevisados : [
            {
                nombre : "Barry Allen",
                noControl : "18120199",
                estatus : "A"
            },
            {
                nombre : "Clark Kent",
                noControl : "18120000",
                estatus : "R"
            }
        ],

        showAcept : false,
        showReject : false,
        noControl : "",
        nombre : "",
    
        // Requisito a validar
        idRequisito : 0,
        nombreRequisito : "",
        detalle : ""
    }

    componentDidMount (){
        this.getRequisite();
    }

    getRequisite = async () => {
        let user = JSON.parse( sessionStorage.getItem("usuario") );
        const response = await sigess.post('/requisitos/requisitoAdmin',{
            idAdmin : user.usuario
        });
        
        console.log(response);
        
        //let requisito = response.data.requisito;
        /*
        this.setState( {
            idRequisito : requisito.idRequisito,
            nombreRequisito : requisito.nombre,
            detalle : requisito.detalleARevisar
        } );
        */
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
                
                <div style={{ marginBottom : "10px"}}>
                    <h2> {this.state.nombreRequisito} </h2>
                </div>

                <h3 style={{marginBottom : "2rem"}}>Pendiente de revisión</h3>

                <ListValidate 
                    alumnos={this.state.alumnosPendientes} 
                    handleOpenAcept={this.handleOpenAcept}
                    handleOpenReject={this.handleOpenReject}
                />

                <h3 style={{marginBottom : "2rem", marginTop : "2rem"}}>Revisados</h3>

                <ListValidate 
                    alumnos={this.state.alumnosRevisados} 
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