import { FileUpload } from '../interfaces/file-upload';

import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';
import { resolve } from 'url';
import { rejects } from 'assert';

export default class FyleSystem {
    
    constructor() {

    }

    guardarImagenTemporal( file: FileUpload, userId: string ) {

        return new Promise( (resolve, reject) => {
            
            // crear carpetas
            const path = this.crearCarpetaUsuario( userId );

            // nombre archivo
            const nombreArchivo = this.generarNombreUnico( file.name );
            
            // mover el archivo del temp a nuestra carpeta
            file.mv( `${ path}/${ nombreArchivo }`, (err: any) =>{

                if ( err ) {
                    reject(err);
                } else {
                    resolve( );
                }
            });

        });

    }

    private generarNombreUnico( nombreOriginal: string ) {

        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[ nombreArr.length - 1 ];

        const idUnico = uniqid();

        return `${ idUnico }.${ extension }`;
    }

    private crearCarpetaUsuario( userId: string ) {

        const pathUser = path.resolve( __dirname, '../uploads/', userId );
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);

        const existe = fs.existsSync( pathUser );

        if ( !existe ) {
            fs.mkdirSync( pathUser );
            fs.mkdirSync( pathUserTemp );
        }

        return pathUserTemp;

    }
}