import React from 'react';

class AdminCard extends React.Component{
    render(){
        return(
            <div className = "card" style={{ width : "22rem" , marginTop : "10px" }}>
                <div className="card-body">
                    <h5 className="card-title"> {this.props.nameAdmin} </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.area}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.gmail}</h6>
                    <button 
                        className="btn btn-warning" 
                        onClick={ 
                            () => { 
                                this.props.handleOpenEdit(
                                    this.props.nameAdmin,
                                    this.props.area,
                                    this.props.gmail,
                                    this.props.password
                                ); 
                            }
                        } 
                    > 
                        Editar 
                    </button>

                    <button 
                        className="btn btn-secondary" style={{margin : "10px"}}
                        onClick={ () => { this.props.handleOpenDelete( this.props.nameAdmin ); } } 
                    > 
                        Eliminar
                    </button>
                </div>
            </div>
        );
    }

}

export default AdminCard;