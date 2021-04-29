import React from 'react';
import sigess from './api/sigess';
import withAuthSuperAdmin from './Auth/withAuthSuperAdmin';
import RequisiteCard from './components/RequisiteCard';
import ModalAddRequisite from './modals/ModalAddRequisite';

class ManageRequisites extends React.Component {
    
    state = {
        admins : [],
        showAddRequisite : false
    }

    componentDidMount (){
        this.getAdmins();
    }

    handleOpenAddRequisite = () => this.setState({ showAddRequisite: true});
    handleCloseAddRequisite = () => this.setState({ showAddRequisite: false});

    /*******************************************************
     *              llamadas a la API
     ******************************************************/



    getAdmins = async () => {
        const response = await sigess.get("/admins/obtenerAdmins",{});
        this.setState({admins: response.data});
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
                    <RequisiteCard/>
                </div>

                <ModalAddRequisite
                    show = {this.state.showAddRequisite}
                    handleClose = {this.handleCloseAddRequisite}
                    admins = {this.state.admins}
                />

            </div> 
        );
    }
}

export default withAuthSuperAdmin( ManageRequisites );