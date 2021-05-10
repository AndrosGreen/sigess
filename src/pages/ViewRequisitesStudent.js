import React from 'react';
import sigess from './api/sigess';
import RequisitoAlumnoAdminCard from './components/RequisitoAlumnoCard';
import ListRequisitoAlumnos from './components/ListRequisitoAlumnos';

class ViewRequisitesStudent extends React.Component {

    state = { 
        // requisites
        requisites : [],
        requisiteName : '',
        description : '',
        status : ''

    };

    /**
     * carga los requisitos que se encuentran en la bd
     */
    componentDidMount (){
        //obtener el numero de control del alumno logeado
        const usuario = JSON.parse( sessionStorage.getItem("usuario") );
        let noControlAct = usuario.usuario;
        console.log(noControlAct);
        this.loadRequisites(noControlAct);
    }

    /*AuthRoute = () => {
        const isAuth = JSON.parse( sessionStorage.getItem("usuario") );
        if(isAuth.usuario === 0){
            return <Component />
        }
        else {
            return <Redirect to="/notFound"/>
        }
    };*/ 
    
    /**
     * carga los requisitos de la bd
     */
    loadRequisites = async (noControl) => {
        const respuesta = await sigess.get( '/requisitos/estatusAlumno',{
            params : {
                noControl : "S18120183"
            }
            }
        );
        console.log(respuesta);
        //this.setState( { requisites : respuesta.data } );
    }

    render(){
        return (
            <div>
                <h4 style={{marginBottom: "15px"}}>aqui va el nombre del alumno</h4>
                <ListRequisitoAlumnos
                    requisites = {this.state.requisites}
                />
                    
            </div>
            
        );
    } 
}
 
export default ViewRequisitesStudent;