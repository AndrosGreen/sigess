import React from 'react';

class NotFoundPage extends React.Component {

    // genera numero aleatorio entre 0 y max.
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    render (){

        let index = this.getRandomInt(5) + 1;
        let route = "/dogues/dog0" + index +  ".png";

        return (
            <div className="text-center" style={{marginTop: "2rem"}}>
                <img 
                    src= {route}
                    className="img-fluid" 
                    alt="Dogue" 
                    style={{height: "35rem"}}
                />
            </div>
        );
    }
}

export default NotFoundPage;