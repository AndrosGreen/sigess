import React from 'react';
import AsignacionCard from './AsignacionCard';

class ListAsignacionCard extends React.Component {
    render(){

        const asignaciones = this.props.asignaciones.map(
            task => {
                return (
                    <AsignacionCard
                        nombre = {task.nombre}
                        archivos = {task.archivos}
                        instrucciones = {task.instrucciones}
                        fecha = {task.fecha}
                        handleOpenUpdate = {this.props.handleOpenUpdate}
                        handleOpenDelete = {this.props.handleOpenDelete}
                    />
                );
            }
        );

        return ( 
            <div>
                {asignaciones}
            </div> 
        );
    }
}

export default ListAsignacionCard;