import React from 'react';
import { withRouter } from 'react-router';

class Register extends React.Component {

    state = {
        noControl : '',
        nombre : '',
        apPaterno : '',
        apMaterno : '',
        gmail : '',
        clave : '',
        telefono : '',
        carrera : 'Selecciona carrera',
        programa : '',
        encargado : '',
        institucion : '',

        noControlError : '',
        nombreError : '',
        apPaternoError : '',
        apMaternoError : '',
        gmailError : '',
        claveError : '',
        telefonoError : '',
        carreraError : '',
        programaError : '',
        encargadoError : '',
        institucionError : ''

    }

    validate = () => {
        let noControlError = "";
        let nombreError = "";
        let apPaternoError = "";
        let apMaternoError = "";
        let gmailError = "";
        let claveError = "";
        let telefonoError = "";
        let carreraError = "";
        let programaError = "";
        let encargadoError = "";
        let institucionError = "";

        // validacion de longitudes 
        if( this.state.noControl.trim().length != 9){
            noControlError  = "El noControl es incorrecto, debe de tener un total de 9 caracteres";
        }
        if( this.state.nombre.trim().length < 3 || this.state.nombre.trim().length > 40){
            nombreError = "La longitud debe ser entre 3 y 40 caracteres";
        }
        if( this.state.apPaterno.trim().length < 4 || this.state.apPaterno.trim().length > 40){
            apPaternoError = "La longitud debe ser entre 4 y 40 caracteres";
        }
        if( this.state.apMaterno.trim().length < 4 || this.state.apMaterno.trim().length > 40){
            apMaternoError = "La longitud debe ser entre 4 y 40 caracteres";
        }
        if( this.state.gmail.trim().length < 5 || this.state.gmail.trim().length > 60){
            gmailError = "La longitud debe ser entre 5 y 60 caracteres";
        }
        if( this.state.clave.trim().length < 8 || this.state.clave.trim().length > 32){
            claveError = "La longitud debe ser entre 8 y 32 caracteres";
        }
        if( this.state.telefono.trim().length !=10 || this.state.telefono.trim().length != 0){
            telefonoError = "Telefono ingresado no valido debe tener 10 digitos";
        }
        if( this.state.carrera === 'Selecciona carrera'){
            carreraError = "La carrera no ha sido seleccionada";
        }
        if( this.state.programa.trim().length < 10 || this.state.programa.trim().length > 40){
            programaError = "La longitud debe ser entre 10 y 40 caracteres";
        }
        if( this.state.encargado.trim().length < 12 || this.state.encargado.trim().length > 120){
            encargadoError = "La longitud debe ser entre 12 y 120 caracteres";
        }
        if( this.state.institucion.trim().length < 4 || this.state.institucion.trim().length > 50){
            institucionError = "La longitud debe ser entre 4 y 50 caracteres";
        }

        // verifica si se encuentran casillas vacías
        if(!this.state.noControl){
            noControlError = "Numero de control no puede estar en blanco";
        }
        if(!this.state.nombre){
            nombreError = "Nombre no puede estar en blanco";
        }
        if(!this.state.apPaterno){
            apPaternoError = "Apellido paterno no puede estar en blanco";
        }
        if(!this.state.apMaterno){
            apMaternoError = "Apellido Materno no puede estar en blanco";
        }
        if(!this.state.gmail){
            gmailError = "Correo no puede estar en blanco";
        }
        if(!this.state.clave){
            claveError = "Clave no puede estar en blanco";
        }
        if(!this.state.programa){
            programaError = "Tienes que selccionar un programa no puede estar en blanco";
        }
        if(!this.state.encargado){
            encargadoError = "Nombre del encargado no puede estar en blanco";
        }

        // validacion de correo
        if( !( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.gmail) ) ){
            gmailError = "Este no es un correo valido";
        }

        // cambiar los errores
        this.setState({noControlError,nombreError,apPaternoError,apMaternoError,gmailError,claveError,telefonoError,carreraError,programaError,
            encargadoError,institucionError});

        if(noControlError || nombreError || apPaternoError || apMaternoError || gmailError || claveError || telefonoError || carreraError || 
            programaError || encargadoError || institucionError){
            return false;
        }
        return true;
    };

    handleAddPreRequisite = () => {
        if( this.validate() ){
            this.addPreRequisite(this.state.noControl, this.state.nombre, this.state.apPaterno,
                                    this.state.apMaterno, this.state.gmail, this.state.clave, this.state.telefono,
                                    this.state.carrera, this.state.programa, this.state.encargado, this.state.institucion);
            this.setState({
                noControl : '',
                nombre : '',
                apPaterno : '',
                apMaterno : '',
                gmail : '',
                clave : '',
                telefono : '',
                carrera : 'Selecciona carrera',
                programa : '',
                encargado : '',
                institucion : '',

                noControlError : '',
                nombreError : '',
                apPaternoError : '',
                apMaternoError : '',
                gmailError : '',
                claveError : '',
                telefonoError : '',
                carreraError : '',
                programaError : '',
                encargadoError : '',
                institucionError : ''
            });
        }
    }

    render(){
        return (
            <div>
                Registo
                <form onSubmit={event => event.preventDefault()}>
                            <div className="form-group">
                                <label>Número Control: *</label>
                                <input 
                                    className="form-control"
                                    value = {this.state.noControl}
                                    onChange = { e => this.setState({noControl: e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.noControlError}</p>
                            </div>
                            <div className="form-group">
                                <label>Nombre : *</label>
                                <input 
                                    className="form-control"
                                    value = {this.state.nombre}
                                    onChange = { e => this.setState({nombre: e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.nombreError}</p>
                            </div>
                            <div className="form-group">
                                <label>Apellido Paterno : *</label>
                                <input 
                                    className="form-control"
                                    value = {this.state.apPaterno}
                                    onChange = { e => this.setState({apPaterno: e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.apPaternoError}</p>
                            </div>
                            <div className="form-group">
                                <label>Apellido Materno : *</label>
                                <input 
                                    className="form-control"
                                    type = "password"
                                    value = {this.state.apMaterno}
                                    onChange = { e => this.setState({apMaterno : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.apMaternoError}</p>
                            </div>
                            <div className="form-group">
                                <label>Correo : *</label>
                                <input 
                                    className="form-control"
                                    type = "password"
                                    value = {this.state.gmail}
                                    onChange = { e => this.setState({gmail : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.gmailError}</p>
                            </div>
                            <div className="form-group">
                                <label>Clave : * </label>
                                <input 
                                    className="form-control"
                                    type = "password"
                                    value = {this.state.clave}
                                    onChange = { e => this.setState({clave : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.claveError}</p>
                            </div>
                            <div className="form-group">
                                <label>Telefono : </label>
                                <input 
                                    className="form-control"
                                    type = "password"
                                    value = {this.state.telefono}
                                    onChange = { e => this.setState({telefono : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.telefonoError}</p>
                            </div>
                            
                            <div className="form-group">
                                <label>
                                    Carrera : *
                                </label>
                                <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {this.state.carrera}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" onClick={() => this.setState({carrera : "Ing. Sistemas Computacionales"})}>Ing. Sistemas Computacionales</a></li>
                                    <li><a class="dropdown-item" onClick={() => this.setState({carrera : "Ing. Ambiental"})}>Ing. Ambiental</a></li>
                                    <li><a class="dropdown-item" onClick={() => this.setState({carrera : "Ing. Electronica"})}>Ing. Electronica</a></li>
                                    <li><a class="dropdown-item" onClick={() => this.setState({carrera : "Lic. Gastronomía"})}>Lic. Gastronomía</a></li>
                                    <li><a class="dropdown-item" onClick={() => this.setState({carrera : "Ing. Gestion Empresarial"})}>Ing. Gestion Empresarial</a></li>
                                    <li><a class="dropdown-item" onClick={() => this.setState({carrera : "Ing. Industrial"})}>Ing. Industrial</a></li>
                                </ul>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label>Programa : *</label>
                                <input 
                                    className="form-control"
                                    type = "password"
                                    value = {this.state.programa}
                                    onChange = { e => this.setState({programa : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.programaError}</p>
                            </div>
                            <div className="form-group">
                                <label>Nombre del encargado : * </label>
                                <input 
                                    className="form-control"
                                    type = "password"
                                    value = {this.state.encargado}
                                    onChange = { e => this.setState({encargado : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.encargadoError}</p>
                            </div>
                            <div className="form-group">
                                <label>Nombre Institucion : * </label>
                                <input 
                                    className="form-control"
                                    type = "password"
                                    value = {this.state.institucion}
                                    onChange = { e => this.setState({institucion : e.target.value}) }
                                />
                                <p style={{color: "red"}}>{this.state.institucionError}</p>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-primary" >Agregar</button>
                                <button type="button" className="btn btn-danger" onClick={this.handleAddPreRequisite}>Cancelar</button>
                            </div>


                </form>
                
            </div>
        );
    }
}

export default withRouter( Register );