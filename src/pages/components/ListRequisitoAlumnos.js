import React from 'react';
import RequisitoAlumnoCard from './RequisitoAlumnoCard';

class ListRequisitoAlumnos extends React.Component {
    render(){

        const requisites = this.props.requisites.map(
            requisite => {
                return (
                    <RequisitoAlumnoCard
                        requisiteName = {requisite.nombre}
                        description = {requisite.detalleARevisar}
                        status = {requisite.cumple}
                    />
                );
            }
        );

        return (
            <div> {requisites} </div>
        );
    }
}

export default ListRequisitoAlumnos;