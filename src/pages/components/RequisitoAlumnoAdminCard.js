import React from 'react';

class RequisitoAlumnoAdminCard extends React.Component {

    render(){
        if(this.props.estatus === "P"){
            return ( 
                <div>
                    <div className="card" style={{width : "31rem", marginBottom : "10px" }}>
                    <div className="card-body">
                        <div style={{marginBottom : "1rem"}}>
                            <h5> {this.props.nombre} </h5>
                        </div>
                        <div style={{marginBottom : "1rem"}}>
                            <h5 className="card-subtitle mb-2 text-muted">{this.props.noControl}</h5>
                        </div>
                        <button className="btn btn-success" style={{marginRight : "10px"}}>Aceptar</button>
                        <button className="btn btn-danger" >Rechazar</button>
                    </div>
                    </div>
                </div> 
            );
        }
        else {
            let status = "";
            let typeButton = "";
            if(this.props.estatus === "A"){
                status = "Aceptado";
                typeButton = "btn btn-success";
            }
            else {
                status = "Rechazado";
                typeButton = "btn btn-danger";
            }

            return ( 
                <div>
                    <div className="card" style={{width : "31rem", marginBottom : "10px" }}>
                    <div className="card-body">
                        
                        <div className="row" >
                            <div className="col">
                                <h5> {this.props.nombre} </h5>
                            </div>
                            <div className="col-3">
                                <p className={typeButton}> {status} </p>
                            </div>
                        </div>

                        <div style={{marginBottom : "1rem"}}>
                            <h5 className="card-subtitle mb-2 text-muted">{this.props.noControl}</h5>
                        </div>

                        <button className="btn btn-primary" style={{marginRight : "10px"}}>Rectificar</button>
                    </div>
                    </div>
                </div> 
            );
        }
    }
}

export default RequisitoAlumnoAdminCard;