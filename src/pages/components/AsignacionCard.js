import React from 'react';

class AsignacionCard extends React.Component {

    render(){

        const archivos = this.props.archivos.map(
            archivo => {
                return (
                    <div className="list-group" style={{marginBottom : "10px"}}>
                        <a href="#" className="list-group-item list-group-item-action active">{archivo.nombre}</a>
                    </div>
                );
            }
        );

        return ( 
            <div>
                <div className="card" style={{width : "30rem", marginBottom : "10px"}}>
                    <div className="card-header">
                        <h5>{this.props.nombre}</h5> 
                    </div>
                    <div className="card-body">
                        <label>Fecha:</label>
                        <p><b>{this.props.fecha}</b></p>
                        <p>{this.props.instrucciones}</p>
                        {archivos}
                        <button 
                            className="btn btn-warning" 
                            style={{marginRight : "10px"}}
                            onClick = {() => this.props.handleOpenUpdate(
                                this.props.nombre,
                                this.props.fecha,
                                this.props.instrucciones
                            )}
                        >
                            Editar
                        </button>
                        <button 
                            className="btn btn-danger" 
                            onClick={() => this.props.handleOpenDelete(this.props.nombre)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div> 
        );
    }
}

export default AsignacionCard;