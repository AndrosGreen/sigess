import React from 'react';
import AsignacionAlumnoCard from './AsignacionAlumnoCard';

class ListAsignacionAlumnos extends React.Component {
    render(){
        const assignments = this.props.assignments.map(
            assignment => {
                return (
                    <AsignacionAlumnoCard
                        asigmentName = {assignment.asigmentName}
                        beginDate = {assignment.beginDate}
                        endDate = {assignment.endDate}
                        stage = {assignment.stage}
                        noControl = {assignment.noControl}
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