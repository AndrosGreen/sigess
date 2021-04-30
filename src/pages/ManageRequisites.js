import React from 'react';
import sigess from './api/sigess';
import withAuthSuperAdmin from './Auth/withAuthSuperAdmin';
import ListRequisites from './components/ListRequisites';
import RequisiteCard from './components/RequisiteCard';
import ModalAddRequisite from './modals/ModalAddRequisite';
import ModalDeleteRequisite from './modals/ModalDeleteRequisite';
import ModalEditRequisite from './modals/ModalEditRequisite';

class ManageRequisites extends React.Component {
    
    state = {
        admins : [],
        requisites : [],
        showAddRequisite : false,
        showDeleteRequisite : false,
        showEditRequisite : false,
        idRequisite : 0,
        name : "",
        detail : ""
    }

    componentDidMount (){
        this.getAdmins();
        this.getRequisites();
    }

    /*******************************************************
     *              handle modals
     ******************************************************/

    handleOpenAddRequisite = () => this.setState({ showAddRequisite: true});
    handleCloseAddRequisite = () => this.setState({ showAddRequisite: false});
    
    handleOpenEditRequisite = (id, name, detail) => { 
        this.setState({
            showEditRequisite: true,
            idRequisite : id,
            name,
            detail
        });
    }
    handleCloseEditRequisite = () => this.setState({showEditRequisite: false});

    handleOpenDeleteRequisite = (id, name) => {
        this.setState({ 
            showDeleteRequisite: true, 
            idRequisite: id,
            name : name
        });
    }
    handleCloseDeleteRequisite = () => this.setState({ showDeleteRequisite: false});

    /*******************************************************
     *              llamadas a la API
     ******************************************************/

    //elimina un requisito
    deleteRequisite = async (id) => {
        const response = await sigess.post("/requisitos/elimina",{
            "idRequisito": id
        });
        console.log(response);
        this.handleCloseDeleteRequisite();
        this.getRequisites();
    }

    // actualiza un requisito
    editRequisite = async (id, name, detail) => {
        // aqui va codigo para actualizar
    }

    // agrega un requisito
    addRequisite = async (nombre, revisadoPor, detalleARevisar) => {
        const response = await sigess.post("/requisitos/crea",{
            "nombre": nombre,
            "revisadoPor": revisadoPor,
            "detalleARevisar": detalleARevisar
        });
        this.getRequisites();
        console.log(response);
    }

    // obtiene todos los requisitos
    getRequisites = async () => {
        const requisites = await sigess.get("/requisitos/obtenerTodos", {});
        this.setState({ requisites : requisites.data});
    }

    // obtiene todos los admins
    getAdmins = async () => {
        const response = await sigess.get("/admins/obtenerAdmins",{});
        this.setState({admins: response.data});
    }

    // obtiene un admin
    getAdmin = async (idAdmin) => {
        const admin = await sigess.post("/admins/obtenerAdminPorID",{
            idAdmin : idAdmin
        });
        //console.log(admin.data);
        return admin.data;
    }
    
    render(){
        return ( 
            <div>
                <h3 style={{marginBottom: "20px"}}>Gestión de Requisitos</h3>
                <button 
                    className="btn btn-success" 
                    style={{marginBottom: "10px"}} 
                    onClick={this.handleOpenAddRequisite}
                >
                    Agregar Requisito
                </button>
                <h3 style={{marginBottom: "20px"}}>Requisitos</h3>
                <div>
                    <ListRequisites 
                        requisites={this.state.requisites} 
                        getAdmin={this.getAdmin} 
                        handleOpenDelete = {this.handleOpenDeleteRequisite}
                        handleOpenEdit = {this.handleOpenEditRequisite}
                    />
                </div>

                <ModalAddRequisite
                    show = {this.state.showAddRequisite}
                    handleClose = {this.handleCloseAddRequisite}
                    admins = {this.state.admins}
                    addRequisite = {this.addRequisite}
                />

                <ModalDeleteRequisite
                    show = {this.state.showDeleteRequisite}
                    idRequisite = {this.state.idRequisite}
                    name = {this.state.name}
                    deleteRequisite = {this.deleteRequisite}
                    handleClose = {this.handleCloseDeleteRequisite}
                />

                <ModalEditRequisite
                    show = {this.state.showEditRequisite}
                    idRequisite = {this.state.idRequisite}
                    name = {this.state.name}
                    detail = {this.state.detail}
                    handleClose = {this.handleCloseEditRequisite}
                    editRequisite = {this.editRequisite}
                />

            </div> 
        );
    }
}

export default withAuthSuperAdmin( ManageRequisites );