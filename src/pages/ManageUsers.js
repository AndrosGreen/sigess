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
import withAuthSuperAdmin from './Auth/withAuthSuperAdmin';

class ManageUsers extends React.Component {

    state = { 
        // students
        students : [],
        noControl : '',
        passwordStudent : '',
        showAddStudent : false,
        showEditStudent : false,
        showDeleteStudent : false,

        // admin
        admins : [],
        nameAdmin : '',
        area : '',
        gmail : 'hola mundo',
        passwordAdmin : '',
        esRevisor : '',
        idAdmin : 0,
        showAddAdmin : false,
        showEditAdmin : false,
        showDeleteAdmin : false
    };

    // cargar usuarios y administradores contenidos en la bd
    componentDidMount (){
        this.loadStudents();
        this.loadAdmins();
    }

    /*******************************************************
     *               Handles de open y close 
     ******************************************************/
    handleCloseAddStudent = () => this.setState({showAddStudent : false});
    handleOpenAddStudent = () => { this.setState( { showAddStudent : true } ); };

    /*handleCloseEditStudent = () => this.setState({showEditStudent : false});
    handleOpenEditStudent = (noControl, passwordStudent) => { 
        this.setState({
            showEditStudent : true,
            noControl : noControl,
            passwordStudent : passwordStudent
        }); 
    }*/

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
    handleOpenEditAdmin = (nameAdmin, area, gmail, idAdmin) => { 
        this.setState({
            showEditAdmin : true,
            nameAdmin : nameAdmin,
            area : area,
            gmail : gmail,
            idAdmin : idAdmin
        }); 
    }

    handleCloseDeleteAdmin = () => this.setState({showDeleteAdmin : false});
    handleOpenDeleteAdmin = ( idAdmin, name ) => { 
        this.setState({
            showDeleteAdmin : true,
            idAdmin : idAdmin,
            nameAdmin: name
        }); 
    }

    /*******************************************************
     *              Peticiones a la API
     ******************************************************/

    // agrega un estudiente con el numero de control y una contrasenia
    addStudent = async (noControl, passwordStudent) => {
        const respuesta = await sigess.post('/alumnos/preRegistraAlumno',
            {
                noControl : noControl,
                clave : passwordStudent
            }
        );
        this.handleCloseAddStudent();
        this.loadStudents();

    }

    // agrega un administrador con el nombre, area de trabajo, correo y contrasenia
    addAdmin = async (nameAdmin, area, gmail, passwordAdmin) => {
        const respuesta = await sigess.post('/admins/creaAdmin',
            {
                nombre : nameAdmin,
                area : area,
                correo : gmail,
                clave : passwordAdmin,
                esRevisor : 'T'
            }
        );
        console.log(respuesta.data);
        this.handleCloseAddAdmin();
        this.loadAdmins();

    }

    // edita el numero de control o la contrasenia de un estudiante
    /*editStudent = async (noControl, passwordStudent) => {

        const respuesta = await sigess.put('/students/update',
            {
                noControl : noControl,
                passwordStudent : passwordStudent
            }
        );
        this.handleCloseEditStudent();
        //this.loadStudents();
    }*/

    // edita el nombre, area de trabajo, correo o contrasenia de un administrador
    editAdmin = async (area, passwordAdmin, gmail, nameAdmin) => {
        console.log(gmail);
        console.log(nameAdmin);
        console.log(area);
        console.log(passwordAdmin);
        console.log(this.state.idAdmin);
        const respuesta = await sigess.post('/admins/actualizarAdmin',
            {
                
                area : area,
                clave : passwordAdmin,
                correo : gmail,
                esRevisor : 'T',
                idAdmin : this.state.idAdmin,
                nombre : nameAdmin
                
            }
        );
        this.handleCloseEditAdmin();
        this.loadAdmins();
    }

    /**
     * elimina un estudiante por su numero de control.
     * @param {String} noControl - numero de control
     */
    deleteStudent = async (noControl) =>{
        const respuesta = await sigess.post('/alumnos/eliminaPreRegistrado',{
                
                    noControl : noControl
                
            }
        );
        this.handleCloseDeleteStudent();
        this.loadStudents();
    }
    /**
     * elimina un administrador con su numero de id
     * @param {int} idAdmin - id del administrador
     */
    deleteAdmin = async (idAdmin) =>{
        const respuesta = await sigess.post('/admins/eliminaAdmin',{
                idAdmin : idAdmin
            }
        );
        this.handleCloseDeleteAdmin();
        this.loadAdmins();
    }

    // carga los estudiantes que se encuentran en la bd
    loadStudents = async () => {
        const respuesta = await sigess.get( '/alumnos/obtenerAlumnosPreRegistrados',{
                params : ""
            }
        );
        console.log(respuesta.data);
        this.setState( { students : respuesta.data } );
    }
    
    // carga los administradores que se encuentran en la bd
    loadAdmins = async () => {
        const respuesta = await sigess.get( '/admins/obtenerAdmins',{
                params : ""
            }
        );
        console.log(respuesta.data);
        this.setState( { admins : respuesta.data } );
    }

    render(){
        return (
            
            <div className="container">
                <h3 style={{marginBottom: "20px"}}>Gestión de Usuarios</h3>
                <button className="btn btn-success" onClick={this.handleOpenAddStudent}> Agregar Alumno </button>
                <button className="btn btn-success" onClick={this.handleOpenAddAdmin} style={{margin: "10px"}}> Agregar Administrador </button>
                <div>
                    <h4 style={{marginBottom: "15px"}}>Alumnos</h4>
                    <ListStudent
                        students = {this.state.students}
                        handleOpenDeleteStudent = {this.handleOpenDeleteStudent}
                        handleOpenEditStudent = {this.handleOpenEditStudent}
                    />
                    <h4 style={{marginBottom: "15px", marginTop: "15px"}}>Administradores</h4>
                    <ListAdmin
                        admins = {this.state.admins}
                        handleOpenDeleteAdmin = {this.handleOpenDeleteAdmin}
                        handleOpenEditAdmin = {this.handleOpenEditAdmin}
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
                    idAdmin = {this.state.idAdmin}
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
                    handleOpenDeleteAdmin = {this.handleOpenDeleteAdmin}
                    handleClose = {this.handleCloseDeleteAdmin}
                    idAdmin = {this.state.idAdmin}
                    name = {this.state.nameAdmin}
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

export default withAuthSuperAdmin( ManageUsers );