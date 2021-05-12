import React from 'react';
import sigess from './api/sigess';
import RequisitoAlumnoAdminCard from './components/RequisitoAlumnoCard';
import ListRequisitoAlumnos from './components/ListRequisitoAlumnos';

class ViewRequisitesStudent extends React.Component {

    state = { 
        // requisites
        requisites : [
           
        ],
        requisiteName : '',
        description : '',
        status : '',
        noControl : ''

    };

    /**
     * carga los requisitos que se encuentran en la bd
     */
    componentDidMount (){
        //obtener el numero de control del alumno logeado
        const usuario = JSON.parse( sessionStorage.getItem("usuario") );
        let noControlAct = usuario.usuario;
        this.setState({noControl : noControlAct})
        console.log(noControlAct);
        this.loadRequisites(noControlAct);
    }
    
    /**
     * carga los requisitos del alumno
     * @param {String} noControl 
     */

    loadRequisites = async (noControl) => {
        const respuesta = await sigess.post( '/requisitos/estatusAlumno',{
                noControl : noControl
            }
        );
        console.log(respuesta.data);
        this.setState( { requisites : respuesta.data } );
    }

    render(){
        return (
            <div>
                <h4 style={{marginBottom: "15px"}}>{this.state.noControl}</h4>
                <ListRequisitoAlumnos
                    requisites = {this.state.requisites}
                />
                    
            </div>
            
        );
    } 
}
 
export default ViewRequisitesStudent;