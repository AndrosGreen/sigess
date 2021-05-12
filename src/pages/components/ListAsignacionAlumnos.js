import React from 'react';
import AsignacionAlumnoCard from './AsignacionAlumnoCard';

class ListAsignacionAlumnos extends React.Component {
    render(){
        const assignments = this.props.assignments.map(
            assignment => {
                return (
                    <AsignacionAlumnoCard
                        assignmentName = {assignment.assignmentName}
                        fecha = {assignment.fecha}
                        status = {assignment.status}
                    />
                );
            }
        );

        return (
            <div> {assignments} </div>
        );
    }
}

export default ListAsignacionAlumnos;