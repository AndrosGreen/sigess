import React from 'react';
import sigess from './api/sigess';
import FileBase64 from 'react-file-base64';

class GestionarAsignaciones extends React.Component {
    
    state = {
        selectedFile : "",
        nombre : "",
        porCiento : 0
    }

    onFileChange = (files) => {
        
        //console.log(files);

        let archivo = files.base64.substring(28);         
        let nombre = files.name;

        console.log(nombre);

        this.setState( { selectedFile : archivo, nombre : nombre } );
    }

    onFileUpload = async () => {
        //console.log(this.state.selectedFile);

        const options = {
            onUploadProgress : (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percet = Math.floor( (loaded * 100) / total );
                this.setState({porCiento : percet});
                console.log( `${loaded}kb of ${total}kb | ${percet}%` );
            }
        }

        const response = await sigess.post('/pdfUpload', {
            nombre : "hola.pdf",
            archivo : this.state.selectedFile
        },options
        );
        console.log(response.data);
    }

    render(){
        return (
            <div>
                
                <FileBase64
                    multiple = {false}
                    onDone = { this.onFileChange }
                />

                <button onClick={this.onFileUpload} >Upload</button>

                <div class="progress" style={{marginTop : "1rem"}}>
                    <div className="progress-bar" role="progressbar" style={{width : `${this.state.porCiento}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {this.state.porCiento}% </div>
                </div>

            </div>
        );
    }
}

export default GestionarAsignaciones;