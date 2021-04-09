import React from 'react';

class StudentCard extends React.Component{
    render(){
        return(
            <div className = "card" style={{ width : "22rem" , marginTop : "10px" }}>
                <div className="card-body">
                    <h5 className="card-title"> Número de control : {this.props.noControl} </h5>
                    <button 
                        className="btn btn-warning" 
                        onClick ={ 
                            () => { 
                                this.props.handleOpenEditStudent(
                                    this.props.noControl,
                                    this.props.passwordStudent
                                ); 
                            }
                        } 
                    > 
                        Editar 
                    </button>

                    <button 
                        className="btn btn-secondary" style={{margin : "10px"}}
                        onClick={ () => { this.props.handleOpenDeleteStudent( this.props.noControl ); }} 
                    > 
                        Eliminar
                    </button>
                </div>
            </div>
        );
    }

}

export default StudentCard;