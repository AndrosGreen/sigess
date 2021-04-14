import React from 'react';

class StudentCard extends React.Component{
    render(){
        return(
            <div className = "card" style={{ width : "22rem" , marginTop : "10px" }}>
                <div className="card-body">
                    <h5 className="card-title"> Número de control : {this.props.noControl} </h5>
                    
                </div>
            </div>
        );
    }

}

export default StudentCard;