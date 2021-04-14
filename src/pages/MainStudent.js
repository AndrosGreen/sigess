import React from 'react';
import withAuthStudent from './Auth/withAuthStudent';

class MainStudent extends React.Component {
    render(){
        return <div>Main Alumno</div>;
    }
}

export default withAuthStudent ( MainStudent );