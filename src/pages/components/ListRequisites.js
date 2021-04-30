import React from 'react';
import RequisiteCard from './RequisiteCard';

class ListRequisites extends React.Component {
    
    state = {
        requisites : []
    }

    // obtiene un admin por ID.
    getAdmin = async (id) => {
        let admin = await this.props.getAdmin(id);
        return admin;
    }

    // para cada requisito obtitne el aministrador que le corresponde y agrega
    // los datos correspondietes a un Requisite Card.
    getCards = async () => {
        return Promise.all(
            this.props.requisites.map(
               async (requisite) => {
    
                    let admin = await this.getAdmin(requisite.revisadoPor); 
                    console.log(admin.Admin.nombre); 
                                  
                    return (
                        <RequisiteCard
                            id = {requisite.idRequisito}
                            nombre = {requisite.nombre}
                            admin = {admin.Admin.nombre}
                            detalle = {requisite.detalleARevisar}
                            handleOpenDelete = {this.props.handleOpen}
                            handleOpenEdit = {this.props.handleOpenEdit}
                        />
                    );
                }
            )
        );
    }

    // carga los requisitos al iniciar.
    componentDidMount () {
        this.getCards().then(
            data => {
                this.setState({requisites : data});
            }
        );
    }

    // actualiza la lista solo si hay cambios.
    componentDidUpdate (prevProps) {
        if( this.props.requisites !== prevProps.requisites ){
            this.getCards().then(
                data => {
                    this.setState({requisites : data});
                }
            );
        }
    }

    render(){
        return ( 
            <div>
                { this.state.requisites }
            </div> 
        );
    }
}

export default ListRequisites;