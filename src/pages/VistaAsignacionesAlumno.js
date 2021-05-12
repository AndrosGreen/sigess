import React from 'react';
import withAuthStudentRegistered from './Auth/withAuthStudentRegistered';
import AsignacionAlumnoCard from './components/AsignacionAlumnoCard';
import ListAsignacionAlumnos from './components/ListAsignacionAlumnos';

class VistaAsignacionesAlumno extends React.Component {
    state = { 
        // asignations
        assignments : [
           {
               assignmentName : "carta compromiso",
               fecha : "05 de diciembre de 2021",
               status : "A",

           }
           ,{
               assignmentName : "carta de aceptacion",
               fecha : "29 de diciembre de 2021",
               status : "P",
           }
        ],
        assignmentName : '',
        beginDate : '',
        endDate : '',
        status : '',
        noControl : '',
        porCiento : 87

    };

    /**
     * carga los requisitos que se encuentran en la bd
     */
    componentDidMount (){
        //obtener el numero de control del alumno logeado
        const usuario = JSON.parse( sessionStorage.getItem("usuario") );
        let noControlAct = usuario.usuario;
        this.setState({noControl : noControlAct})
        //this.loadAsigments(noControlAct);
    }
    
    /**
     * carga las asignaciones del alumno
     * @param {String} noControl 
     */

    /*loadAssignments = async (noControl) => {
        const respuesta = await sigess.post( 'link a la peticion',{
                noControl : noControl
            }
        );
        console.log(respuesta.data);
        //this.setState( { requisites : respuesta.data } );
    }*/

    render(){
        return (
            <div>
                <h4 style={{marginBottom: "15px"}}>{this.state.noControl}</h4>
                <p>Progreso :</p>
                <div class="progress" style={{marginTop : "1rem"}}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{width : `${this.state.porCiento}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {this.state.porCiento}% </div>
                </div>
                <ListAsignacionAlumnos
                    assignments = {this.state.assignments}
                />
                    
            </div>
            
        );
    }
}

export default  withAuthStudentRegistered( VistaAsignacionesAlumno );