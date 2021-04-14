import React from 'react';

class AdminCard extends React.Component{
    render(){
        return(
            <div className = "card" style={{ width : "22rem" , marginTop : "10px" }}>
                <div className="card-body">
                    <h5 className="card-title"> {this.props.nombre} </h5>
                    <h6 className="card-subtitle mb-2 text-muted">Encargado de: {this.props.area}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Correo: {this.props.correo}</h6>
                    <button 
                        className="btn btn-warning" 
                        onClick={ 
                            () => { 
                                this.props.handleOpenEdit(
                                    this.props.nombre,
                                    this.props.area,
                                    this.props.correo,
                                    this.props.idAdmin
                                ); 
                            }
                        } 
                    > 
                        Editar 
                    </button>

                    <button 
                        className="btn btn-secondary" style={{margin : "10px"}}
                        onClick={ () => { this.props.handleOpenDeleteAdmin( this.props.idAdmin ); } } 
                    > 
                        Eliminar
                    </button>
                </div>
            </div>
        );
    }

}

export default AdminCard;