import React from 'react';

class AsignacionAlumnoCard extends React.Component {
    state = {
        status : '',
        tipoBoton : ''
    }

    colorStatus(){
        if(this.props.status === 'R'){
            return "Rechazado";
        }
        else if(this.props.status === 'A'){
            return "Aceptado";
        }
        else{
            return "Pendiente";
        }
    }

    tipoBoton(){
        if(this.props.status === 'R'){
            return "btn btn-danger";
        }
        else if(this.props.status === 'A'){
            return "btn btn-success";
        }
        else{
            return "btn btn-warning";
        }
    }
    render(){


        return(
            <div className = "card" style={{ width : "40rem" , marginTop : "10px" }}>
                <div className="card-body">
                    <h5 className="card-title"> {this.props.assignmentName} </h5>
                    <h6 class="card-subtitle mb-2 text-muted">Estatus : </h6>
                    <button 
                        className={this.tipoBoton()} style={{margin : "10px"}}
                    > 
                        {this.colorStatus()}
                    </button>
                    <div className="form-group">
                        <label>Fecha de entrega: <label className="fw-bold"> {this.props.fecha}</label> </label>
                    </div>

                    <button 
                        className="btn btn-secondary" style={{margin : "10px"}}
                    > 
                        Ver tarea
                    </button>
                    
                    
                </div>
            </div>
        );
    }
}

export default AsignacionAlumnoCard;