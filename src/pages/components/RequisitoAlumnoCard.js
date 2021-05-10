import React from 'react';

class RequisitoAlumnoCard extends React.Component {
    state = {
        status : ''
    }

    colorStatus(){
        if(this.props.status == 'R'){
            return this.state.status = "Rechazado";
        }
        else if(this.props.status == 'A'){
            return this.state.status = "Aceptado";
        }
        else{
            return this.state.status = "Pendiente";
        }
    }

    render(){
        return(
            <div className = "card" style={{ width : "40rem" , marginTop : "10px" }}>
                <div className="card-body">
                    <h5 className="card-title"> {this.props.requisiteName} </h5>
                    <h6 class="card-subtitle mb-2 text-muted">Estatus : </h6>
                    <button 
                        className="btn btn-secondary" style={{margin : "10px"}}
                    > 
                        {this.colorStatus()}
                    </button>
                    <p class="card-text">{this.props.description}</p>
                    
                </div>
            </div>
        );
    }
}

export default RequisitoAlumnoCard;