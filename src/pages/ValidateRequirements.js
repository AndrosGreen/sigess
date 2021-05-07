import React from 'react';
import withAuthAdmin from './Auth/withAuthAdmin';
import ListRequisitoAlumnos from './components/ListRequisitoAlumnos';

class ValidateRequirements extends React.Component {
    
    state = {
        alumnos : [
            {
                nombre : "Luis Andres Gutierrez Calderon",
                noControl : "18120184",
                estatus : "P"
            },
            {
                nombre : "Jocelyn Alexia Aguilera Martinez",
                noControl : "18120207",
                estatus : "P"
            },
            {
                nombre : "Bruce Wayne",
                noControl : "18120100",
                estatus : "P"
            }
        ]
    }

    getReviwed = () => {
        
    }

    getNonReviewed = () => {

    }

    render(){
        return ( 
            <div>

                <ListRequisitoAlumnos alumnos = {this.state.alumnos} />

            </div> 
        );
    }
}

export default withAuthAdmin( ValidateRequirements );