import React from 'react';
import sigess from './api/sigess';
import ModalAddStudents from './modals/ModalAddStudent';
import ModalAddAdmins from './modals/ModalAddAdmins';
import ModalEditStudent from './modals/ModalEditStudent';
import ModalEditAdmin from './modals/ModalEditAdmin';
import ModalDeleteStudent from './modals/ModalDeleteStudent';
import ModalDeleteAdmin from './modals/ModalDeleteAdmin';
import AdminCard from './components/AdminCard';
import ListAdmin from './components/ListAdmin';
import StudentCard from './components/StudentCard';
import ListStudent from './components/ListStudent';

class ManageUsers extends React.Component {

    state = { 
        // students
        students : [
            {
                noControl : "s18120207", 
                passwordStudent : "prueba"
            },
            {
                noControl : "s18120184",
                passwordStudent : "tengonovia"
            }
        ],
        noControl : '',
        passwordStudent : '',
        showAddStudent : false,
        showEditStudent : false,
        showDeleteStudent : false,

        // admin
        admins : [
            {
                nameAdmin : "Alexia Martinez",
                area : "idiomas",
                gmail : "alexia77755@gmail.com",
                passwordAdmin : "palomitas"
            },
            {
                nameAdmin : "Rene Aguilera",
                area : "idiomas",
                gmail : "adrene@gmail.com",
                passwordAdmin : "father"
            }
        ],
        nameAdmin : '',
        area : '',
        gmail : '',
        passwordAdmin : '',
        showAddAdmin : false,
        showEditAdmin : false,
        showDeleteAdmin : false
    };

    // cargar usuarios y administradores contenidos en la bd
    componentDidMount (){
        //this.loadStudents();
        //this.loadAdmins();
    }

    /*******************************************************
     *               Handles de open y close 
     ******************************************************/
    handleCloseAddStudent = () => this.setState({showAddStudent : false});
    handleOpenAddStudent = () => { this.setState( { showAddStudent : true } ); };

    handleCloseEditStudent = () => this.setState({showEditStudent : false});
    handleOpenEditStudent = (noControl, passwordStudent) => { 
        this.setState({
            showEditStudent : true,
            noControl : noControl,
            passwordStudent : passwordStudent
        }); 
    }

    handleCloseDeleteStudent = () => this.setState({showDeleteStudent : false});
    handleOpenDeleteStudent = ( noControl ) => { 
        this.setState({
            showDeleteStudent : true,
            noControl : noControl
        }); 
    }

    handleCloseAddAdmin = () => this.setState({showAddAdmin : false});
    handleOpenAddAdmin = () => { this.setState( { showAddAdmin : true } ); };

    handleCloseEditAdmin = () => this.setState({showEditAdmin : false});
    handleOpenEditAdmin = (nameAdmin, area, gmail, passwordAdmin) => { 
        this.setState({
            showEditAdmin : true,
            nameAdmin : nameAdmin,
            area : area,
            gmail : gmail,
            passwordAdmin
        }); 
    }

    handleCloseDeleteAdmin = () => this.setState({showDeleteAdmin : false});
    handleOpenDeleteAdmin = ( nameAdmin ) => { 
        this.setState({
            showDeleteAdmin : true,
            nameAdmin : nameAdmin
        }); 
    }

    /*******************************************************
     *              Peticiones a la API
     ******************************************************/

    // agrega un estudiente con el numero de control y una contrasenia
    addStudent = async (noControl, passwordStudent) => {
        const respuesta = await sigess.post('/student/add',
            {
                noControl : noControl,
                passwordStudent : passwordStudent
            }
        );
        this.handleCloseAddStudent();
        //this.loadStudents();

    }

    // agrega un administrador con el nombre, area de trabajo, correo y contrasenia
    addAdmin = async (nameAdmin, area, gmail, passwordAdmin) => {
        const respuesta = await sigess.post('/admin/add',
            {
                nameAdmin : nameAdmin,
                area : area,
                gmail : gmail,
                passwordAdmin : passwordAdmin
            }
        );
        this.handleCloseAddAdmin();
        //this.loadAdmins();

    }

    // edita el numero de control o la contrasenia de un estudiante
    editStudent = async (noControl, passwordStudent) => {

        const respuesta = await sigess.put('/students/update',
            {
                noControl : noControl,
                passwordStudent : passwordStudent
            }
        );
        this.handleCloseEditStudent();
        //this.loadStudents();
    }

    // edita el nombre, area de trabajo, correo o contrasenia de un administrador
    editAdmin = async (nameAdmin, area, gmail, passwordAdmin) => {

        const respuesta = await sigess.put('/admins/update',
            {
                nameAdmin : nameAdmin,
                area : area,
                gmail : gmail,
                passwordAdmin : passwordAdmin
            }
        );
        this.handleCloseEditAdmin();
        //this.loadAdmins();
    }

    // eliminar un estudiante con el numero de control
    deleteStudent = async (noControl) =>{
        const respuesta = await sigess.delete('/students/delete',{
                data : {
                    noControl : noControl
                }
            }
        );
        this.handleCloseDeleteStudent();
        //this.loadStudents();
    }

    // elimina un administrador con su nombre
    deleteAdmin = async (nameAdmin) =>{
        const respuesta = await sigess.delete('/admins/delete',{
                data : {
                    nameAdmin : nameAdmin
                }
            }
        );
        this.handleCloseDeleteAdmin();
        //this.loadAmins();
    }

    // carga los estudiantes que se encuentran en la bd
    loadStudents = async () => {
        const respuesta = await sigess.get( '/students',{
                params : ""
            }
        );
        this.setState( { students : respuesta.data } );
    }

    // carga los administradores que se encuentran en la bd
    loadAdmins = async () => {
        const respuesta = await sigess.get( '/admins',{
                params : ""
            }
        );
        this.setState( { admins : respuesta.data } );
    }

    render(){
        return (
            
            <div className="container" style={{marginTop: "20px"}}>
                <h3 style={{marginBottom: "20px"}}>Gestión de Usuarios</h3>
                <button className="btn btn-success" onClick={this.handleOpenAddStudent}> Agregar Alumno </button>
                <button className="btn btn-success" onClick={this.handleOpenAddAdmin} style={{margin: "10px"}}> Agregar Administrador </button>
                <div>
                    <h3 style={{marginBottom: "15px"}}>Alumnos</h3>
                    <ListStudent
                        students = {this.state.students}
                        handleOpenDeleteStudent = {this.handleOpenDeleteStudent}
                        handleOpenEditStudent = {this.handleOpenEditStudent}
                    />
                </div>
                
                <ModalAddStudents
                    show = {this.state.showAddStudent}
                    handleOpen = {this.handleOpenAddStudent} 
                    handleClose = {this.handleCloseAddStudent}
                    add = {this.addStudent}
                />

                <ModalAddAdmins
                    show = {this.state.showAddAdmin}
                    handleOpen = {this.handleOpenAddAdmin} 
                    handleClose = {this.handleCloseAddAdmin}
                    add = {this.addAdmin}
                />

                <ModalEditAdmin
                    show = {this.state.showEditAdmin}
                    handleOpen = {this.handleOpenEditAdmin} 
                    handleClose = {this.handleCloseEditAdmin}
                    edit = {this.editAdmin}
                    nameAdmin = {this.state.nameAdmin}
                    area = {this.state.area}
                    gmail = {this.state.gmail}
                    password = {this.state.passwordAdmin}
                />

                <ModalEditStudent
                    show = {this.state.showEditStudent}
                    handleOpen = {this.handleOpenEditStudent}
                    handleClose = {this.handleCloseEditStudent}
                    edit = {this.editStudent}
                    noControl = {this.state.noControl}
                    passwordStudent = {this.state.passwordStudent}
                />

                <ModalDeleteAdmin
                    show = {this.state.showDeleteAdmin}
                    handleOpen = {this.handleOpenDeleteAdmin}
                    handleClose = {this.handleCloseDeleteAdmin}
                    nameAdmin = {this.state.nameAdmin}
                    deleteAdmin = {this.deleteAdmin}
                    
                />

                <ModalDeleteStudent
                    show = {this.state.showDeleteStudent}
                    handleOpen = {this.handleOpenDeleteStudent}
                    handleClose = {this.handleCloseDeleteStudent}
                    noControl = {this.state.noControl}
                    deleteStudent = {this.deleteStudent}
                    
                />
            </div> 
        );
    }
}

export default ManageUsers;