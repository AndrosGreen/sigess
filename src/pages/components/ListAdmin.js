import React from 'react';
import AdminCard from './AdminCard';

class ListAdmin extends React.Component{
    render (){

        const admins = this.props.admins.map(
            admin => {
                return (
                    <AdminCard
                        nombre = {admin.nombre}
                        area = {admin.area}
                        correo = {admin.correo}
                        idAdmin = {admin.idAdmin}
                        handleOpenEdit = {this.props.handleOpenEditAdmin}
                        handleOpenDeleteAdmin = {this.props.handleOpenDeleteAdmin}
                        
                    />
                );
            }
        );

        return (
            <div> {admins} </div>
        );
    }
}

export default ListAdmin;