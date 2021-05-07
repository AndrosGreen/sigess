import React from 'react';
import RequisitoAlumnoAdminCard from './RequisitoAlumnoAdminCard';

class ListRequisitoAlumnos extends React.Component {
    render(){

        const cards = this.props.alumnos.map(
            (alumno) => {
                return (
                    <RequisitoAlumnoAdminCard
                        nombre = {alumno.nombre}
                        noControl = {alumno.noControl}
                        estatus = {alumno.estatus}
                        handleOpenAcept ={this.props.handleOpenAcept}
                        handleOpenReject = {this.props.handleOpenReject}
                    />
                );
            }
        );

        return <div>{cards}</div> ;
    }
}

export default ListRequisitoAlumnos;