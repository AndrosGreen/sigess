import React from 'react';
import withAuthStudentRegistered from './Auth/withAuthStudentRegistered';

class VistaAsignacionesAlumno extends React.Component {
    render(){
        return <div>VistaAsignacionesAlumno</div>;
    }
}

export default  withAuthStudentRegistered( VistaAsignacionesAlumno );