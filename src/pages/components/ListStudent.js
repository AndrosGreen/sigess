import React from 'react';
import StudentCard from './StudentCard';

class ListStudent extends React.Component{
    render (){

        const students = this.props.students.map(
            student => {
                return (
                    <StudentCard
                        noControl = {student.noControl}
                        passwordStudent = {student.password}
                        handleOpenDeleteStudent = {this.props.handleOpenDeleteStudent}
                        handleOpenEditStudent = {this.props.handleOpenEditStudent}
                    />
                );
            }
        );

        return (
            <div> {students} </div>
        );
    }
}

export default ListStudent;