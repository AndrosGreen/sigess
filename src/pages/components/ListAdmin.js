import React from 'react';
import AdminCard from './AdminCard';

class ListAdmin extends React.Component{
    render (){

        const admins = this.props.admins.map(
            admin => {
                return (
                    <AdminCard
                        nameAdmin = {admin.nameAdmin}
                        area = {admin.area}
                        gmail = {admin.gmail}
                        password = {admin.password}
                        handleOpenEdit = {this.props.handleOpenEdit}
                        handleOpenDelete = {this.props.handleOpenDelete}
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