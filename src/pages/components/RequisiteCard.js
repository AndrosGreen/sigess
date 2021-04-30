import React from 'react';

class RequisiteCard extends React.Component {
    render(){
        return(
            <div className = "card" style={{ width : "22rem" , marginTop : "10px" }}>
                <div class="card-header">
                    <h5>{this.props.nombre}</h5>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted"> {this.props.admin} </h6>
                    <p>
                        {this.props.detalle}
                    </p>
                    <button 
                        className="btn btn-warning" 
                        style={{marginRight: "10px"}}
                        onClick={() => this.props.handleOpenEdit(
                            this.props.id,
                            this.props.nombre,
                            this.props.detalle
                        ) }
                    >
                        Editar
                    </button>
                    <button 
                        className="btn btn-danger"
                        onClick={ () => this.props.handleOpenDelete( this.props.id, this.props.nombre ) }  
                    > 
                            Eliminar 
                    </button>
                </div>
            </div>
        );
    }
}

export default RequisiteCard;