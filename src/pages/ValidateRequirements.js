import React from 'react';
import withAuthAdmin from './Auth/withAuthAdmin';

class ValidateRequirements extends React.Component {
    render(){
        return <div>Validar Requisitos</div>;
    }
}

export default withAuthAdmin( ValidateRequirements );