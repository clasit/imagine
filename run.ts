const file_system = require('fs');
const sharp = require('sharp');
const exifReader = require('exif-reader');
const mongoose = require('mongoose');


const assets = './images';



/*
 * Clase que se encarga de la persistencia de datos
 */
class Storer {
    private data;
    constructor(data: Promise<any>){
        this.data = data;
    }

    public store_on() {        
        this.data.then((info) => console.log(info));
    }

    // mongoose.connect('mongodb://localhost/my_database');
}



/*
 * Clase que se encarga extraer los metadatos de un archivo
 */
class Extract {
    public static metadata_from(file) {
        const storer = new Storer(sharp(`${assets}/${file}`)
                        .metadata()
                        .then((info) => info.exif ? exifReader(info.exif) : null));
        return storer;
    }
}



/*
 * MAIN
 */
file_system.readdirSync( assets )
.filter( (file) => by_format(file,'.jpg') )
.forEach( (file) => Extract.metadata_from(file).store_on() );



/*
 * Función auxiliar para el filtrado
 */
function by_format(file, format) {
    return file.endsWith(format);
}
