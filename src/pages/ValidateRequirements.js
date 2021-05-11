import React from 'react';
import withAuthAdmin from './Auth/withAuthAdmin';
import ListValidate from './components/ListValidate';
import ModalAceptRequisite from './modals/ModalAceptRequisite';
import ModalRejectRequisite from './modals/ModalRejectRequisite';
import sigess from './api/sigess';

class ValidateRequirements extends React.Component {

    state = {
        alumnosPendientes : [],
        alumnosRevisados : [],
        showAcept : false,
        showReject : false,
        noControl : "",
        nombre : "",
        
        idAdmin : 0,

        // Requisito a validar
        idRequisito : 0,
        nombreRequisito : "",
        detalle : ""
    }

    componentDidMount (){
        this.getRequisite();
        this.getStudents();
    }

    /**
     * Obtiene el requisito relacionado con el admin logueado.
     */
    getRequisite = async () => {
        let user = JSON.parse( sessionStorage.getItem("usuario") );
        const response = await sigess.post('/requisitos/requisitoAdmin',{
            idAdmin : user.usuario
        });
        
        let requisito = response.data.requisito;

        this.setState( {
            idRequisito : requisito.idRequisito,
            nombreRequisito : requisito.nombre,
            detalle : requisito.detalleARevisar
        } );
        
    }

    /**
     * Obtiene los estudiantes relacionados al requisito.
     */
    getStudents = async () => {
        let user = JSON.parse( sessionStorage.getItem("usuario") );
        let id = user.usuario;
        
        const response = await sigess.post('/requisitos/alumnosAdmin',{
            idAdmin : id
        });
        
        let arrStudents = response.data;
        let reviwed = [];
        let nonReviwed = [];
        arrStudents.forEach( student => {
            if( student.estadoRequisito === 'P'){
                nonReviwed.push( {
                    nombre : student.nombre,
                    noControl : student.noControl,
                    estatus : student.estadoRequisito
                } );
            }
            else {
                reviwed.push( {
                    nombre : student.nombre,
                    noControl : student.noControl,
                    estatus : student.estadoRequisito
                } );
            }
        });

        this.setState( { 
            alumnosPendientes : nonReviwed,
            alumnosRevisados : reviwed
        } );

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
    /**
     * Cierra el modal
     */
    handleCloseReject = () => {this.setState( { showReject : false} );}

    /**
     * Acepta el requisito para el estudiante
     * @param {int} noControl - numero de control del alumno 
     */
    aceptStudent = async (noControl) => {
        const response = await sigess.post("/requisitos/validarRequisitos",[{
            Requisito: this.state.idRequisito, 
            Alumno: noControl,
            cumple: "A"
        }] );
        this.getStudents();
        this.handleCloseAcept();
    }

    /**
     * Rechaza el requisito para el estudiante.
     * @param {int} noControl - numero de control del alumno 
     */
    rejectStudent = async (noControl) => {
        const response = await sigess.post("/requisitos/validarRequisitos",[{
            Requisito: this.state.idRequisito, 
            Alumno: noControl,
            cumple: "R"
        }] );
        this.getStudents();
        this.handleCloseAcept();
        this.handleCloseReject();
    }

    /**
     * Rectifica un alumno.
     * @param {int} noControl - numero de control del alumno 
     */
    undoStudent = async (noControl) => {
        const response = await sigess.post("/requisitos/validarRequisitos",[{
            Requisito: this.state.idRequisito, 
            Alumno: noControl,
            cumple: "P"
        }] );
        this.getStudents();
    }

    render(){
        return ( 
            <div>
                
                <div style={{ marginBottom : "10px"}}>
                    <h2 style={{marginBottom : "1rem"}}> {this.state.nombreRequisito} </h2>
                    <p> {this.state.detalle} </p>
                </div>

                <h3 style={{marginBottom : "2rem"}}>Pendiente de revisión</h3>

                <ListValidate 
                    alumnos={this.state.alumnosPendientes} 
                    handleOpenAcept={this.handleOpenAcept}
                    handleOpenReject={this.handleOpenReject}
                    undoStudent = {this.undoStudent}
                />

                <h3 style={{marginBottom : "2rem", marginTop : "2rem"}}>Revisados</h3>

                <ListValidate 
                    alumnos={this.state.alumnosRevisados} 
                    handleOpenAcept={this.handleOpenAcept}
                    handleOpenReject={this.handleOpenReject}
                    undoStudent = {this.undoStudent}
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