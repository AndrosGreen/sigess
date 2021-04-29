import React from 'react';

class RequisiteCard extends React.Component {
    render(){
        return(
            <div className = "card" style={{ width : "22rem" , marginTop : "10px" }}>
                <div class="card-header">
                    <h5>5 niveles Ingles</h5>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted"> Gema </h6>
                    <p>
                        Tiene que tener liberados sus 5 niveles de ingles o 
                        en su defecto tener un 100 en el toefl.
                    </p>
                </div>
            </div>
        );
    }
}

export default RequisiteCard;